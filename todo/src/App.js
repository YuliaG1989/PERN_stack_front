
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const[list, setList] = useState([])
  const [ description, setDescription] = useState("")


  ///GET 

  const getList = () =>{
    axios.get("http://localhost:5000/todos").then((response)=>{
      console.log(response.data)
      setList(response.data)
    })
  }

  useEffect(() => {
    getList();
  }, []);

  const createList = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:5000/todos/", 
    {
      description: description
    }).then(
      (response) => {
          setList(
              {description:response.data}
          )
      }
  )
  }

  const deleteTodo = (event) => {
    event.preventDefault();
    axios.delete("http://localhost:5000/todos/" + event.target.value).then(
        (response) => {
            setList({
                description:response.data
            })
        }
    )

}

const updateList = (event) => {
  event.preventDefault();
  axios.put(
    "http://localhost:5000/todos/" + event.target.id,
      {
          description : description
      }
  ).then(
      (response) => {
          setDescription({
              description:response.data,
          
              
          })
      }
  )
}




  return (
 <>
 <h1>To Do</h1>
 <h1 >Pern Todo List</h1>
      <form  onSubmit={createList}>
        <input type="text" onChange={e => setDescription(e.target.value)}
        />
        <input type ="submit" value="add"/>
      </form>
      <ol>
      {list.map(one=>{
        return(
          
          <div key={one.todo_id}>
            
        <li >{one.description}</li>
        <button onClick={deleteTodo} value={one.todo_id}>Delete</button>
        <form id={one.todo_id} onSubmit={updateList}>
        <input type="text" onChange={e => setDescription(e.target.value)}
        />
        <input type ="submit" value="add"/>
      </form>
        </div>
        
        )
      })}
      </ol>
 </>
  );
}

export default App;
