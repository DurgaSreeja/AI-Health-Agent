// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import './hello.css';
// import pjLogo from '../images/pjlogo.png';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useUserData } from './confirmation';
// import Registrationform from './login';
// import backp from "../images/backprofile.png"
// import dietd from "../images/e.jpg"
// import dietm from "../images/l.png"
// import stbg from "../images/st2.png"
// import stbg1 from "../images/st1.png"
// import axios from 'axios';

// function DietPlan() {
//   const [personalData, setPersonalData] = useState('');
//   const [goals, setGoals] = useState('');
//   const [macroNeeds, setMacroNeeds] = useState('');
//   const [mealPlan1, setMealPlan1] = useState('');
//   const [mealPlan2, setMealPlan2] = useState('');
//   const [mealPlan3, setMealPlan3] = useState('');
//   const [groceryList, setGroceryList] = useState('');
//   const [mealsAndIngredients, setMealsAndIngredients] = useState('');
//   const [loaing , setLoaing]=useState(true)
//   const [height,setHeight]=useState("")
//   const [width,setWidth]=useState(0)
//   const [foodpref,setFoodpref]=useState("")
//   const [diet,setDiet]=useState("")
//   const [veg,setVeg]=useState("")
//   const [risk,setRisk]=useState("")
//   function onC() {
//     navigate("/experiment")
//   }
//   const [name,setName]=useState("")
//   const [riskfactors,setRiskFactors]=useState("")
//   const [ud, Setud] = useState('')
//   const navigate = useNavigate()
//   const [med,setMed]=useState('')
//   function Veg(e){
//     setVeg(e.target.value)
//   }
//   function Height1(e){
//     setHeight(e.target.value)
//   }
//   function Width(e){
//     setWidth(e.target.value)
//   }
//   function Food(e){
//     setFoodpref(e.target.value)
//   }
//   // useEffect(() => {
//   //   HandleClick2();
//   // }, [])

//   async function HandleClick2(event) {

//     try {
//       const res = await fetch("/about", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: 'Hello',
//           password: 'password',
//         }),
//       });

//       if (res.ok) {
//         const data = await res.data.response;
//         const { name, medicalHistory,risk,riskfactors } = data;
//         console.log(name)
//         Setud(name);
//         setName(name);
//         setRiskFactors(riskfactors)
        
       
//         console.log("Hello")
//         console.log(med)
      

//       } else {
//         console.error("Login pass");
//         navigate("/registration")
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   }
//   const handleFetchDietPlan = async () => {
//     console.log(height,width,veg,foodpref)
//     try {
//       const res = await axios.post("http://localhost:8001/", {
//         message:`Give a diet plan for controlling ${risk} considering my weight ${width} and only include ${veg} and ${foodpref} items`
//       });
//       console.log(res.data.response)
//       if (res) {
//         const data = res.data.response;
//         setLoaing(false);
//         setDiet(data)
//       } else {
//         console.error("Error fetching diet plan");
//       }
//     } catch (error) {
//       console.error("Error during fetching diet plan:", error);
//     }
//   };
 
//   return (
//     <>
//     {
//       loaing?(
        
//         <div style={{height:"730px",display:"flex",justifyContent:"center",backgroundColor:"white"}}>
//         <div className='' style={{height:"500px",width:"800px",backgroundColor:"white",display:"flex",justifyContent:"center",borderRadius:"50px",border:"solid red 10px",position:"absolute",top:"100px"}}>
//           <div style={{marginTop:"20px",fontSize:"2.5rem",color:"red ",fontWeight:"500"}}> Advanced diet plan</div>
//           <img className='slide-in-top' src={dietm} style={{height:"300px",position:"absolute",left:"400px",top:"60px"}}/>
          
//           <input className='inputd navinput1' placeholder='Height' onChange={Height1} style={{outline:"none",width:"350px",height:"50px",border:"none",position:"absolute",top:"170px",backgroundColor:"red",paddingLeft:"20px",borderRadius:"50px",fontSize:"1.25rem",color:"white",left:"90px"}}/>
          
