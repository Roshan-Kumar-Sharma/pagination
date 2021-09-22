let pageLimit = 7;
let page = 1;
let totalData;
let users;

const pageDataContainer = document.getElementById("page-data");
const pageNumberContainer = document.getElementById("page-number-container");

async function getUsers() {
    const response = await fetch("https://api.github.com/users");
    users = await response.json();
    totalData = users.length;

    createCurrentPageData(page);
    createPageNumber();
}

getUsers();

function createCurrentPageData(currentPageNumber) {
    const currentPageData = users.slice(
        (currentPageNumber - 1) * pageLimit,
        pageLimit * currentPageNumber
    );
    console.log("currentPageData : ", currentPageData.length);
    pageDataContainer.innerHTML = "";
    let eachData;
    for (let i = 0; i < pageLimit && i < currentPageData.length; i++) {
        eachData = HTML(
            `<div class="data">
                <img src=${currentPageData[i].avatar_url} alt=${currentPageData[i].login} width=100px height=100px/>
                <div>
                    <h4>${currentPageData[i].login}</h4>
                    <a href=${currentPageData[i].html_url}>profile</a>
              </div>
            </div>`
        );
        pageDataContainer.append(eachData);
    }
}

function createPageNumber() {
    numberOfPages = Math.ceil(totalData / pageLimit);
    console.log(numberOfPages);
    let page;
    for (let i = 1; i <= numberOfPages; i++) {
        page = HTML(`<div id=${i} class='pages hover'>${i}</div>`);
        page.addEventListener("click", function () {
            console.log(this.id);
            createCurrentPageData(parseInt(this.id));
        });
        pageNumberContainer.append(page);
    }
}

function HTML(dom) {
    const template = document.createElement("template");
    template.innerHTML = dom;
    return template.content.firstChild;
}
