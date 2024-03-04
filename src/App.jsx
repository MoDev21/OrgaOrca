import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { Todolist } from "./TodoList"
import OrcaCalendar from "./Calendar";
import Kamban from "./Kamban";

export default function App() {

  let isVisible = true; 
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])


  function addTodo(title, startTime, stopTime) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, startTime, stopTime, 
          isVisible: true,
        completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return { ...todo, completed}
        }
        
        return todo
      })
    })
  }


  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return ( 
    <>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        borderRadius: "5px",

      
      }}>
        <div className="sidebar">
          <h1 className="header"
          style={{
            position: "relative",
            textAlign: "center",
            
          }}>
            Orga Orca
          </h1>
          <NewTodoForm onSubmit={addTodo}/>
          <div className="filter_container">
            <button className="btn" onClick={e => {
              e.preventDefault()
              setTodos(currentTodos => {
                return currentTodos.map(element => {
                  console.log('currentTodos ' + element.isVisible);
                  element.isVisible = true;
                  return element;
                });
              });
            }}>All</button>
            <button className="btn" onClick={e => {
              e.preventDefault()
              setTodos(currentTodos => {
                return currentTodos.map(element => {
                  console.log('currentTodos ' + element.isVisible);
                  if (element.completed === false) {
                    element.isVisible = false;
                  }
                  else {
                    element.isVisible = true;
                  }
                  return element;
                });
              });
            }}>Active</button>
            <button className="btn" onClick={e => {
              e.preventDefault()
              setTodos(currentTodos => {
                return currentTodos.map(element => {
                  console.log('currentTodos ' + element.isVisible);
                  if (element.completed === true) {
                    element.isVisible = false;
                  }
                  else {
                    element.isVisible = true;
                  }
                  return element;
                });
              });
            }}>Completed</button>
          </div>
          {console.log('App ' + isVisible)}
          {<Todolist todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} isVisible={isVisible}/>}
        </div>
        <div className="mainContent"
        style={{width: "100%",
                height: "100vh"}}>
          {<Kamban />}

        </div>
      </div>

      
    </>

  )
}