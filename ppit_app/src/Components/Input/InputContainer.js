import React, { useState } from 'react'
// Styling for the input.
import { Collapse, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
// Component for adding a new list
import InputCard from './InputCard';
// Component for creating a new card
import CreateTaskPopup from '../../modals/CreateModal';


// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '25px',
    },
    addCard: {
        paddingTop: '10px',
        "&:hover": {
            background: 'linear-gradient(to right, white, gray)',
        }
    }
}));

// This gets passed the list id.
export default function InputContainer({ listId, type }) {
    const classes = useStyle();

    // Setting state for when user adds a card.
    const [open, setOpen] = useState(false)
    //modal represents the popup
    const [modal, setModal] = useState(false);

    //toggle represents the button to activate the Task Popup Modal
    const toggle = () => {
        setModal(!modal);
    }

    //Checking if user is adding a card or adding a list
    function check() {
        if (type === 'card') {
            //Activate the Create Task Popup Modal to creat a new card
            setModal(true)
        } else {
            //Open the input to add a title to the list
            setOpen(!open)
        }
    }



    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listId={listId} type={type} />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} onClick={check}>
                    <Typography>
                        {type === 'card' ? "+ Add a card" : "+ Add a list"}
                    </Typography>
                </Paper>
            </Collapse>
            <CreateTaskPopup toggle={toggle} modal={modal} listId={listId} />
        </div>
    );
}