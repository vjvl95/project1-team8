import { Button } from "react-bootstrap";

const PlusButton = ({ setIsEditing }) => {
  return (
    <Button variant="primary" onClick={() => setIsEditing((state) => !state)}>
      +
    </Button>
  );
};

export default PlusButton;
