import React from 'react';
import './hello.css';
import { Link } from 'react-router-dom';
import pjlogo from '../images/pjlogo.png'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import logo from "../images/image.png";
import backp from "../images/backprofile.png"
import pjLogo from '../images/pjlogo.png';
function Symptom() {
  const navigate=useNavigate()
  const [med,setMed]=useState()
  useEffect(() => {
    HandleClick2();
  }, [])
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
        const {risk}=await res.json()
        setMed(risk)
        
      } else {
        console.error("Login pass");
        navigate("/registration")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  async function handleClick1() {
    try {
      const res = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({


        }),
      });

      if (res.ok) {
        navigate('/registration')
      } else {
        console.error("Registration passed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
  return (
    <div>
      <header className="header1">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="/" id="header " className="navbar-brand navbarcolorfont scale-up-center" >
              <img src={pjlogo} style={{ height: '60px' }} alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: '#e11127' }} aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ color: '#e11127' }} href="#">About us</a>
                </li>
                <a style={{ position: 'absolute', left: '1430px', top: '17px', fontSize: '25px', fontWeight: '100', color: '#e11127' }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                  <i className="bi bi-person-circle"></i>
                </a>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{backgroundColor:"aliceblue"}}>
        <div className="offcanvas-header">
          <Link to="/" id="header" className="navbar-brand navbarcolorfont scale-in-center" style={{marginLeft:"150px"}}>
            <img className='imagezoomer' src={pjLogo} style={{ height: '60px' }} alt="logo" />
          </Link>
          
        </div>
        <div className="offcanvas-body">
          <div className="details">
            <div className="details1">

              <div style={{ height: "70px", width: "70px", border: "solid 5px #e11127 ", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} >
                <img src={backp} style={{ height: "50px", width: "50px" }} alt="..." />
              </div>
              <div style={{ position: "absolute", top: "130px", right: "1", left: "100px", fontSize: "1.5rem", fontWeight: "400" }}>Hello</div>
            </div>
          <button className='btn btn-lg' style={{ color: "#e11127", backgroundColor: 'aliceblue', borderRadius: "50px", position:"absolute",left:250,top:125}} onClick={handleClick1}><i class="bi bi-box-arrow-right"></i> Logout</button>

            <div style={{height:"200px",width:"200px",borderRadius:"50% ",border:"7px solid red",marginTop:"50px",marginLeft:"80px",display:'flex',alignItems:"center",justifyContent:"center",fontSize:'2 rem'}}>
              <div style={{fontSize:"2.2rem",marginLeft:"10px"}} >{med}%</div>
              <div style={{position:"absolute",top:"340px"}}>at risk  </div>
            </div>
            <div style={{marginTop:"20px",marginLeft:"60px",fontSize:"1.2rem"}}>Navigate throught our tools</div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <div style={{height:"100px",borderRadius:"25px",width:"100px",backgroundColor:"#D7ECFF",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-archive-fill" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </div>
            <Link to="/waterfilloutput" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-bandaid" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </Link>
            <Link to="/map" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-compass" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </Link>
            
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <Link to="/fillform" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-file-earmark-medical" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </Link>
            <Link to="/experiment" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-files" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </Link>
            <Link to="/dietplan" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-universal-access" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </Link>
            
            </div>
            </div>
        </div>
        <footer style={{width:"100%",backgroundColor:"#e11127",height:"15px"}}></footer>

      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h1 style={{ color: '#e11127' }}>Profile</h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="details">
            <h3 style={{ display: 'block' }}>Patients details</h3>
            <div className="details1">
              Name, age, blood group, etc .......
            </div>
          </div>
        </div>
      </div>
      <div className="symptomdetails" style={{ backgroundColor: 'aliceblue', height: '270px', width: '100%' }}>
        <div className="title" style={{ fontWeight: '400', fontSize: '3rem', position: 'absolute', top: '100px', left: '150px', display: 'inline-block',color:"black" }}>
          Cardiac arrest, Stroke and other problems
        </div>
        <div className="title" style={{ fontWeight: '400', fontSize: '3rem', position: 'absolute', top: '155px', left: '150px', display: 'inline-block',color:"black" }}>
          related to heart symptoms:
        </div>
        <h1 style={{ color: '#e11127', display: 'inline-block', fontWeight: '400', fontSize: '1.2rem', position: 'absolute', top: '230px', left: '150px' }}>
          If you are having any of the following symptoms, please consult the nearest cardiologist
        </h1>
        <Link to="/fillform" className="btn btn-lg" style={{ backgroundColor: '#e11127', position: 'absolute', top: '280px', left: '150px', borderRadius: '50px', color: 'aliceblue' }}>
          Get emergency Help
        </Link>
      </div>
      <div className="info">
        <div className="card" style={{ width: '18rem', position: 'absolute', top: '400px', left: '250px', width: '500px', height: '500px' }}>
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: '2rem' }}>Cardiac Arrest Symptoms</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Check carefully</h6>
            <p className="card-text">
              <div style={{ fontSize: '1.2rem', fontWeight: '500px', color: '#e11127' }}>Discomfort in the upper body</div>
              <div>
                Symptoms can include pain or discomfort in one or both arms, the back, neck, jaw, or stomach.
              </div>
              <div style={{ fontSize: '1.2rem', color: '#e11127' }}>Chest discomfort</div>
              <div>
                Most heart attacks involve discomfort in the center of the chest that lasts more than a few minutes, or that goes away and comes back. It can feel like uncomfortable pressure, squeezing, fullness, or pain.
              </div>
              <div style={{ fontSize: '1.2rem', color: '#e11127' }}>Shortness of breath</div>
              <div>
                with or without chest discomfort.
              </div>
              <div style={{ fontSize: '1.2rem', color: '#e11127' }}>Other signs</div>
              <div>
                may include breaking out in a cold sweat, nausea, or lightheadedness.
              </div>
            </p>
            <a href="#" style={{ color: '#e11127' }}>If you feel any of these symptoms, please seek immediate help</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem', position: 'absolute', top: '400px', left: '800px', width: '500px', height: '500px' }}>
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: '2rem' }}>Stroke Symptoms</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Check carefully</h6>
            <p className="card-text">
              <div style={{ fontSize: '1.2rem', fontWeight: '500px', color: '#e11127' }}>FACE DROOPING</div>
              <div>
              Does one side of the face droop or is it numb? Ask the person to smile.              </div>
              <div style={{ fontSize: '1.2rem', color: '#e11127' }}>ARM WEAKNESS</div>
              <div>
              Is one arm weak or numb? Ask the person to raise both arms. Does one arm drift downward?              </div>
              <div style={{ fontSize: '1.2rem', color: '#e11127' }}>SPEECH DIFFICULTY</div>
              <div>
              Is speech slurred, are they unable to speak, or are they hard to understand? Ask the person to repeat a simple sentence, like "the sky is blue." Is the sentence repeated correctly?
              </div>
              <div style={{ fontSize: '1.2rem', color: '#e11127' }}>TIME TO CALL 108</div>
              <div>
              If the person shows any of these symptoms, even if the symptoms go away, call 911 and get them to the hospital immediately.
              </div>
            </p>
          </div>
        </div>
      </div>
      <footer style={{ position: 'absolute', top: '900px', width: '100%', height: '30px', backgroundColor: '#e11127', color: 'aliceblue', textAlign: 'center', marginTop: '40px', fontWeight: '200' }}>
        Copyright belongs to American Heart Association
      </footer>
    </div>
  );
}

export default Symptom;
