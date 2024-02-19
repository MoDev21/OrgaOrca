import { useEffect, useState } from 'react';
import './Kamban.css';
import { TodoItem } from './TodoItem';


const Kamban = () => {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("COLUMN")
        if (localValue == null) return [[], [], []]
        
        return JSON.parse(localValue)

    });

    useEffect(() => {
        localStorage.setItem("COLUMN", JSON.stringify(todos))
    }, [todos])

    function addColumn() {
        setTodos([...todos, []]);
    }

    function removeColumn() {
        setTodos(todos.slice(0, todos.length - 1));
    }

    function toggleTodo(boardIndex, id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map((boardTodos, index) => {
                if(index === boardIndex){
                    return boardTodos.map(todo => {
                        if(todo.id === id){
                            return { ...todo, completed }
                        }
                        return todo;
                    });
                }
                return boardTodos;
            })
        })
    }
    
    function deleteTodo(boardIndex, id) {
        setTodos(currentTodos => {
            return currentTodos.map((boardTodos, index) => {
                if(index === boardIndex){
                    return boardTodos.filter(todo => todo.id !== id)
                }
                return boardTodos;
            });
        });
    }

    function handleDrop(boardIndex, e) {
        e.preventDefault();
        e.currentTarget.style.border = "none";
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        setTodos(currentTodos => {
            return currentTodos.map((boardTodos, index) => {
                if(index === boardIndex){
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
                    <div className="column-header">
                        <button onClick={removeColumn} className='button-remove-column'>Remove Column</button>
                        <h2>{boardIndex === 0 ? "To Do" : boardIndex === 1 ? "In Progress" : "Done"}</h2>
                    </div>
                    <ul className='list'>
                        {boardTodos.map(todo => (
                            <TodoItem 
                                {...todo} 
                                key={todo.id} 
                                toggleTodo={() => toggleTodo(boardIndex, todo.id, !todo.completed)} 
                                deleteTodo={() => deleteTodo(boardIndex, todo.id)}
                                isVisible={true}
                                draggable={true}
                            />
                        ))}
                    </ul>
                    
                </div>
            ))}
            <button onClick={addColumn} className='button-add-column'>Add Column</button>
        </div>
    );
};
        

export default Kamban;
