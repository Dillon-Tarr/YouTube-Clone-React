import React, { Component } from 'react'
import $ from 'jquery'

export default class CurrentVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentText: ""
    }
    this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
  }
  
  handleCommentTextChange(event) {
    this.setState({commentText: event.target.value});
  }
  
  renderComments(){
    let comments = [];
    for(let i = 0; i < this.props.data.comments.length; i++){
      let commentId = this.props.data.comments[i]._id;

      let commentText = this.props.data.comments[i].text;
      let openReplyButtonId = `open-reply-button#${commentId}`;
      let replyDivId = `reply-P#${commentId}`;
      let replyInputId = `reply-input#${commentId}`;
      let cancelReplyButtonId = `cancel-reply-button#${commentId}`;
      let submitReplyButtonId = `submit-reply-button#${commentId}`;

      let comment = (
        <div key={commentId}>
          <p>
            {commentText}<br/>
            <button className="commentButtons" id={openReplyButtonId}
              onClick={
                $(`#${replyDivId}`).css("display", "block")
              }
            >Reply</button>
          </p>
          <div id={replyDivId} className="reply-div row">
            <div className="col-8 d-flex">
              <input id={replyInputId} type="text" className="comment-reply-input" placeholder="Add a public reply..."
              //onKeyPress={event => {
              //  if (event.key === 'Enter'){
              //    this.props.ADDREPLY(replyText);
              //  }
              //}}
              />
            </div>
            <div className="col-2 d-flex">
              <button className="commentButtons cancel" id={cancelReplyButtonId}
              onClick={
                () => {$( `#${replyInputId}` ).val("");
                $(`#${replyDivId}`).css("display", "none")
              }
              }
              >Cancel</button>
            </div>
            <div className="col-2 d-flex">
              <button className="commentButtons" id={submitReplyButtonId}
              //onClick={() => {this.props.ADDREPLY(replyText);}}
              >Reply</button>
            </div>
          </div>
        </div>
      );
      comments.push(comment);
    }
    return comments;
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
            id="commentInput" type="text" className="comment-reply-input" placeholder="Commenting Publicly as Anonymous"
            onChange={this.handleCommentTextChange}
            onKeyPress={event => {
              if (event.key === 'Enter'){
                this.props.updateVideo("comment", this.state.commentText);
                this.setState({
                  commentText: ""
                });
              }
            }}/>
          </div>
          <div className="col-2 d-flex">
            <button className="commentButtons" id="cancel"
            onClick={() => {$( '#commentInput' ).val("");}}
            >Cancel</button>
          </div>
          <div className="col-2 d-flex">
            <button className="commentButtons" id="comment"
            onClick={() => {this.props.updateVideo("comment", this.state.commentText);
            this.setState({
              commentText: ""
            });
            }}
            >Comment</button>
          </div>
        </div>
        <div className="row meta-data">
          <div className="col-12">
            <div id="commentsAndReplies">
              {this.renderComments()}
            </div>
          </div>
        </div>
      </>
    );
  }
}
