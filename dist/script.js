const BASE_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users";
let userList = [];
const userContainer = document.querySelector("#user-card-container");
const userPanel = document.querySelector("#user-panel");

function renderUserList(data) {
  let cardHTML = "";
  data.forEach((item) => {
    cardHTML += `
    <div class="col-sm-6 col-md-3 col-lg-2">
      <div class="mb-2">
        <div class="card">
          <img class="user-avatar" data-toggle="modal" data-target="#user-modal" data-id="${item.id}" src="${item.avatar}" alt="user-avatar">
          <div class="card-body">
            <h5 class="user-name">${item.name}</h5>
            <button class="btn btn-primary btn-show-user" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">more</button>
            <button class="btn btn-danger btn-add-favorite">+</button>
          </div>
        </div>
      </div>
    </div>`;
  });
  userPanel.innerHTML = cardHTML;
}

function showUserModal(id) {
  const modalName = document.querySelector("#user-modal-name");
  const modalAvatar = document.querySelector("#user-modal-avatar");
  const modalGender = document.querySelector("#user-modal-gender");
  const modalBirthday = document.querySelector("#user-modal-birthday");
  const modalAge = document.querySelector("#user-modal-age");
  const modalRegion = document.querySelector("#user-modal-region");
  const modalEmail = document.querySelector("#user-modal-email");

  axios
    .get(BASE_URL + "/" + id)
    .then((response) => {
      const data = response.data;
      modalName.innerText = data.name + " " + data.surname;
      modalAvatar.innerHTML = `
      <img src="${data.avatar}" alt="user-avatar">`;
      modalGender.innerText = data.gender;
      modalBirthday.innerText = data.birthday;
      modalAge.innerText = data.age;
      modalRegion.innerText = data.region;
      modalEmail.innerText = data.email;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
}

axios
  .get(BASE_URL)
  .then((response) => {
    // handle success
    userList.push(...response.data.results);
    renderUserList(userList);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });

userContainer.addEventListener("click", (event) => {
  const target = event.target;
  const btnShowUser = target.matches(".btn-show-user");
  const userAvatar = target.matches(".user-avatar");
  // 題目有提到點擊任一使用者頭像跳出Modal視窗，所以假設點擊的event在 more按鈕及 頭像都要呼叫 showUserModal跳出Modal視窗
  if (btnShowUser || userAvatar) {
    showUserModal(target.dataset.id);
  }
});