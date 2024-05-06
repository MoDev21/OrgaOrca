import {TodoItem} from './TodoItem'
import PropTypes from 'prop-types';


/**
 * Renders a list of todos.
 *
 * @param {Object[]} todos - The array of todos.
 * @param {function} toggleTodo - The function to toggle a todo's completion status.
 * @param {function} deleteTodo - The function to delete a todo.
 * @param {boolean} isVisible - The visibility status of the todo list.
 * @returns {JSX.Element} The rendered todo list.
 */
export function Todolist({ todos, toggleTodo, deleteTodo, isVisible, copyTodo, editTodo }) {
  Todolist.propTypes = {
    completed: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    copyTodo: PropTypes.bool,
    editTodo: PropTypes.func.isRequired
      
  };

  console.log('todolist editTodo ' + typeof editTodo);
  return( 
    <ul className="list">
      {/*  */}
      {todos.length === 0 && "no Todos"}
      {todos.map(todo => {
        return (
          <TodoItem 
            {...todo} 
            key={todo.id} 
            startTime={todo.startTime}
            stopTime={todo.stopTime}
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}
            isVisible={todo.isVisible !== undefined ? todo.isVisible : true}
            draggable={true}
            copyTodo={true}
            editTodo={editTodo}
          />             
        )
      })}
    </ul>
  )
}