import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TodoItem } from './TodoItem';

export function KambanColumn({boardTodos, boardIndex, handleDragOver, handleDragLeave, handleDrop, toggleTodo, deleteTodo,  draggable, copyTodo, removeColumn, isEditingColumnTitle, setIsEditingColumnTitle}) {
    draggable = draggable === undefined ? true : draggable;
    const [columnTitle, setColumnTitle] = useState(() => {
        const localValue = localStorage.getItem("COLUMN_TITLE")
        if (localValue == null) return "Column Title"
        console.log('1', JSON.parse(localValue));
        return JSON.parse(localValue)
    });
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0);
    const [newTitle, setNewTitle] = useState(columnTitle);
    var [isEditingTitle, setIsEditingTitle] = useState(false);
    var [isEditingTime, setIsEditingTime] = useState(false);
    

    
    KambanColumn.propTypes = {
        columnTitle: PropTypes.string.isRequired,
        boardTodos: PropTypes.array.isRequired,
        boardIndex: PropTypes.number.isRequired,
        handleDragOver: PropTypes.func.isRequired,
        handleDragLeave: PropTypes.func.isRequired,
        handleDrop: PropTypes.func.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        draggable: PropTypes.bool,
        copyTodo: PropTypes.bool,
        isEditingColumnTitle: PropTypes.bool.isRequired,
        setIsEditingColumnTitle: PropTypes.func.isRequired,
        setColumnTitle: PropTypes.func.isRequired,
        removeColumn: PropTypes.func.isRequired
        
    };

    const toggleEditColumnTitle = (e, index) => {
        setIsEditingColumnTitle(!isEditingColumnTitle);
        setSelectedColumnIndex(index);
        console.log(`isEditingColumnTitle: ${isEditingColumnTitle} and e ${setSelectedColumnIndex}`);
    }

    const handleColumnTitleChange = (e) => {
        setColumnTitle(e.target.value);
        console.log(`columnTitle: ${columnTitle}`);
    }

    const saveColumnTitle = () => {
        setIsEditingColumnTitle(!isEditingColumnTitle);
        console.log(`isEditingColumnTitle: ${isEditingColumnTitle}`);
    }

    const inputEditColumnTitle = (
        <div className="column-title">
            <input  
                value={columnTitle}
                onChange={handleColumnTitleChange}
                onBlur={saveColumnTitle}
            />
            <button onClick={saveColumnTitle}>Save</button>
        </div>
    ) 

    const consoleLog = (boardTodos, boardIndex) => {
        console.log(boardTodos, boardIndex);
    }
    



    return (
        <div 
            className="kamban-column" 
            key={boardIndex}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(boardIndex, e)}
            onAuxClick={consoleLog(boardTodos)}
            draggable={true}
        >
            <div 
                className="column-header"
            >
                <button onClick={removeColumn} className='button-remove-column'>Remove Column</button>
                {isEditingColumnTitle && boardIndex === selectedColumnIndex ? inputEditColumnTitle : <h2 value={boardIndex} onClick={e => toggleEditColumnTitle(e, boardIndex)}>{ columnTitle }</h2>}
                
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
    )
}
