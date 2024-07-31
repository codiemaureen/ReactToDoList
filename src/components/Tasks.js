const tasks = [
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": true
    }
]
const Tasks = () => {
  return (
    <div>
      {tasks.map((task) => (
       <h3 key={task.id}>{task.text}</h3>
       ))}
    </div>
  )
}

export default Tasks
