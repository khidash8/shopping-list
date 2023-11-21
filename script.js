//! Get all the elements
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

//! Events
itemForm.addEventListener("submit", addListItems);

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
