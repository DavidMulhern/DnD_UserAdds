import React, { useState, useEffect } from 'react';
import CreateTaskPopup from '../modals/CreateTaskPopup';
import axios from 'axios';


const ToDoList = () => {

    //modal represents the popup
    const [modal, setModal] = useState(false);

    //handles all the existing tasks which are already created
    const [taskList, setTaskList] = useState([])

    //toggle represents the button to activate the modal popup
    const toggle = () => {
        setModal(!modal);
    }

    useEffect(()=>{
        
        axios.get('http://localhost:8080/api')
        .then((response)=>{
            setTaskList(response.data);
        })
        .catch(()=>{
            
        });
            //console.log(arr)
             //setTaskList(arr)
         
     }, [])

     

    //Saves a task to the task array
    const saveTask = (taskObj) => {
        let tempList = taskList
        //push the new item to a temp holder of all existing items
        tempList.push(taskObj)
        //set local storage to temp holder
        localStorage.setItem("taskList", JSON.stringify(tempList))
        //set state to be equal to temp holder (which has the new item in it) I.E new item being added
        setTaskList(tempList)
        setModal(false)
        
        axios({
            url: 'http://localhost:8080/api/save',
            method: 'POST',
            data: taskObj
        })
            .then(() => {
                console.log('Data has been sent to the server');
            })
            .catch(() => {
                console.log('Internal server error');
            })
            ;
    }
    


    return (
        <>
            <div className='header text-center' >
                <h3>ToDo List</h3>
                <button className="btn btn-primary mt-3" onClick={() => setModal(true)} >Create Task</button>
            </div>
            <div className='task-container'>

                {taskList.map((obj) =>
                    <li>
                        {obj.Name},{obj.Description},{obj.NumberSelect}
                    </li>
                )}
            </div>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};
export default ToDoList;































// import React, { useState, useEffect } from "react";
// import CreateTaskPopup from '../modals/CreateTaskPopup';
// import axios from 'axios';


// export class Home extends React.Component {

//     //modal represents the popup
//     const [modal, setModal] = useState(false);

//     //handles all the existing tasks which are already created
//     const [taskList, setTaskList] = useState([])

//     //toggle represents the button to activate the modal popup
//     const toggle = () => {
//         setModal(!modal);
//     }


//         //Binding the event
//         constructor(){
//             super();
//         }
    
//         //State acts as a holder of data which is linked to a specific component
//         state = {
//             //Json collection of songs
//             Items: []
//         }
//         //Lifecycle hook, which gets called every time the component is mounted (active in the view)
//         componentDidMount(){
//             axios.get('http://localhost:8080/api')
//             .then((response)=>{
//                 this.setState({ Items: response.data})
//                 // this.redirect('/operationError546');

//                 console.log(this.state.Items[1])


//             })
//             .catch((error)=>{
    
//                 console.log(error)
//                 //this.props.history.push('/operationError')
                
//             });
//         }


//     render() {
//         return (
//             <div>
//                 <h1>To-Do List</h1>


//             <div className='header text-center' >
//                 <h3>ToDo List</h3>
//                 <button className="btn btn-primary mt-3" onClick={Modal=true} >Create Task</button>

//             </div>
//             <div className='task-container'>

//                 {taskList.map((obj) =>
//                     <li>
//                         {obj.Name},{obj.Description},{obj.NumberSelect}
//                     </li>
//                 )}
//             </div>
//             <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} /> 

//                 </div>

//         );
//     }
// }