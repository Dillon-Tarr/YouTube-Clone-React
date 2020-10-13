import React from 'react'

export default function RelatedVideos(props){
    var videoColumn = props.data.item;

    // for(let i = 0; i < 4; i++){
    //     var video = props.data.items[0].snippet.thumbnails.default.url;
    //     videoCol += (
    //         <div className="col-12">
    //             <img src="video"></img>
    //         </div>
    //   )}
    return (<div className="row">{videoColumn}</div>)
  
}
