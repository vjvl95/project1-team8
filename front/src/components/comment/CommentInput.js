import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import * as API from "../../api";
import { IoMdRefreshCircle } from "react-icons/io";

const CommentInput = () => {
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
      <CommentList />
      <Form>
        <InputGroup className="mb-3">
          <IoMdRefreshCircle
            className="mt-2 me-2"
            size="25"
            cursor="pointer"
            onClick={getCommentList}
          />
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
    </>
  );
};

export default CommentInput;
