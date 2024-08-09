import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AboutPage from "./about";

let userData1=''
function Exp7() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(userData1);
  const [userData11,setUserdata1]=useState('')
  const navigate = useNavigate();
  
  useEffect(()=>{
    
  },[])
  function Home() {
    navigate("/exp7");
  }

  async function handleClick() {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('jwtToken', token);
        console.log("Login successful");
        setUserData(token);
      } else {
        console.error("Login passed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  async function handleClick1() {
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });

      if (res.ok) {
        console.log("Registration successful");
      } else {
        console.error("Registration pass");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
 
  async function HandleClick2(event) {
    event.preventDefault()
    try {
      const res = await fetch("/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });

      if (res.ok) {
        console.log("Hello")
        navigate("/about")
      } else {
        console.error("Login pass");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  useEffect(() => {
    console.log(username);
  }, [username]);

  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    <>
      <form>
        <input onChange={handleChange} className="input1" placeholder="Username" />
        <input onChange={handleChangePassword} className="input1" placeholder="Password" />

        <button type="button" onClick={handleClick}>
          Login
        </button>
        <button type="button" onClick={handleClick1}>
          Register
        </button>
        <button onClick={HandleClick2}>
          Get data from /protected
        </button>
      </form>
      
    </>
  );
}

// Export userData state
export const getUserData = () => userData1;
export default Exp7;