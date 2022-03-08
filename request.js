var axios = require("axios");
//http://csgobackpack.net/api/GetItemsList/v2/
//https://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${name}&time=${time}
var response;

async function getData(name, time, currency) {
  try {
    return await axios.get(`https://csgobackpack.net/api/GetItemPrice/?currency=${currency}&id=${name}&time=${time}`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getData
}