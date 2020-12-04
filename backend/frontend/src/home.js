import React from "react";
import "./App.css";

function Home() {
  return (
    <div className="home-container">
 
      <div className="home-wrap">
        <h3>MUSIC</h3>
      
      </div>
      <br />
      <div className="home-wrap">
        <h1>VIDEOS</h1>
        <img
          src="./video.jpg"
          alt="video"
          width="50%"
          height="310"
          className="img"
        />
      </div>
      <br />
      <div className="home-wrap">
        <h1>MOVIES</h1>
        <img
          src="./movie.jpg"
          alt="movie"
          width="50%"
          height="310"
          className="img"
        />
      </div>
      <br />
      <div className="home-wrap">
        <h1>AUDIO BOOKS</h1>
        <img
          src="./audio-book.png"
          alt="audio"
          width="50%"
          height="310"
          className="img"
        />
      </div>
    </div>
  );
}

export default Home;
