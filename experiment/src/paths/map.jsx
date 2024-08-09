import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import pjlogo from "../images/image.png";
import { Link } from 'react-router-dom';

const NearbyHospitalsMap = () => {
  const [hospital1, setHospitals] = useState([]);

  function updateHospitals(hospitalName) {
    setHospitals((prevHospitals) => {
      const uniqueHospitals = new Set(prevHospitals.map(hospital => hospital[0][1]));

      if (!uniqueHospitals.has(hospitalName[0][1])) {
        return [...prevHospitals, hospitalName];
      }

      return prevHospitals;
    });
  }

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoic2F0aHdpazIxMDUiLCJhIjoiY2xxeXlwaTJ1MDIyaDJxcW4zeDJoc3NnayJ9.hJxKaEPtd426XMWET801EA";

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {
      const { latitude, longitude } = position.coords;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/navigation-night-v1",
        center: [longitude, latitude],
        zoom: 12,
      });

      map.getCanvas().style.backgroundColor = "#";
      new mapboxgl.Marker({ color: "#bec1ff" }).setLngLat([longitude, latitude]).addTo(map);

      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const address = data.display_name;

          const hospitalsApiUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=20&q=hospital&addressdetails=1&viewbox=${longitude - 1.5},${latitude - 1.5},${longitude + 1.5},${latitude + 1.5}`;

          return fetch(hospitalsApiUrl);
        })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((hospital) => {
            updateHospitals([hospital.display_name.split(',')]);
            new mapboxgl.Marker({ color: "red" })
              .setLngLat([hospital.lon, hospital.lat])
              .setPopup(
                new mapboxgl.Popup().setHTML(`<div style="ss"></div><h6>${hospital.display_name}</h6>`)
              )
              .addTo(map);
          });
        })
        .catch((error) => console.error("Error fetching hospitals:", error));
    }

    function errorLocation(error) {
      console.error("Error getting user location:", error);
    }
  }, []); 

  useEffect(() => {
    console.log(hospital1);
  }, [hospital1]); 

  useEffect(() => {
    const handleScroll = (e) => {
      console.log('Scroll event:', e);
    };
  
    // Add event listener
    window.addEventListener('scroll', handleScroll);
  
    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
 }, []);
  return (
    <div className='scrollable-content' style={{scrollBehavior:"smooth"}}>
      <div style={{ backgroundColor:"rgba(66,77,92,255)"}}>
        <header className="header1" style={{ backgroundColor: "rgba(93,117,126,255)" }}>
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
                    <a className="nav-link" style={{ color: 'aliceblue' }} aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{ color: 'aliceblue' }} href="#">About us</a>
                  </li>
                  <a style={{ position: 'absolute', left: '1430px', top: '17px', fontSize: '25px', fontWeight: '100', color: 'aliceblue' }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
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
              <div className="details1">
                Name, age, blood group, etc .......
              </div>
            </div>
          </div>
        </div>

        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      body {\n        margin: 0;\n        padding: 0;\n      }\n      #map {\n        height: 100vh; width:100vh     }\n    ",
          }}
        />
        <div style={{ height: "100px", width: "100%", color: "aliceblue", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2.2rem", fontWeight: "500" }}>Nearby emergency care near your area</div>
        <div className="row row-cols-1 row-cols-md-6 g-4">
          {hospital1.map((hospital, index) => (
            <div className="slit-in-vertical" style={{ margin: "50px" }}>
              <div className="card shadow-lg slit-in-vertical" style={{ height: "300px", width: "300px", backgroundColor: "rgba(93,117,126,255)", color: "aliceblue" }}>

                <div className="card-body">
                  <h5 className="card-title">{(hospital[0][0])}</h5>
                  <p className="card-text">{hospital[0][1]}
                    <br />
                    {hospital[0][2]},
                    {hospital[0][3]},
                    {hospital[0][4]},
                    <br />
                    {hospital[0][5]},
                    <br />
                    {hospital[0][8]},
                    Pin code:
                    {hospital[0][9]}
                  </p>
                  <a href="#" className="btn" style={{ textDecoration: "none", border: "none", borderRadius: "50px", color: "aliceblue", backgroundColor: "rgba(66,77,92,255)" }}>Go somewhere</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="map" style={{ height: '500px', width: "1200px", marginLeft: "150px", border: "15px solid rgba(93,117,126,255)" }} />
        &nbsp;
      </div>
      <footer style={{ width: "100%", height: "30px", backgroundColor: "rgba(93,117,126,255)", color: "aliceblue", textAlign: "center" }}>This belongs to bunnypower</footer>
    </div>
  );
};

export default NearbyHospitalsMap;
