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
          <button id="searchButton"><img src={require('./images/search-icon.png')} alt="magnifying glass" id="searchIcon"/></button>
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
          <div className="row">
            <div className="col-8">
              <h1>Title</h1>
            </div>
            <div className="col-2">
              <h3>Likes</h3>
            </div>
            <div className="col-2">
              <h3>Dislikes</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h4>number of comments</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <input></input>
            </div>
            <div className="col-2">
              <button>Cancel</button>
            </div>
            <div className="col-2">
              <button>Comment</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div id="commentsReplies">
                <p>Comments and Replies</p>
              </div>
            </div>
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
