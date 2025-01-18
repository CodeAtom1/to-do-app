import { createContext, useContext, useState } from "react"; 

export type TodosProviderProps = {
    children: React.ReactNode;
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (todo: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    removeTodoById: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({children}:TodosProviderProps) => {

    const [todos, setTodo] = useState<Todo[]>(() =>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return  JSON.parse(newTodos) as Todo[];
        } catch (error) {
            return [];
        }
    });

    const handleAddTodo = (task:string) => {

        setTodo((prev:Todo[])=> {
            const newTodos:Todo[] = [{
                id: Math.random().toString(),
                task: task,
                completed: false,
                createdAt: new Date()
            },
            ...prev
            ];
            // console.log("my previous"+ JSON.stringify(prev));
            // console.log(newTodos);

            localStorage.setItem("todos", JSON.stringify(newTodos));

            return newTodos;
        });

    };

    //mark completed
    const toggleTodoAsCompleted = (id: string) => {
        setTodo((prev:Todo[]) => {

            var newTodos = prev.map((todo:Todo) => {
                if(todo.id === id) {
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });            
            localStorage.setItem("todos", JSON.stringify(newTodos));

            return newTodos;
        })
    }

    // remove by id
    const removeTodoById = (id: string) => {
        setTodo((prev:Todo[]) => {
            var newTodos = prev.filter((todo:Todo) => todo.id !== id);            
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return <todosContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, removeTodoById}}>
            {children}
        </todosContext.Provider>
}


//consumer
export const useTodos = () => {

    const todosConsumer = useContext(todosContext);
    if(!todosConsumer) {
        throw new Error('useTodos must be used within a TodosProvider');
    }
    return todosConsumer;
}