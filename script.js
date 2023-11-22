//! Get all the elements
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemFilter = document.querySelector(".filter");
const clearBtn = document.querySelector("#clear");

//! Events
itemForm.addEventListener("submit", addListItems);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAllItems);
itemFilter.addEventListener("input", filterItems);

//! Functions
function addListItems(e) {
  e.preventDefault();

  const newData = itemInput.value;

  //? create list element
  const li = document.createElement("li");
  li.append(document.createTextNode(newData));

  //? inside li, we need button element with fontawsom icon
  const button = createButton("remove-item btn-link text-red");

  //? append button to li
  li.appendChild(button);

  //? append li to parent list(ul)
  itemList.appendChild(li);

  //? clear input field after submitting
  itemInput.value = "";

  //? reset ui
  resetUI();
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

//? create delete funtionality
function removeItem(e) {
  const eventTargetParent = e.target.parentElement;

  if (eventTargetParent.classList.contains("remove-item")) {
    if (confirm("Are you sure want to DELETE?")) {
      eventTargetParent.parentElement.remove();

      //? reset ui
      resetUI();
    }
  }
}

//? Create Clear all functionalty
function clearAllItems(e) {
  // itemList.innerHTML = "";

  // while (itemList.firstElementChild) {
  //   itemList.removeChild(itemList.firstElementChild);
  // }

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //? reset ui
  resetUI();
}

//? Remove clear btn and filter UI if there is no list items
function resetUI() {
  //* check there is list items / items length > 0
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
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

//! Startup functions
resetUI();
