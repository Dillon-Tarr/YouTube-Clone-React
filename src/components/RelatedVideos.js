import React from 'react'

function RelatedVideos(props){
    var videoCol = props.data.item;

    // for(let i = 0; i < 4; i++){
    //     var video = props.data.items[0].snippet.thumbnails.default.url;
    //     videoCol += (
    //         <div className="col-12">
    //             <img src="video"></img>
    //         </div>
    //   )}
    return (<div className="row">{videoCol}</div>)
  
}

export default RelatedVideos;