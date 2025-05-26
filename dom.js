let api = "https://6821ee6ab342dce8004c672c.mockapi.io/api/v1/dataUsers";
export { api, getUser };

import {
  addUSer,
  deleteUser,
  changeStatus,
  editUSer,
  infoUser,
  fSearch,
  fSearchStatus,
  sortUser,
} from "./api.js";

let body = document.querySelector(".body");

let box = document.querySelector(".box");

let statusSearch = document.querySelector(".statusSearch");
let inpSearch = document.querySelector(".inpSearch");
let btnSort = document.querySelector(".btnSort");
let btnNewUser = document.querySelector(".btnNewUser");

let addDialog = document.querySelector(".addDialog");
let addForm = document.querySelector(".addForm");

let editDialog = document.querySelector(".editDialog");
let editForm = document.querySelector(".editForm");

let infoDialog = document.querySelector(".infoDialog");
let infoImage = document.querySelector(".infoImage");
let infoName = document.querySelector(".infoName");
let infoStatus = document.querySelector(".infoStatus");
let infoAge = document.querySelector(".infoAge");
let infoId = document.querySelector(".infoId");

let btnaddClose = document.querySelector(".btnaddClose");
let btneditClose = document.querySelector(".btneditClose");
let btninfoClose = document.querySelector(".btninfoClose");

let idx = null;

inpSearch.oninput = () => {
  fSearch(inpSearch.value);
};

statusSearch.onchange = () => {
  fSearchStatus(statusSearch.value);
};

btnSort.onclick = () => {
  sortUser();
};

btnaddClose.onclick = () => {
  addDialog.close();
};
btneditClose.onclick = () => {
  editDialog.close();
};
btninfoClose.onclick = () => {
  infoDialog.close();
};
btnNewUser.onclick = () => {
  addDialog.showModal();
};

let dark = document.querySelector(".dark");
let light = document.querySelector(".light");

let darkMode = localStorage.getItem("theme") || "white";
let fontColor = localStorage.getItem("fontColor") || "black";
body.style.backgroundColor = darkMode;
body.style.color = fontColor;

dark.onclick = () => {
  localStorage.setItem("theme", "black");
  let darkMode = localStorage.getItem("theme");
  body.style.backgroundColor = darkMode;

  localStorage.setItem("fontColor", "white");
  let fontColor = localStorage.getItem("fontColor");
  body.style.color = fontColor;
};

light.onclick = () => {
  localStorage.setItem("theme", "white");
  let darkMode = localStorage.getItem("theme");
  body.style.backgroundColor = darkMode;

  localStorage.setItem("fontColor", "black");
  let fontColor = localStorage.getItem("fontColor");
  body.style.color = fontColor;
};

addForm.onsubmit = (event) => {
  event.preventDefault();
  let newUser = {
    image: event.target["addImage"].value,
    name: event.target["addName"].value,
    age: event.target["addAge"].value,
    status: event.target["addStatus"].value == "active",
    updatedAt: Date.now(),
  };
  addUSer(newUser);
  addDialog.close();
};

editForm.onsubmit = (event) => {
  event.preventDefault();
  let updateUser = {
    image: event.target["editImage"].value,
    name: event.target["editName"].value,
    age: event.target["editAge"].value,
    status: event.target["editStatus"].value == "active",
    updatedAt: Date.now(),
  };
  editUSer(updateUser, idx);
  editDialog.close();
};

export default function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("div");

    let h2Name = document.createElement("h2");
    h2Name.innerHTML = e.name || "none";

    let pAge = document.createElement("p");
    pAge.style.padding = " 10px 5px ";
    pAge.innerHTML = `<b>age:</b> ${e.age}`;

    let pStatus = document.createElement("span");
    pStatus.classList.add("pStatus");
    pStatus.style.backgroundColor = e.status ? "green" : "red";
    pStatus.style.color = "white";
    pStatus.innerHTML = `<b>status:</b> ${e.status ? "active" : "inactive"}`;

    let image = document.createElement("img");
    image.classList.add("image");
    image.src = e.image;

    let nameMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = new Date(e.updatedAt);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let twoDigits = (n) => n.toString().padStart(2, "0");

    let dateadd = `${twoDigits(day)} ${nameMonth[month]} ${year} ${twoDigits(
      hours
    )}:${twoDigits(minutes)}:${twoDigits(seconds)}`;

    let pUpdatedAt = document.createElement("p");
    pUpdatedAt.innerHTML = `<b>latest changes:</b> ${dateadd}`;
    pUpdatedAt.style.padding = " 10px 5px ";

    let btndele = document.createElement("button");
    btndele.innerHTML = "delete";
    btndele.onclick = () => {
      deleteUser(e.id);
    };

    let btninfo = document.createElement("button");
    btninfo.innerHTML = "info";
    btninfo.onclick = () => {
      infoUser(e.id);
    };

    let check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check");
    check.checked = e.status;
    check.onclick = () => {
      let updateUser = {
        ...e,
        status: !e.status,
        updatedAt: Date.now(),
      };
      changeStatus(updateUser, e.id);
    };

    let btnedit = document.createElement("button");
    btnedit.innerHTML = "edit";
    btnedit.onclick = () => {
      editDialog.showModal();
      editForm["editName"].value = e.name;
      editForm["editAge"].value = e.age;
      editForm["editImage"].value = e.image;
      editForm["editImage"].value = e.image;
      editForm["editStatus"].value = e.status ? "active" : "inactive";
      idx = e.id;
    };

    div.append(
      image,
      h2Name,
      pAge,
      pStatus,
      pUpdatedAt,
      btndele,
      btnedit,
      btninfo,
      check
    );
    box.append(div);
  });
}

function getUser(e) {
  infoDialog.showModal();
  infoImage.src = e.image;
  infoName.innerHTML = `<b>name:</b> ${e.name}`;
  infoAge.innerHTML = `<b>age:</b> ${e.age}`;
  infoStatus.innerHTML = `<b>status:</b> ${e.status ? "active" : "inactive"}`;
  infoId.innerHTML = `<b>id:</b> ${e.id}`;
}
