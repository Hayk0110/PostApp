import React, { useContext, useState } from "react";
import './signUp.scss'
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Logo from "../../UI/logo/Logo";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";
import useInput from "../../hooks/useInput";

const SignUp = () => {
  const email = useInput("");
  const password = useInput("");
  const passwordAgain = useInput("");
  

  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    if (password.value !== passwordAgain.value) {
      console.error("password is not the same");
      return;
    }
    AuthService.register({ email: email.value, password: password.value });
    navigate("/login");
  };

  return (
    <div className="register">
      <Logo />
      <form className="inputForm">
        <MyInput
          className="sign"
          type="text"
          placeholder="Your Email"
          {...email}
        />
        <MyInput
        className="sign"
          type="password"
          placeholder="Your Password"
          {...password}
        />
        <MyInput
        className="sign"
          type="password"
          placeholder="Again Password"
          {...passwordAgain}
        />
        <MyButton onClick={onRegister}>Sign Up</MyButton>
      </form>
      <Link to='/signin' className="loginLink" >Log into your Account</Link>
    </div>
  );
};

export default SignUp;
