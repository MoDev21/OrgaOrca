import { useState } from 'react';
import './Kamban.css';
import { TodoItem } from './TodoItem';


const Kamban = () => {
    const [todos, setTodos] = useState([[], [], []]);

    function toggleTodoList(boardIndex, id, completed) {
        setTodos(prevTodos => {
            return prevTodos.map((boardTodos, index) => {
                if (index === boardIndex) {
                    return boardTodos.map(todo => {
                        if (todo.id === id) {
                            return { ...todo, completed };
                        }
                        return todo;
                    });
                }
                return boardTodos;
            });
        });
    }

    function deleteTodoList(boardIndex, id) {
        setTodos(prevTodos => {
            return prevTodos.map((boardTodos, index) => {
                if (index === boardIndex) {
                    return boardTodos.filter(todo => todo.id !== id);
                }
                return boardTodos;
            });
        });
    }

    function handleDrop(boardIndex, e) {
        e.preventDefault();
        e.currentTarget.style.border = "none";
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        setTodos(prevTodos => {
            return prevTodos.map((boardTodos, index) => {
                if (index === boardIndex) {
                    return [...boardTodos, data];
                }
                return boardTodos;
            });
        });
        console.log(data);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.style.border = "2px solid black";
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.style.border = "none";
    }

    return (
        <div className="kamban-board">
            {todos.map((boardTodos, boardIndex) => (
                <div
                    className="kamban-column"
                    key={boardIndex}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={e => handleDrop(boardIndex, e)}
                >
                    <h2>{boardIndex === 0 ? "To Do" : boardIndex === 1 ? "In Progress" : "Done"}</h2>
                    <ul className='list'>
                        {boardTodos.map(todo => (
                            <TodoItem
                                {...todo}
                                key={todo.id}
                                toggleTodo={() => toggleTodoList(boardIndex, todo.id, !todo.completed)}
                                deleteTodo={() => deleteTodoList(boardIndex, todo.id)}
                                isVisible={true}
                                draggable={true}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};


export default Kamban;