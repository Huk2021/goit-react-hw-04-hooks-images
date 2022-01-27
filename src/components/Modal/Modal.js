import { useEffect, useCallback} from 'react';
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Overlay, ModalContainer } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default function Modal ({onClose, children}) {

  const handleKeyDown = useCallback((e) => {
    if (e.code === "Escape") {
    onClose();
    }
  }, [onClose])
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown])

  

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
    onClose();
    }
  };

  
    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>,
      modalRoot
    );
  
}

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.img.isRequired,
  };
