import { Offcanvas, Button } from "react-bootstrap";
import { useState, useCallback, useEffect } from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import * as API from "../../api";

const Comment = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow((state) => !state);

  const [inputValue, setInputValue] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("comments/comment", {
        comment: inputValue,
      });
      setInputValue("");
      getCommentList();
    } catch (err) {
      console.log("채팅을 업로드 하는데 실패하였습니다.", err);
    }
  };

  const getCommentList = useCallback(() => {
    API.get("commentlist").then((res) => {
      const { data } = res;
      setCommentList(data);
    });
  }, []);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  return (
    <>
      <Button style={{border:"0", marginTop:"4px"}} variant="outline-success" onClick={handleShow}>
        <HiOutlineChatAlt2 size="25" />
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" scroll="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>채팅방</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <CommentList className="mt-5" commentList={commentList} />
        </Offcanvas.Body>

        <Offcanvas.Title>
          <CommentInput 
            inputValue={inputValue}
            setInputValue={setInputValue}
            getCommentList={getCommentList}
            handleSubmit={handleSubmit}
          />
        </Offcanvas.Title>
      </Offcanvas>
    </>
  );
};

export default Comment;
