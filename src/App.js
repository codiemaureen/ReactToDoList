import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  //load task from database on pageload
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTask()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  //fetch task
    const fetchTask = async() => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      return data;
    }
  //add task 
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json();

    setTasks([...tasks, data])
  }

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => 
      task.id !== id
    ))
  }
  
  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder} : task
    ))
  }


  return (
    <div className="container">
        <Header onAdd={() => {setShowAddTask(!showAddTask)}} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Task to Show')}
        <Footer />
    </div>
  );
}

export default App;
