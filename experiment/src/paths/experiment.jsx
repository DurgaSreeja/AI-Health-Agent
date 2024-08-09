import { useEffect, useState } from "react";
import pjlogo from "../images/pjlogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../images/image.png";
import backp from "../images/backprofile.png"
import pjLogo from '../images/pjlogo.png';

const Experiment = () => {
  const [medicaldata,setMedicalData]=useState(false);
  const [patientname,setPatientName]=useState(false);
  const [med,setMedical]=useState()
  const [username, setUsername] = useState("");
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [username5, setUsername5] = useState("");
  const [username6, setUsername6] = useState("");
  const [username7, setUsername7] = useState("");
  const [username8, setUsername8] = useState("");
  const [username9, setUsername9] = useState("");
  const [username10, setUsername10] = useState("");
  const [username11, setUsername11] = useState("");
  const [username12, setUsername12] = useState("");
  const [username13, setUsername13] = useState("");
  const navigate = useNavigate();
  const [k,setK]=useState(0)
  useEffect(() => {
    
    fetch("/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: patientname,
      }),
    },
    )
      .then(response => response.json())
      .then(response => {
        const { name,medicalHistory,risk } = response;
        setK(Object.keys(medicalHistory).length)
        setMedicalData(medicalHistory)
        setMedical(risk)
        console.log(name,medicalHistory);
      });
  }, []);
  useEffect(()=>{
    HandleClick2();
  },[])
  function Handle(e) {
    setUsername(e.target.value);
    console.log(username);
  }
  function Handle1(e) {

    setUsername1(e.target.value);
    console.log(username1);
  }
  function Handle2(e) {
    setUsername2(e.target.value);
    console.log(username2)
    
  }
  function Handle3(e) {
    setUsername3(e.target.value);
    console.log(username3);
  }
  function Handle4(e) {
    setUsername4(e.target.value);
    console.log(username4);
  }
  function Handle5(e) {
    setUsername5(e.target.value);
    console.log(username5);
  }
  function Handle6(e) {
    setUsername6(e.target.value);
    console.log(username6);
  }
  function Handle7(e) {
    setUsername7(e.target.value);
    console.log(username7);
  }
  function Handle8(e) {
    setUsername8(e.target.value);
    console.log(username8);
  }
  function Handle9(e) {
    setUsername9(e.target.value);
    console.log(username9);
  }
  function Handle10(e) {
    setUsername10(e.target.value);
    console.log(username10);
  }
  function Handle11(e) {
    setUsername11(e.target.value);
    console.log(username11);
  }
  function Handle12(e) {
    setUsername12(e.target.value);
    console.log(username12);
  }
  function Handle13(e) {
    setUsername13(e.target.value);
    console.log(username13);
  }
  function Edit(){
    setK(0)
  }
  
  async function handleClick1(e) {
    
    try {
      const res = await fetch("/filldata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: patientname,
          medicalHistory: {
            age: username1,
            sex: username2==="male"?(1):(0),
            cp: username3,
            rbp: username4,
            sc: username5,
            fbs: username6,
            rer: username7,
            mhr: username8,
            eia: username9,
            olds: username10,
            st: username11,
            mvs: username12,
            thal: username13,
          },
        }),
      });

      if (res.ok) {
        console.log("Updated");
      } else {
        console.error("Registration passed");
      }
    } catch (error) {
      console.error("Error during :", error);
    }
  }
  async function HandleClick2() {
    
    try {
      const res = await fetch("/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: patientname,
          
        }),
      });

      if (res.ok) {
        const { name,medicalHistory } = await res.json();
        console.log(medicalHistory)
        setPatientName(name)
        setMedicalData(medicalHistory)
      } else {
        console.error("Login pass");
        navigate("/registration");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (
    <>
        <header className="header1" style={{ backgroundColor: "#e11127" }}>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link
                to="/"
                id="header"
                className="navbar-brand navbarcolorfont scale-up-center"
              >
                <img src={logo} style={{ height: "60px" }} alt="logo" />
              </Link>
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ color: "aliceblue" }}
                      aria-current="page"
                      
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    {k===0?(
                      <></>
                    ):(
                      <Link to="/waterfilloutput"
                      className="nav-link"
                      style={{ color: "aliceblue" }}
                      
                    >
                      Heart Health's summary
                    </Link>
                    )}
                  </li>
                  <a
                    style={{
                      paddingTop: "9px",
                      paddingLeft: "7px",
                      position: "absolute",
                      left: "1430px",
                      top: "17px",
                      fontSize: "25px",
                      fontWeight: "100",
                      color: "aliceblue",
                    }}
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                  >
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

      <div className="" style={{ backgroundColor: "aliceblue", height: "710px" }}>

        
        <br />


        <div
          className="container slide-in-form "
          style={{
            marginTop: "20px",
            marginLeft: "85px",
            position: "relative",
            border: "#e11127 solid 10px",
            width: "2000px",
            borderRadius: 6,

            backgroundColor: "#fff",
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
          }}
        >

          <form
            
            className=""
            id=""
            style={{
              
              position: "relative",
              marginTop: 16,
              minHeight: 58,
              backgroundColor: "#fff",

            }}
          >
            <div className="form first">
              <div className="details personal" style={{ marginTop: 30 }}>
                <span
                  className=""
                  style={{
                    display: "block",
                    marginBottom: 16,
                    fontSize: 16,
                    fontWeight: 500,
                    margin: "6px 0",
                    color: "#333",
                    textAlign: "center"
                  }}
                >
                  <h2>Health data form</h2>
                </span >
                <div
                  className="fields"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                  }}
                >

                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0",
                      marginLeft: "80px"
                    }}
                  >
                    <label htmlFor="" style={{marginLeft:"0px"}}>Age</label>
                    {k===0?(
                      <input onChange={Handle1}
                      type="text"
                      placeholder="Enter your age"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        marginLeft:"0px"
                        
                      }}
                    />
                    ):(<div>
                    {medicaldata.age}
                    </div>)}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      
                      display: "flex",
                      width:"300px",
                      flexDirection: "column",
                      margin: ""
                    }}
                  >
                    <label htmlFor="" style={{marginLeft:"25px ",marginBottom:"0px"}}>Gender</label>
                 {k===0?(
                  <input id="gender" 
                  onChange={Handle2}
                  type="text"
                  placeholder="Enter your gender"
                  required=""
                  style={{
                    outline: "none",
                    borderRadius: 5,
                    border: "1px solid #aaa",
                    padding: "0 10px",
                    height: 42,
                    backgroundColor:"rgba(244,248,247,255)",
                    fontWeight:"100",
                    color:"gray",
                    marginLeft:"30px",
                    width:"280px",
                    
                  }}/>
                 ):(
                  <>
                  <div style={{marginLeft:"25px",padding:"0"}}>
                    {medicaldata.sex===1?<div style={{}}>Male</div>:<div>Female</div>}
                  </div>
                  </>
                 )}   
                     
                
                    
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0",
                      marginLeft:"130px"
                    }}
                  >
                    <label htmlFor="">CP</label>
                    {k === 0 ? (
                      <>
                        <input
                          onChange={Handle3}
                          type="text"
                          placeholder="Enter your cp"
                          required=""
                          style={{
                            outline: "none",
                            borderRadius: 5,
                            border: "1px solid #aaa",
                            padding: "0 10px",
                            height: 42,
                            margin: "8px 0",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {medicaldata.cp}
                      </>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0",
                      marginLeft: "80px"
                    }}
                  >
                    <label htmlFor="">RBP</label>
                    {k===0?(
                      <input onChange={Handle4}
                      type="text"
                      placeholder="Enter your rbp"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0"
                      }}
                    />
                    ):(
                      <div>
                        {medicaldata.rbp}
                      </div>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="">SC</label>
                    {k===0?(
                      <input onChange={Handle5}
                      type="text"
                      placeholder="Enter your sc"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0"
                      }}
                    />
                    ):(
                      <div>
                        {medicaldata.sc}
                      </div>
                    )}
                    
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="">Fbs</label>
                    {k===0?(
                      <input onChange={Handle6}
                      type="text"
                      placeholder="Enter your fbs"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0"
                      }}
                    />
                    ):(
                      <div>
                        {medicaldata.fbs}
                      </div>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="" style={{ marginLeft: "80px" }}>Rer</label>
                    {
                      k===0?(
                        <input onChange={Handle7}
                      type="text"
                      placeholder="Enter your rer"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0",
                        marginLeft: "80px"
                      }}
                    />
                      ):(
                        <div style={{marginLeft:"80px"}}>
                          {medicaldata.rer}
                        </div>
                      )
                    }
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="" style={{ marginLeft: "38px" }}>MHR</label>
                   {k===0?(
                     <input onChange={Handle8}
                     type="text"
                     placeholder="Enter your mhr"
                     required=""
                     style={{
                       outline: "none",
                       borderRadius: 5,
                       border: "1px solid #aaa",
                       padding: "0 10px",
                       height: 42,
                       margin: "8px 0",
                       marginLeft: "37px"
                     }}
                   />
                   ):(
                    <div style={{marginLeft:"40px"}}>
                      {medicaldata.mhr}
                    </div>
                   )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="">Eia</label>
                    {k===0?(
                      <input onChange={Handle9}
                      type="text"
                      placeholder="Enter your eia"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0"
                      }}
                    />
                    ):(
                      <div style={{}}>{
                        medicaldata.eia}
                      </div>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="" style={{ marginLeft: "80px" }}>Olds</label>
                    {k===0?(
                      <input onChange={Handle10}
                      type="text"
                      placeholder="Enter your olds"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0",
                        marginLeft: "80px"
                      }}
                    />
                    ):(
                      <div style={{marginLeft:"80px"}}>
                        {medicaldata.olds}
                      </div>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="" style={{ marginLeft: "39px" }}>ST</label>
                    {k===0?(
                      <input onChange={Handle11}
                      type="text"
                      placeholder="Enter your st"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0",
                        marginLeft: "35px"
                      }}
                    />
                    ):(
                      <div style={{marginLeft:"40px"}}>
                        {medicaldata.st}
                      </div>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="">MVS</label>
                    {k===0?(
                      <input onChange={Handle12}
                      type="text"
                      placeholder="Enter your mvs"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0"
                      }}
                    />
                    ):(
                      <div>
                        {medicaldata.mvs}
                      </div>
                    )}
                  </div>
                  <div
                    className="input-field"
                    style={{
                      display: "flex",
                      width: "calc(100% / 3 - 50px)",
                      flexDirection: "column",
                      margin: "4px 0"
                    }}
                  >
                    <label htmlFor="" style={{ marginLeft: "489px" }}>Thal</label>
                    {k===0?(
                      <input onChange={Handle13}
                      type="text"
                      placeholder="Enter your st"
                      required=""
                      style={{
                        outline: "none",
                        borderRadius: 5,
                        border: "1px solid #aaa",
                        padding: "0 10px",
                        height: 42,
                        margin: "8px 0",
                        marginLeft: "485px"
                      }}
                    />
                    ):(
                      <div style={{marginLeft:"490px"}}>
                        {medicaldata.thal}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {k===0?(
                <button
                className="btn btn-lg"
                style={{ backgroundColor: "#e11127", color: "aliceblue", marginTop: "20px", marginLeft: "580px", borderRadius: "25px", fontSize: "1.1rem" ,marginBottom:"30px"}}
                onClick={handleClick1}
              >
              Submit
                
              </button>
              ):(
                <div
                className="btn btn-lg"
                style={{ backgroundColor: "#e11127", color: "aliceblue", marginTop: "20px", marginLeft: "580px", borderRadius: "25px", fontSize: "1.1rem" ,marginBottom:"30px"}}
                onClick={Edit}
              >
              Edit
                
              </div>
              )}

            </div>
          </form>
        </div>
      </div>



      <footer
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#e11127",
          color: "aliceblue",
          textAlign: "center",

          fontWeight: "200",
        }}
      >
        Copyright belongs to American Heart Association
      </footer>
    </>
  );
};
export default Experiment;
