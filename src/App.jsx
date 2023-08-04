import React, { useState } from "react";
import axios from "axios";

import { WiHumidity } from "react-icons/wi";
import { BsSearch } from "react-icons/bs";
import { WiCloudyGusts } from "react-icons/wi";
export default function App() {
  const [name, setName] = useState("London");
  const [data, setData] = useState({
    celsius: 10,
    name: "london",
    humidity: 10,
    speed: 2,
    icon: "13d",
  });

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=bcfbbd60aa13de46a7b85faeae34d2db&units=metric`;

      axios
        .get(apiUrl)
        .then((res) => {
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,

            icon: res.data.weather[0].icon,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
   
      <div className="container-fluid">
      
        <div className="  text-white ">
          <div
            className="card text-white bg-info mx-auto d-flex items-center my-5"
            style={{ width: "23rem" }}
          >
            <div className="card-body">
              <form className="d-flex">
                <input
                  className="form-control me-2 bg-transparent btn btn-outline-light"
                  type="search"
                  placeholder="Enter Cityname"
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-light"
                  onClick={handleClick}
                  type="button"
                >
                  <BsSearch />
                </button>
              </form>
              <div className=" text-center">
                <img
                  id="wicon"
                  src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                  alt=""
                  
                />
              </div>

              <h1 className="text-center">{data.celsius}°C</h1>
              <h2 className="text-center">{data.name}</h2>
              <div className="container">
                <div className="row text-center my-5 mx-0">
                  <div className="col d-flex ">
                    <WiHumidity size="2x" />
                    <div>
                      <p>{data.humidity}%</p>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <WiCloudyGusts size="2x" />
                    <div>
                      <p>{data.speed}Km/h</p>
                      <p>wind</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
