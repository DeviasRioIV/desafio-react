// Get DOM elements
const list               = document.getElementById('todo-list')
const itemCountSpan      = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const button             = document.getElementById('new-todo-button')

// Declare items counts
let itemCount        = 0;
let itemUncheckCount = 0;

/*
	Click event callback for NEW TODOs button

	Adds a new list element and increases the item count
*/
button.addEventListener( 'click', (e) => {

	// Increase item count
	itemCount++
	itemCountSpan.innerHTML = itemCount

	// Create list element
	let liElement = document.createElement("li")

	// Add text to list element
	let liContent = document.createTextNode("Do " + itemCount)
	liElement.appendChild(liContent)
	list.appendChild(liElement)

	// Add button to list element
	let button = document.createElement("button")
	button.innerHTML = 'X'
	button.addEventListener( 'click', uncheckTodo)
	liElement.appendChild(button)

});

/*
	"Click" event callback for remove TODOs button

	Toggles items "checked" class and updates the item unchecked count
*/
function uncheckTodo() {

	// Item container is the one getting the "checked" class
	let container = this.parentNode

	if ( container.classList.contains('checked') ) {
		container.classList.remove( 'checked' );
		itemUncheckCount--;
	} else {
		container.classList.add('checked');
		itemUncheckCount++;
	}

	// Update checked count view
	uncheckedCountSpan.innerHTML = itemUncheckCount
}