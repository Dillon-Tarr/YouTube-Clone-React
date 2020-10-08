import React from 'react';
import './App.css';
import $ from 'jquery';

function setHeight(){
  var width = $( "iframe" ).width();
  var height = (width * .5625);
  $( "iframe" ).css("height", `${height}`);

}

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <input></input>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <div  id="playerDiv">
            <iframe id="ytplayer" type="text/html" 
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
