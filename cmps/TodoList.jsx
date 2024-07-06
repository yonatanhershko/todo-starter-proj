import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo, showActions = true }) {

    return (
        <ul className="todo-list" >
            {todos.map(todo =>
                <li key={todo._id} style={{ backgroundColor: todo.color, opacity: 0.9 }}>
                    <TodoPreview
                        todo={todo}
                        onToggleTodo={() => showActions && onToggleTodo(todo)}
                        showActions={showActions}
                    />                        {showActions && (
                        <section>
                            <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                            <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                            <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                        </section>
                    )}
                </li>
            )}
        </ul>
    )
}