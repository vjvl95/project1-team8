import { Card, Row, Col } from "react-bootstrap";
import CertificateList from "./CertificateList";
import CertificateEditForm from "./CertificateEditForm";
import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import PlusButton from "../common/PlusButton";

function Certificate({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [certificateList, setCertificateList] = useState([]);

  const getCertificateList = useCallback(() => {
    Api.get(`certificatelist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      setCertificateList(data);
      setIsEditing(false);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    getCertificateList();
  }, [getCertificateList]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <CertificateList
          isEditing={isEditing}
          isEditable={isEditable}
          certificateList={certificateList}
          getCertificateList={getCertificateList}
        />
        {isEditable && (
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <PlusButton setIsEditing={setIsEditing} />
            </Col>
          </Row>
        )}
        {isEditing && (
          <CertificateEditForm
            setIsEditing={setIsEditing}
            getCertificateList={getCertificateList}
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificate;
