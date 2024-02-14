import { useState } from "react"

export function NewTodoForm({onSubmit}) {
    
    const [newItem, setNewItem] = useState("Title")


    function handleSubmit(e) {

        e.preventDefault()
    
        
        // setTodos((currentTodos) => {
        //   return [
        //     ...currentTodos,
        //     { id: crypto.randomUUID(), title: newItem, 
        //     completed: false },
        //   ]
        // })
        if (newItem === "") return

        

        onSubmit(newItem)

        setNewItem("")
        
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="new-item-form"
            style={
                {
                    backgroundColor: 'aliceblue',
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
                <input 
                    value={newItem} 
                    onChange={e => setNewItem(e.target.value)} 
                    type="time" 
                    id="item" 
                />
                <button className="btn">Add</button>
            </div>
            
        </form>
    )
}