var axios = require("axios");

async function getItemData(name, time, currency) {
  try {
    return await axios.get(
      `https://csgobackpack.net/api/GetItemPrice/?currency=${currency}&id=${name}&time=${time}`
    );
  } catch (err) {
    console.log(err);
  }
}

async function getItemColor(name) {
  try {
    const response = await axios.get(
      `https://csgobackpack.net/api/GetItemsList/v2/`
    );
    const itemName = response
    return itemName.data.items_list[name].rarity_color;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getItemData,
  getItemColor
};