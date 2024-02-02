// Global Variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkState();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
  
    // Validate Input
    if (newItem === '') {
      alert('Please add an item');
      return;
    }

    if(isEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode")
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }

    addItemToDOM(newItem);

    addItemToStorage(newItem);

    // Resets the add item input
    itemInput.value = "";

    // Verifies that item(s) are present
    checkState();
}

function addItemToDOM(item) {
    // Actually make list
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    // Make close button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    
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

function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // Adds new item into the array to be stringified
    itemsFromStorage.push(item);
    // Stringfy all the current objects including the one passed in to be placed in local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    // Gets current local storage items, if any
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    // Makes sure that only one item can be selected at a time
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    // Allows an item to be edited
    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent; 
}

function removeItem(item) {
    if (confirm('Are you sure you want to delete the item?')) {
        item.remove();

        removeItemFromStorage(item.textContent);

        checkState();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage()
    // Filters out item that will be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    // Replaces local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}

function clearItems() {
    if(confirm('Are you sure you wish to remove all items?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
    
    //Clear local storage 
    localStorage.clear();

    checkState();
}

function filterItems (e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        console.log(itemName);
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkState() {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        itemFilter.style.display = 'block';
        clearBtn.style.display = 'block';
    }

    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)

checkState();