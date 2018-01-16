import React,{Component} from 'react';
import VideoDetail from './components/video_detail';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import _ from 'lodash';


const API_KEY='AIzaSyBMurL9-ZwIw39cdqGvmnZJ8mJ8wrlLJsw';


// create a new component.This component should produce some html

class App extends Component  {
    constructor(props) {
        super(props);
        
        this.state= {videos: [] , selectedVideo:null};
        
        this.videoSearch('fake love radio');
       
    }
    
    videoSearch(term) {
       YTSearch({key : API_KEY, term:term},(videos)=>{
        this.setState({ videos:videos,
                      selectedVideo:videos[0]});
        });
    }
 
    
    render() {

        const videoSearch=_.debounce(term => {this.videoSearch(term)},300 );
       return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo}) }videos={this.state.videos}/>
           
        </div>
    ); 
    }
    
    
}




// Take this components genereated html Needs to put into the DOM 
ReactDOM.render(<App />,document.querySelector('.container'));



