import React, { useEffect, useRef, useState } from "react";
import "./header.scss";

import Logo from "../../UI/logo/Logo";
import { AccountCircle } from "@mui/icons-material";
import UserDropdown from "../userDropdown/UserDropdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyButton from "../../UI/button/MyButton";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const [dropdownShown, setDropdownShown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownShown(false);
    }
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
        {user ? <AccountCircle
          className="user"
          onClick={toggleDropdown}
          ref={dropdownRef}
        /> : <MyButton onClick={()=> navigate('/signin')}>Sign in</MyButton>}
      </header>
      {dropdownShown ? <UserDropdown id={user.id} /> : null}
    </div>
  );
};

export default Header;
