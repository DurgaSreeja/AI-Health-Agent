import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ran.css'; // Import your CSS file
import { useUserData } from "./confirmation";
let userData1 = '';

function Registrationform() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useUserData(false);
  
  const navigate = useNavigate();
  
  

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
        navigate('/')
       
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
        console.error("Registration passed");
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
        setUserData(true)
        navigate("/")
        
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
    <div>
      <div id="container">
        {/* Cover Box */}
        <div id="cover" >
          {/* Sign Up Section */}
          <h1 className="sign-up">Welcome back</h1>
          <p className="sign-up">Please enter your credentials to log in<br /></p>
          <a className="button sign-up" href="#cover">Sign Up</a>
          {/* Sign In Section */}
          <h1 className="sign-in">Hello Friend</h1>
          <p className="sign-in">Please fill your personal credentials to <br /> start the journey with us</p>
          <br />
          <a className="button sub sign-in" href="#">Sign In</a>
        </div>
        {/* Login Box */}
        <div id="login">
          <h1>Sign In</h1>
          <form>
            <input onChange={handleChange} type="email" placeholder="Email" autoComplete="off" /><br />
            <input onChange={handleChangePassword} type="password" placeholder="Password" autoComplete="off" /><br />
            <a id="forgot-pass" href="#">Forgot your password?</a><br />
            <input onClick={handleClick} className="submit-btn" type="submit" value="Sign In" />
          </form>
        </div>
        {/* Register Box */}
        <div id="register">
          <h1>Create Account</h1>
          <form>
            <input onChange={handleChange} type="text" placeholder="Name" autoComplete="off" /><br />
            <input type="email" placeholder="Email" autoComplete="off" /><br />
            <input onChange={handleChangePassword} type="password" placeholder="Password" autoComplete="off" /><br />
            <input onClick={handleClick1} className="submit-btn" type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

// Export userData state
export const getUserData = () => userData1;
export default Registrationform;
