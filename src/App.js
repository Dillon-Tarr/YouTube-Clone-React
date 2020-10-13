import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import $ from 'jquery'
import apiKey from './default'
import RelatedVideos from './components/RelatedVideos/RelatedVideos'
import Header from './components/Header/Header'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults:{},
      relatedVideos:{},
      loading: true, 
      searchText: 'banana',
      videoId: 'xYmuum_wgvc',
      videoTitle: 'devCodeCamp Info Session'
    }

    this.switchToRelatedVideo = this.switchToRelatedVideo.bind(this);
  }
  
  componentDidMount() {
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&relatedToVideoId=${this.state.videoId}&part=snippet&type=video`)
    .then(res =>{
      this.setState({
      relatedVideos: res.data,
      loading: false
    });
      console.log(this.state.relatedVideos);
      console.log(this.state.relatedVideos.items[0].snippet.thumbnails.default.url);
    }); 
  }

  render() {
    return (this.state.loading ? <h1 id="loading">Loading...</h1> : (
      <div className="container-fluid">
        <Header  searchYouTube={this.searchYouTube}/>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <div  id="playerDiv">
            <iframe id="ytplayer" type="text/html"
              title="ytplayer" 
              src="https://www.youtube.com/embed/xYmuum_wgvc?autoplay=1&origin=http://example.com"
              frameBorder="0" > 
            </iframe>
          </div>
          <div className="row">
            <div className="col-8">
              <h2>{this.state.videoTitle}</h2>
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
        <div className="col-lg-3 col-sm-12" id="related-videos">
          <RelatedVideos
          data={this.state.relatedVideos}
          switchToRelatedVideo={this.switchToRelatedVideo}
          />
        </div>
      </div>
    </div>
    ))
  }

  searchYouTube = (searchText) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchText}&key=${apiKey}&part=snippet&type=video`)
    .then(res => {
      this.setState({ 
      searchResults: res.data,
      videoId: res.data.items[0].id.videoId,
      videoTitle: res.data.items[0].snippet.title
    });
      if(res.data.items[0].snippet.title.includes(';')){
            let revisedTitle = res.data.items[0].snippet.title.split('&').shift();
            revisedTitle += res.data.items[0].snippet.title.split(';').pop();
            console.log(revisedTitle);
      }
      console.log(this.state.videoTitle);
      console.log(this.state.searchResults.items[0].id);
      $('#ytplayer').attr("src", `https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`);
      this.searchRelated();
    })
    .catch((err) => {
      $( '#searchInput' ).val("");
      $( '#searchInput' ).attr("placeholder", `No results for "${searchText}"; please try again`);
      console.log(err);
    });
  }

  searchRelated = () => {
    $( '#searchInput' ).attr("placeholder", `Search`);
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&relatedToVideoId=${this.state.videoId}&part=snippet&type=video`)
    .then(res => {
      this.setState({
      relatedVideos: res.data
    });
    });  
  }

  switchToRelatedVideo = (videoId, title) => {
    // let revisedTitle = title.split('&').shift();
    // revisedTitle += title.split(';').pop();
    // console.log(revisedTitle);
    this.setState({
    videoId: videoId,
    videoTitle: title
    });
    $('#ytplayer').attr("src", `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`);
    this.searchRelated();
  }

}