const ui = new UI();
const searchBox = document.getElementById("searchUser");
searchBox.addEventListener("keyup", (e) => {
  let val = searchBox.value;
  getProfile(val).then((user) => {
    if (user.message === "Not Found") {
      ui.showAlert("User not found", "alert alert-danger");
    } else {
      ui.showProfile(user);
    }
  });
  getRepos(val).then((repos) => {
    if (repos.message === "Not Found") {
      ui.repos("User not found", "alert alert-danger");
    } else {
      ui.showRepos(repos);
    }
  });
});

async function getProfile(profile) {
  const response = await (
    await fetch(`https://api.github.com/users/${profile}`)
  ).json();
  console.log(response);
  return response;
}
async function getRepos(profile) {
  const response = await (
    await fetch(`https://api.github.com/users/${profile}/repos`)
  ).json();
  console.log(response);
  return response;
}
