
import { updateUser } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function UserDetails() {

    return (
        <section className="user-details">
            <h2>User Details</h2>
            <label>
                Full Name:
            </label>
            <label>
                Text Color:
            </label>
            <label>
                Background Color:
            </label>
            <button >Save</button>
            <section>
                <h3>Activities</h3>
                <ul>
                
                </ul>
            </section>
        </section>
    );
}