import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import * as API from "../../api";

const CommentInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("comments/comment", {
      comment: inputValue,
    });

    setInputValue("");
    getCommentList();
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

  const CommentList = () => {
    return (
      <>
        {commentList?.map((item) => (
          <div key={item.id}>{item.comment}</div>
        ))}
      </>
    );
  };

  return (
    <>
      <Form>
        <InputGroup className="mb-3">
          <img src="https://img.icons8.com/material-two-tone/24/000000/recurring-appointment.png" />
          <FormControl
            placeholder="입력하세요."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleSubmit}
          >
            쓰기
          </Button>
        </InputGroup>
      </Form>
      <CommentList />
    </>
  );
};

export default CommentInput;
