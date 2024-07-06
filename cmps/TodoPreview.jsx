export function TodoPreview({ todo, onToggleTodo  ,showActions = true}) {


    return (
        <article className="todo-preview">
            <h2 className={(todo.isDone) ? 'done' : ''}onClick={() => onToggleTodo(todo)}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="Todo icon" />
        </article>
    )
}