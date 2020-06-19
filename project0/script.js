const classNames = {
  TODO_ITEM: "TODO",
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let n = 0

function copy (obj) {
  let result
  if (obj instanceof Array) {
    result = [ ...obj ]
  } else if (typeof obj === 'object') {
    result = {...obj}
  } else {
    return obj
  }
  for (let prop of Reflect.ownKeys (result)) {
    result[ prop ] = copy (result[ prop ]);
  }
  return result
}

function newTodo() {
    li = document.createElement("li")
    let value = copy(classNames)
    n += 1
    value.TODO_ITEM = "TODO Number "+ n
    let t = document.createTextNode(value.TODO_ITEM)
    li.appendChild(t)
    list.appendChild(li)
    itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) + 1
}
