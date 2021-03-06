import React from 'react'
// UI library
import { Paper, CssBaseline } from '@material-ui/core'
// Styling for the list.
import { makeStyles } from '@material-ui/styles'
// Import components.
import Title from './Title';
import Cardx from './Card';
import InputContainer from '../Input/InputContainer';
// Import DnD components
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    root:{
        width: '300px',
        background: 'linear-gradient(45deg, #1FC2EC 30%, #C2C4C5 90%)',
        margin: '15px',
        padding: '15px',
    },
    cardContainer: {
        marginTop: '10px',
    }
}))

export default function List({ list, index,cardDelete, cardUpdate, listDelete }){
    // Get handle on style.
    const classes = useStyle();

    return(
    // Making the whole column draggable.
        <Draggable draggableId={list.id} index={index}>
            {(provided)=>(
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Paper className={classes.root} {...provided.dragHandleProps}>
                        <CssBaseline />
                        {/* Looping through list, getting titles. */}
                        <Title title={list.title} listId={list.id} index={index} listDelete={listDelete} />
                        {/* React DnD Droppable area. */}
                        {/* Needs to be wrapped in a div with a reference */}
                        <Droppable droppableId={list.id}>
                            {(provided)=>(
                            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.cardContainer}>
                                {/* Looping through the cards from passed list. Need to also pass list id */}
                                {list.cards.map((card, index) => (
                                    <Cardx key={card.id} card={card} index={index} listId={list.id} cardDelete = {cardDelete} cardUpdate={cardUpdate}/>
                                ))}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                        <InputContainer  listId={list.id} type="card"/>
                    </Paper>
                </div>
            )}
        </Draggable>
        

    )
}