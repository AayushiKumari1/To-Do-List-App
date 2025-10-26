import { useState , useEffect } from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(todoString)
      settodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  
  
  const handleEdit = (e,id)=>{
    let t = todos.filter(i=> i.id===id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id)=>{
    // console.log(`The id is ${id}`)

    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleAdd = ()=>{
    settodos([...todos, {id:uuidv4(),todo, isCompleted:false}])
    settodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e)=>{
    settodo(e.target.value)
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name
    // console.log(`The id is ${id}`)
    let index = todos.findIndex(item=>{
      return item.id == id
    })
    // console.log(index)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage Your Todos at one Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className='text-xl font-bold' >Add a Todo</h1>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-full px-5 py-1'/>
            <button onClick={handleAdd} disabled={todo.length<=3}className='disabled:bg-violet-700 mx-2 bg-violet-800 hover:bg-violet-950 rounded-full px-3 py-1 text-sm text-white rounded-md'>Save</button>
          </div>
        </div>
        <input className='my-4' id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className="mx-2" htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-65 w-[90%] mx-auto my-2'></div>
        {/* <hr /> */}
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to dispaly</div>}
          {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" id="" />
                <div className={item.isCompleted? "line-through":""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className="edit bg-violet-800 hover:bg-violet-950 p-3 text-sm py-1 text-white rounded-md mx-2"><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className="delete bg-violet-800 hover:bg-violet-950 p-3 text-sm py-1 text-white rounded-md mx-2"><AiFillDelete /></button>
              </div>
            </div>
          })}
          </div>
      </div>
    </>
  )
}

export default App 
