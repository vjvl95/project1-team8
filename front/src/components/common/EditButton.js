import { Button } from "react-bootstrap";

const EditButton = ({ setIsEditing }) => {
  return (
    <Button
      variant="outline-info"
      size="sm"
      onClick={() => {
        setIsEditing(true);
      }}
    >
      편집
    </Button>
  );
};

export default EditButton;
