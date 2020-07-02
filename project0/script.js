/*El objetivo de este proyecto es practicar en el uso del lenguaje JavaScript y sus
paradigmas, creando una aplicación “TODO”. Esta aplicación debería poder
agregar “TODOS” y rastrear el número total de “TODO”, así como también la
cantidad de “TODO” sin marcar.*/

const todo = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',

}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const checkTodo = document.getElementById('cbox')
const del = document.getElementById('cbox2')

const contenedorTodos = []

let contador =0
let contadorUnchecked =0





function newTodo() {

 let todoInsertar = {

  TODO_ITEM: contador,
  TODO_CHECKBOX: checkTodo.checked,
  TODO_TEXT: 'TODO NUMERO '+contador,
  TODO_DELETE: false,

 }


 itemCountSpan.innerHTML= contador+1
 
 if (checkTodo.checked) {
 	uncheckedCountSpan.innerHTML= contadorUnchecked+1
 	contadorUnchecked++
 }
 		 	

  contenedorTodos.push(todoInsertar),
  contador++ 

  console.log (contenedorTodos) 


}



function deleteTodo() {

 if (del.checked){

 	if (contenedorTodos[contador-1].TODO_CHECKBOX) {
 	uncheckedCountSpan.innerHTML= contadorUnchecked-1
 	contadorUnchecked--
 	}

 	itemCountSpan.innerHTML= contador-1
 	contenedorTodos.pop(),
 	contador-- 

 } else {

 	alert('Debe estar seleccionada a opcion Delete Todo para poder eliminar el Objeto')
 }

  

  console.log (contenedorTodos) 


}

