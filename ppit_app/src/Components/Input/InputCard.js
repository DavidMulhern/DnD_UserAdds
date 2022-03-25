import React, { useContext, useState } from 'react'
// Styling from material ui
import { Button, IconButton, InputBase, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// Clear 'X' icon
import ClearIcon from '@mui/icons-material/Clear';
import storeApi from '../../utils/storeApi';


// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    card:{
        width: '200px',
        margin: '10px',
        paddingBottom: '30px',
    },
    input:{
        marginLeft: '5px',
    },
    btnConfirm:{
        background: 'linear-gradient(to right, lightgreen, lightgreen)',
        "&:hover": {
            background: 'linear-gradient(to right, lightgreen, lightgrey)'
        } 
    },
    confirm:{
        margin: '10px',
    }
}));

// This function is called when user clicks to add a card. It gets passed the list id.
export default function InputCard({ setOpen, listId, type }) {
    const classes = useStyle();
    // Keep track, use state.
    const[title, setTitle] = useState('')
    // Store API. The provider context data will be updated. 
    const {addMoreCards, addMoreLists} = useContext(storeApi)
    // On change event. Set the cardTitle with the contents of the entry field.
    const handleOnChange = (e) => {
        setTitle(e.target.value)
    };
    const handleBtnConfirm = () => {
        if(type === 'card')
        {
            // call the function and pass the title (contents) and the id
            addMoreCards(title, listId);
            // Card has been added, clear entry field.
            setTitle("");
            // close the window when done
            setOpen(false);
        }
        // Creat a list.
        else{
            addMoreLists(title);
            setTitle("");
            setOpen(false);
        }
    };

    return(
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase 
                    // Text field, need to track change.
                    onChange={handleOnChange}
                    multiline
                    onBlur={()=> setOpen(false)} // User can cancel adding text by just clicking outside of window.
                    fullWidth 
                    inputProps={{
                        className: classes.input,
                    }}
                    // Set the value
                    value={title}
                    // if else to determine the place holder (list or card)
                    placeholder={type === 'card'?"Enter title of card...":"Enter List title..."}
                    />
                </Paper>
            </div>
            {/* The below setOpens will collapse the window when user clicks add or cancel buttons. */}
            <div className={classes.confirm}> 
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    {type === 'card'?"Add Card":"Add List"}
                </Button>
                <IconButton onClick={()=> setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}