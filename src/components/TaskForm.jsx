import React from 'react'
import { useState, useEffect } from 'react';

/**
 * TaskForm component for creating or editing a task.
 *
 * This form is conditionally rendered only when `open` is `true`.
 * It handles form state, validation, and submission, and supports edit mode via `taskEdit`.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Determines whether the form should be visible.
 * @param {Function} props.addTask - Callback to pass form data to parent (for adding or updating a task).
 * @param {Object|null} props.taskEdit - Task object to edit, or null if creating a new task.
 *
 * @returns {JSX.Element|null} Task form JSX when open, otherwise null.
 */
export default function TaskForm({open, addTask, taskEdit}) {

  const [formData, setFormData] = useState({
      name        : '',
      description : '',
      priority    : 'Low',
  });
  
  const [errors, setErrors] = useState({});

  /**
   * useEffect to populate the form when editing a task.
   * Resets form to default if no task is being edited.
   */
  useEffect(() => {
    if (taskEdit) {
      setFormData(taskEdit);
    } else {
      resetForm();
    }
  }, [taskEdit]);

  /**
   * Handles form submission, validates input, calls `addTask` if valid.
   *
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {}; // store errors as an object
    
    // Defining fields condition to display errors
    if (!formData.name.trim()) newErrors.name = 'Task name is required';
    if (formData.name.length > 0 && formData.name.length < 10) newErrors.name = 'Task name must have at least 10 caracters';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length > 0 && formData.description.length < 20) newErrors.description = 'Task description must have at least 20 caracters';
    // Updating Errors state to display errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // empty the erros object to store new errors 
    setErrors({});

    //pass data to parent
    if (addTask) addTask(formData);

    //Reset form fields
    resetForm();
  }

  //Reset form fields
  const resetForm = () => {
    setFormData({
      name        : '',
      description : '',
      priority    : 'Low',
      completed: false,
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  return (
    // Render the form only if the props open is true
    open && (
        <div className='box' id='form-box'>
        <h2 className="py-5 text-center text-2xl">{taskEdit ? "Update Task" : "Create New Task"}</h2>

        <form className='flex flex-col gap-2 lg:!w-[80%] mx-auto' onSubmit={handleSubmit}>
            

            <label htmlFor="name" className="font-semibold" required >Task Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              value={formData.name}
              onChange={handleChange} 
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

            <label htmlFor="description" className="font-semibold">Description</label>  
            <textarea 
                name="description" 
                id="description" 
                rows="6"
                value={formData.description}
                onChange={handleChange} 
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

            <select name="priority" id="priority" className='md:w-96' onChange={handleChange} value={formData.priority}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            

            <button type="submit" className='btn mt-6 md:w-32'>{taskEdit ? "Update Task" : "Create Task"}</button>

        </form>

        </div>
    )
  )
}

