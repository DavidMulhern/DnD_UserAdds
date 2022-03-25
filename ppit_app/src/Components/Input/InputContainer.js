import React, { useState } from 'react'
// 
import { Collapse, Paper, Typography } from '@material-ui/core';
// Styling for the input.
import { makeStyles } from '@material-ui/styles'
import InputCard from './InputCard';

// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '25px',
    },
    addCard: {
        padding: '10px',
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
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listId={listId} type={type} />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} onClick={()=>setOpen(!open)}>
                    <Typography>
                        {type === 'card'?"+ Add a card":"+ Add a list"} 
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    );
}