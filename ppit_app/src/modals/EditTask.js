import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTask = ({modal, toggle, updateTask, taskObj}) => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');
    

    useEffect(()=>{
        setValue1(taskObj.value1)
        setValue2(taskObj.value2)
        setValue3(taskObj.value3)
        setValue4(taskObj.value4)
        setValue5(taskObj.value5)
        setValue6(taskObj.value6)
    },[])

    const handleChange = (e) => {
        
        const {name, value} = e.target

        // if(name === "taskName"){
        //     setValue1(value)
        // }else{
        //     setDescription(value)
        // }
        
        switch(name) {
            case "field1":setValue1(value);break;
            case "field2":setValue2(value);break;
            case "field3":setValue3(value);break;
            case "field4":setValue4(value);break;
            case "field5":setValue5(value);break;
            case "field6":setValue6(value);break;
          }

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["value1"] = value1
        taskObj["value2"] = value2
        taskObj["value3"] = value3
        taskObj["value4"] = value4
        taskObj["value5"] = value5
        taskObj["value6"] = value6
        updateTask(taskObj)
        
    }
    
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Card</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>field1</label>
                        <input type="text" className = "form-control" value = {value1} 
                        onChange = {handleChange} name = "field1"/>
                    </div>
                    <div className = "form-group">
                        <label>field2</label>
                        <textarea rows = "5" className = "form-control" value = {value2} 
                        onChange = {handleChange} name = "field2"></textarea>
                    </div>
                    <div className = "form-group">
                        <label>field3</label>
                        <input type="text" className = "form-control" value = {value3} 
                        onChange = {handleChange} name = "field3"/>
                    </div>
                    <div className = "form-group">
                        <label>field4</label>
                        <textarea rows = "5" className = "form-control" value = {value4} 
                        onChange = {handleChange} name = "field4"></textarea>
                    </div>
                    <div className = "form-group">
                        <label>field5</label>
                        <input type="text" className = "form-control" value = {value5} 
                        onChange = {handleChange} name = "field5"/>
                    </div>
                    <div className = "form-group">
                        <label>field6</label>
                        <textarea rows = "5" className = "form-control" value = {value6} 
                        onChange = {handleChange} name = "field6"></textarea>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTask;