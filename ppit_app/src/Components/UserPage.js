import React, { useEffect, useState } from 'react'
// jwt decode imported
import jwt_decode from "jwt-decode";
// Importing a history hook.
import { useHistory } from 'react-router-dom'
import App from '../App';

const UserPage = () => {
    // Using history to determine where user came from.
    const history = useHistory()
    // State variables.
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    async function populateQuote() {
        const req = await fetch('http://localhost:8080/api/quote', {
            // Include this in the header
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        const data = await req.json()
        // Populate the quote variable if the data status returns 'ok'.
        if(data.status === 'ok'){
            setQuote(data.quote)
        }
        else{
            alert(data.error)
        }
    }

    // Performing a check on user and token(s) when component mounts.
    useEffect(() => {
        // Getting token from local storage.
        const token = localStorage.getItem('token')
        if(token){
            // If found, decode.
            const user = jwt_decode(token)
            // If the user does not exist, remove the token.
            if(!user){
                localStorage.removeItem('token')
                history.replace('/login')
            }
            else{
                // If user is found, notify back end and populate code ******* HERE ********
                populateQuote()
            }
        }
    }, [])

    // Update quote function. Update the backend.
    async function updateQuote(event){
        event.preventDefault()
        const req = await fetch('http://localhost:8080/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            // Stringify the body for the post.
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })
        const data = await req.json()
        // Populate the quote variable if the data status returns 'ok'.
        if(data.status === 'ok'){
            setQuote(tempQuote)
            // Then set temp back to empty
            setTempQuote('')
        }
        else{
            alert(data.error)
        }
    }

    // The quote, or no quote found
    return (
    <div>
        <h1>The Quote: {quote || 'No quote found'}</h1>
        {/* HERE IS WHERE OUR CARD OBJECTS MIGHT BE STORED?? GOD I HOPE SO */}
        <form onSubmit={updateQuote}>
            <input type="text" placeholder="Quote" value={tempQuote} onChange={(e) => setTempQuote(e.target.value)}/>
            <input type="submit" value="Update quote"/>
        </form>
    </div>
    )
}

export default UserPage