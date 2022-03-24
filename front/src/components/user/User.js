import React, { useState,useContext, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";
import { BookmarkListContext } from "../../App";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const {bookmarklist,setBookmarklist}=useContext(BookmarkListContext)
 
  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.

    async function getUser()
    {
      const res_user=await Api.get("users", portfolioOwnerId)
      setUser(res_user.data)
      const res_bookmark=await Api.get('user/bookmarklist')
      setBookmarklist(res_bookmark.data)
    }
    getUser()
    }, []);



  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard 
          user={user}
          aa={11}
          portfolioOwnerId={portfolioOwnerId}
          bookmarklist={bookmarklist}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default User;
