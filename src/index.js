import _ from 'lodash';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from './components/VideoDetail';
import config from "./config/config";
import YTSearch from "youtube-api-search";

const API_KEY = config.YoutubeAPI;

class App extends Component {
    state = {
        videos: [],
        selectedVideo: null
    };

    componentDidMount() {
        this.videoSearch('dogs');
    }

    videoSearch = (term) => {
        YTSearch({ key: API_KEY, term: term }, videos => {
            this.setState(
                { videos: videos,
                  selectedVideo: videos[4]
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => {
            this.videoSearch(term) 
        }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState( {selectedVideo} )}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));
