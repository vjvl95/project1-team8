import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import * as Api from '../../api'
import DatePicker from "react-datepicker";

function ProjectEditForm({setIsEditing}){
    const [description,setDescription]=useState("")
    const [title,setTitle]=useState("")
    const [from_date,setFrom_date]=useState(new Date())
    const [to_date,setTo_date]=useState(new Date())

    useEffect(()=>{
      console.log(from_date.toISOString().substring(0, 10))
      console.log(to_date.toISOString().substring(0, 10))

    },[from_date,to_date])
    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    return <>
    <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='useEditName' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditEmail' className='mb-3'>
            <Form.Control
              type='description'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mt-3 row'>
          <Col className="col-auto"> 
            <DatePicker selected={from_date}  onChange={(date) => setFrom_date(date)}/>
          </Col>
          <Col className="col-auto">
          <DatePicker selected={to_date}  onChange={(date) => setTo_date(date)}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>

    </>
}

export default ProjectEditForm