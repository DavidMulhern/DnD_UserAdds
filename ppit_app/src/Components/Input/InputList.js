import React, { useContext, useState } from 'react'
// Styling from material ui
import { Button, IconButton, InputBase, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// Clear 'X' icon
import ClearIcon from '@mui/icons-material/Clear';
import storeApi from '../../utils/storeApi';

import CreateModal from '../CardModals/CreateModal';


// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    card: {
        width: '200px',
        margin: '10px',
    },
    input: {
        marginLeft: '5px',
    },
    btnConfirm: {
        padding: '8px',
        margin: '10px',
        "&:hover": {
            background: 'linear-gradient(to right, white, gray)',
        },
    },
    confirm: {
        margin: '10px',
    },
    btnCancel: {
        float: 'right'
    }
}));



// This function is called when user clicks to add a card. It gets passed the list id.
export default function InputCard({ setOpen, listId, type }) {
    const classes = useStyle();
    // Keep track, use state.
    const [title, setTitle] = useState('')
    // Store API. The provider context data will be updated. 
    const { addMoreCards, addMoreLists } = useContext(storeApi)
    // On change event. Set the cardTitle with the contents of the entry field.
    const handleOnChange = (e) => {
        setTitle(e.target.value)
    };


    const handleBtnConfirm = () => {
        addMoreLists(title);
        setTitle("");
        setOpen(false);

    };


    //modal represents the popup
    const [modal, setModal] = useState(false);
    //toggle represents the button to activate the modal popup
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase
                        // Text field, need to track change.
                        onChange={handleOnChange}
                        multiline
                        onBlur={() => setOpen(false)} // User can cancel adding text by just clicking outside of window.
                        fullWidth
                        inputProps={{
                            className: classes.input,
                        }}
                        // Set the value
                        value={title}
                        // if else to determine the place holder (list or card)
                        placeholder={type === 'card' ? "" : "Enter List title..."}
                    />
                </Paper>
            </div>

            {/* The below setOpens will collapse the window when user clicks add or cancel buttons. */}
            <div >

                <Paper className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    <Typography>
                        {type === 'card' ? "" : "Confirm "}
                    </Typography>
                </Paper>
                <IconButton className={classes.btnCancel} onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
                <CreateModal toggle={toggle} modal={modal} addMoreCards={addMoreCards} setTitle={setTitle} listId={listId}/*save={saveTask}*/ />

            </div>
        </div>
    )
}

