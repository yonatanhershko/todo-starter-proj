const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function UserDetails() {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [userTodos, setUserTodos] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()
    const loggedInUser = userService.getLoggedinUser()

    useEffect(() => {
        loadUser()
        loadUserTodos()
    }, [userId])

    function loadUser() {
        userService.getById(userId).then(user => {
            setUser(user)
        }).catch(err => {
            console.error('Error fetching user:', err)
            showErrorMsg('Cannot fetch user details')
        })
    }

    function loadUserTodos() {
        todoService.query({ creator: userId }).then(todos => {
            const doneTodos = todos.filter(todo => todo.isDone)
            setUserTodos(doneTodos)
        }).catch(err => {
            console.error('Error fetching todos:', err)
            showErrorMsg('Cannot fetch todos')
        })
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setUser({ ...user, [name]: value })
    }

    function handlePrefsChange(ev) {
        const { name, value } = ev.target
        setUser({ ...user, prefs: { ...user.prefs, [name]: value } })
    }

    function saveUser() {
        userService.update(user)
            .then(updatedUser => {
                setUser(updatedUser)
                showSuccessMsg('User details updated')
                setIsEditing(false)
            })
            .catch(err => {
                console.error('Error updating user:', err)
                showErrorMsg('Cannot update user details')
            })
    }

    if (!user) return <div>Loading...</div>

    const userP = user.prefs || { color: 'black', bgColor: 'white' }

    return (
        <div>
            <h1 style={{ color: userP.color, backgroundColor: userP.bgColor }}>{user.fullname}'s Profile</h1>
            {loggedInUser && loggedInUser._id === user._id && (
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            )}
            {isEditing ? (
                <div>
                    <label>
                        Fullname:
                        <input type="text" name="fullname" value={user.fullname} onChange={handleChange} />
                    </label>
                    <label>
                        Text Color:
                        <input type="color" name="color" value={userP.color} onChange={handlePrefsChange} />
                    </label>
                    <label>
                        Background Color:
                        <input type="color" name="bgColor" value={userP.bgColor} onChange={handlePrefsChange} />
                    </label>
                    <button onClick={saveUser}>Save</button>
                </div>
            ) : (
                <div>
                    <h2>Preferences</h2>
                    <p>Text Color: {userP.color}</p>
                    <p>Background Color: {userP.bgColor}</p>
                </div>
            )}
            <h2>Todos Created by {user.fullname} (Done)</h2>
            <TodoList todos={userTodos} showActions={false} onToggleTodo={() => {}} onRemoveTodo={() => {}} />
        </div>
    );
}
