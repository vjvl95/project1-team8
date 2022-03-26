import { Table, Button } from "react-bootstrap";
import * as Api from "../../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Network.module.css";
import {FaMedal} from "react-icons/fa"
import { BookmarkListContext } from "../../App";

function UserTable() {
  const [top3, setTop3] = useState([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState();
  const { bookmarklist } = useContext(BookmarkListContext);

  useEffect(() => {
    async function getTop3() {
      const res = await Api.get("user/bookmarktop3");
      setTop3(res.data);
    }

    getTop3();
    console.log(top3);
  }, []);

  useEffect(() => {

    if (bookmarklist !== undefined) {
      bookmarklist?.includes(user?.id) ? setToggle(true) : setToggle(false);
    }
    if (isEditable === false) {
      bookmarklist?.includes(portfolioOwnerId)
        ? setToggle(true)
        : setToggle(false);
    }
  }, [bookmarklist]);



  function medal(num){
    return (
              num===1 ?<FaMedal size="30"style={{color:"gold"}}/>
              :num===2?< FaMedal size="30" style={{color:"#D3D3D3"}}/>
              :<FaMedal size="30" style={{color:"#cd7f32"}}/>
    )
  }

  function bookmark(bookmarked){

    return (
      <>
        {toggle ? (
          <AiTwotoneStar
            style={{ fontSize: "30px", marginLeft: "90px" }}
            onClick={toggleHander}
          />
        ) : (
          <AiOutlineStar
            style={{ fontSize: "30px", marginLeft: "90px" }}
            onClick={toggleHander}
          />
        )}
        <span
          style={{ fontSize: "20px", marginLeft: "5px", marginTop: "15px" }}
        >
          {bookmarked}
        </span>
      </>

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
              <td className="table_style">{medal(index + 1)}</td>
              <td className="table_style">{name}</td>
              <td className="table_style">{email}</td>
              <td className="table_style">{bookmark(bookMarked)}</td>
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
