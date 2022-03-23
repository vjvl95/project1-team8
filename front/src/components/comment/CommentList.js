import { useRef, useEffect } from "react";

const CommentList = ({ commentList }) => {
  const messageRef = useRef(null);

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [commentList]);

  return (
    <div>
      {commentList?.map((item) => (
        <div key={item.id}>{item.comment}</div>
      ))}
      <div ref={messageRef} />
    </div>
  );
};

export default CommentList;
