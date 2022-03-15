import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditTask = ({ modal, toggle, updateTask, taskObj }) => {

    const [rteValue, setRteValue] = useState('');

    useEffect(() => {
        setRteValue(taskObj.rte)
    }, [])

    const handleChange = (e) => {
        setRteValue(e)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        let taskObj = {}

        taskObj["rte"] = rteValue
        updateTask(taskObj)

    }

    return (
        <Modal isOpen={modal} toggle={toggle} contentClassName="your-custom-class">
            <ModalHeader toggle={toggle}>Edit Card</ModalHeader>
            <ModalBody>

                <div className="App">
                    <CKEditor
                        name="editorName"
                        editor={ClassicEditor}
                        data={taskObj.data}
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