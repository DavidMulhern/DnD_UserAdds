import React, { useState } from 'react';
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Draggable } from 'react-beautiful-dnd';


import EditTask from '../../modals/EditModal';
import ViewTask from '../../modals/ViewModal';

// Using styles from the material-ui lib.
const useStyle = makeStyles((theme) => ({
    card: {
        padding: '10px',
        margin: '10px',
    },
}))



// passing the cards to this function for display.- {card}.
export default function Cardx({ key,card, index, listId, cardDelete, cardUpdate }) {

    const classes = useStyle();

    const [modal, setModal] = useState(false);
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
    const toggle = () => {
        setModal(!modal);
    }

    //Handle opening/closing view modal
    const toggle2 = () => {
        setModalView(!modalView);
    }

    //Handles updating an existing cards data
    const updateTask = (obj,) => {
        var cardId=card.id
        cardUpdate(obj.rte, index, cardId, listId)
        setModal(!modal);
        //console.log("Card / obj.rte: ",obj.rte)
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
                                <div className="card-top" style={{ "background-color": colors[index % 5].primaryColor }}></div>
                                <div className="task-holder" style={{ 'overflow-wrap': 'break-word', "overflow": "hidden" }} >
                                    {/* This is the card Ids */}
                                    <p className="mt-0" dangerouslySetInnerHTML={{ __html: card.title }}></p>
                                </div>
                            </div>
                            {/*These are the buttons per card */}
                            <i className="fas fa-trash-alt" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={handleDelete}></i>
                            <i className="far fa-edit me-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)}></i>
                            <i className="fas fa-eye" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModalView(true)}></i>
                            {/* Modals which appear on screen only once triggered */}
                            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={card.title} />
                            <ViewTask modal={modalView} toggle={toggle2} taskObj={card.title} />
                        </Paper></div>
                </div>
            )}
        </Draggable>
    )
}