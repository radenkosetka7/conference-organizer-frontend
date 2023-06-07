import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

import './Modal.css'
const Backdrop = (props) => {
    return <div className="backdrop" />;
};

const ModalOverlay = (props) => {
    const { resurs } = props;
    const modalClass =
        resurs === undefined ? "modal" : "modalZaRezervaciju";
    useEffect(() => {
    }, [modalClass, resurs]);

    const handleClick = (event) =>
    {
        event.stopPropagation();
    }

    return (
        <div className={modalClass} onClick={handleClick}>
            <div className="content">{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    const { resurs } = props;

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay resurs={resurs}>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;