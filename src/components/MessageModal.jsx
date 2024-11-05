import React from 'react';

const MessageModal = ({ modalIsOpen, message, setModalIsOpen, closeModalText }) => {
    return (
        <div className={`${modalIsOpen ? "show" : "hide"} message-modal`}>
            <div className="modal-bg"></div>
            <p>{message}</p>
            <button onClick={() => setModalIsOpen(false)}>{closeModalText}</button>
        </div>
    );
};

export default MessageModal;
