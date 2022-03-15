import React, {useState} from 'react';
import EditTask from '../modals/EditTask';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {

    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        console.log('Checking update : '+obj.rte)
        updateListArray(obj.rte, index)
        setModal(!modal);
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (

        <div className="card-wrapper mr-5">
            
            <div className="card-top" style={{ "background-color": colors[index % 5].primaryColor }}></div>
                <div className="task-holder">

                    <span className="card-header" style={{ "background-color": colors[index % 5].secondaryColor, "borderRadius": "10px" }}>Index {index}</span>

                    <p>_ID{taskObj._id}</p>
                    <p className="mt-0" dangerouslySetInnerHTML={ { __html: taskObj.data }}></p>

                    <div style={{ "position": "absolute", "right": "20px", "bottom": "3px" }}>
                        <i className="far fa-edit me-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)}></i>
                        <i className="fas fa-trash-alt" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={handleDelete}></i>
                    </div>
                </div>
            <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>

    );
};

export default Card;