import React from 'react'
import { Todo, useTodos } from '../store/Todos';
import { useSearchParams } from 'react-router-dom';

const Todos = () => {
    const {todos, toggleTodoAsCompleted, removeTodoById} =useTodos();

    const [searchParams] = useSearchParams();
    let todosFilter = searchParams.get("todos");
    
    let filterData = todos;

    if(todosFilter === "active"){
        filterData = filterData.filter((task) => !task.completed);
    }
    if(todosFilter === "completed"){
        filterData = filterData.filter((task) => task.completed);
    }

  return (
    <ul className='main-task'>
        {
            filterData.map((todo: Todo) => {
                return <li key={todo.id}>
                            <input id={`todo-${todo.id}`} type="checkbox" 
                            checked={todo.completed}
                            onChange={() => toggleTodoAsCompleted(todo.id)} 
                            />
                            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                            {
                                todo.completed && <button onClick={() => removeTodoById(todo.id)}>Remove</button>
                            }
                        </li>
            })
        }
    </ul>
  )
}

export default Todos