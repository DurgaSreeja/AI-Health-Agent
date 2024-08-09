import React from 'react';
import { useState,useEffect } from 'react';
import "./style.css"


import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import kimage from "../images/doctr.jpg"
import k1image from "../images/to.jpg"

import pjLogo from '../images/pjlogo.png';
import backp from "../images/backprofile.png"

const Jpp = () => {
  const [data1, setData1] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [name1, setName] = useState("");
  const [medicaldata, setMedicalData] = useState('');
  const [k, setK] = useState();
  const [id,setId]=useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/about", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Hello",
          }),
        });

        if (response.ok) {
          const { name, medicalHistory } = await response.json();
          setName(name);
          setMedicalData(medicalHistory);
          GetOutput(medicalHistory, name);
          GetOutput1(medicalHistory,name);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
    
  }, []);

  const GetOutput = async (medicalHistory, name) => {
    try {
      const { age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal } = medicalHistory;
      const res = await fetch(`http://localhost:8000/predict/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: [age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal],
          name: name
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setData(data);
        setK(data);
        
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const GetOutput1 = async (medicalHistory,name) => {
    try {
      const { age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal } = medicalHistory;
      const res = await fetch('http://localhost:8000/summary', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: [age, sex, cp, rbp, sc, fbs, rer, mhr, eia, olds, st, mvs, thal],
          name:name
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setData1(data);
        setLoading(false);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
    function onC() {
        navigate("/experiment")
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
      const [ud, Setud] = useState('')
      const [med,setMed]=useState('')
      
      
    
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
            const data1 = await res.json();
            const { name, medicalHistory,risk,data } = data1;
            console.log(name)
            Setud(name);
            setMed(risk);
            setMedicalData(medicalHistory)
            console.log("Hello")
            setId(data)
            console.log(med)
            
    
          } else {
            console.error("Login pass");
            navigate("/registration")
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      }
  const getCircleStyles = () => {
    // Adjust this function based on your circle positioning requirements
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // Add other styles as needed
    };
  };

  function K(){
    console.log(k)
    if (k<30 && k>20){
      return (
        <>
        
<div className="circle-container  " style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
          <div className='scale-in-center ' style={{borderRadius:"50%",backgroundColor:"red",height:"400px",width:"400px",position:"relative",left:"20px",top:"20px"}} ></div>
          
          <div className="circle" style={{borderRadius:"50%",backgroundColor:"aliceblue",backgroundColor:"white",marginLeft:"30px",marginTop:"30px"}}></div>
          <div className="wave _25 " style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave _25"  style={{marginLeft:"30px",marginTop:"30px" }}></div>
          <div className="wave _25" style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave-below _25"  style={{marginLeft:"30px",marginTop:"30px"}}></div>
          <div style={{border:"5px red solid",borderRadius:"50%",backgroundColor:"transparent",height:"400px",width:"400px",position:"absolute",left:"20px",top:"20px"}}></div>

          <div className="desc _0" style={{marginLeft:"40px",marginTop:"20px",fontFamily:"initial",color:"aliceblue"}}>

            <h2 style={{fontFamily:"initial",color:"aliceblue"}}>Risk level:</h2>
            <p>
              <b style={{color:"aliceblue",color:"aliceblue"}}>{k}<span>%</span></b>
            </p>
          </div>
        </div>
        </>
      )
    }
    else if(k<20 ){
      return (
       
<div className="circle-container  " style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
          <div className='scale-in-center ' style={{borderRadius:"50%",backgroundColor:"red",height:"400px",width:"400px",position:"relative",left:"20px",top:"20px"}} ></div>
          
          <div className="circle" style={{borderRadius:"50%",backgroundColor:"aliceblue",backgroundColor:"white",marginLeft:"30px",marginTop:"30px"}}></div>
          <div className="wave _0 " style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave _0"  style={{marginLeft:"30px",marginTop:"30px" }}></div>
          <div className="wave _0" style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave-below _0"  style={{marginLeft:"30px",marginTop:"30px"}}></div>
          <div style={{border:"5px red solid",borderRadius:"50%",backgroundColor:"transparent",height:"400px",width:"400px",position:"absolute",left:"20px",top:"20px"}}></div>

          <div className="desc _0" style={{marginLeft:"40px",marginTop:"20px",fontFamily:"initial",color:"rgb(230, 233, 245)"}}>

            <h2 style={{fontFamily:"initial",color:"black"}}>Risk level:</h2>
            <p>
              <b style={{color:"aliceblue",color:"black"}}>{k}<span>%</span></b>
            </p>
          </div>
        </div>
      )
    }
    else if (k>30 && k<60){
      return (
    
<div className="circle-container  " style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
          <div className='scale-in-center ' style={{borderRadius:"50%",backgroundColor:"red",height:"400px",width:"400px",position:"relative",left:"20px",top:"20px"}} ></div>
          
          <div className="circle" style={{borderRadius:"50%",backgroundColor:"aliceblue",backgroundColor:"white",marginLeft:"30px",marginTop:"30px"}}></div>
          <div className="wave _50" style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave _50"  style={{marginLeft:"30px",marginTop:"30px" }}></div>
          <div className="wave _50" style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave-below _50"  style={{marginLeft:"30px",marginTop:"30px"}}></div>
          <div style={{border:"5px red solid",borderRadius:"50%",backgroundColor:"transparent",height:"400px",width:"400px",position:"absolute",left:"20px",top:"20px"}}></div>

          <div className="desc _0" style={{marginLeft:"40px",marginTop:"20px",fontFamily:"initial",color:"aliceblue"}}>

            <h2 style={{fontFamily:"initial",color:"black"}}>Risk level:</h2>
            <p>
              <b style={{color:"aliceblue",color:"black"}}>{k}<span>%</span></b>
            </p>
          </div>
        </div>
      )
    }
    else if(k<80 && k>60){
      return (
<div className="circle-container  " style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
          <div className='scale-in-center ' style={{borderRadius:"50%",backgroundColor:"red",height:"400px",width:"400px",position:"relative",left:"20px",top:"20px"}} ></div>
          
          <div className="circle" style={{borderRadius:"50%",backgroundColor:"aliceblue",backgroundColor:"white",marginLeft:"30px",marginTop:"30px"}}></div>
          <div className="wave _75 " style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave _75"  style={{marginLeft:"30px",marginTop:"30px" }}></div>
          <div className="wave _75" style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave-below _75"  style={{marginLeft:"30px",marginTop:"30px"}}></div>
          <div style={{border:"5px red solid",borderRadius:"50%",backgroundColor:"transparent",height:"400px",width:"400px",position:"absolute",left:"20px",top:"20px"}}></div>

          <div className="desc _0" style={{marginLeft:"40px",marginTop:"20px",fontFamily:"initial",color:"aliceblue"}}>

            <h2 style={{fontFamily:"initial",color:"aliceblue"}}>Risk level:</h2>
            <p>
              <b style={{color:"aliceblue",color:"aliceblue"}}>{k}<span>%</span></b>
            </p>
          </div>
        </div>
      )
    }
 
    else {
      return (
       
<div className="circle-container  " style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
          <div className='scale-in-center ' style={{borderRadius:"50%",backgroundColor:"red",height:"400px",width:"400px",position:"relative",left:"20px",top:"20px"}} ></div>
          
          <div className="circle" style={{borderRadius:"50%",backgroundColor:"aliceblue",backgroundColor:"white",marginLeft:"30px",marginTop:"30px"}}></div>
          <div className="wave _100 " style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave _100"  style={{marginLeft:"30px",marginTop:"30px" }}></div>
          <div className="wave _100" style={{marginLeft:"30px",marginTop:"30px",}} ></div>
          <div className="wave-below _100"  style={{marginLeft:"30px",marginTop:"30px"}}></div>
          <div style={{border:"5px red solid",borderRadius:"50%",backgroundColor:"transparent",height:"400px",width:"400px",position:"absolute",left:"20px",top:"20px"}}></div>

          <div className="desc _0" style={{marginLeft:"40px",marginTop:"20px",fontFamily:"initial",color:"aliceblue"}}>

            <h2 style={{fontFamily:"initial",color:"aliceblue"}}>Risk level:</h2>
            <p>
              <b style={{color:"aliceblue",color:"aliceblue"}}>{k}<span>%</span></b>
            </p>
          </div>
        </div>
              )
    }
  }
  return (
    <div  style={{width:window.innerWidth}}>
    {loading?(
      <>
       <div className="loader" style={{height:"600px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <svg width="400" height="150" viewBox="0 0 818 498" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="strokeGradient">
            <stop offset="5%" stopColor="#191919" />
            <stop offset="60%" stopColor="#ff0000" />
            <stop offset="100%" stopColor="#920000" />
          </linearGradient>
        </defs>
        <path className="pulse" d="M0 305.5H266L295.5 229.5L384 496L460 1.5L502.5 377.5L553 305.5H818" strokeWidth="8" />
      </svg>
    </div>
      </>
    ):
    (
      <>
      <header className="header1">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="/" id="header" className="navbar-brand navbarcolorfont scale-up-center">
              <img className='imagezoomer' src={pjLogo} style={{ height: '60px' }} alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to='/' className="nav-link" style={{ color: '#e11127' }} aria-current="page" >Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ color: '#e11127' }} href="#">About us</a>
                </li>
                <Link to="/docsearch" style={{ paddingTop: "9px", paddingLeft: "10px", color: "#e11127", textDecoration: "none" }}>Search <i style={{ color: '#e11127' }} className="bi bi-search"></i></Link>
                <div style={{ position: 'absolute', left: '1300px', top: '17px', fontSize: '25px', fontWeight: '100', color: '#e11127' }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                  <i className="bi bi-person-circle"></i><a style={{ fontSize: "1.2rem", marginLeft: "10px" }}>{ud}</a>
                   
                </div>

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
              <div style={{fontSize:"2.2rem",marginLeft:"10px"}} >{k}%</div>
              <div style={{position:"absolute",top:"340px"}}>at risk  </div>
            </div>
            <div style={{marginTop:"20px",marginLeft:"60px",fontSize:"1.2rem"}}>Navigate throught our tools</div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <div style={{height:"100px",borderRadius:"25px",width:"100px",backgroundColor:"#D7ECFF",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-archive-fill" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </div>
            <Link to="/output" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
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
            <div style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-files" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </div>
            <Link to="/dietplan" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <i class="bi bi-universal-access" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
            </Link>
            
            </div>
            </div>
        </div>


      </div>
    <div style={{width:"100%",height:"1600px",backgroundColor:"aliceblue"}}>
      
      
      <main style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className='slide-in-bottom'>
        <K/>
        </div>
        

        {/* Repeat similar blocks for other circle containers */}
        
  
      </main>
      <div className='shadow-lg' style={{ 
    width: "650px", 
    backgroundColor: "red", 
    marginLeft: "80px", 
    marginTop: "50px", 
    color: "aliceblue", 
    display: "flex", 
    paddingRight: "20px", 
    whiteSpace: "normal",
    wordWrap: "break-word",
    overflowWrap: "break-word"
}}>
 <div className='text-focus-in title' style={{ position: "absolute", top: "640px", left: "100px", color: "aliceblue" }}>
 <div style={{ marginLeft: "10px", color: "aliceblue", textDecoration: "underline",paddingLeft: "0px" }}>MEDICAL  SUMMARY  REPORT</div>

 </div>
 <p className='text-focus-in' style={{ marginTop: "100px", marginLeft: "20px", fontSize: "1rem", paddingBottom: "10px", paddingRight: "15px" }} dangerouslySetInnerHTML={{__html: data1}}></p>

</div>






         <div className='text-focus-in' style={{height:"350px",width:"670px",position:"absolute",top:"700px",left:"780px",border:"9px red solid"}}>
         <h2 style={{marginLeft:"180px",marginTop:"30px"}}>Life expantansy</h2>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent",height:"150px",width:"150px",borderRadius:"50%",border:"7px solid forestgreen",marginLeft:"20px",marginTop:"30px"}}>
          <div style={{fontFamily:"fantasy",fontSize:"2rem"}}>{100-k}%</div>
          <div style={{fontSize:"1.2rem",height:"120px",width:"400px",position:"absolute",left:"200px"}}>Don't lose hope! Even if your heart health is at high risk, there's still a chance to recover. Take proactive steps, follow medical advice, and make healthy lifestyle choices to improve your heart health and overall well-being.</div>
          </div>
         </div>
         <div className='text-focus-in' style={{height:"350px",width:"670px",position:"absolute",top:"1100px",left:"780px",border:"9px red solid"}}>
         <h2 style={{marginLeft:"180px",marginTop:"30px"}}>Recovery rate</h2>
          
          <i class="bi bi-graph-up-arrow" style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent",height:"150px",width:"150px",borderRadius:"50%",marginLeft:"20px",marginTop:"30px",color:"red",fontSize:"5rem"}}></i>
          <div style={{ height:"120px",width:"400px",wordWrap: "break-word",position:"absolute",fontSize:"1.2rem",left:"190px",top:"100px"}}>
          Recovery is possible! By following a balanced diet plan and staying committed to your health, you can improve your heart condition. Embrace the journey to wellness with confidence and determination.                </div>
          <Link to="/dietplan"  className='btn btn-lg' style={{backgroundColor:"red",marginLeft:"300px",marginTop:"10px",borderRadius:"25px",color:"aliceblue"}}> Diet plan</Link>
         </div>
    </div>
    <footer style={{ width: '100%', height: '30px', backgroundColor: '#e11127', color: 'aliceblue', textAlign: 'center', marginTop: '40px', fontWeight: '200' }}>Copyright belongs to American Heart Association</footer>

      </>
    )}
    
    </div>
  );
};

export default Jpp;
