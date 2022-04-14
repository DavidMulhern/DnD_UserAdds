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
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/106eb05296cc85fd48dc707a24296dabad703eb299fe21dbf939ca3923b5?limit=10"
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