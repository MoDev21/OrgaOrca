import { useState } from 'react';
import './Kamban.css';
import { TodoItem } from './TodoItem';
const Kamban = () => {

    const [todos0, setTodos0] = useState([]);
    const [todos1, setTodos1] = useState([]);

    function toggleTodo(id, completed) {
        setTodos0(currentTodos => {
            return currentTodos.map(todo => {
                if(todo.id === id){
                    return { ...todo, completed}
                }
            
                return todo
            })
        })
    }
    
    
    function deleteTodo(id) {
        setTodos0(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }
    
    return (
        <div className="kamban-board">
            <div 
                className="kamban-column" 
                onDragOver={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.border = "2px solid black"
                }}
                onDragLeave={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.border = "none"
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.border = "none"
                    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                    setTodos0(prevTodos => [...prevTodos, data]);
                    console.log(data);
                }}
            >
                <h2>To Do</h2>
                <ul className='list'>

                    {todos0.map(todo => {
                        return (
                            <TodoItem 
                                {...todo} 
                                key={todo.id} 
                                toggleTodo={toggleTodo} 
                                deleteTodo={deleteTodo}
                                isVisible={true}
                                draggable={true}
                            />
                        )
                    })}
                </ul>
                {/* Render tasks in the "To Do" column */}
            
            </div>

            {/* In Progress */}
            <div 
                className="kamban-column"
                onDragOver={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.border = "2px solid black"
                }}
                onDragLeave={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.border = "none"
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.border = "none"
                    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                    setTodos1(prevTodos => [...prevTodos, data]);
                    console.log(data);
                }}
            >
                <h2>In Progress</h2>
                <ul className='list'>

                    {todos1.map(doing => {
                        return (
                            <TodoItem 
                                {...doing} 
                                key={doing.id} 
                                toggleTodo={toggleTodo} 
                                deleteTodo={deleteTodo}
                                isVisible={true}
                                draggable={true}
                            />
                        )
                    })}
                </ul>
                {/* Render tasks in the "In Progress" column */}
            </div>


            {/* Done */}
            <div className="kamban-column">
                <h2>Done</h2>
                {/* Render tasks in the "Done" column */}
            </div>
        </div>
    );
};
        

export default Kamban;