//           <input className='inputd navinput1' placeholder='Weight' onChange={Width} style={{outline:"none",width:"350px",border:"none",height:"50px",position:"absolute",top:"100px",backgroundColor:"red",paddingLeft:"20px",borderRadius:"50px",fontSize:"1.25rem",color:"white",left:"20px"}}/>
//           <input className='inputd navinput1' placeholder='risk' onChange={e=>setRisk(e.target.value)} style={{outline:"none",width:"350px",height:"50px",border:"none",position:"absolute",top:"170px",backgroundColor:"red",paddingLeft:"20px",borderRadius:"50px",fontSize:"1.25rem",color:"white",left:"90px"}}/>
//           <select className='navinput1' onChange={Food} style={{border:"none", outline: "none", width: "350px", height: "50px",  position: "absolute", top: "240px", backgroundColor: "red",borderRadius:"50px",paddingLeft:"20px" ,fontSize:"1.25rem",color:"white",left:"20px"}}>
//       <option value="" style={{paddingLeft:"10px"}}>Select Food Type</option>
//       <option value="southIndian">South Indian</option>
//       <option value="northIndian">North Indian</option>
//     </select>
//     <select className='navinput1' onChange={Veg} style={{ left:"90px",outline: "none", border:"none",width: "350px", height: "50px", position: "absolute", top: "310px", backgroundColor: "red",borderRadius:"50px" ,paddingLeft:"20px",fontSize:"1.25rem",color:"white"}}>
//       <option value="">Select Food Type</option>
//       <option value="veg">Veg</option>
//       <option value="veg and nonveg">Veg and Non veg</option>
//     </select>
//           <button onClick={handleFetchDietPlan} className='btn btn-lg' style={{position:"absolute",top:"370px",backgroundColor:"red",color:"white",borderRadius:"50px",width:"200px"}}>Submit</button>
//         </div>
//         </div>
//       )
//       :(
//         <>
//         <div>
//       <header className="header1" style={{backgroundColor:"white"}}>
//         <nav className="navbar navbar-expand-lg">
//           <div className="container-fluid">
//             <Link to="/" id="header" className="navbar-brand navbarcolorfont scale-up-center">
//               <img className='imagezoomer' src={pjLogo} style={{ height: '60px' }} alt="logo" />
//             </Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <Link to='/' className="nav-link" style={{ color: '#e11127' }} aria-current="page" >DietPlan</Link>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" style={{ color: '#e11127' }} href="#">About us</a>
//                 </li>
//                 <Link to="/docsearch" style={{ paddingTop: "9px", paddingLeft: "10px", color: "#e11127", textDecoration: "none" }}>Search <i style={{ color: '#e11127' }} className="bi bi-search"></i></Link>
//                 <div style={{ position: 'absolute', left: '1300px', top: '17px', fontSize: '25px', fontWeight: '100', color: '#e11127' }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
//                   <i className="bi bi-person-circle"></i><a style={{ fontSize: "1.2rem", marginLeft: "10px" }}>{ud}</a>
                   
//                 </div>

//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{backgroundColor:""}}>
//         <div className="offcanvas-header">
//           <Link to="/" id="header" className="navbar-brand navbarcolorfont scale-in-center" style={{marginLeft:"150px"}}>
//             <img className='imagezoomer' src={pjLogo} style={{ height: '60px' }} alt="logo" />
//           </Link>
          
//         </div>
//         <div className="offcanvas-body">
//           <div className="details">
//             <div className="details1">

//               <div style={{ height: "70px", width: "70px", border: "solid 5px #e11127 ", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} >
//                 <img src={backp} style={{ height: "50px", width: "50px" }} alt="..." />
//               </div>
//               <div style={{ position: "absolute", top: "130px", right: "1", left: "100px", fontSize: "1.5rem", fontWeight: "400" }}>Hello</div>
//             </div>
//           <button className='btn btn-lg' style={{ color: "#e11127", backgroundColor: '', borderRadius: "50px", position:"absolute",left:250,top:125}} ><i class="bi bi-box-arrow-right"></i> Logout</button>

