import React, { useState } from 'react'

const useToogle = (initialValue) => {
  const [clicked,setClicked] = useState(initialValue);

  const handleChange = () =>{
    setClicked(prev => !prev);
  }

  return{
    clicked,
    onClick: handleChange
  }
}

export default useToogle