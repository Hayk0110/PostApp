import React from "react";
import "./signIn.scss";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { login } from "../../store/reducers/AuthReducer";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../Schemas";

import { Link } from "react-router-dom";

import Logo from "../../UI/logo/Logo";
import MyButton from "../../UI/button/MyButton";
import ErrorText from "../../UI/errorText/ErrorText";


const SignIn = () => {
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
    },
    resolver: zodResolver(SignInSchema),
  });

  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(
      login({ email: getValues("email"), password: getValues("password") })
    );
  };

  return (
    <div className="login">
      <Logo />
      {error && <ErrorText value={error} />}
      <form className="inputForm" onSubmit={handleSubmit(onLogin)}>
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
        <MyButton onClick={onLogin} type="submit" disabled={!formState.isValid}>
          Login
        </MyButton>
      </form>
      <Link className="registerLink" to="/signup">
        Create a new Account
      </Link>
    </div>
  );
};

export default SignIn;
