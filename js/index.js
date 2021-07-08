

function fetchUsers() {
    fetch("https://api.github.com/search/users?q=octocat")
    .then(resp => resp.json())
    .then(users => users.items.forEach(findUser))
}
fetchUsers()

function findUser(user) {
    // console.log(user)
    let ul = document.querySelector("#user-list")
    let li = document.createElement("li")

    ul.append(li)

    let pUsername = document.createElement("p")
    let avatar = document.createElement("img")

    li.append(pUsername, avatar)
    let form = document.querySelector("#github-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        if (e.target.search.value === user.login) {
            pUsername.textContent = `Username: ${user.login}`
            avatar.src = user.avatar_url
        }
    })

    li.addEventListener("click", () => {
        fetch("https://api.github.com/users/octocat/repos")
        .then(resp => resp.json())
        .then(repoData => repoData.forEach(renderRepoData))
    })
}

function renderRepoData(repos) {
    console.log(repos)
    let repoList = document.querySelector("#repos-list")
    let repoItem = document.createElement("li")
    repoItem.textContent = repos.name

    repoList.append(repoItem)
}
