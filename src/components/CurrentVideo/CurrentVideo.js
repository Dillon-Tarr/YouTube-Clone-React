import React from 'react'

export default function CurrentVideo(props){

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
            <div className="col-8">
              <h2>{props.data.title}</h2>
              <p id="description">Description:<br/><br/>{props.data.description}</p>
            </div>
            <div className="col-2 d-flex justify-content-center">
                <img src={require('../../images/thumbs.png')} alt="Thumbs Up" id="thumb-up" className="img-fluid thumb"/>
                <p className="likes-dislikes">{props.data.numberOfLikes}</p>
            </div>
            <div className="col-2 d-flex justify-content-center">
                <img src={require('../../images/thumbs.png')} alt="Thumbs Down" id="thumb-down" className="img-fluid thumb"/>
                <p className="likes-dislikes">{props.data.numberOfDislikes}</p>
            </div>
          </div>
          <div className="row meta-data">
            <div className="col-8">
              <h4>{props.data.comments.length} Comments</h4>
            </div>
          </div>
          <div className="row meta-data">
            <div className="col-8 d-flex">
              <input id="commentInput" placeholder="Commenting Publicly as Anonymous"></input>
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