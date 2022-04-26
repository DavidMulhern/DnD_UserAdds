import React from 'react';
//UI elements
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//Rich text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Used to render the contents of a rich text editor in read only mode
const ViewTask = ({ modal, toggle, taskObj }) => {

    //Renders a read only version of the rich text editor.
    return (
        <Modal isOpen={modal} toggle={toggle} contentClassName="your-custom-class">
            <ModalHeader toggle={toggle}>VIEW CARD</ModalHeader>
            <ModalBody>

                <div className="App">
                    {/* Rich Text Editor configuration */}
                    <CKEditor
                    //Disabling edit functionality
                        disabled="true"
                        //Hiding disabled toolbar tools
                        removePlugins={['toolbar']}
                        config={
                            {
                                toolbar: [],
                                //Connection to the plugin service for hosting uploaded images
                                cloudServices: {
                                    uploadUrl: "https://88037.cke-cs.com/easyimage/upload/",
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/932e311019c76938357a260fb6730d960f8e5d4b0516b3a54cf87fd5de00?limit=10"

                                }
                            }
                        }
                        name="editorName"
                        editor={ClassicEditor}
                        data={taskObj}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ViewTask;