import React, { useContext, useState } from 'react'
// UI library
import { InputBase, Typography, Button } from '@material-ui/core'
// Styling for the list.
import { makeStyles } from '@material-ui/styles'

// API Component.
import storeApi from '../../utils/storeApi';


// Styling.
// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    editableTitleContainer: {
        marginLeft: '15px',
        display: 'flex',
    },
    // Styling when editing. flexGrow pushes three dots to end.
    editableTitle: {
        flexGrow: 1,
    },
    input: {
        marginLeft: '15px',
        marightRight: '40px',
        "&:focus": {
            // Puts a gray background, noifty user he can type.
            background: '#ddd',
        }
    },
}));

// This function controls the state of the title. Allows user to edit title on column.
export default function Title({ title, listId, listDelete}) {
    // Create state.
    const [open, setOpen] = useState(false)
    // Title state.
    const [newTitle, setNewTitle] = useState(title)
    // Handle on styles.
    const classes = useStyle()
    // Store API. The provider context data will be updated. 
    const { updateListTitle } = useContext(storeApi)
    // title text change event.
    const handleOnChange = (e) => {
        // Taking the target value and setting a new title.
        setNewTitle(e.target.value);
    }

    // After user updates title, clicks off field and it updates.
    const handleOnBlur = () => {
        updateListTitle(newTitle, listId);
        setOpen(false);
    }

    const handleDelete=()=>{

        listDelete(listId)
    }

    return (
        <div>
            {/* user does not click. */}
            {open ? (
                <div>

                    <InputBase
                        style={{}}
                        // On change event to change title text.
                        onChange={handleOnChange}
                        autoFocus
                        value={newTitle}
                        // Styling when user clicks.
                        inputProps={{
                            className: classes.input,
                        }}
                        fullWidth
                        onBlur={handleOnBlur}
                    />
                </div>
            ) : (
                // Else, clicked. Sets true and change the state.
                // editableTitleContainer, this styling will keep it on one line - flex.
                <div>
                    <i className="fas fa-trash-alt" style={{ "cursor": "pointer", float: "right" }} onClick={handleDelete}></i>
                    <div className={classes.editableTitleContainer}>

                        <Typography
                            onClick={() => setOpen(!open)}
                            className={classes.editableTitle}
                        >
                            {title}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    )
}