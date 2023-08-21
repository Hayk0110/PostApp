import React from 'react'
import './userDropdown.scss';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import MyButton from '../../UI/button/MyButton';
import { logout } from '../../store/reducers/AuthReducer';

const UserDropdown = ({ id }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  return (
    <div className="dropDown">
        <div className="arrowUp"></div>
        <MyButton onClick={()=>navigate(`/posts/${id}`)}>My posts</MyButton>
        <MyButton onClick={()=>dispatch(logout())}>Logout</MyButton>
      </div>
  )
}

export default UserDropdown