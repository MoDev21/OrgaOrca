import { useEffect, useState, useRef} from 'react';
import './Kamban.css';
import { TodoItem } from './TodoItem';
import { KambanColumn } from './KambanColumn';


const Kamban = () => {
    const scrollRef = useRef(null);
    const [hscrolling, setHscrolling] = useState(false);


    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0);
    const startHscrolling = () => setHscrolling(true);
    

    function stopHscrolling(interval) {
        console.log('stopHscrolling');
        setHscrolling(false);
        clearInterval(interval);
    }



    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("COLUMN")
        if (localValue == null) return [[], [], []]
        
        return JSON.parse(localValue)

    });

    console.log(todos);



    useEffect(() => {
        localStorage.setItem("COLUMN", JSON.stringify(todos))

        let interval;
        let scrollSpeed = 2;
        if (hscrolling && scrollRef.current) {
            interval = setInterval(() => {
                console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
                console.log(scrollRef.current.scrollLeft);
                if (scrollRef.current.scrollLeft < (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)){
                    
                    scrollRef.current.scrollLeft += scrollSpeed;
                    
                }
                else if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)) {
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

    const handleWheel = (e) => {
        e.preventDefault();
        scrollRef.current.scrollLeft -= (e.deltaY * 1);
        clearInterval(interval);
    };

    const onKambanHover = (e) => {
        e.preventDefault();
        document.body.style.overflowY = "hidden";
    }

    const onKambanHoverLeave = (e) => {
        e.preventDefault();
        e.currentTarget.style.border = "none";
        document.body.style.overflowY = "auto";
    }

    return (
        <div className="kamban-board" ref={scrollRef} onWheel={handleWheel} onMouseEnter={onKambanHover} onMouseLeave={onKambanHoverLeave}>
            {todos.map((boardTodos, boardIndex) => (
                <KambanColumn
                    key={boardIndex}
                    boardTodos={boardTodos}
                    boardIndex={boardIndex}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    removeColumn={removeColumn}
                    addColumn={addColumn}
                    toggleTodoList={toggleTodo}
                    deleteTodoList={deleteTodo}
                    draggable={true}
                    copyTodo={true}
                />
                // <div 
                //     className="kamban-column" 
                //     key={boardIndex}
                //     onDragOver={handleDragOver}
                //     onDragLeave={handleDragLeave}
                //     onDrop={e => handleDrop(boardIndex, e)}
                //     onAuxClick={consoleLog(boardTodos)}
                // >
                //     <div 
                //         className="column-header"
                //     >
                //         <button onClick={removeColumn} className='button-remove-column'>Remove Column</button>
                //         {isEditingColumnTitle && boardIndex === selectedColumnIndex ? inputEditColumnTitle : <h2 value={boardIndex} onClick={e => toggleEditColumnTitle(e, boardIndex)}>{ boardIndex === selectedColumnIndex ? columnTitle : 'null'}</h2>}
                        
                //     </div>
                //     <ul className='list'>
                //         {boardTodos.map(todo => (
                //             <TodoItem
                //                 {...todo}
                //                 key={todo.id}
                //                 startTime={todo.startTime}
                //                 stopTime={todo.stopTime}
                //                 toggleTodo={() => toggleTodo(boardIndex, todo.id, !todo.completed)}
                //                 deleteTodo={() => deleteTodo(boardIndex, todo.id)}
                //                 isVisible={true}
                //                 draggable={true}
                //                 copyTodo={false}
                //             />
                //         ))}
                //     </ul>
                    
                // </div>
            ))}
            <button onClick={addColumn} className='button-add-column'>Add Column</button>
        </div>
    );
};
        

export default Kamban;
