import { Table, Button } from "react-bootstrap";
import * as Api from "../../api";
import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Network.module.css";
import { FaMedal } from "react-icons/fa";
import { BookmarkListContext } from "../../App";
import {AiTwotoneStar,AiOutlineStar} from "react-icons/ai"

function UserTable() {
  const [top3, setTop3] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function getTop3() {
      const res = await Api.get("user/bookmarktop3");
      setTop3(res.data);
    }

    getTop3();
  }, []);

  function medal(num) {
    return num === 1 ? (
      <FaMedal size="30" style={{ color: "gold" }} />
    ) : num === 2 ? (
      <FaMedal size="30" style={{ color: "#D3D3D3" }} />
    ) : (
      <FaMedal size="30" style={{ color: "#cd7f32" }} />
    );
  }
  function bookmark(index)
  {
    return index === 1 ? (
      <AiTwotoneStar style={{marginRight:"10px", marginBottom:"2px",color: "gold"}}/>
      ) : index === 2 ? (
        <AiTwotoneStar style={{marginRight:"10px", marginBottom:"2px",color: "#D3D3D3"}}/>
        ) : (
          <AiTwotoneStar style={{marginRight:"10px", marginBottom:"2px",color: "#cd7f32"}}/>
          );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
              <td className={styles["table_style"]}>{medal(index + 1)}</td>
              <td className={styles["table_style"]}>{name}</td>
              <td className={styles["table_style"]}>{email}</td>
              <td className={styles["table_style"]}> {bookmark(index+1)}{bookMarked}</td>
              <td className={styles["table_style"]}>
                <Button onClick={() => navigate(`/users/${id}`)}>상세보기</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserTable;
