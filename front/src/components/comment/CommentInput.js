import { InputGroup, Button, Form, FormControl, Row } from "react-bootstrap";
import { IoMdRefreshCircle } from "react-icons/io";

const CommentInput = ({
  inputValue,
  setInputValue,
  getCommentList,
  handleSubmit,
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <IoMdRefreshCircle
            className="mt-1"
            size="30"
            cursor="pointer"
            onClick={getCommentList}
          />
          <InputGroup className="mb-3" style={{ width: "300px" }}>
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
              type="submit"
            >
              쓰기
            </Button>
          </InputGroup>
        </div>
      </Form>
    </>
  );
};

export default CommentInput;
