import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./modalDesign.css";

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [rteValue, setRteValue] = useState('');

    const handleChange = (e) => {
        setRteValue(e)
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        console.log('check ' + rteValue)
        taskObj["rte"] = rteValue
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>field1</ModalHeader>
            <ModalBody>

                <div className="App">
                    <h2>Create Card</h2>
                    <CKEditor
                        name="editorName"
                        editor={ClassicEditor}
                        data=""

                        onChange={(event, editor) => {
                            const dataFromEditor = editor.getData();
                            handleChange(dataFromEditor);
                        }}
                    />
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;