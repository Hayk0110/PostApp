import React from 'react'
import './userDropdown.scss';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import MyButton from '../../UI/button/MyButton';
import { logout } from '../../store/reducers/AuthReducer';
import { clearFilter, setSearch } from '../../store/reducers/FilterReducer';
import { changePage } from '../../store/reducers/PaginationReducer';

const UserDropdown = ({ author }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const navigateToMyPosts = () =>{
    dispatch(setSearch("by title"));
    dispatch(clearFilter());
    dispatch(changePage(1));
    navigate(`/users/${author}/posts`)
  }

  const logoutHandle = () =>{
    dispatch(logout());
    dispatch(clearFilter());
    dispatch(changePage(1));
    navigate("/");
  }

  return (
    <div className="dropDown">
        <div className="arrowUp"></div>
        <MyButton onClick={navigateToMyPosts}>My posts</MyButton>
        <MyButton onClick={logoutHandle}>Logout</MyButton>
      </div>
  )
}

export default UserDropdown