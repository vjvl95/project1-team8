import React, { useState,useCallback, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [bookmarklist,setBookmarklist]=useState(null)
 
  const getUser = useCallback(() => {
    Api.get("users", portfolioOwnerId).then((res) => {
      console.log(res.data)
      setUser(res.data)
      setIsEditing(false);
    });
    Api.get(`users/${portfolioOwnerId}/bookmarklist`).then(res=>{
      setBookmarklist(res.data)
      console.log(res.data)
    })

  }, [portfolioOwnerId]);

  useEffect(() => {
    getUser();
  }, [getUser]);


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
