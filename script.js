//! Get all the elements
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemFilter = document.querySelector(".filter");
const clearBtn = document.querySelector("#clear");
const formBtn = itemForm.querySelector(".btn");

//! Events
itemForm.addEventListener("submit", addListItems);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", updateItems);
clearBtn.addEventListener("click", clearAllItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", onDOMLoaded);

let editMode = false;

//? Functions
//! 1: Add to list
//? add items to the list and store in local storage
function addListItems(e) {
  e.preventDefault();

  const newData = itemInput.value;

  if (newData === "") {
    alert("Cannot be Blank!!");
    return;
  }

  /*  check if we're in edit mode
  if so... delete the selected item
  delete its class
  remove it from local storage 
  */
  if (editMode) {
    const selectedItemToEdit = document.querySelector(".item-edit");

    removeItemsFromStorage(selectedItemToEdit.textContent);
    selectedItemToEdit.classList.remove("item-edit");
    selectedItemToEdit.remove();

    itemInput.value = "";
  } else {
    if (checkDuplicateItems(newData)) {
      alert("Item already exists");
      return;
    }
  }

  //* 1: create list and DOM Elements
  createDOMElements(newData);

  //* 2: submit to local storage
  submitToLocalStorage(newData);

  //? clear input field after submitting
  itemInput.value = "";

  //? reset ui
  resetUI();
}

//? create list and DOM Elements
function createDOMElements(data) {
  //? create list element
  const li = document.createElement("li");
  li.append(document.createTextNode(data));

  //? inside li, we need button element with fontawsom icon
  const button = createButton("remove-item btn-link text-red");

  //? append button to li
  li.appendChild(button);

  //? append li to parent list(ul)
  itemList.appendChild(li);
}

//? Create Button and icons
function createButton(classes) {
  //* button
  const button = document.createElement("button");
  button.className = classes;

  //* icon
  const icon = createIcon("fa-solid fa-xmark");

  //* append icon to button
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

//! 2: Remove from list and storage
//? Remove from DOM
function removeItem(e) {
  const eventTargetParent = e.target.parentElement;

  if (eventTargetParent.classList.contains("remove-item")) {
    if (confirm("Are you sure want to DELETE?")) {
      eventTargetParent.parentElement.remove();

      //? Remove from storage
      const itemText = eventTargetParent.parentElement.textContent;
      removeItemsFromStorage(itemText);

      //? reset ui
      resetUI();
    }
  }
}

//? Remove from storage
function removeItemsFromStorage(item) {
  let itemsFromStorage = getFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i != item);

  //? update local storage
  localStorage.setItem("item", JSON.stringify(itemsFromStorage));
}

//? Create Clear all functionalty
function clearAllItems(e) {
  // itemList.innerHTML = "";

  // while (itemList.firstElementChild) {
  //   itemList.removeChild(itemList.firstElementChild);
  // }

  //? remove items from DOM
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //? remove items from storage
  clearAllFromStorage();

  //? reset ui
  resetUI();
}

//? clear all items from Storage
function clearAllFromStorage() {
  localStorage.removeItem("item");
}

//! 3: Filter and update UI
//? Remove clear btn and filter UI if there is no list items
function resetUI() {
  //* reset everything
  itemInput.value = "";
  editMode = false;

  //* check there is list items / items length > 0
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  //? change the form button
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

//? Filter items
function filterItems(e) {
  const text = e.target.value.toLocaleLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    //* Method 1: includes
    // if (itemName.includes(text)) {
    //   item.style.display = "flex";
    // } else {
    //   item.style.display = "none";
    // }

    //* Methode 2: match
    // if (itemName.match(text)) {
    //   item.style.display = "flex";
    // } else {
    //   item.style.display = "none";
    // }

    //* Methode 3: indexOf
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//! 4: Storage
//? submit to local storage
function submitToLocalStorage(data) {
  const itemsFromStorage = getFromStorage();

  //* push new item to the array
  itemsFromStorage.push(data);

  //* push everything to local storage
  localStorage.setItem("item", JSON.stringify(itemsFromStorage));
}

//? Get from local Storage
function getFromStorage() {
  let itemsFromStorage;

  //* check if there is already sorage named 'item'
  if (localStorage.getItem("item") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("item"));
  }

  return itemsFromStorage;
}

//! 5: update list items
function updateItems(e) {
  //? set edit mode to true (indicating we're in edit mode)
  editMode = true;

  //? remove editable class from all of the li items
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("item-edit"));

  //? check if the item is not delete button
  const eventTargetParent = e.target.parentElement;

  if (!eventTargetParent.classList.contains("remove-item")) {
    e.target.classList.add("item-edit");

    //? change the form button
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = "green";

    //? change the input value
    itemInput.value = e.target.textContent;
  }
}

//! 6: check duplication of items
function checkDuplicateItems(item) {
  const itemsFromStorage = getFromStorage();

  return itemsFromStorage.includes(item);
}

//! Startup functions
resetUI();

function onDOMLoaded(e) {
  const itemsFromStorage = getFromStorage();
  itemsFromStorage.forEach((item) => createDOMElements(item));
  resetUI();
}
