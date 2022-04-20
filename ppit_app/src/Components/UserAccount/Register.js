// Importing use state.
import React, {useState} from 'react';
// Importing a history hook.
import { useHistory } from 'react-router-dom'
// Styling.
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: "100vh",
        overflowY: 'auto',
        fontFamily:'Nunito',
        justifyContent:'center',
        marginLeft: '15%'
    },
    colorText: {
        color: '#5AFF3D',
    },
}));

const Register = () => {

    // History hook.
    const history = useHistory()
    // Styling var.
    const classes = useStyle();
    
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
        else{
            alert('Email already in use')
        } 
    }
    // Form displayed to the user.
    return(
        <div className={classes.root}>
            <form onSubmit={registerUser}>
                <p><h1>Regis<span className={classes.colorText}>ter</span></h1></p>
                <hr />
                <label>Name: </label>
                <p><input value={name}
                onChange={(e) => setName(e.target.value)}
                type = "text"
                placeholer="Name" 
                /></p>
                <br />
                <label>Email: </label>
                <p><input value={email}
                onChange={(e) => setEmail(e.target.value)}
                type = "email"
                placeholer="Email" 
                /></p>
                <br />
                <label>Password: </label>
                <p><input value={password}
                onChange={(e) => setPassword(e.target.value)}
                type = "password"
                placeholer="Password" 
                /></p>
                <br />
                <input type="submit" value="Register"/>
            </form>
        </div>
    )
};
export default Register;
