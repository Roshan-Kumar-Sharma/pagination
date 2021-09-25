let pageLimit = 8;
let page = 1;
let totalData,
    data,
    totalNumOfPages,
    numberOfPageButtons,
    currentPageNumber,
    prevPageNumber,
    prev,
    next,
    first,
    last,
    pageButtons,
    prevPageNumId,
    currPageNumId;

const pageDataContainer = document.getElementById("page-data-container");
const pageNumberContainer = document.getElementById("page-number-container");
const invalidMessage = document.getElementById("invalid-msg");

window.onload = function () {
    getUsers();
};

async function getUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    data = await response.json();
    totalData = data.length;

    totalNumOfPages = Math.ceil(totalData / pageLimit);

    numberOfPageButtons = totalNumOfPages > 5 ? 5 : totalNumOfPages;

    currentPageNumber = page;

    createCurrentPageData(page);
    createPageNumberButtons(page);

    pageButtons = document.getElementsByClassName("pages");

    pageButtons[currentPageNumber - 1].classList.toggle("highlight");

    updatePageNumberButtons(page);
}

function gotoPage(pageNumber) {
    if (!pageNumber) return;
    if (pageNumber < 1 || pageNumber > totalNumOfPages) {
        invalidMessage.style.display = "block";
        return;
    } else {
        invalidMessage.style.display = "none";
    }

    prevPageNumber = currentPageNumber;
    currentPageNumber = pageNumber;

    let innerVal;
    for (let i = 0; i < pageButtons.length; i++) {
        innerVal = parseInt(pageButtons[i].innerText);
        if (innerVal === prevPageNumber) {
            prevPageNumId = pageButtons[i].id;
        }
    }

    createCurrentPageData(pageNumber);
    updatePageNumberButtons(pageNumber);

    for (let i = 0; i < pageButtons.length; i++) {
        innerVal = parseInt(pageButtons[i].innerText);
        if (innerVal === currentPageNumber) {
            currPageNumId = pageButtons[i].id;
        }
    }

    document.getElementById(prevPageNumId).classList.toggle("highlight");
    document.getElementById(currPageNumId).classList.toggle("highlight");
}

function createCurrentPageData(pageNumber) {
    // currentPageNumber = pageNumber;
    const currentPageData = data.slice(
        (currentPageNumber - 1) * pageLimit,
        pageLimit * currentPageNumber
    );
    pageDataContainer.innerHTML = "";
    let eachData;
    for (let i = 0; i < pageLimit && i < currentPageData.length; i++) {
        eachData = HTML(
            `<div class="data">
                <div id=q${currentPageData[i].id} class="question">
                    <h3>
                        Q.${currentPageData[i].id})&nbsp;${currentPageData[i].title}
                    </h3>
                </div>
                <div id=a${currentPageData[i].id} class="answer"><b>Answer : </b>${currentPageData[i].body}</div>
            </div>`
        );
        pageDataContainer.append(eachData);
    }
}

// function updateCurrentPageData(pageNumber) {
//     // currentPageNumber = pageNumber;
//     const currentPageData = data.slice(
//         (currentPageNumber - 1) * pageLimit,
//         pageLimit * currentPageNumber
//     );
//     // console.log("currentPageData : ", currentPageData.length);
//     pageDataContainer.innerHTML = "";
//     let eachData;
//     for (let i = 0; i < pageLimit && i < currentPageData.length; i++) {
//         eachData = HTML(
//             `<div class="data">
//                 <div id=${currentPageData[i].id} class="question">
//                     <h3>
//                         Q.${currentPageData[i].id})&nbsp;${currentPageData[i].title}
//                     </h3>
//                 </div>
//                 <div id=${currentPageData[i].id} class="answer"><b>Answer : </b>${currentPageData[i].body}</div>
//             </div>`
//         );
//         pageDataContainer.append(eachData);
//     }
// }

function createPageNumberButtons(pageNumber) {
    let button;

    first = HTML(
        `<button id="first" class="hover" onclick=gotoPage(1)>First</button>`
    );
    pageNumberContainer.append(first);
    prev = HTML(
        `<button id="prev" class="hover" onclick=goBack()>Prev</button>`
    );
    pageNumberContainer.append(prev);

    let page;
    for (let i = 1; i <= numberOfPageButtons; i++) {
        page = HTML(`<div id=${i} class='pages hover'>${i}</div>`);
        page.addEventListener("click", function () {
            console.log("you clicked button : ", parseInt(this.innerText));
            gotoPage(parseInt(this.innerText));
        });
        pageNumberContainer.append(page);
    }

    next = HTML(
        `<button id="next" class="hover" onclick=goNext()>Next</button>`
    );
    pageNumberContainer.append(next);

    last = HTML(
        `<button id="last" class="hover" onclick=gotoPage(${totalNumOfPages})>Last</button>`
    );
    pageNumberContainer.append(last);
}

function updatePageNumberButtons(pageNumber) {
    const isGreater = pageNumber + numberOfPageButtons;
    if (isGreater > totalNumOfPages) {
        pageNumber = totalNumOfPages - numberOfPageButtons + 1;
    }

    for (let i = 0; i < numberOfPageButtons; i++) {
        pageButtons[i].innerText = pageNumber++;
    }

    if (currentPageNumber >= totalNumOfPages) {
        last.disabled = true;
        next.disabled = true;
    } else {
        last.disabled = false;
        next.disabled = false;
    }

    if (parseInt(pageButtons[0].innerText) <= 1) {
        first.disabled = true;
        prev.disabled = true;
    } else {
        first.disabled = false;
        prev.disabled = false;
    }
}

function goBack() {
    gotoPage(currentPageNumber - 1);
}
function goNext() {
    gotoPage(currentPageNumber + 1);
}

function HTML(dom) {
    const template = document.createElement("template");
    template.innerHTML = dom;
    return template.content.firstChild;
}
