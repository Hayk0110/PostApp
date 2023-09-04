import React, { useEffect, useRef, useState } from "react";
import "./header.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearError } from "../../store/reducers/AuthReducer";

import UserDropdown from "../userDropdown/UserDropdown";

import Logo from "../../UI/logo/Logo";
import MyButton from "../../UI/button/MyButton";

import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const [dropdownShown, setDropdownShown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownShown(false);
    }
  };

  const navigateToSignIn = () => {
    dispatch(clearError());
    navigate("/signin");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownShown((prevShow) => !prevShow);
  };

  return (
    <div className="wrapper">
      <header>
        <Logo className="header" />
        {user ? (
          <div className="userInfo" onClick={toggleDropdown} ref={dropdownRef}>
            <AccountCircle className="user" />
            <p>{user?.email}</p>
          </div>
        ) : (
          <MyButton onClick={navigateToSignIn}>Sign in</MyButton>
        )}
      </header>
      {dropdownShown ? <UserDropdown author={user?.email} /> : null}
    </div>
  );
};

export default Header;
