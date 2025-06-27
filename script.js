const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const itemsList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

//function to add item to the list
function addItem(e) {
  e.preventDefault();
  let inputValue = input.value;

  if (inputValue === "") {
    alert("Please add some item");
    return;
  }

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

//Remove item from the list
function removeItem(e) {
  if (e.target.tagName === "I") {
    const removedItem = e.target.parentElement.parentElement;
    removedItem.remove();
  }
}

// Clearing all the items in the list`
function clearList() {
  //   itemsList.textContent = "";
  // Another way
  while (itemsList.firstElementChild) {
    itemsList.removeChild(itemsList.firstElementChild);
  }
}

// Event Listeners
form.addEventListener("submit", addItem);
itemsList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearList);
