import { useEffect, useState, useRef} from 'react';
import './Kamban.css';
import { TodoItem } from './TodoItem';


const Kamban = () => {
    const scrollRef = useRef(null);
    const [hscrolling, setHscrolling] = useState(false);
    
    const startHscrolling = () => setHscrolling(true);
    

    function stopHscrolling() {
        console.log('stopHscrolling');
        setHscrolling(false);
    }

    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("COLUMN")
        if (localValue == null) return [[], [], []]
        
        return JSON.parse(localValue)

    });

    useEffect(() => {
        localStorage.setItem("COLUMN", JSON.stringify(todos))

        let interval;
        if (hscrolling && scrollRef.current) {
            interval = setInterval(() => {
                console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
                console.log(scrollRef.current.scrollLeft);
                if (scrollRef.current.scrollLeft < (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)){
                    scrollRef.current.scrollLeft += 1;
                }
                else if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)) {
                    setHscrolling(false);
                    console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
                    console.log(scrollRef.current.scrollLeft);
                    clearInterval(interval);
                }
                
            }, .01);
        } else {
            setHscrolling(false);
        }

    }, [todos])

    function addColumn() {
        setTodos([...todos, []]);
        startHscrolling();
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
        
        
        if (data.boardIndex !== boardIndex) {
           
            
            setTodos(currentTodos => {
                return currentTodos.map((boardTodos, index) => {
                    if(index === boardIndex){
                        console.log(`boardIndex: ${boardIndex} `);
                        return [...boardTodos, data];
                    }
                    else {
                        console.log(`boardIndex: ${boardIndex} `);
                        return boardTodos.filter(todo => todo.id !== data.id);
                    }
                    return boardTodos;
                });
            });

            console.log(data);
        }return;

        
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
        <div className="kamban-board" ref={scrollRef}>
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
                                startTime={todo.startTime}
                                stopTime={todo.stopTime}
                                toggleTodo={() => toggleTodo(boardIndex, todo.id, !todo.completed)} 
                                deleteTodo={() => deleteTodo(boardIndex, todo.id)}
                                isVisible={true}
                                draggable={true}
                                copyTodo={false}
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
