import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, {useState,useEffect} from 'react'
import * as Api from '../../api'
import DatePicker from "react-datepicker";

function ProjectEditForm({thisProject,setThisProject,id,setIsEditing,portfolioOwnerId,setProjectList})
{
  
    const [edit_from_date,setEdit_from_date]=useState(new Date(thisProject.from_date))
    const [edit_to_date,setEdit_to_date]=useState(new Date(thisProject.to_date))

    const  handleSubmit = async (portfolioOwnerId,e) => {
        e.preventDefault();
        
           try
           { await Api.put(`projects/${id}`, {
            title:thisProject.title,
            description:thisProject.description,
            from_date : edit_from_date.toISOString().substring(0, 10),
            to_date : edit_to_date.toISOString().substring(0, 10)
          })     
           }
        catch(e){
          console.log("수정에 실패했습니다")
        }
  
        const res=await Api.get("projectlist",portfolioOwnerId)
        setProjectList(res.data)
        setIsEditing(false)

    }

    return <>
    <Card.Body>
        <Form onSubmit={(e) => {handleSubmit(portfolioOwnerId,e)}}>
          <Form.Group controlId='userEditTitle' className='mb-3'>
           <Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={thisProject.title}
              onChange={(e) => setThisProject({...thisProject,
                title:e.target.value})}
            />
          </Form.Group>

          <Form.Group controlId='userEditdescription' className='mb-3'>
            <Form.Control
            type='description'
            placeholder='상세내역'
            value={thisProject.description}
            onChange={(e) => setThisProject({...thisProject,
              description:e.target.value})}
          />
          </Form.Group>

          <Form.Group className='mt-3 row'>
          <Col className="col-auto"> 
            <DatePicker selected={edit_from_date} onChange={(date) => setEdit_from_date(date)}/>
          </Col>
          <Col className="col-auto">
         <DatePicker selected={edit_to_date}  onChange={(date) => setEdit_to_date(date)}/>
          </Col>
          </Form.Group>
          <Form.Group as={Row} className='mt-3 text-center'>
          <Col sm={{ span: 20 }}>
                <Button variant='primary' type='submit'  className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>취소</Button>
          </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </>
}

export default ProjectEditForm