import getData, { api } from "./dom.js";

async function get() {
  try {
    let { data } = await axios.get(api);
    getData(data);
  } catch (error) {}
}

export default get;
