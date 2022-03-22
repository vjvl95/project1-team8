import { Button } from "react-bootstrap";
import * as API from "../api";

const DeleteButton = ({ itemId, getAwardList }) => {
  const HandleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      API.delete(`awards/${itemId}`);
      getAwardList();
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
