import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import EducationEditForm from "./EducationEditForm";
import EditButton from "../EditButton";
import * as API from "../../api";

const EducationListItem = ({
  id,
  school,
  major,
  position,
  isEditable,
  getEducationList,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSchool, setNewSchool] = useState(school);
  const [newMajor, setNewMajor] = useState(major);
  const [newPosition, setNewPostion] = useState(position);

  const HandleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await API.delete(`educations/${id}`);
        getEducationList();
      } catch (err) {
        console.log("삭제 실패하였습니다.", err);
      }
    } else {
      return;
    }
  };

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemSchool={newSchool}
          itemMajor={newMajor}
          itemPosition={newPosition}
          setNewSchool={setNewSchool}
          setNewMajor={setNewMajor}
          setNewPosition={setNewPostion}
        />
      ) : (
        <Row className="align-items-center mb-3">
          <Col>
            <span>{newSchool}</span>
            <br />
            <span className="text-muted">
              {newMajor} ({newPosition})
            </span>
          </Col>

          {isEditable && (
            <>
              <Col className="col-lg-1">
                <EditButton setIsEditing={setIsEditing} />
              </Col>
              <Col className="col-lg-1">
                <Button variant="outline-info" size="sm" onClick={HandleDelete}>
                  삭제
                </Button>
              </Col>
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default EducationListItem;
