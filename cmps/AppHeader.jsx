const { useState,useEffect } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { logout } from '../store/actions/user.actions.js'
import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'

import { SET_USER_SCORE } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'


export function AppHeader() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.loggedInUser)
    const todos = useSelector(storeState => storeState.todos)
    const dispatch = useDispatch()


    useEffect(() => {
        // updateScoreOnTodoCompletion()
    }, [todos])


    function onLogout() {
        logout()
            .then(() => {
                // TODO: use dispatch

                // showSuccessMsg('Bye Bye')
            })
            .catch((err) => {
                console.log('err:', err)
                // showErrorMsg('OOPs try again')
            })
    }

    function todosProgressBar() {
        if (!todos || todos.length === 0) return '0%'

        const completedTodos = todos.filter((todo) => {
            todo.isDone

        }).length
        const progressPercentage = (completedTodos / todos.length) * 100
        return `${progressPercentage}%`
    }

    // function updateScoreOnTodoCompletion() {
    //     if (todos && todos.length > 0) {
    //         const completedTodos = todos.filter(todo => todo.isDone)
    //         if (completedTodos.length > 0) {
    //             const pointsToAdd = completedTodos.length * 10
    //             dispatch({ type:SET_USER_SCORE , payload: pointsToAdd }) // Example action to add score
    //         }
    //     }
    // }
    
    // dispatch({ type:SET_USER_SCORE })
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user && (<div className='Progress'>
                    <div
                        className='Progress-bar'
                        style={{ width: todosProgressBar() }}
                    >
                    </div>
                </div>)}
                {user ? (
                    < section >

                        <Link to={`/user/${user._id}`}>Hello {user.fullname} <span>⭐{user.score.toLocaleString()}</span></Link>
                        <button onClick={onLogout}>Logout</button>

                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
