import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, { useState} from 'react'
import * as Api from '../../api'
import DatePicker from "react-datepicker";

function CertificateAddForm({setIsAdding,portfolioOwnerId,setCertificateList}){
    const [description,setDescription]=useState("")
    const [title,setTitle]=useState("")
    const [when_date,setWhen_date]=useState(new Date())

    const  handleSubmit = async (portfolioOwnerId,e) => {
        e.preventDefault();
       
          try{
            await Api.post(`certificate/create`, {
            user_id:portfolioOwnerId,
            title,
            description,
            when_date : when_date.toISOString().substring(0, 10)
          })
        }
          catch(e){
          }

        setIsAdding(false)
        const res=await Api.get("certificatelist",portfolioOwnerId)
        setCertificateList(res.data)
    }


    return <>
    <Card.Body>
        <Form onSubmit={(e) => {handleSubmit(portfolioOwnerId,e)}}>
          <Form.Group controlId='userEditTitle' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='자격증이름'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditdescription' className='mb-3'>
           <Form.Control
              type='description'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mt-3 row'>
          <Col className="col-auto"> 
         <DatePicker selected={when_date}  onChange={(date) => setWhen_date(date)}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
          <Col sm={{ span: 20 }}>
                <Button variant='primary' type='submit'  className='me-3'>
                확인
              </Button>
            
            <Button variant='secondary' onClick={() => setIsAdding(false)}>취소</Button>
            
          </Col>

          </Form.Group>
        </Form>
      </Card.Body>

    </>

}

export default CertificateAddForm