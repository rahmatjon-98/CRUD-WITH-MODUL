let api = "https://6821ee6ab342dce8004c672c.mockapi.io/api/v1/dataUsers";
export { api };
let box = document.querySelector(".box");

export default function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("div")

    let h2Name = document.createElement("h2");
    h2Name.innerHTML = e.name;

    let pAge = document.createElement("p");
    pAge.innerHTML = e.age;

    let pStatus = document.createElement("p");
    pStatus.innerHTML = e.status ? "active" : "inactive";

    let image = document.createElement("img");
    image.src = e.image;
    image.style.width = "200px";

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
    check.checked = e.status;
    check.onclick = () => {
      let updateUser = {
        ...e,
        status: !e.status,
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
      editForm["editStatus"].value = e.status ? "active" : "inactive";
      idx = e.id;
    };

    div.append(image, h2Name, pAge, pStatus, btndele, btnedit, btninfo, check);
    box.append(div);
  });
}   