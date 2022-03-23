import { useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from 'react-bootstrap';

const SearchBox = () => {
  const [title, setTitle] = useState('All');
  const onClick = (e) => {
    setTitle(e.target.innerText);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    alert('서브밋');
  };
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className='mt-1'>
        <FormControl placeholder='Search' />
        <Button variant='outline-warning' id='button-addon' type='submit'>
          🔍
        </Button>
        <DropdownButton
          variant='outline-secondary'
          title={title}
          id='input-group-dropdown-2'
          align='end'
        >
          <Dropdown.Item onClick={onClick}>All</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onClick}>수상이력</Dropdown.Item>
          <Dropdown.Item onClick={onClick}>프로젝트</Dropdown.Item>
          <Dropdown.Item onClick={onClick}>자격증</Dropdown.Item>
          <Dropdown.Item onClick={onClick}>학력사항</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
