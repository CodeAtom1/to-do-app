import { Link, useSearchParams } from 'react-router-dom'

const navbar = () => {
    const [searchParams] = useSearchParams();
    let todosFilter = searchParams.get("todos");
  return (
    <nav>
        <Link to="/" className={todosFilter === null ? "active" : ""} >All</Link>
        <Link to="/?todos=active" className={ todosFilter === "active" ? "active" : ""} >Active</Link>
        <Link to="/?todos=completed" className={ todosFilter === "completed" ? "active" : "" } >Completed</Link>
    </nav>
  )
}

export default navbar