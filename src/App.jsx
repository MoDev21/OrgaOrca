import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { Todolist } from "./TodoList"
import OrcaCalendar from "./Calendar";
import Kamban from "./Kamban";
import Calendar from "react-calendar";

export default function App() {

  let isVisible = true; 
  const [mode, setMode] = useState("kamban");
  const [modeArray, setModeArray] = useState(["kamban", "calendar"]);

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
        { id: crypto.randomUUID(), 
          title, 
          startTime, 
          stopTime, 
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

  const editTodo = (id, newTitle) => {
    console.log(`newTitle: ${newTitle}`);
    console.log(`todos: ${todos.title}`);  // Log the new title to the console (newTitle);
    console.log(`id: ${id}`);
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        console.log(`todos: ${todo.id}`);
        if(todo.id === id){
          console.log(`todos: ${todo.title}`);
          return { ...todo, title: newTitle}
          
        }
        
        return todo
      })
    })
    // Log the updated todos array to the console (`todos);
  }

  console.log(editTodo);

  function editStartTime(id, newStartTime) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return { ...todo, startTime: newStartTime}
        }
        
        return todo
      })
    })
  }

  function editStopTime(id, newStopTime) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return { ...todo, stopTime: newStopTime}
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
      <div className="app">
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
          {<Todolist todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} isVisible={isVisible} editTodo={editTodo}/>}
        </div>
        <div className="mainContent"
        style={{width: "100%",
                height: "100vh"}}>
          {<Kamban editTodo={editTodo}/>}

        </div>
      </div>

      
    </>

  )
}