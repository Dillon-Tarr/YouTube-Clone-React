import React from 'react'

export default function RelatedVideos(props){
    const videos = props.data.items;
    console.log('Searched for related videos and found these: ', videos);
    let relatedVideos = [];
    for(let i = 0; i < videos.length; i++){
        var video = (
            <div className="row related-video" id={videos[i].id.videoId} key={videos[i].id.videoId}>
                <img className="thumbnail img-fluid" src={videos[i].snippet.thumbnails.high.url} alt="video thumbnail" />
                <p>{videos[i].snippet.title}</p>
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
