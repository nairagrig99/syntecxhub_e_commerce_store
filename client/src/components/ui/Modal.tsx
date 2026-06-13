import {createPortal} from "react-dom";
import styles from "./Modal.module.scss";
import type {ChildrenProps} from "../../interface/children-props.type.ts";
import {useEffect} from "react";

type ModalEvent = {
    isOpen: boolean,
    title: string,
    onClose: () => void
}

type ModalProps = ChildrenProps & ModalEvent;
export default function Modal({isOpen, children, title, onClose}: ModalProps) {

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [onClose]);

    if (!isOpen) return

    const modalRoot = document.querySelector('#modal-root');
    if (!modalRoot) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h3>{title}</h3>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>

                </header>

                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>,
        modalRoot
    )
}