import { InputGroup, Button } from "react-bootstrap";

const ChattingInput = () => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        쓰기
      </Button>
    </InputGroup>
  );
};

export default ChattingInput;
