// Importing use state
import React, {useState} from 'react';
// Styling
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

const Login = () => {
    // State variables.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Styling var.
    const classes = useStyle();

    // Front end to back end function. Making it asynchronus and wait for a repsonse.
    async function loginUser(event) {
        // This protects the event. E.g multiple submit clicks.
        event.preventDefault()
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            // Informing back end of the content type.
            headers: {
                'Content-Type': 'application/json',
            },
            // Passing the body 
            body: JSON.stringify({
                email,
                password,
            }),
        })

        // Convert it into JSON.
        const data = await response.json()

        if(data.user)
        {
            // Logins successful, store the token!
            localStorage.setItem('token', data.user)
            alert('Login Successful')
            window.location.href = '/AppX'
        }
        else{
            alert('Please check username and password')
        }
    }
    // Form displayed to the user.
    return(
        <div className={classes.root}>
            <form onSubmit={loginUser} className={classes.bg}>
                <p><h1>Log<span className={classes.colorText}>in</span></h1></p>
                <hr />
                <label>Email: </label>
                <p><input value={email}
                onChange={(e) => setEmail(e.target.value)}
                type = "text"
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
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
};
export default Login;
