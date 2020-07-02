const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const todoItem = document.getElementById('todo-item')

function newTodo() {
  // get value
  const value = todoItem.value.trim()
  // if no value then alert and exit
  if (value === '') {
    alert('nothing to add')
    return
  }
  // create todo
  create_todo(value)
  // update items' count
  itemCountSpan.innerHTML = list.children.length
  // clear input
  todoItem.value = ''
  todoItem.focus()
}

function checkEnter(event) {
  if (event.keyCode == 13) {
    newTodo()
  }
}

function create_todo(str) {
  let li = document.createElement('li')
  li.class
  let chkbox = document.createElement('input')
  let label = document.createElement('label')
  chkbox.type = 'checkbox'
  chkbox.id = 'todo-' + list.children.length
  chkbox.classList.add(classNames['TODO_CHECKBOX'])
  label.htmlFor = chkbox.id
  label.appendChild(document.createTextNode(str))

  li.appendChild(chkbox)
  li.appendChild(label)
  list.appendChild(li)
}