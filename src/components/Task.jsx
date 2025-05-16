import React from 'react'
/**
 * Task component 
 * 
 * @param {object} props - the component props
 * @returns {JSX.Element} A JSX element representing the Task data and actions
 */
export default function Task({id ,name, description, priority, completed, onEdit, onDelete, toggleCompleted}) {

  return (
    <li className={`list-item ${completed ? 'bg-fuchsia-50' : undefined}`}>

      <div className="flex flex-col gap-1">
        <h3 className='text-lg text-fuchsia-600'>{name} <span className='ml-4 px-2 text-white bg-slate-500 rounded-full !text-sm'>{priority}</span></h3>
        <p>{description}</p>
        
      </div>

      <div className='flex gap-3 items-center'>
        <a href="#form-box" className="btn-outline" onClick={() => onEdit({ id, name, description, priority, completed })}>Edit</a>
        <button className="btn" onClick={() => onDelete(id)}>Delete</button>
        <div className='flex flex-col items-center'>
          <label htmlFor="completed">Completed</label>
          <input 
            type="checkbox" 
            name="completed" 
            id="completed" 
            className='!h-4 !w-4' 
            checked={completed} 
            onChange={(e) => toggleCompleted(id, e.target.checked)}
          />
        </div>
 
      </div>

    </li>
  )
}