//             <div style={{height:"200px",width:"200px",borderRadius:"50% ",border:"7px solid red",marginTop:"50px",marginLeft:"80px",display:'flex',alignItems:"center",justifyContent:"center",fontSize:'2 rem'}}>
//               <div style={{fontSize:"2.2rem",marginLeft:"10px"}} >{med}%</div>
//               <div style={{position:"absolute",top:"340px"}}>at risk  </div>
//             </div>
//             <div style={{marginTop:"20px",marginLeft:"60px",fontSize:"1.2rem"}}>Navigate throught our tools</div>
//             <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
//             <div style={{height:"100px",borderRadius:"25px",width:"100px",backgroundColor:"#D7ECFF",display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <i class="bi bi-archive-fill" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
//             </div>
//             <Link to="/waterfilloutput" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <i class="bi bi-bandaid" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
//             </Link>
//             <Link to="/map" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <i class="bi bi-compass" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
//             </Link>
            
//             </div>
//             <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
//             <Link to="/fillform" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <i class="bi bi-file-earmark-medical" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
//             </Link>
//             <Link to="/experiment" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <i class="bi bi-files" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
//             </Link>
//             <Link to="/dietplan" style={{height:"100px",width:"100px",backgroundColor:"#D7ECFF",marginLeft:"10px",borderRadius:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <i class="bi bi-universal-access" style={{fontSize:"1.7rem",color:"#e11127"}}></i>
//             </Link>
            
//             </div>
//             </div>
//         </div>
//         <foo5ter style={{width:"100%",backgroundColor:"#e11127",height:"15px"}}></foo5ter>

//       </div>
//       {diet && (
//         <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
//           <h4>Diet Plan:</h4>
//           <p>{diet}</p>
//         </div>
//       )}
     
      
//       <footer style={{ width: '100%', height: '30px', backgroundColor: '#e11127', color: '', textAlign: 'center', marginTop: '40px', fontWeight: '200' }}>Copyright belongs to American Heart Association</footer>
//     </div>

//         </>
//       )
//     }
//     </>
//       );
// }

