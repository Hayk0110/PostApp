import React, { useState } from "react";
import "./signIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../UI/logo/Logo";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";
import useInput from "../../hooks/useInput";
import ErrorText from "../../UI/errorText/ErrorText";
import { login } from "../../store/reducers/AuthReducer";

const SignIn = () => {
  const { error } = useSelector((state) => state.auth);
  const email = useInput("");
  const password = useInput("");

  const dispatch = useDispatch();

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: email.value, password: password.value }));
  };

  return (
    <div className="login">
      <Logo />
      <form className="inputForm">
        <MyInput
          className="sign"
          type="text"
          placeholder="Your Email"
          {...email}
        />
        {error?.some((err) => err.path === "email") ? (
          // <p className="error-message">{error.find((err) => err.path === "email").message}</p>
          <ErrorText value="email" error={error} />
        ) : null}
        <MyInput
          className="sign"
          type="password"
          placeholder="Your Password"
          {...password}
        />
        <MyButton onClick={onLogin}>Login</MyButton>
      </form>
      <Link className="registerLink" to="/signup">
        Create a new Account
      </Link>
    </div>
  );
};

export default SignIn;
