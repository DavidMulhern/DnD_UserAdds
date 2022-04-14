import React, { useState } from 'react';
//
import { Paper } from '@material-ui/core'
// Styling for the list.
import { makeStyles } from '@material-ui/styles'
import { Draggable } from 'react-beautiful-dnd';
import Card from '../Card';
import axios from 'axios';


// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    card: {
        padding: '10px',
        margin: '10px',
    },
}))


// passing the cards to this function for display.- {card}.
export default function Cardx({ card, index }) {

    const classes = useStyle();

    const updateListArray = (obj, index) => {

        //No code in here yet. Have to fix how everything is saved before looking at updating data.

    }


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< WORK IN PROGRESS - Trying to fix delete function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleDelete = () => {
        console.log("In delete ")
        console.log(card.id)

        axios({
            url: 'http://localhost:8080/testing',
            method: 'GET',
            data: card.id
        })
            .then((response) => {
                console.log(response)
            })
            .catch(() => {
                console.log('AppX / checkConsole() / .catch() ERROR ERROR');
            });
    }
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< WORK IN PROGRESS - Trying to fix delete function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // React DnD Draggable object (card), assign it an ID.
    return (
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <div {...provided.dragHandleProps}>
                            <Paper className={classes.card}>

                                {/* Rendering card component */}
                                <Card taskObj={card.title} index={index} deleteTask={handleDelete} updateListArray={updateListArray} cardId={card.id} />

                            </Paper></div>
                    </div>
                )}
            </Draggable>
    )
}