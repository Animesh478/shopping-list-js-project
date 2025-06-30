const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const itemsList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterInput = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });

  checkUI();
}

//function to add item to the list
function onAddItemSubmit(e) {
  e.preventDefault();

  let newItem = input.value;

  // validate input
  if (newItem === "") {
    alert("Please add some item");
    return;
  }

  // Adding the item to the DOM
  addItemToDOM(newItem);

  // Adding item to the storage
  addItemToStorage(newItem);

  checkUI();

  input.value = "";
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  const text = document.createTextNode(item);
  li.appendChild(text);

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // appending the list item to the unordered list
  itemsList.appendChild(li);
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

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Adding new item to the array
  itemsFromStorage.push(item);

  // converting the array into a JSON string and adding it to the storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

//Remove item from the list
function removeItem(e) {
  if (e.target.tagName === "I") {
    if (window.confirm("Are you sure?")) {
      const removedItem = e.target.parentElement.parentElement;
      removedItem.remove();
      checkUI();
    }
  }
}

// Clearing all the items in the list
function clearList() {
  //   itemsList.textContent = "";
  // Another way
  while (itemsList.firstElementChild) {
    itemsList.removeChild(itemsList.firstElementChild);
  }

  checkUI();
}

// filter functionality
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemsList.querySelectorAll("li");

  for (const item of items) {
    const itemName = item.textContent.toLowerCase();

    // one way of applying the condition
    // if (!itemName.includes(text)) {
    //   item.classList.add("hidden");
    // } else {
    //   item.classList.remove("hidden");
    // }

    // another way
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
}

// to reset the UI if no more items are present in the list
function checkUI() {
  const items = itemsList.querySelectorAll("li");
  if (items.length === 0) {
    filterInput.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterInput.style.display = "block";
    clearBtn.style.display = "block";
  }
}

// Initialize app
function init() {
  // Event Listeners
  form.addEventListener("submit", onAddItemSubmit);
  itemsList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearList);
  filterInput.addEventListener("keyup", filterItems);
  window.addEventListener("DOMContentLoaded", displayItems);

  // this function runs only once when the script loads
  checkUI();
}

init();
