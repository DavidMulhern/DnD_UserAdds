import React, { useState } from 'react';
//UI elements
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
//Drag and drop import 
import { Draggable } from 'react-beautiful-dnd';
//Importing components for card handling
import EditTask from '../CardModals/EditModal';
import ViewTask from '../CardModals/ViewModal';

// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    card: {
        padding: '10px',
        margin: '10px',
    },
}))

// passing the cards to this function for display.- {card}.
export default function Cardx({ card, index, listId, cardDelete, cardUpdate }) {

    //UI Styling reference
    const classes = useStyle();
    //Used to trigger modal popup 
    const [modalEdit, setModal] = useState(false);
    const [modalView, setModalView] = useState(false);

    //Color properties for newly created cards. Gives a different color to each newly created one
    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]
    //Handle opening/closing edit modal
    const toggleEdit = () => {
        setModal(!modalEdit);
    }
    //Handle opening/closing view modal
    const toggleView = () => {
        setModalView(!modalView);
    }
    //Handles updating an existing cards data
    const updateTask = (obj,) => {
        var cardId=card.id
        cardUpdate(obj.rte, index, cardId, listId)
        setModal(!modalEdit);
    }
    //Handles the deletion of an existing card
    const handleDelete = (e) => {
        var cardId=card.id
        cardDelete(e, cardId, listId)
    }
    // React DnD Draggable object (card), assign it an ID.
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div {...provided.dragHandleProps}>
                        <Paper className={classes.card}>
                            <div className="card-wrapper mr-5">
                                <div className="card-top" style={{ "backgroundColor": colors[index % 5].primaryColor }}></div>
                                <div className="task-holder" style={{ 'overflowWrap': 'break-word', "overflow": "hidden" }} >
                                    {/* This is the card contents */}
                                    <p className="mt-0" dangerouslySetInnerHTML={{ __html: card.title }}></p>
                                </div>
                            </div>
                            {/*These are the buttons per card */}
                            <i className="fas fa-trash-alt me-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer"}} onClick={handleDelete}></i>
                            <i className="far fa-edit" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer"}} onClick={() => setModal(true)}></i>
                            <i className="fas fa-eye" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" , "marginLeft":"70%"}} onClick={() => setModalView(true)}></i>
                            
                            {/* Modals which appear on screen only once triggered */}
                            <EditTask modal={modalEdit} toggle={toggleEdit} updateTask={updateTask} taskObj={card.title} />
                            <ViewTask modal={modalView} toggle={toggleView} taskObj={card.title} />
                        </Paper></div>
                </div>
            )}
        </Draggable>
    )
}