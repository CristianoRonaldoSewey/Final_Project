import { createItem,  getItems } from "./api.js";

function drawTable(items) {
  const table = document.getElementById("main-table-body");

  table.innerHTML = "";
  for (const item of items) {
    const row = table.insertRow();
    row.insertCell().innerText = item.item;
    row.insertCell().innerText = item.price;
  }
}

export async function fetchAndDrawTable() {
  const items = await getItems();
  drawTable(items);
}

export async function handleCreateItem(user,score) {

  const payload = {
    item: user,
    price: score,
  };

  await createItem(payload);
  await fetchAndDrawTable();

}