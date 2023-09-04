import React, { useEffect } from "react";
import "./postModal.scss";

import { useForm } from "react-hook-form";

import { PostModalSchema } from "../../Schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import ErrorText from "../../UI/errorText/ErrorText";
import MyButton from "../../UI/button/MyButton";

const PostModal = ({
  modal,
  postTitle = "",
  postText = "",
  title,
  category = "choose category",
  buttonText,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    getValues,
    setValue,
    clearErrors,
    setError,
  } = useForm({
    mode: "all",
    defaultValues: {
      title: postTitle,
      text: postText,
      select: category,
    },
    resolver: zodResolver(PostModalSchema),
  });

  useEffect(() => {
    setValue("title", postTitle);
    setValue("text", postText);
    setValue("select", category);
    clearErrors();
  }, [modal]);

  const submitHandler = () => {
    if (
      getValues("title").trim() === postTitle &&
      getValues("text").trim() === postText &&
      getValues("select") === category
    ) {
      return;
    }

    if (getValues("select") === "choose category") {
      setError("select", { message: "Please choose category" });
      return;
    }

    onSubmit(getValues("title"), getValues("text"), getValues("select"));
  };

  return (
    <form className="postModal" onSubmit={handleSubmit(submitHandler)}>
      <h3>{title}</h3>
      <div className="inputs">
        <h5>Post title</h5>
        {errors.title && <ErrorText value={errors.title.message} />}
        <input
          className={errors.title ? "modalInput error" : "modalInput"}
          {...register("title")}
        />
        <h5>Post text</h5>
        {errors.text && <ErrorText value={errors.text.message} />}
        <textarea
          className={errors.text ? "modalInput error" : "modalInput"}
          {...register("text")}
        />
        <h5>Post category</h5>
        {errors.select && <ErrorText value={errors.select.message} />}
        <select
          className="modalSelect"
          defaultValue="choose category"
          {...register("select")}
        >
          <option value="choose category" disabled>
            Choose category
          </option>
          <option value="football">Football</option>
          <option value="news">News</option>
          <option value="coding">Coding</option>
          <option value="something else">Something else</option>
        </select>
      </div>
      <div className="buttons">
        <MyButton type="submit" disabled={!formState.isValid}>
          {buttonText}
        </MyButton>
      </div>
    </form>
  );
};

export default PostModal;
