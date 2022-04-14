import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CreateTaskPopup = ({ modal, toggle, addMoreCards, setTitle, listId }) => {
    const [rteValue, setRteValue] = useState('');

    //handles updating the text content of a card as its being created
    const handleChange = (e) => {
        setRteValue(e)
    }
    const handleSave = (e) => {
        let taskObj = {}
        taskObj["rte"] = rteValue
        // call the function and pass the title (contents) and the id
        addMoreCards(rteValue, listId);
        // Card has been added, clear entry field.
        setTitle("");
    }

    // The Rich text editor is rendered in an editable version to allow the user to enter in the contents 
    // of the new card
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>field1</ModalHeader>
            <ModalBody>
                <div className="App">
                    <h2>Create Card</h2>

                    {/* Configuration properties for the rich text editor */}
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

            {/* Functionality buttons used to finalise creating a card, or else cancel */}
            <ModalFooter>
                <Button color="primary" onClick={(e) => { handleSave(); toggle(); }}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;