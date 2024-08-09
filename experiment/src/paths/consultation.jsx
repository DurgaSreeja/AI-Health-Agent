import React from "react"
import pjLogo from '../images/pjlogo.png'; // Import the image
import "./hello.css"
import "../index.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Cards from "./cards";
import prf from "../images/profile1.jpg"
import { useNavigate } from "react-router-dom";
function Consult() {
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
        navigate("/registration")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
    
    const [second, setSecond] = useState('colorchat colorchange')
    const [first, setFirst] = useState(false)
    setTimeout(() => {
        setFirst(true)
    }, 2000)
    const [first1, setfirst1] = useState(false)
    setTimeout(() => {
        setfirst1(true)
    }, 6500)
    setTimeout(() => {
        setSecond('colorchat1')
    }, 7000)
    const Chat = [{ user: "patient", chatlog: "Hello" },
    { user: "doctor", chatlog: "Namaste" },
    { user: "patient", chatlog: "How are you ?" },
    { user: "doctor", chatlog: "I'm the doctor i need to ask the question" },
    { user: "patient", chatlog: "i don't care sorry" }


    ]
    if (first == true) {
        return (
            <><div style={{}}>
                <header style={{ backgroundColor: "aliceblue" }} >
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container-fluid">
                            <Link to="/" id="header" className="navbar-brand navbarcolorfont scale-up-center" ><img src={pjLogo} style={{ height: '60px' }} alt="logo" /></Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item fade-in">
                                        <Link to='/' className="nav-link" style={{ color: '#e11127' }} aria-current="page" >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item fade-in">
                                        <a className="nav-link" style={{ color: '#e11127' }} href="#">
                                            About us
                                        </a>
                                    </li>
                                    <li className="your-element " style={{ paddingLeft: "400px", display: first1 ? "none" : "" }} >    <h1 className="scale-down-center " style={{ margin: "0", fontWeight: "450", color: "#e11127", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60px", textAlign: "center" }}>
                                        Heart    <div className="heartbeat">
                                            <i style={{ color: "#e11127" }} className="bi bi-heart-pulse  "></i>
                                        </div>Health
                                    </h1></li>
                                    <a style={{ position: 'absolute', left: '1400px', top: '17px', fontSize: '25px', fontWeight: '100', color: '#e11127', }}
                                        data-bs-toggle="offcanvas"
                                        href="#offcanvasExample"
                                        role="button"
                                        aria-controls="offcanvasExample"><i className="bi bi-person-circle fade-in"></i>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h1 style={{ color: '#e11127' }}>Profile</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="details">
                            <h3 style={{ display: 'block' }}>Patients details</h3>
                            <div className="details1">Name, age, blood group, etc .......</div>
                        </div>
                    </div>
                </div>
            </div>


                {/* <h1 className="scale-down-center " style={{margin:"0",fontWeight:"450",color:"#e11127",display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"60px",backgroundColor:"aliceblue",textAlign:"center"}}>
        Heart    <div className="heartbeat">
<i   style={{color:"#e11127"}} className="bi bi-heart-pulse  "></i>
</div>Health
        </h1> */}
                <div style={{ width: "100vw", display: "flex" }}>
                    <div className="tabs" style={{ paddingLeft: "30px", height: "100vh", width: "400px", backgroundColor: "aliceblue", overflowY: "scroll", scrollTop: "9999px" }}>
                        <h3 style={{ fontWeight: "400", color: "#e11127" }}>Chats</h3>

                        <div className="chat">
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 1</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 2</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 3</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 4</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 5</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 6</div>
                            {/* Add more participants as needed */}
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 7</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 8</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 9</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 10</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 11</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 12</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 13</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 14</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 15</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 16</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 17</div>
                            <div className="participant" style={{ width: "350px", padding: "20px", fontWeight: "400", fontSize: "1.2rem", color: "#e11127", borderRadius: "25px" }}><img src={prf} style={{ height: "40px", width: "40px", borderRadius: "50px", marginRight: "10px" }} />Person 18</div>

                        </div>



                    </div>
                    <div className={second} style={{ width: "1075px", display: "flex" }}>

                        </div>

                </div>

                <footer style={{ width: '100%', height: '30px', backgroundColor: '#e11127', color: 'aliceblue', textAlign: 'center', fontWeight: '200' }}>Copyright belongs to American Heart Association</footer>

            </>
        )
    }
    else {
        return (
            <div className="fade-outback" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
                <h1 className=" " style={{ margin: "0", fontWeight: "450", color: "#e11127", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60px", textAlign: "center", scale: "2" }}>
                    Heart<div className="heartbeat"><i style={{ color: "#e11127" }} className="bi bi-heart-pulse  "></i></div>Health
                </h1>
            </div>
        )
    }
}
export default Consult;