import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import * as Api from '../../api'

function ProjectEditForm({setIsEditing}){
    const [description,setDescription]=useState("")
    const [title,setTitle]=useState("")
    const [from_date,setFrom_date]=useState(new Date().toISOString().substring(0, 10))
    const [to_date,setTo_date]=useState(new Date().toISOString().substring(0, 10))

    useEffect(()=>{console.log(from_date)},[from_date])
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

          <Form.Group className='mb-3'>
          <Form.Control
              type='date'
              placeholder='from_date'
              value={from_date}
              onChange={(e) => setFrom_date(e.target.value)}
            />  
            <Form.Control
              type='date'
              placeholder='end_date'
              value={to_date}
              onChange={(e) => setTo_date(e.target.value)}
            />                
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