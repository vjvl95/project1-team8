import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import React, {useState,useEffect} from 'react'
import * as Api from '../../api'
import DatePicker from "react-datepicker";


function CertificationEditForm({setIsEditing,setCertificateList,setThisCertification,ThisCertification,id,portfolioOwnerId})

{
  
    const [edit_when_date,setEdit_from_date]=useState(new Date(ThisCertification.from_date))

    const  handleSubmit = async (portfolioOwnerId,e) => {
        e.preventDefault();
           try
           { await Api.put(`projects/${id}`, {
            title:ThisCertification.title,
            description:ThisCertification.description,
            when_date : edit_when_date.toISOString().substring(0, 10),
          })     
           }
        catch(e){
          console.log("수정에 실패했습니다")
        }
  
        const res=await Api.get("certificatelist",portfolioOwnerId)
        setCertificateList(res.data)
        setIsEditing(false)
    }

    return <>
    <Card.Body>
        <Form onSubmit={(e) => {handleSubmit(portfolioOwnerId,e)}}>
          <Form.Group controlId='certificateEditTitle' className='mb-3'>
           <Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={ThisCertification.title}
              onChange={(e) => setThisCertification({...ThisCertification,
                title:e.target.value})}
            />
          </Form.Group>

          <Form.Group controlId='certificateEditdescription' className='mb-3'>
            <Form.Control
            type='description'
            placeholder='상세내역'
            value={ThisCertification.description}
            onChange={(e) => setThisCertification({...ThisCertification,
              description:e.target.value})}
          />
          </Form.Group>

          <Form.Group className='mt-3 row'>
          <Col className="col-auto">
         <DatePicker selected={edit_when_date}  onChange={(date) => setEdit_from_date(date)}/>
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

export default CertificationEditForm
