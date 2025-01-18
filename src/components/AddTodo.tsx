import {useState} from 'react';
import { useTodos } from '../store/Todos';

const AddTodo = () => {
  const [todo, setTodo] = useState('');
  const {handleAddTodo} = useTodos();

  const handleFormSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo('');
  }

  return (
    <form onSubmit={handleFormSubmit}>
        <input type="text" value={todo} onChange={(e) => { e.preventDefault(); setTodo(e.target.value);}} placeholder='Enter a To do.' />
        <button type="submit">Add</button>
    </form>
  )
}

export default AddTodo