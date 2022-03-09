// Importing use state
import React, {useState} from 'react';
// Importing a history hook.
import { useHistory } from 'react-router-dom'

const Register = () => {

    // History hook.
    const history = useHistory()
    
    // State variables.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Front end to back end function. Making it asynchronus and wait for a repsonse.
    async function registerUser(event) {
        // This protects the event. E.g multiple submit clicks.
        event.preventDefault()
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            // Informing back end of the content type.
            headers: {
                'Content-Type': 'application/json',
            },
            // Passing the body 
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()
        // Convert it into JSON.
        // if the status comes back ok, push to login
        if(data.status === 'ok'){
           history.push('/login')
        }   
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <label>Name: </label>
                <input value={name}
                onChange={(e) => setName(e.target.value)}
                type = "text"
                placeholer="Name" 
                />
                <br />
                <label>Email: </label>
                <input value={email}
                onChange={(e) => setEmail(e.target.value)}
                type = "text"
                placeholer="Email" 
                />
                <br />
                <label>Password: </label>
                <input value={password}
                onChange={(e) => setPassword(e.target.value)}
                type = "password"
                placeholer="Password" 
                />
                <br />
                <input type="submit" value="Register"/>
            </form>
        </div>
    )
};
export default Register;
