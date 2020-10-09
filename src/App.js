import React from 'react';
import './App.css';
import $ from 'jquery';


function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 text-center titleName">
          <p>UrTube</p>
        </div>
        <div className="col-6 text-center" id="title">
          <input id="searchInput"></input>
          <button><img src={require('./images/search-icon.png')} alt="magnifying glass" /></button>
        </div>
        <div className="col-3">
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <div  id="playerDiv">
            <iframe id="ytplayer" type="text/html"
              title="ytplayer" 
              src="https://www.youtube.com/embed/axCcDUbeC2Y?autoplay=1&origin=http://example.com"
              frameborder="0" > 
            </iframe>
          </div>
        </div>
        <div className="col-lg-3 col-sm-12" id="relatedVideos">
          <p>Related Videos</p>
        </div>
      </div>
    </div>
  );
}

export default App;
