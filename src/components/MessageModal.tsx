import React from 'react';

// Define a type for your component's props
type MessageModalProps = {
    modalIsOpen: boolean;
    setModalIsOpen: any;
    message: string;
    closeModalText: string;
};

const MessageModal = ({ modalIsOpen, message, setModalIsOpen, closeModalText }: MessageModalProps) => {
    return (
        <div className={`${modalIsOpen ? "show" : "hide"} message-modal`}>
            <div className="modal-bg"></div>
            <p>{message}</p>
            <button onClick={() => setModalIsOpen(false)}>{closeModalText}</button>
        </div>
    );
};

export default MessageModal;
