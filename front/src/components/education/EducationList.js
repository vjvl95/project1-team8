import { Card, Container, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import React, { useEffect, useState } from "react";

const EducationList = ({ portfolioOwnerId }) => {
  const [Educations, setEducations] = useState([]);

  useEffect(() => {
    // "educationlist/:user_id" 로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, []);

  return;
};

export default EducationList;
