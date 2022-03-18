import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import * as Api from '../../api'
import DatePicker from "react-datepicker";

function ProjectEditForm({thisProject,setThisProject,id,setIsEditing,portfolioOwnerId,setProjectList,isAdding,setIsAdding})
{
    const [description,setDescription]=useState("")
    const [title,setTitle]=useState("")
    const [from_date,setFrom_date]=useState(new Date())
    const [to_date,setTo_date]=useState(new Date())
    const [edit_from_date,setEdit_from_date]=useState(new Date(thisProject?.from_date))
    const [edit_to_date,setEdit_to_date]=useState(new Date(thisProject?.to_date))
      
    useEffect(()=>{

    },[thisProject.from_date,thisProject.to_date])
    const  handleSubmit = (isAdding,portfolioOwnerId,e) => {
        e.preventDefault();
        
        if(isAdding===true)
        {
          Api.put(`projects/${id}`, {
            title,
            description,
            from_date : edit_from_date.toISOString().substring(0, 10),
            to_date : edit_to_date.toISOString().substring(0, 10)
          })     
          Api.get(`projects`,id).then((res) => setThisProject(res.data))   

          setIsAdding(false)
        }

        else{
          Api.post(`project/create`, {
            user_id:portfolioOwnerId,
            title,
            description,
            from_date : from_date.toISOString().substring(0, 10),
            to_date : to_date.toISOString().substring(0, 10)
          })
          Api.get("projectlist",portfolioOwnerId).then((res) => setProjectList(res.data))
          setIsEditing(false)
        }   
    }


    return <>
    <Card.Body>
        <Form onSubmit={(e) => {handleSubmit(isAdding,portfolioOwnerId,e)}}>


          <Form.Group controlId='userEditTitle' className='mb-3'>
            {isAdding?<Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={thisProject.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            :<Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            }
          </Form.Group>

          <Form.Group controlId='userEditdescription' className='mb-3'>
            {isAdding? <Form.Control
            type='description'
            placeholder='상세내역'
            value={thisProject.description}
            onChange={(e) => setDescription(e.target.value)}
          />
            : <Form.Control
              type='description'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />}
          </Form.Group>

          <Form.Group className='mt-3 row'>
          <Col className="col-auto"> 
            {isAdding?<DatePicker selected={edit_from_date}  onChange={(date) => setEdit_from_date(date)}/>
            :<DatePicker selected={from_date}  onChange={(date) => setFrom_date(date)}/>
            }
          </Col>
          <Col className="col-auto">
          {isAdding?<DatePicker selected={edit_to_date}  onChange={(date) => setEdit_to_date(date)}/>
            :<DatePicker selected={to_date}  onChange={(date) => setTo_date(date)}/>
            }          </Col>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
          <Col sm={{ span: 20 }}>
                <Button variant='primary' type='submit'  className='me-3'>
                확인
              </Button>
              {
              isAdding
              ?(<Button variant='secondary' onClick={() => setIsAdding(false)}>취소</Button>)
              :(<Button variant='secondary' onClick={() => setIsEditing(false)}>취소</Button>)
              }
          </Col>

          </Form.Group>
        </Form>
      </Card.Body>

    </>
}

export default ProjectEditForm