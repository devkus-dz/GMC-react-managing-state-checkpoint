import TaskForm from './TaskForm'
/**
 * Filter component to control task filtering and form display.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.displayForm - Toggles the visibility of the task form.
 * @param {boolean} props.openForm - Indicates whether the task form is currently open.
 * @param {Object|null} props.taskEdit - Task object to edit if in edit mode, or null.
 * @param {string} props.nameFilter - Current name filter value.
 * @param {string} props.priorityFilter - Current priority filter value.
 * @param {string|boolean} props.completedFilter - Current completion status filter.
 * @param {Function} props.setNameFilter - Setter for name filter.
 * @param {Function} props.setPriorityFilter - Setter for priority filter.
 * @param {Function} props.setCompletedFilter - Setter for completion status filter.
 * @param {Function} props.addTask - Function to add or update a task.
 * 
 * @returns {JSX.Element} Filter and form interface.
 */

export default function Filter({ displayForm , openForm, taskEdit, nameFilter, priorityFilter, completedFilter, setNameFilter, setPriorityFilter, setCompletedFilter, addTask }) {
  /**
   * Resets all filters to their default empty state.
   */
  const resetFilters = () => {
    setCompletedFilter('');
    setNameFilter('');
    setPriorityFilter('');
  }

  return (
    <>
      <div className='box flex flex-col md:flex-row gap-6 justify-between'>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            className='lg:w-96 md:w-46'
            placeholder="Filter by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)} 
          />
            
          <select 
            name="priority" 
            id="priority" 
            className='md:w-46 lg:w-64' 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="" selected>Choose priority </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select 
            name="completed" 
            id="completed" 
            className='md:w-46 lg:w-64'
            value={completedFilter} 
            onChange={(e) => {(e.target.value === "") ? setCompletedFilter("") : setCompletedFilter(e.target.value === "true")}}
          >
            <option value="" selected>Choose completed status</option>
            <option value={false}>On Going</option>
            <option value={true}>Completed</option>
          </select>

        </div>
        <div>
          {/* Button to reset filters */}
          <button className="btn-outline m-2" onClick={resetFilters}>Reset Filters</button>
          {/* Button to open the New Task form */}
          <button className="btn" onClick={displayForm}>{openForm ? "Hide Form" : "New Task"}</button>
         
        </div>
      </div>
      
      <TaskForm open={openForm} addTask={addTask} taskEdit={taskEdit} />
    
    </>
  )
}
