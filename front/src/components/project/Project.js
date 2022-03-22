import { Card, Row, Col } from "react-bootstrap";
import ProjectList from "./ProjectList";
import ProjectEditForm from "./ProjectEditForm";
import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import PlusButton from "../PlusButton";

function Project({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const getProjectList = useCallback(() => {
    Api.get(`projectlist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      setProjectList(data);
      setIsEditing(false);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    getProjectList();
  }, [getProjectList]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <ProjectList
          isEditing={isEditing}
          isEditable={isEditable}
          projectList={projectList}
        />
        {isEditable && (
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <PlusButton setIsEditing={setIsEditing} />
            </Col>
          </Row>
        )}
        {isEditing && (
          <ProjectEditForm
            setIsEditing={setIsEditing}
            getProjectList={getProjectList}
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Project;
