import getData, { api, getUser } from "./dom.js";

async function get() {
  try {
    let { data } = await axios.get(api);
    getData(data);
  } catch (error) {
    console.error(
      alert("ошибька соединения: проверьте подключения к интернету")
    );
  }
}

async function deleteUser(id) {
  try {
    await axios.delete(`${api}/${id}`);
    get();
  } catch (error) {
    console.error(error);
  }
}

async function addUSer(newUser) {
  try {
    await axios.post(api, newUser);
    get();
  } catch (error) {
    console.error(error);
  }
}

async function editUSer(updateUser, idx) {
  try {
    let { data } = await axios.put(`${api}/${idx}`, updateUser);
    console.log(data);
    get();
  } catch (error) {
    console.error(error);
  }
}

async function changeStatus(updateUser, id) {
  try {
    let { data } = await axios.put(`${api}/${id}`, updateUser);
    get();
  } catch (error) {
    console.error(error);
  }
}

async function infoUser(id) {
  try {
    let { data } = await axios.get(`${api}/${id}`);
    getUser(data);
  } catch (error) {
    console.error(error);
  }
}

async function fSearch(value) {
  try {
    let { data } = await axios.get(`${api}?name=${value}`);
    getData(data);
  } catch (error) {
    console.error(error);
  }
}

async function fSearchStatus(value) {
  if (value == "all") {
    get();
  } else {
    try {
      let { data } = await axios.get(`${api}?status=${value == "active"}`);
      getData(data);
    } catch (error) {
      console.error(error);
    }
  }
}

async function sortUser() {
  try {
    let { data } = await axios.get(api);
    data.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("data", JSON.stringify(data));
    getData(data);
  } catch (error) {
    console.error(error);
  }
}

export default get;
export {
  deleteUser,
  addUSer,
  changeStatus,
  editUSer,
  infoUser,
  fSearch,
  fSearchStatus,
  sortUser,
};
