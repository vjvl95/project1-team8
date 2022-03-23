import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";

const ChattingInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [chattingLog, setChattingLog] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChattingLog((curr) => [...curr, inputValue]);
    setInputValue("");
  };

  const ChattingLog = () => {
    return (
      <>
        {chattingLog.map((chatting) => (
          <div>{chatting}</div>
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
      <ChattingLog />
    </>
  );
};

export default ChattingInput;
