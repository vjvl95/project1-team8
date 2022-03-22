import { Button } from "react-bootstrap";

const DeleteButton = () => {
  const HandleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      return;
    } else {
      return;
    }
  };

  return (
    <Button variant="outline-info" size="sm" onClick={HandleDelete}>
      삭제
    </Button>
  );
};

export default DeleteButton;
