export function TodoItem({completed, id, title, time, toggleTodo, deleteTodo, isVisible, draggable, copyTodo}) {
    draggable = draggable === undefined ? true : draggable;

    const handleDragStart = (e) => {
        if(copyTodo){
            e.dataTransfer.effectAllowed = "copy";
            e.dataTransfer.setData("text/plain", JSON.stringify({id, title, time}));
        }
        else{
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", JSON.stringify({id, title, time}));
        }
        

    };

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        console.log(data);
    }

    return(
        <li 
            style={{borderRadius: "5px", display: isVisible ? "flex" : "none"}} 
            draggable={draggable} 
            onDragStart={handleDragStart} 
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {title}
            {time}
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
                className="btn btn-delete">
                    Delete
                </button>
            </div>
        </li>
    )
}