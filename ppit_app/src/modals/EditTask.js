import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './modalDesign.css';

const EditTask = ({ modal, toggle, updateTask, taskObj }) => {

    const [rteValue, setRteValue] = useState('');

    //Updates the state of the rich text editor
    useEffect(() => {
        setRteValue(taskObj.rte)}, [])

    //Updates the input box as the user is typing
    const handleChange = (e) => {
        setRteValue(e)
    }

    //Handles when the user wants to save an update
    const handleUpdate = (e) => {
        e.preventDefault()
        let taskObj = {}
        
        taskObj["rte"] = rteValue
        updateTask(taskObj)
    }

    //Renders an editable version of the rich text editor.
    return (
        <Modal isOpen={modal} toggle={toggle} contentClassName="your-custom-class">
            <ModalHeader toggle={toggle}>Edit Card</ModalHeader>
            <ModalBody>

                <div className="App">
                    {/* Rich Text Editor configuration */}
                    <CKEditor
                        config={
                            {
                                cloudServices: {
                                    uploadUrl: "https://88037.cke-cs.com/easyimage/upload/",
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/106eb05296cc85fd48dc707a24296dabad703eb299fe21dbf939ca3923b5?limit=10"
                                }
                            }
                        }
                        name="editorName"
                        editor={ClassicEditor}
                        data={taskObj}
                        onChange={(event, editor) => {
                            const dataFromEditor = editor.getData();
                            handleChange(dataFromEditor);
                        }}
                    />
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