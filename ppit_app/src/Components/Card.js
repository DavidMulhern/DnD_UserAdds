import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import ViewTask from '../modals/ViewTask';


const Card = ({ taskObj, index, deleteTask, updateListArray, cardId }) => {

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
    const updateTask = (obj) => {

        updateListArray(obj.rte, index)
        setModal(!modal);
    }

    //Handles the deletion of an existing card
    const handleDelete = () => {
        deleteTask(index)
    }

    return (

        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ "background-color": colors[index % 5].primaryColor }}></div>
            <div className="task-holder" style={{ 'overflow-wrap': 'break-word' ,"overflow":"hidden"}} >

                {/* This is the content/text of the cards */}
                <p className="mt-0" dangerouslySetInnerHTML={{ __html: cardId }}></p>
                {/* This is the card Ids */}
                <p className="mt-0" dangerouslySetInnerHTML={{ __html: taskObj }}></p>

                {/*These are the buttons per card */}
                <i className="fas fa-trash-alt" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer"}} onClick={handleDelete}></i>
                <i className="far fa-edit me-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)}></i>
                <i className="fas fa-eye" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModalView(true)}></i>
            </div>

            {/* Modals which appear on screen only once triggered */}
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
            <ViewTask modal={modalView} toggle={toggle2} taskObj={taskObj} />
        </div>
    );
};

export default Card;