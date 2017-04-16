import _ from 'lodash';

import React, {Component} from 'react'; // handle components
import ReactDOM from 'react-dom'; // insert component into DOM

import SearchBar from './components/search_bar'; 
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import YTSearch from 'youtube-api-search';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; //  'AIzaSyBEgMEmjJKV7WkMlGs5slXB1ufcUxw2Tbo';


// Create new component to produce HTML

// const is ES6 syntax (like var but final)
// use => as ES6
// const App = function() {
// function()  == () =>
class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
                   selectedVideo: null, // the current selected video from the User
                   videos: []           // all videos
                  }; 
    // Kick off search when component is created
    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    console.debug(`Searching for ${term}`);
    // select the first video from the results
    YTSearch({key: YOUTUBE_API_KEY, term: term}, (videos) => {
      // this.setState({videos: videos});
      // same thing as above (when key and variable are the same)
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });

  } 

  render() {
    // returns a function that can only be called at 
    // each 300 ms
    const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 400 );

// // <SearchBar onSearchTermChange={ term => this.videoSearch(term) } />

    return (
      <div>
        <SearchBar onSearchTermChange={ videoSearch } />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          // this function get triggered by the VideoList when a VideoListItem is selected
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} 
        />
      </div>
    );
  }

  // under the scene, the Babel transpiler will create
  // return React.createElement("div", null, "Hi");
}


// Insert the component into the DOM

// React not defined!
// Javascript modules (siloed from other) -- other file
// unless we explicitely import it : import React from 'react';
// render is deprecated, use ReactDOM
// depreciated render from ReactDOM
// not using App directly, have to pass an instance <App />
// Target container is not a DOM element ! (where do we put it ?)
//  we target : document.querySelector('.container')
ReactDOM.render(<App />, document.querySelector('.container'));
