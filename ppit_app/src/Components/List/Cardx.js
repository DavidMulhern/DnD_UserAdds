import React from 'react'
//
import { Paper } from '@material-ui/core'
// Styling for the list.
import { makeStyles } from '@material-ui/styles'
import { Draggable } from 'react-beautiful-dnd';

// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    card:{
        padding: '10px',
        margin: '10px',
    },
}))

// passing the cards to this function for display.- {card}.
export default function Cardx({ card, index }) {
    const classes = useStyle();
    return (
        // React DnD Draggable object (card), assign it an ID.
        <Draggable draggableId={card.id} index={index}>
            {(provided)=>(
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Paper className={classes.card}>{card.title}</Paper>
                </div>
            )}
        </Draggable>
    )
}