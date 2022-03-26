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
    'All': 'all',
    '학력': 'education',
    '수상이력': 'award',
    '프로젝트': 'project',
    '자격증': 'certificate',
  };

  const { searchDispatch } = useContext(DispatchContext);

  const [title, setTitle] = useState('All');
  const [input, setInput] = useState({});

  const onTitleClick = (e) => {
    setTitle(e.target.innerText);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newCategoryValue = category[title];
    const newSearchValue = e.target.search.value;
    if (
      input['categoryValue'] !== newCategoryValue ||
      input['searchValue'] !== newSearchValue
    ) {
      setInput({
        categoryValue: newCategoryValue,
        searchValue: newSearchValue,
      });
      searchDispatch({
        type: 'SEARCH',
        payload: {
          categoryValue: newCategoryValue,
          searchValue: newSearchValue,
        },
      });
    }
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
          <Dropdown.Item onClick={onTitleClick}>All</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onTitleClick}>학력</Dropdown.Item>
          <Dropdown.Item onClick={onTitleClick}>수상이력</Dropdown.Item>
          <Dropdown.Item onClick={onTitleClick}>프로젝트</Dropdown.Item>
          <Dropdown.Item onClick={onTitleClick}>자격증</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
