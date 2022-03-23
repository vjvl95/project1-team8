import { Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const Comment = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow((state) => !state);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <HiOutlineChatAlt2 size="25" />
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
          <CommentInput />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Comment;
