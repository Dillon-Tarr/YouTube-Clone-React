import React from 'react'

export default function RelatedVideos(props){
    const videos = props.data.items;
    console.log('Searched for related videos and found these: ', videos);
    let relatedVideos = [];
    for(let i = 0; i < videos.length; i++){
        let videoId = videos[i].id.videoId;
        let title = videos[i].snippet.title;
        let video = (
            <div className="row related-video" id={videoId} key={videoId}>
                <button onClick={() => {props.switchToRelatedVideo(videoId, title)}}><img className="thumbnail img-fluid" src={videos[i].snippet.thumbnails.high.url} alt="video thumbnail" /></button>
                <button onClick={() => {props.switchToRelatedVideo(videoId, title)}}><p>{title}</p></button>
            </div>
            );
        relatedVideos.push(video);
    }
    return (
    <>
        <h2>Related Videos</h2>
        {relatedVideos}
    </>
    );
}
