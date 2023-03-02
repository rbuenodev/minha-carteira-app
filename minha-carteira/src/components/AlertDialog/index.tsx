import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import {
  BlueButton,
  CloseModalButton,
  Container,
  InlineContainer,
  ModalContent,
  ModalWrapper,
} from "./style";
import { MdClose } from "react-icons/md";
import Button from "../Button";

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<boolean>;
  title: string;
  description: string;
  handleConfirm(): void;
  confirmDescritpion: string;
}

const AlertDialog: React.FC<IProps> = ({
  showModal,
  setShowModal,
  title,
  description,
  handleConfirm,
  confirmDescritpion,
}) => {
  const modalRef = useRef<any>();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e: any) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Container onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <h2>{title}</h2>
              <p>{description}</p>
              <InlineContainer>
                <Button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <BlueButton>
                  <Button type="button" onClick={() => handleConfirm()}>
                    {confirmDescritpion}
                  </Button>
                </BlueButton>
              </InlineContainer>
            </ModalContent>
            <CloseModalButton
              type="button"
              aria-label="Close modal"
              onClick={() => setShowModal(false)}
            >
              <MdClose />
            </CloseModalButton>
          </ModalWrapper>
        </Container>
      ) : null}
    </>
  );
};

export default AlertDialog;
