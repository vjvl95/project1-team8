import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";

const CommentInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [commentLog, setCommentLog] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCommentLog((curr) => [
      {
        key: new Date().getTime(),
        value: inputValue,
      },
      ...curr,
    ]);
    setInputValue("");
  };

  const CommentLog = () => {
    return (
      <>
        {commentLog.map((comment) => (
          <div key={comment.key}>{comment.value}</div>
        ))}
      </>
    );
  };

  return (
    <>
      <Form>
        <InputGroup className="mb-3">
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
      <CommentLog />
    </>
  );
};

export default CommentInput;
