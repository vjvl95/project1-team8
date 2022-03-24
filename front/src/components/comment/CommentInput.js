import { InputGroup, Button, Form, FormControl } from 'react-bootstrap';
import { IoMdRefreshCircle } from 'react-icons/io';

const CommentInput = ({
  inputValue,
  setInputValue,
  getCommentList,
  handleSubmit,
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className='mb-3'>
          <IoMdRefreshCircle
            className='mt-1'
            size='30'
            cursor='pointer'
            onClick={getCommentList}
          />
          <FormControl
            placeholder='입력하세요.'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant='outline-secondary' id='button-addon2' type='submit'>
            쓰기
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default CommentInput;
