import React from 'react'
import "./errorText.css"

const ErrorText = ({value,error}) => {
  return (
    <p>{error.find((err) => err.path === value).message}</p>
  )
}

export default ErrorText