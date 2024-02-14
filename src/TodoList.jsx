import {TodoItem} from './TodoItem'



/**
 * Renders a list of todos.
 *
 * @param {Object[]} todos - The array of todos.
 * @param {function} toggleTodo - The function to toggle a todo's completion status.
 * @param {function} deleteTodo - The function to delete a todo.
 * @param {boolean} isVisible - The visibility status of the todo list.
 * @returns {JSX.Element} The rendered todo list.
 */
export function Todolist({ todos, toggleTodo, deleteTodo, isVisible }) {
  console.log('Todolist ' + isVisible)
  return( 
    <ul className="list">
      {/*  */}
      {todos.length === 0 && "no Todos"}
      {todos.map(todo => {
        return (
          <TodoItem 
            {...todo} 
            key={todo.id} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}
            isVisible={todo.isVisible !== undefined ? todo.isVisible : true}
            draggable={true}
          />             
        )
      })}
    </ul>
  )
}