// export default DietPlan;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './hello.css';
import pjLogo from '../images/pjlogo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DietPlan() {
  const [loaing, setLoaing] = useState(true);
  const [diet, setDiet] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState(0);
  const [foodpref, setFoodpref] = useState("");
  const [veg, setVeg] = useState("");
  const [risk, setRisk] = useState("");
  const navigate = useNavigate();

  function Veg(e) {
    setVeg(e.target.value);
  }

  function Height1(e) {
    setHeight(e.target.value);
  }

  function Width(e) {
    setWidth(e.target.value);
  }

  function Food(e) {
    setFoodpref(e.target.value);
  }

  const handleFetchDietPlan = async () => {
    try {
      const res = await axios.post("http://localhost:8001/", {
        message: `Give a diet plan for controlling ${risk} considering my weight ${width} and only include ${veg} and ${foodpref} items`
      });
      if (res) {
        const data = res.data.response;
        setLoaing(false);
        setDiet(data);
      } else {
        console.error("Error fetching diet plan");
      }
    } catch (error) {
      console.error("Error during fetching diet plan:", error);
    }
  };

  const renderDietPlan = () => {
    const regex = /\*\*(.*?)\*\*/g;
    const elements = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(diet)) !== null) {
      // Push the text before the **header**
      if (match.index > lastIndex) {
        elements.push(<p key={lastIndex}>{diet.substring(lastIndex, match.index)}</p>);
      }

      // Push the **header** as h2
      elements.push(<h5 key={match.index}>{match[1]}</h5>);

      lastIndex = regex.lastIndex;
    }

    // Push any remaining text after the last **header**
    if (lastIndex < diet.length) {
      elements.push(<p key={lastIndex}>{diet.substring(lastIndex)}</p>);
    }

    return elements;
  };

  return (
    <>
      {loaing ? (
        <div style={{ height: "730px", display: "flex", justifyContent: "center", backgroundColor: "white" }}>
          <div className='' style={{ height: "500px", width: "800px", backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "50px", border: "solid red 10px", position: "absolute", top: "100px" }}>
            <div style={{ marginTop: "20px", fontSize: "2.5rem", color: "red ", fontWeight: "500" }}>Advanced diet plan</div>
            <img className='slide-in-top' src={pjLogo} style={{ height: "300px", position: "absolute", left: "400px", top: "60px" }} alt="Diet Plan" />

            <input className='inputd navinput1' placeholder='Height' onChange={Height1} style={{ outline: "none", width: "350px", height: "50px", border: "none", position: "absolute", top: "170px", backgroundColor: "red", paddingLeft: "20px", borderRadius: "50px", fontSize: "1.25rem", color: "white", left: "90px" }} />

            <input className='inputd navinput1' placeholder='Weight' onChange={Width} style={{ outline: "none", width: "350px", border: "none", height: "50px", position: "absolute", top: "100px", backgroundColor: "red", paddingLeft: "20px", borderRadius: "50px", fontSize: "1.25rem", color: "white", left: "20px" }} />

            <input className='inputd navinput1' placeholder='Risk' onChange={e => setRisk(e.target.value)} style={{ outline: "none", width: "350px", height: "50px", border: "none", position: "absolute", top: "170px", backgroundColor: "red", paddingLeft: "20px", borderRadius: "50px", fontSize: "1.25rem", color: "white", left: "90px" }} />

            <select className='navinput1' onChange={Food} style={{ border: "none", outline: "none", width: "350px", height: "50px", position: "absolute", top: "240px", backgroundColor: "red", borderRadius: "50px", paddingLeft: "20px", fontSize: "1.25rem", color: "white", left: "20px" }}>
              <option value="" style={{ paddingLeft: "10px" }}>Select Food Type</option>
              <option value="southIndian">South Indian</option>
              <option value="northIndian">North Indian</option>
            </select>

            <select className='navinput1' onChange={Veg} style={{ left: "90px", outline: "none", border: "none", width: "350px", height: "50px", position: "absolute", top: "310px", backgroundColor: "red", borderRadius: "50px", paddingLeft: "20px", fontSize: "1.25rem", color: "white" }}>
              <option value="">Select Food Type</option>
              <option value="veg">Veg</option>
              <option value="veg and nonveg">Veg and Non-Veg</option>
            </select>

            <button onClick={handleFetchDietPlan} className='btn btn-lg' style={{ position: "absolute", top: "370px", backgroundColor: "red", color: "white", borderRadius: "50px", width: "200px" }}>Submit</button>
          </div>
        </div>
      ) : (
        <div>
          <header className="header1" style={{ backgroundColor: "white" }}>
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
                      <Link to='/' className="nav-link" style={{ color: '#e11127' }} aria-current="page">DietPlan</Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" style={{ color: '#e11127' }} href="#">About us</a>
                    </li>
                    <Link to="/docsearch" style={{ paddingTop: "9px", paddingLeft: "10px", color: "#e11127", textDecoration: "none" }}>Search <i style={{ color: '#e11127' }} className="bi bi-search"></i></Link>
                    <div style={{ position: 'absolute', left: '1300px', top: '17px', fontSize: '25px', fontWeight: '100', color: '#e11127' }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                      <i className="bi bi-person-circle"></i><a style={{ fontSize: "1.2rem", marginLeft: "10px" }}>User</a>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
          </header>

          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', fontSize:20}}>
            {renderDietPlan()}
          </div>

          <footer style={{ width: '100%', height: '30px', backgroundColor: '#e11127', color: '', textAlign: 'center', marginTop: '40px', fontWeight: '200' }}>
            Copyright belongs to American Heart Association
          </footer>
        </div>
      )}
    </>
  );
}

export default DietPlan;
