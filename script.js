// Global Variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
  
    // Validate Input
    if (newItem === '') {
      alert('Please add an item');
      return;
    }
  
    // Actually make list
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    // Make close button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = "";
}

function createButton(classes) {
    const el = document.createElement('button');
    el.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    el.appendChild(icon);
    return el;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Event Listeners
itemForm.addEventListener('submit', addItem);