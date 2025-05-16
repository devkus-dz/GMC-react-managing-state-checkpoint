import { useState, useEffect, useRef } from 'react';
import './App.css'
import Filter from './components/Filter';
import TaskList from './components/TaskList';
import data from './data';

function App() {

  const [tasks, setTasks]                     = useState([]);
  const [nameFilter, setNameFilter]           = useState('');
  const [priorityFilter, setPriorityFilter]   = useState('');
  const [completedFilter, setCompletedFilter] = useState('');
  const [idTask, setIdTask]                   = useState(11);
  const [taskEdit, setTaskEdit]               = useState(null);
  const [openForm, setOpenForm]               = useState(false); // Local state to control if the TaskForm is open or closed

   /**
   * Load tasks from localStorage or use default data on first mount
   * in this useEffect() i have to deactivate the strictMode in then Main.jsx to persist the data to the local storage after reloading the page
   */ 
  /* 
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));

      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
      } else {
        localStorage.setItem('tasks', JSON.stringify(data));
        setTasks(data);
      }

    }, []);

  */

  /** 
 * This flag prevents the initialization effect from running twice 
 * due to React.StrictMode in development, which mounts components twice to detect side effects.
 * Without this, localStorage may be overwritten or cleared unintentionally.
 */
  const hasInitialized = useRef(false);

  /**
 * Avoid running the initialization logic multiple times in development due to React.StrictMode,
 * which mounts and unmounts components twice. We only want this logic to run once.
 */
  useEffect(() => {
    if (hasInitialized.current) return;
  
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    } else {
      setTasks(data);
      localStorage.setItem('tasks', JSON.stringify(data));
    }
  
    hasInitialized.current = true;
  }, []);

  /**
 * Save tasks to localStorage whenever they change
 */
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle function to open|close the Task Form
  const displayForm = () => {
    setTaskEdit(null);     // Reset to exit edit mode 
    setOpenForm(!openForm); 
  };


  // add a new task or update existing task
  const addTask = (task) => {
    // If we have a task to edit map to find the id and update this task
    if (taskEdit) {
      setTasks(prev =>
        prev.map( (t) => t.id === taskEdit.id ? { ...taskEdit, ...task } : t )
      );
      setTaskEdit(null); // Clear edit mode
    // creating a new task if we dont have a task to edit 
    } else {
      const newTask = {
        id: idTask,
        ...task
      }
  
      setTasks([...tasks, newTask]); // updating the tasks data
      setIdTask(idTask + 1); // incrementing the id for the next new task
    }

  };

  // Update the completed value of a task when the user check the checkbox in the Task Component
  const toggleCompleted = (id, completed) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  // Delete a task after confirmation
  const deleteTask = (id) => {
    // for simplicity i will use the built-in browser function window.confirm()
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    // after confirmation delete the task 
    if(confirmDelete) setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Handle the edit action when we click edit button in the Task component
  const handleEdit = (task) => {
    setTaskEdit(task);        // Pass task data to edit 
    setOpenForm(true);        // Open form 
  };

  // Apply filters
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (priorityFilter === '' || task.priority === priorityFilter) &&
    (completedFilter === '' || task.completed === completedFilter)
  );

  return (
    <>
        <Filter 
          displayForm={displayForm}
          openForm={openForm}
          taskEdit={taskEdit}

          nameFilter={nameFilter}
          priorityFilter={priorityFilter}
          completedFilter={completedFilter}
          setNameFilter={setNameFilter} 
          setPriorityFilter={setPriorityFilter} 
          setCompletedFilter={setCompletedFilter} 

          addTask={addTask}
        />
        <TaskList 
          data={filteredTasks} 
          onEdit={handleEdit} 
          onDelete={deleteTask}
          toggleCompleted={toggleCompleted}
        />

    </>
  )
}

export default App