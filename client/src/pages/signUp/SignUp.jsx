import React from "react";
import "./signUp.scss";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../Schemas";

import Logo from "../../UI/logo/Logo";
import MyButton from "../../UI/button/MyButton";
import ErrorText from "../../UI/errorText/ErrorText";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const navigate = useNavigate();

  const onRegister = () => {
    AuthService.register({
      email: getValues("email"),
      password: getValues("password"),
    }).catch((e) => console.log(e));
    navigate("/");
  };

  return (
    <div className="register">
      <Logo />
      <form className="inputForm" onSubmit={handleSubmit(onRegister)}>
        {errors.email && <ErrorText value={errors.email.message} />}
        <input
          className={errors.email ? "sign error" : "sign"}
          type="text"
          placeholder="Your Email"
          {...register("email")}
        />
        {errors.password && <ErrorText value={errors.password.message} />}
        <input
          className={errors.password ? "sign error" : "sign"}
          type="password"
          placeholder="Your Password"
          {...register("password")}
        />
        {errors.confirm && <ErrorText value={errors.confirm.message} />}
        <input
          className={errors.confirm ? "sign error" : "sign"}
          type="password"
          placeholder="Password Again"
          {...register("confirm")}
        />
        <MyButton
          onClick={onRegister}
          type="submit"
          disabled={!formState.isValid}
        >
          Sign Up
        </MyButton>
      </form>
      <p className="attencion">After Sign up please verify your email</p>
      <Link to="/signin" className="loginLink">
        Log into your Account
      </Link>
    </div>
  );
};

export default SignUp;
