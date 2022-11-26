import React, { PropsWithChildren } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export type IConfirmationModalProps = {
    title: string;
    onConfirm: () => void;
    onClose: () => void;
    show: boolean;
    confirmTitle?: string;
    closeTitle?: string;
};

export const ConfirmationModal = ({
    title, children, onConfirm, onClose, show, confirmTitle, closeTitle,
}: PropsWithChildren<IConfirmationModalProps>) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <h1>{ title }</h1>
            </Modal.Header>
            {children && (
                <Modal.Body>
                    { children }
                </Modal.Body>
            )}
            <Modal.Footer>
                <Button onClick={onClose} variant="secondary">
                    {closeTitle ?? "Close"}
                </Button>
                <Button onClick={onConfirm} variant="primary">
                    {confirmTitle ?? "Confirm"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
