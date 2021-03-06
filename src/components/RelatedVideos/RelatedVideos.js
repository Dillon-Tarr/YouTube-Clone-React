import React from 'react'

export default function RelatedVideos(props){
    const videos = props.data.items;
    console.log('Searched for related videos and found these: ', videos);
    let relatedVideos = [];
    for(let i = 0; i < videos.length; i++){
        let videoId = videos[i].id.videoId;
        let title = videos[i].snippet.title;
        let description = videos[i].snippet.description; 
        let video = (
            <div className="row related-video d-flex justify-content-center" id={videoId} key={videoId}>
                <div className="col-12 d-flex justify-content-center"><button onClick={() => {props.switchToRelatedVideo(videoId, title, description)}}><img className="thumbnail img-fluid" src={videos[i].snippet.thumbnails.high.url} alt="video thumbnail" /></button></div>
                <div className="col-12 d-flex justify-content-center"><button onClick={() => {props.switchToRelatedVideo(videoId, title, description)}}><p>{title}</p></button></div>
            </div>
            );
        relatedVideos.push(video);
    }
    return (
    <>
        <h2 className="text-center">Related Videos</h2>
        {relatedVideos}
    </>
    );
}
