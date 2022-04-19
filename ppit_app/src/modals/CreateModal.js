import React, { useContext, useState } from 'react';
//UI elements
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//Rich text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Local data reference
import storeApi from '../utils/storeApi';

const CreateTaskPopup = ({ modal, toggle, listId }) => {

    //Declaring state for the functional component
    const [rteValue, setRteValue] = useState('');
    const { addMoreCards } = useContext(storeApi)

    //Handles updating the text content of a card as its being created
    const handleChange = (e) => {
        setRteValue(e)
    }
    //Handles saving a new card
    const handleSave = (e) => {
        let taskObj = {}
        taskObj["rte"] = rteValue

        // call the save function and pass the title (contents) and the id
        addMoreCards(rteValue, listId);
    }

    // The Rich text editor is rendered in an editable version to allow the user to enter in the contents of the new card
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create A New Card</ModalHeader>
            <ModalBody>
                <div className="App">
                    {/* Configuration properties for the rich text editor */}
                    <CKEditor
                        config={
                            {
                                //Connection to the plugin service for hosting uploaded images
                                cloudServices: {
                                    uploadUrl: "https://88037.cke-cs.com/easyimage/upload/",
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/6e01c8623c56aff50aa32641f07587279495e197321c729232e08020e47e?limit=10"
                                }
                            }
                        }
                        name="editorName"
                        editor={ClassicEditor}
                        data=""
                        //Handles updating the content of the rich text editor as the user is typing
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