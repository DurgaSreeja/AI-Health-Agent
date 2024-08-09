import React from "react"
import pjLogo from '../images/pjlogo.png'; // Import the image
import "./hello.css"
import "../index.css"
import { useState,useEffect } from "react"
import Cards from "./cards";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Searchpage() {
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
    
    const Search = [
        { id: 1, title: 'urahara', description: "Cardiologist . Works in SOandSo hospital ." },
        { id: 2, title: 'yor', description: "Cardiologist . Works in WellandSo hospital ." },
        { id: 3, title: 'hayasake', description: "Cardiologist . Works in WellandWell hospital ." },
        { id: 4, title: 'hayasake', description: "Cardiologist . Works in WellandWell hospital ." },
        { id: 5, title: 'hayasake', description: "Cardiologist . Works in WellandWell hospital ." }

    ]
    const [first, setFirst] = useState('')
    console.log(Search)
    function handleChange(event) {
        setFirst(event.target.value)
    }
    console.log(first)
    return (


        <>
            <div>
                <header className="header1">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <Link to="/" id="header" className="navbar-brand navbarcolorfont scale-up-center" >
                                <img src={pjLogo} style={{ height: '60px' }} alt="logo" />
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
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link" style={{ color: '#e11127' }} aria-current="page" >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#e11127' }} href="#">
                                            About us
                                        </a>
                                    </li>
                                    <form className="d-flex" role="search">
                                        <input
                                            className="navinput"
                                            id="input1"
                                            style={{
                                                backgroundColor: 'rgb(218, 230, 245)',
                                                color: '#e11127',
                                                position: 'absolute',
                                                left: '500px',
                                                height: '40px',
                                                width: '500px',
                                                borderRadius: '50px',
                                                outline: 'none',
                                                border: 'none',
                                                padding: '20px',
                                            }}
                                            onChange={handleChange}
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                        <div className="resultbox"></div>
                                    </form>
                                    <a
                                        style={{
                                            position: 'absolute',
                                            left: '1400px',
                                            top: '17px',
                                            fontSize: '25px',
                                            fontWeight: '100',
                                            color: '#e11127',
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
            <br />
            <div className="row row-cols-1 row-cols-md-6 g-4" >{Search.map((event) => {
                if (event.title.includes(first.toLowerCase()) || event.description.includes(first)) {
                    return (
                        <>  <br />
                            <Cards title={event.title} description={event.description} /></>
                    )
                }
            })}
            </div>
            <footer style={{ width: '100%', height: '30px', backgroundColor: '#e11127', color: 'aliceblue', textAlign: 'center', fontWeight: '200' }}>Copyright belongs to American Heart Association</footer>

        </>

    );

}
export default Searchpage
// style={{position:"absolute",top:"120px",left:"60px"}}