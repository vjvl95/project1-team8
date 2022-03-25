import { Table, Button } from "react-bootstrap";
import * as Api from "../../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Network.module.css";

function UserTable() {
  const [top3, setTop3] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getTop3() {
      const res = await Api.get("user/bookmarktop3");
      setTop3(res.data);
    }

    getTop3();
    console.log(top3);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <img
        alt="TOP3"
        src="/image/bookmark_header.png"
        style={{ width: "35%" }}
      />
      <Table
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 30px",
          width: "60rem",
        }}
        striped
      >
        <tbody>
          {top3.map(({ name, email, bookMarked, id }, index) => (
            <tr
              style={{
                marginBottom: "30px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <td className="table_style">{index + 1}</td>
              <td className="table_style">{name}</td>
              <td className="table_style">{email}</td>
              <td className="table_style">{bookMarked}</td>
              <td className="table_style">
                <Button onClick={() => navigate(`/users/${id}`)}>
                  상세보기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserTable;
