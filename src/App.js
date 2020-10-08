import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <input></input>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          <iframe id="ytplayer" type="text/html" width="640" height="360"
            src="https://www.youtube.com/embed/axCcDUbeC2Y?autoplay=1&origin=http://example.com"
            frameborder="0">  
          </iframe>
        </div>
        <div className="col-3">
          <p>Related Videos</p>
        </div>
      </div>
    </div>
  );
}

export default App;
