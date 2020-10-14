import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import $ from 'jquery'
import apiKey from './default'
import RelatedVideos from './components/RelatedVideos/RelatedVideos'
import Header from './components/Header/Header'
import convertCommonHtmlEntities from './convertCommonHtmlEntities'
import CurrentVideo from './components/CurrentVideo/CurrentVideo'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      relatedVideos:{},
      loading: true, 
      searchText: 'banana',
      videoId: 'xYmuum_wgvc',
      videoTitle: 'devCodeCamp Info Session',
      videoDescription: `Learn to code!

      For years, devCodeCamp has changed the lives of hundreds of students by training people with zero coding experience and giving them the skills to get a new job on a better career path in the tech industry. Our graduates get hired by the top companies in the state of Wisconsin and beyond, and these companies continue to come back and hire more.`,
      numberOfLikes: 0,
      numberOfDislikes: 0
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
      console.log(this.state.videoTitle);
      console.log(this.state.relatedVideos.items[0].snippet.thumbnails.default.url);
    }); 
  }

  render() {
    return (this.state.loading ? <h1 id="loading">Loading...</h1> : (
      <div className="container-fluid">
        <Header  searchYouTube={this.searchYouTube}/>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <CurrentVideo
          data={this.state}
          />
        </div>
        <div className="col-lg-3 col-sm-12" id="related-videos">
          <RelatedVideos
          data={this.state.relatedVideos}
          switchToRelatedVideo={this.switchToRelatedVideo}
          convertCommonHtmlEntities={this.convertCommonHtmlEntities}
          />
        </div>
      </div>
    </div>
    ))
  }

  searchYouTube = (searchText) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchText}&key=${apiKey}&part=snippet&type=video`)
    .then(res => {
      let video = res.data.items[0];
      video.snippet.title = convertCommonHtmlEntities(video.snippet.title);
      this.setState({ 
      videoId: video.id.videoId,
      videoTitle: video.snippet.title,
      videoDescription: video.snippet.description
    });
      if(res.data.items[0].snippet.title.includes(';')){
            let revisedTitle = res.data.items[0].snippet.title.split('&').shift();
            revisedTitle += res.data.items[0].snippet.title.split(';').pop();
            console.log(revisedTitle);
      }
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
      let relatedVideos = res.data;
      for (let i = 0; i < relatedVideos.items.length; i++){
        relatedVideos.items[i].snippet.title = convertCommonHtmlEntities(relatedVideos.items[i].snippet.title);
      }
      this.setState({
      relatedVideos: relatedVideos,
    });
    });  
  }

  switchToRelatedVideo = (videoId, title, description) => {
    this.setState({
    videoId: videoId,
    videoTitle: title,
    videoDescription: description
    },
    this.searchRelated
    );
    $('#ytplayer').attr("src", `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`);
  }

}