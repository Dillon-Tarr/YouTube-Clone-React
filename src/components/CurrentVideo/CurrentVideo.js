import React, { Component } from 'react'

export default class CurrentVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  
  handleSearchChange(event) {
    this.setState({searchText: event.target.value});
  }
  
  render() {
    return (
      <>
        <div  id="playerDiv">
          <iframe id="ytplayer" type="text/html"
            title="ytplayer" 
            src="https://www.youtube.com/embed/xYmuum_wgvc?autoplay=1&origin=http://example.com"
            frameBorder="0" > 
          </iframe>
        </div>
        <div className="row meta-data">
          <div className="col-md-8 col-12">
            <h2>{this.props.data.title}</h2>
          </div>
          <div className="col-md-2 col-6 d-flex justify-content-center">
            <button id="up" onClick={() => {this.props.updateVideo("up")}}>
              <img src={require('../../images/thumbs.png')} alt="Thumbs Up" id="thumb-up" className="img-fluid thumb"/>
            </button>
              <p className="likes-dislikes">{this.props.data.numberOfLikes}</p>
          </div>
          <div className="col-md-2 col-6 d-flex justify-content-center">
            <button id="down" onClick={() => {this.props.updateVideo("down")}}>
              <img src={require('../../images/thumbs.png')} alt="Thumbs Down" id="thumb-down" className="img-fluid thumb"/>
            </button>
              <p className="likes-dislikes">{this.props.data.numberOfDislikes}</p>
          </div>
        </div>
        <div className="row meta-data">
          <div className="col-12">
            <p id="description">Description:<br/><br/>{this.props.data.description}</p>
          </div>
        </div>
        <div className="row meta-data">
          <div className="col-8">
            <h4>{this.props.data.comments.length} Comments</h4>
          </div>
        </div>
        <div className="row meta-data">
          <div className="col-8 d-flex">
            <input
            id="commentInput" type="text" placeholder="Commenting Publicly as Anonymous"
            onChange={this.handleSearchChange}
            onKeyPress={event => {
              if (event.key === 'Enter'){
                //this.props.COMMENTFUNCTION(this.state.commentText)
              }
            }}/>
          </div>
          <div className="col-2 d-flex">
            <button className="commentButton" id="cancel">Cancel</button>
          </div>
          <div className="col-2 d-flex">
            <button className="commentButton" id="comment">Comment</button>
          </div>
        </div>
        <div className="row meta-data">
          <div className="col-12">
            <div id="commentsReplies">
              <p>Comments and Replies</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
