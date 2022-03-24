import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import { UserStateContext } from '../App';
import { DispatchContext } from '../App';

import * as Api from '../api';
import User from './user/User';
import Award from './award/Award';
import Education from './education/Education';
import Project from './project/Project';
import Certificate from './certificate/Certificate';

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const { searchDispatch } = useContext(DispatchContext);

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get('users', ownerId);
    const ownerData = res.data;
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate('/login', { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  useEffect(() => {
    searchDispatch({
      type: 'DEFAULT',
    });
  }, [params, searchDispatch]);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <Container fluid>
      <Row>
        <Col md='3' lg='3'>
          <User
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
        </Col>
        <Col>
          <Education
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
          <Award
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
          <Project
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
          <Certificate
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Portfolio;
