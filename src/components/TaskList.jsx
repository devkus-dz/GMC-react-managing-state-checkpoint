import React from 'react'
import Task from './Task'

/**
 * Tasks list component
 * 
 * @param {object} props - the component props
 * @returns {JSX.Element} A JSX element representing the Tasks list to display all tasks
 */
export default function TaskList({data, onEdit, onDelete, toggleCompleted}) {
  

  return (
    <div className='box'>
      <h2 className="py-5 text-center text-2xl mb-6">Todo</h2>
      <ul className='list-group lg:!w-[80%] mx-auto'>
        {data.map((task) =>
          <Task 
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            onEdit={onEdit}
            onDelete={onDelete}
            toggleCompleted={toggleCompleted}
          />
        )}

      </ul>
    </div>
  )
}
