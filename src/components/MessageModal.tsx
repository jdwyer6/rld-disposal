import React from 'react';

// Define a type for your component's props
type MessageModalProps = {
    modalIsOpen: boolean;
    message: string;
};

const MessageModal = ({ modalIsOpen, message }: MessageModalProps) => {
    return (
        <div className={`${modalIsOpen ? "show" : "hide"} modal-container`}>
            <div className="modal-bg"></div>
            <p>{message}</p>
        </div>
    );
};

export default MessageModal;
