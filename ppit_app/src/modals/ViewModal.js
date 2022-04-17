import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ViewTask = ({ modal, toggle, taskObj }) => {





    

    //Renders a read only version of the rich text editor.
    return (
        <Modal isOpen={modal} toggle={toggle} contentClassName="your-custom-class">
            <ModalHeader toggle={toggle}>VIEW CARD</ModalHeader>
            <ModalBody>

                <div className="App">
                    {/* Rich Text Editor configuration */}
                    <CKEditor
                        disabled="true"
                        removePlugins={['toolbar']}
                        config={
                            {
                                toolbar: [],
                                cloudServices: {
                                    uploadUrl: "https://88037.cke-cs.com/easyimage/upload/",
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/6e01c8623c56aff50aa32641f07587279495e197321c729232e08020e47e?limit=10"
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