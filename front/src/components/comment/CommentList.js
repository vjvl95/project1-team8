export const CommentList = ({ commentList }) => {
  return (
    <>
      {commentList?.map((item) => (
        <div key={item.id}>{item.comment}</div>
      ))}
    </>
  );
};
