import { IoIosSearch } from 'react-icons/io';
import { useContext, useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from 'react-bootstrap';
import { DispatchContext } from '../../App';

const SearchBox = () => {
  const category = {
    '수상이력': 'award',
    '프로젝트': 'project',
    '자격증': 'certificate',
    '학력사항': 'education',
  };

  const { searchDispatch } = useContext(DispatchContext);

  const [title, setTitle] = useState('All');
  const onClick = (e) => {
    setTitle(e.target.innerText);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const categoryValue = category[title] || 'all';
    const searchValue = e.target.search.value;
    searchDispatch({
      type: 'SEARCH',
      payload: {
        categoryValue,
        searchValue,
      },
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className='mt-1'>
        <FormControl placeholder='Search' name='search' />
        <Button
          variant='outline-warning'
          id='button-addon'
          type='submit'
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid gray',
          }}
        >
          <IoIosSearch />
        </Button>
        <DropdownButton
          variant='outline-secondary'
          title={title}
          id='input-group-dropdown-2'
          align='end'
        >
          <Dropdown.Item onClick={onClick}>All</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onClick}>학력</Dropdown.Item>
          <Dropdown.Item onClick={onClick}>수상이력</Dropdown.Item>
          <Dropdown.Item onClick={onClick}>프로젝트</Dropdown.Item>
          <Dropdown.Item onClick={onClick}>자격증</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
