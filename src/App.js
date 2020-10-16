import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import $ from 'jquery'
import apiKey from './default'
import RelatedVideos from './components/RelatedVideos/RelatedVideos'
import Header from './components/Header/Header'
import convertCommonHtmlEntities from './string-corrections'
import CurrentVideo from './components/CurrentVideo/CurrentVideo'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ourVideos: [],
      relatedVideos: [],
      loading: true, 
      searchText: 'banana',
      videoId: 'xYmuum_wgvc',
      title: 'devCodeCamp Info Session',
      description: `Learn to code!\n\nFor years, devCodeCamp has changed the lives of hundreds of students by training people with zero coding experience and giving them the skills to get a new job on a better career path in the tech industry. Our graduates get hired by the top companies in the state of Wisconsin and beyond, and these companies continue to come back and hire more.`,
      videoExistsInMongo: true,
      mongoVideoId: '5f88f8c923b3662a549b8a79',
      numberOfLikes: 0,
      numberOfDislikes: 0,
      comments: []
    }

    this.switchToRelatedVideo = this.switchToRelatedVideo.bind(this);
  }
  
  componentDidMount() {
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&relatedToVideoId=${this.state.videoId}&part=snippet&type=video`)
    .then(res =>{
      axios.get(`http://localhost:5000/api/videos/`)
      .then(ourRes =>{
        axios.get(`http://localhost:5000/api/videos/${this.state.mongoVideoId}`)
        .then(initialVideoRes =>{
          this.setState({
            relatedVideos: res.data,
            loading: false,
            ourVideos: ourRes.data,
            numberOfLikes: initialVideoRes.data.likes,
            numberOfDislikes: initialVideoRes.data.dislikes,
            comments: initialVideoRes.data.comments
          });
        })
        .catch(function (error) {
          console.log(`An error occurred in the UrTube request for the initial video:`, error);
        })
      })
      .catch(function (error) {
        console.log(`An error occurred in the UrTube request for all videos:`, error);
      })
    })
    .catch(function (error) {
      console.log(`An error occurred in the YouTube request:`, error);
    })
  }

  render() {
    return (this.state.loading ? <h1 id="loading">Loading...</h1> : (
      <div className="container-fluid">
        <Header  searchYouTube={this.searchYouTube}/>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <CurrentVideo
          data={this.state}
          updateVideo={this.updateVideo}
          putNewReply={this.putNewReply}
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
      title: video.snippet.title,
      description: video.snippet.description
      }, () => {
      this.checkForExistingVideo();
      });
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
    title: title,
    description: description,
    }, () => {
      this.checkForExistingVideo();
      this.searchRelated();
    });
    $('#ytplayer').attr("src", `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`);
  }

  checkForExistingVideo = () => {
    axios.get(`http://localhost:5000/api/videos/`)
    .then(res =>{
      this.setState({
        ourVideos: res.data
      });
    })
    .catch(function (error) {
      console.log(`An error occurred in the UrTube request for all videos:`, error);
    })
    .then(() => {
      let array = this.state.ourVideos.filter((el) => el.videoId === this.state.videoId);
      if (array.length === 0){
        this.setState({
          videoExistsInMongo: false,
          mongoVideoId: '',
          numberOfLikes: 0,
          numberOfDislikes: 0,
          comments: []
        });
      }
      else{
        this.setState({
          videoExistsInMongo: true,
          mongoVideoId: array[0]._id,
          numberOfLikes: array[0].likes,
          numberOfDislikes: array[0].dislikes,
          comments: array[0].comments
        });
      }
    });
  }

  updateVideo = (type, commentText = "") => {
    let likes = this.state.numberOfLikes;
    let dislikes = this.state.numberOfDislikes;

    if (type !== 'comment'){ //increase likes or dislikes first, regardless of whether video exists
      if(type === 'up'){
        likes++;
      }else if(type === 'down'){
        dislikes++;
      }
      else{
        return console.log(`updateVideo ran with invalid type.`);
      }

      if (this.state.videoExistsInMongo){
        this.putLikesAndDislikes(likes, dislikes);
      }
      else{
        this.postVideoToMongo(likes, dislikes);
      }
    }
    else if(type === 'comment'){
      if (typeof commentText !== "string" || !(commentText.length > 0)){
        return console.log(`You tried to add a comment without supplying the updateVideo function with commentText.`);
      }
      else if (this.state.videoExistsInMongo){
        this.putNewComment(commentText);
      }
      else{
        this.postVideoToMongo(likes, dislikes, commentText);
      }
    }
  }

  putNewComment = (commentText) => {
    $( '#commentInput' ).val("");
    axios.put(`http://localhost:5000/api/videos/${this.state.mongoVideoId}`,
    {
      "text": commentText
    })
    .then((res) => {
      console.log(`A comment was added to this video on the database. Here's the updated video data:`, res.data)
      this.setState({
        comments: res.data.comments
      })
    })
    .catch(function (error) {
      console.log(`The following error occurred when trying to add a comment to this video on the database:`, error);
    })
  }
  
  putLikesAndDislikes = (likes, dislikes) => {
    axios.put(`http://localhost:5000/api/videos/${this.state.mongoVideoId}`,
    {
      "likes": likes,
      "dislikes": dislikes
    })
    .then((res) => {
      console.log(`This video updated on the database. Here's the updated video data:`, res.data)
      this.setState({
        numberOfLikes: res.data.likes,
        numberOfDislikes: res.data.dislikes
      });
    })
    .catch(function (error) {
      console.log(`The following error occurred when trying to update this video on the database:`, error);
    })
  }

  postVideoToMongo = (likes, dislikes, commentText = "") => {
    let comments = [];
    if (commentText.length > 0){
      comments.push(commentText);
    }
    axios.post(`http://localhost:5000/api/videos/`,
    {
      "videoId": this.state.videoId,
      "likes": likes,
      "dislikes": dislikes,
      "comments": comments
    })
    .then((res) => {
      console.log(`This video was added to the database. Here's the video's data:`, res.data);
      this.setState({
        videoExistsInMongo: true,
        mongoVideoId: res.data._id,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
        comments: res.data.comments
      });
    })
    .catch(function (error) {
      console.log(`The following error occurred when trying to add this video to the database:`, error);
    })
  }

  putNewReply = (commentId, replyText, replyInputId) => {
    console.log(replyText);
    $( `#${replyInputId}` ).val("");
    axios.put(`http://localhost:5000/api/videos/${this.state.mongoVideoId}/add_reply/${commentId}`,
    {
      "text": replyText
    })
    .then((res) => {
      console.log(`A reply was added to this video on the database. Here's the updated video data:`, res.data)
      this.setState({
        comments: res.data.comments
      })
    })
    .catch(function (error) {
      console.log(`The following error occurred when trying to add a reply to this video on the database:`, error);
    })
  }
}