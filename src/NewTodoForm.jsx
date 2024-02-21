import { useState } from "react"

export function NewTodoForm({onSubmit}) {
    
    const [newItem, setNewItem] = useState("Title")
    const [newStartTime, setNewSartTime] = useState("StartTime")
    const [newStopTime, setNewStopTime] = useState("StopTime")


    function handleSubmit(e) {

        e.preventDefault()
    
        
        // setTodos((currentTodos) => {
        //   return [
        //     ...currentTodos,
        //     { id: crypto.randomUUID(), title: newItem, 
        //     completed: false },
        //   ]
        // })
        if ((newItem === "") || (newStartTime === "") || (newStopTime === "")) return

        

        onSubmit(newItem, newStartTime, newStopTime)

        setNewItem("")

        console.log(newItem, newStartTime, newStopTime);
        
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="new-item-form"
            style={
                {
                    padding: '10px',
                    borderRadius: '8px'
                    
                }
            }>
            <div className="form-row">
                <label htmlFor="item">New Items</label>
                <input 
                    value={newItem} 
                    onChange={e => setNewItem(e.target.value)} 
                    type="text" 
                    id="item" 
                />
                <div className="duration">
                    <input 
                        value={newStartTime} 
                        onChange={e => setNewSartTime(e.target.value)} 
                        type="time" 
                        id="start-time" 
                    />
                    <input 
                        value={newStopTime} 
                        onChange={e => setNewStopTime(e.target.value)} 
                        type="time" 
                        id="stop-time" 
                    />
                </div>

                <button className="btn">Add</button>
            </div>
            
        </form>
    )
}