import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor, ExportPdf } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import './modalDesign.css';

const EditTask = ({ modal, toggle, updateTask, taskObj }) => {

    //State for the content of the rich text editor
    const [rteValue, setRteValue] = useState('');

    //Updates the state of the rich text editor
    useEffect(() => {
        setRteValue(taskObj.rte)
    }, [])

    //Updates the input box as the user is typing
    const handleChange = (e) => {
        setRteValue(e)
    }

    //Handles when the user wants to save an update
    const handleUpdate = (e) => {
        e.preventDefault()
        let taskObj = {}

        taskObj["rte"] = rteValue
        //console.log("TaskObj in edit task: ",taskObj)
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
                                //Connection to the plugin service for hosting uploaded images
                                cloudServices: {
                                    uploadUrl: "https://88037.cke-cs.com/easyimage/upload/",
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/932e311019c76938357a260fb6730d960f8e5d4b0516b3a54cf87fd5de00?limit=10"

                                },
 
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