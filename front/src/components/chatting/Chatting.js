import { Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import ChattingInput from "./ChattingInput";

const Chatting = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow((state) => !state);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <img src="https://img.icons8.com/color/24/000000/chat--v1.png" />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="mt-5"
        placement="end"
        scroll="true"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>채팅방</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChattingInput />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Chatting;
