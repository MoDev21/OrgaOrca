import PropTypes from 'prop-types';
import React, { useState } from 'react';

export function TodoItem({completed, id, title, startTime, stopTime, toggleTodo, deleteTodo, isVisible, draggable, copyTodo, editTodo, editStartTime, editStopTime}) {
    draggable = draggable === undefined ? true : draggable;
    startTime = startTime === undefined ? "00:00" : startTime;
    stopTime = stopTime === undefined ? "00:00" : stopTime;

    const [newStartTime, setNewSartTime] = useState(startTime)
    const [newStopTime, setNewStopTime] = useState(stopTime)
    const [newTitle, setNewTitle] = useState(title)
    var [isEditingTitle, setIsEditingTitle] = useState(false);

    var [isEditingTime, setIsEditingTime] = useState(false);

    TodoItem.propTypes = {
        completed: PropTypes.bool,
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        stopTime: PropTypes.string.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        isVisible: PropTypes.bool.isRequired,
        draggable: PropTypes.bool,
        copyTodo: PropTypes.bool,
        editTodo: PropTypes.func.isRequired,
        
    };

    console.log('todoitem editTodo ' + typeof editTodo);
    const handleTitleChange = (e) => {
        const newTitleValue = e.target.value;
        setNewTitle(newTitleValue);
        console.log(`id: ${id}`);
        console.log(`title: ${title}`);
        console.log(`newTitleValue: ${newTitleValue}`);
        console.log(typeof editTodo);
        editTodo(id, newTitleValue);
    }

    
    const handleSaveTime = () => {
        setIsEditingTime(false);
        setNewSartTime(newStartTime);
        setNewStopTime(newStopTime);
        console.log(newStartTime);
        console.log(newStopTime);
    }

    const toggleEditTitle = () => {
        setIsEditingTitle(!isEditingTitle);
    }

    const handleSaveTitle = (e) => {
        setIsEditingTitle(false);
        
        console.log(newTitle);
    }



    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({id, title, startTime, stopTime}));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        
        console.log(data);
    }

    const handleStartTimeChange = (e) => {
        
        setNewSartTime(e.target.value);
        console.log(e.target.value);
    }

    const handleStopTimeChange = (e) => {
        setNewStopTime(e.target.value);
        console.log(e.target.value);
    }

    const toggleEditTime = () => {
        setIsEditingTime(!isEditingTime);
    }  



    const inputEditTime = (
        <div className="task-duration">
            <input 
                value={newStartTime} 
                onChange={handleStartTimeChange} 
                type="time" 
                id="start-time" 
            />
            <p>to</p>
            <input 
                value={newStopTime} 
                onChange={handleStopTimeChange} 
                type="time" 
                id="stop-time" 
            />
            <button onClick={handleSaveTime}>Save</button>
        </div>
    )

    const pEditTime = (
        <div className="task-duration">
            <p onClick={toggleEditTime}>{newStartTime}</p>
            <p>to</p>
            <p onClick={toggleEditTime}>{newStopTime}</p>
        </div>
    )

    const inputEditTitle = (
        <div className="task-duration">
            <input
                value={newTitle ? newTitle : title}
                onChange={handleTitleChange}
                type="text"
                id="title"
            />
            <button onClick={handleSaveTitle}>Save</button>
        </div>
    )

    const pEditTitle = (
        <p onClick={toggleEditTitle}>{newTitle ? newTitle : title}</p>
    )

    return(
        <li 
            style={{borderRadius: "5px", display: isVisible ? "flex" : "none"}} 
            draggable={draggable} 
            onDragStart={handleDragStart} 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <p>
                {isEditingTitle ? inputEditTitle : pEditTitle}
            </p>
            {isEditingTime ? inputEditTime : pEditTime}
            <div style={
                {
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: "5px",
                }
            }>   
                <label className="toggle" style={
                    {
                        backgroundColor: completed ? "#8bc34a" : "#7b9aa3",
                        borderRadius: "5px",
                    }
                }>
                    <input 
                        type="checkbox"
                        checked={completed}
                        onChange={e => toggleTodo(id, e.target.checked)}
                        style={
                            {
                                display: "none"
                            }
                        }
                    />
                    {completed ? "Done" : "Not done yet"}
                </label>
                <button 
                    onClick={() => deleteTodo(id)} 
                    className="btn btn-delete"
                >
                    Delete
                </button>
            </div>
        </li>
    )
}