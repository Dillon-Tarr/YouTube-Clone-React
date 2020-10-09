import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import $ from 'jquery'
import apiKey from './default'



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults:{},
      loading: false, 
      searchText: 'banana'
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchYouTube = this.searchYouTube.bind(this);
  }

  searchYouTube() {
    axios.get(`https://www.googleapis.com/youtube/v3/search?q=${this.state.searchText}&key=${apiKey}&part=snippet&type=video`)
    .then(res =>{
      this.setState({ 
      searchResults: res.data,
    });
      console.log(this.state.searchResults);
    });
    
    
  }

  handleSearchChange(event){
    console.log(event.target.value);
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    return (this.state.loading ? <div><span> Loading... </span></div> : (
      <div className="container-fluid">
      <div className="row" id="title-bar">
        <div className="col-lg-3 col-sm-12 text-center">
          <p id="title"><img src={require('./images/ur-tube-favicon.png')} alt="UrTube icon" id="title-icon" className="img-fluid"/>{String.fromCharCode(160)}UrTube</p>
        </div>
        <div className="col-lg-6 col-sm-12 d-flex justify-content-center" id="search">
          <input id="searchInput" onChange={this.handleSearchChange}></input>
          <button id="searchButton" onClick={this.searchYouTube}><img src={require('./images/search-icon.png')} alt="magnifying glass" id="searchIcon"/></button>
        </div>
        <div className="col-lg-3">
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <div  id="playerDiv">
            <iframe id="ytplayer" type="text/html"
              title="ytplayer" 
              src="https://www.youtube.com/embed/axCcDUbeC2Y?autoplay=1&origin=http://example.com"
              frameBorder="0" > 
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
    ))
  }
}

