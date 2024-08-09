import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    HandleClick2();
  },[])

  async function HandleClick2(event) {
  
    try {
      const res = await fetch("/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({
          name: 'Hello',
          password: 'password',
        }),
      });

      if (res.ok) {
        console.log("Hello")
        
      } else {
        console.error("Login pass");
        navigate("/")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (
    <div>
      <h1>My Component</h1>
    </div>
  );
};
export default AboutPage