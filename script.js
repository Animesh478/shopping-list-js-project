const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const itemsList = document.getElementById("item-list");

//function to add item to the list
function addItem(e) {
  e.preventDefault();
  let inputValue = input.value;

  const item = document.createElement("li");
  const text = document.createTextNode(inputValue);
  item.appendChild(text);

  const button = createButton("remove-item btn-link text-red");
  item.appendChild(button);

  // appending the list item to the unordered list
  itemsList.appendChild(item);

  input.value = "";
  console.log(inputValue);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
// Adding item to the list
form.addEventListener("submit", addItem);
