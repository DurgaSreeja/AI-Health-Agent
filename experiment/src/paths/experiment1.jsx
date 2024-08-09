import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/image.png"
const apiKey = '506e4c4bc0ebce07a5f14bfdc153919e';

const MyNewsComponent = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsData1, setNewsData1] = useState([]);
  const [combinedState, setCombinedState] = useState([]);

  // Update combined state when state1 or state2 changes
  const updateCombinedState = () => {
    setCombinedState([...newsData, ...newsData1]);
  };

  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data.articles)) {
        setDataFunction((prevData) => {
          const uniqueArticles = data.articles.filter((newArticle) => (
            // Check if the new article's ID (or any unique identifier) is not already in newsData
            !prevData.some((existingArticle) => existingArticle.id === newArticle.id)
          ));
          return [...prevData, ...uniqueArticles];
        });
      } else {
        console.error('Invalid data format. Articles should be an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const urls = {
    url1: `https://gnews.io/api/v4/search?category=health&q=diet for health&lang=en&country=us&max=2&apikey=${apiKey}`,
    url2: `https://gnews.io/api/v4/search?category=health&q=exercise for heart health&lang=en&country=us&max=2&apikey=${apiKey}`,
  };

  useEffect(() => {
    Object.entries(urls).forEach(([key, url]) => {
      fetchData(url, key === 'url1' ? setNewsData : setNewsData1);
    });
  }, []);
  

  return (
    <div>
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
                    <a
                      className="nav-link"
                      style={{ color: "aliceblue" }}
                      
                    >
                      About us
                    </a>
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
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h1 style={{ color: "#e11127" }}>Profile</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="details">
              <h3 style={{ display: "block" }}>Patients details</h3>
              <div className="details1">Name, age, blood group, etc .......</div>
            </div>
          </div>
        </div>


      <div style={{marginTop:"40px"}}>
        {newsData.map((article, index) => (
          // <div key={index} className="slit-in-vertical" style={{ margin: "50px" }}>
          //   <div className="card shadow-lg slit-in-vertical" style={{ height: "400px", width: "300px" }}>
          //     <div className="card-body">
          //       <img src={article.image} className="card-img-top" alt={`Article ${index}`} style={{ height: "200px", width: "265px" }} />
          //       <h5 className="card-title">{article.title.substring(0,20) }..</h5>
          //       <p className="card-text">{article.description.substring(0,50)}</p>
          //       <a href="#" className="btn" style={{ textDecoration: "none", border: "none", borderRadius: "50px", color: "aliceblue", backgroundColor: "#e11127" }}>Go somewhere</a>
          //     </div>
          //   </div>
          // </div>

<div className="card mb-3 shadow-lg slit-in-vertical" style={{ maxWidth: '1100px',marginLeft:"150px",marginTop:"30px" }}>
<div className="row g-0">
  <div className="col-md-4">
    <img src={article.image} className="img-fluid rounded-start" alt="..." />
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="card-title">{article.title }</h5>
      <p className="card-text">{article.description}</p>
      <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>
        ))}
        {newsData1.map((article, index) => (
          <div className="card mb-3 shadow-lg slit-in-vertical" style={{ maxWidth: '1100px',marginLeft:"150px",marginTop:"30px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={article.image} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{article.title }</h5>
                <p className="card-text">{article.description}</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          </div>
          
        ))}
      </div>
      <footer style={{ width: '100%', height: '30px', backgroundColor: '#e11127', color: 'aliceblue', textAlign: 'center', marginTop: '40px', fontWeight: '200' }}>Copyright belongs to American Heart Association</footer>
      
    </div>
    
  );
};

export default MyNewsComponent;
