// Global Variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


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
    // Verifies that item(s) are present
    checkState();
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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to delete the item?')) {
            e.target.parentElement.parentElement.remove();
        }
        checkState();
    }
}

function clearItems() {
    if(confirm('Are you sure you wish to remove all items?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }

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
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        itemFilter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)

checkState();