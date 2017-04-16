import React from 'react';
import VideoListItem from './video_list_item';

// Functional Component
// The video prop get sent by the parent component (App)
// through the argument list of the function.
const VideoList = (props) => {
  const videoItems = props.videos.map( (video) => {
    return (
    <VideoListItem 
      key={video.etag} 
      video={video} 
      onVideoSelect={props.onVideoSelect}
    />
  );
  });

  return (
    <ul className="col-md-4 list-group"> 
      {videoItems}
    </ul>
  );

};

export default VideoList;