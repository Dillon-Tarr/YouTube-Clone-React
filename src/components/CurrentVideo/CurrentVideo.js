import React, { Component } from 'react'
import $ from 'jquery'

var divAuto = false;

export default class CurrentVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialLoad: true,
      commentText: "",
      replyTrackers: []
    }
    this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
    this.handleReplyTextChange = this.handleReplyTextChange.bind(this);
    this.clearReply = this.clearReply.bind(this);
  }
  
  handleCommentTextChange(event) {
    this.setState({commentText: event.target.value});
  }

  handleReplyTextChange = replyInputId => evt => {
    const updatedReplyTrackers = this.state.replyTrackers.map((replyTracker) => {
      if (replyInputId !== replyTracker.replyInputId) return replyTracker;
      return { ...replyTracker, replyText: evt.target.value };
    });

    this.setState({ replyTrackers: updatedReplyTrackers });
  };

  setReplyTrackers = () => {
    let replyTrackers = [];
    for (let i = 0; i < this.props.data.comments.length; i++){
      let commentId = this.props.data.comments[i]._id;
      let replyInputId = `reply-input${commentId}`;
      replyTrackers.push({
        replyInputId: replyInputId,
        replyText: ""
      });
    }
    console.log("setReplyTrackers ran. Here are the replyTrackers:", replyTrackers);
    this.setState({
      replyTrackers: replyTrackers
    });
  }

  clearReply(commentId){
    this.props.hideReplyDiv();
    let replyDivId = `#reply-P${commentId}`;
    let replyInputId = `#reply-input${commentId}`;
    $( replyInputId ).val("");
    $( replyDivId ).hide();
  }
  showReply(commentId){
    this.props.showReplyDiv();
    let replyDivId = `#reply-P${commentId}`;
    let replyInputId = `#reply-input${commentId}`;
    $( replyInputId ).val("");
    $( replyDivId ).toggle();
  }
  toggleDivHeight(){
    if(divAuto){
      $( ".description-div" ).css("height", "11rem");
      $( "#moreLess" ).html("MORE...");
      divAuto = false;
    }else{
      $( ".description-div" ).css("height", "auto");
      $( "#moreLess" ).html("LESS...");
      divAuto = true;
    }
  }

  componentDidMount(){     
    if(this.state.initialLoad){
      $(document).ready(function(){
        $(".reply-div ").hide();
      });
      this.setState({
        initialLoad: false
      });
    }
    this.setReplyTrackers();
  }

  componentDidUpdate(){
    if (this.props.data.comments.length !== this.state.replyTrackers.length){
      this.setReplyTrackers();
    }
    if(this.props.data.replyHidden){
      $('[id^=reply-P]').hide();
    }
  }

  render() {
    let sOrNoS = "s";
    if (this.props.data.comments.length === 1){
      sOrNoS = "";
    }
    
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
            <p id="description">Description:</p>
            <br/>
            <div className="description-div"><p className="formatted-description">{this.props.data.description}</p></div>
          </div>
          <button type="button" className="commentButtons" id="moreLess"
            onClick={() => (this.toggleDivHeight())}
            >MORE...</button>
        </div>
        <div className="row meta-data">
          <div className="col-8">
            <h4>{this.props.data.comments.length} Comment{sOrNoS}</h4>
          </div>
        </div>
        <div className="row meta-data">
          <div className="col-8 d-flex commentInputs">
            <input
            id="commentInput" type="text" className="comment-reply-input" placeholder="Add a public comment..."
            onChange={this.handleCommentTextChange}
            onKeyPress={event => {
              if (event.key === 'Enter'){
                this.props.updateVideo("comment", this.state.commentText);
                this.setState({
                  commentText: ""
                });
                $( '#commentInput' ).val("");
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
            $( '#commentInput' ).val("");
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

  renderComments(){
    let comments = [];
    for(let i = 0; i < this.props.data.comments.length; i++){
      let commentId = this.props.data.comments[i]._id;
      let commentText = this.props.data.comments[i].text;
      let openReplyButtonId = `open-reply-button#${commentId}`;
      let replyDivId = `reply-P${commentId}`;
      let replyInputId = `reply-input${commentId}`;
      let cancelReplyButtonId = `cancel-reply-button#${commentId}`;
      let submitReplyButtonId = `submit-reply-button#${commentId}`;

      let replies = [];
      for(let j = 0; j < this.props.data.comments[i].replies.length; j++){
        let replyKey = `reply-key#${i}-${j}`;
        let reply = (
          <p className="reply" key={replyKey}>
            &#8627; {this.props.data.comments[i].replies[j].text}
          </p>
        )
        replies.push(reply);
      }

      let comment = (
        <div key={commentId}>
          <p>
            {commentText}<br/>
            <button className="commentButtons cancel" id={openReplyButtonId}
              onClick={() => {this.showReply(commentId)}}
            >REPLY</button>
          </p>
          <div>
            {replies}
          </div>
          <div id={replyDivId} className="reply-div row">
            <div className="col-8 d-flex">
              <input id={replyInputId} type="text" className="comment-reply-input" placeholder="Add a public reply..."
              onChange={this.handleReplyTextChange(replyInputId)}
              onKeyPress={event => {
                if (event.key === 'Enter'){
                  this.props.putNewReply(commentId, this.state.replyTrackers[i].replyText, replyInputId);
                }
              }}
              />
            </div>
            <div className="col-2 d-flex">
              <button className="commentButtons cancel" id={cancelReplyButtonId}
                onClick={() => 
                  {this.clearReply(commentId);}
                }
              >Cancel</button>
            </div>
            <div className="col-2 d-flex">
              <button className="commentButtons" id={submitReplyButtonId}
              onClick={() => {
                this.props.putNewReply(commentId, this.state.replyTrackers[i].replyText, replyInputId);
                this.showReply(commentId)
              }}>Reply</button>
            </div>
          </div>
        </div>
      );
      comments.push(comment);
    }

    return comments;
  }

}
