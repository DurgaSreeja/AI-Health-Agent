import React from 'react'
import Pf from "../images/profile1.jpg"
import "./hello.css"
function Cards(props) {
  
  console.log(typeof props.url)
  return (
    <>
    {props.url}
      <div className="slit-in-vertical" style={{margin:"50px"}}>
        <div className="card shadow-lg slit-in-vertical" style={{height:"300px",width:"300px"}}>
        <img src="http://st1.thehealthsite.com/wp-content/uploads/2024/01/pexels-moe-magners-6671781.jpg" className="card-img-top" alt="..." style={{width:"500px",height:"50px"}}/>
          <div className="card-body">
            <h5 className="card-title">{(props.title[0].toUpperCase()+props.title.slice(1,props.title.length))}</h5>
            <p className="card-text">{props.description}</p>
            <a href="#" class="btn" style={{textDecoration:"none",border:"none",borderRadius:"50px",color:"aliceblue",backgroundColor:"#e11127"}}>Go somewhere</a>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default Cards