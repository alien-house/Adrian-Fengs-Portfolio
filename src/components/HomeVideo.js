import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import jQuery from 'jquery';
// import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
// import video from '../videos/dreaming.mp4';
const $ = jQuery;

class HomeVideo extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.videoURL === nextProps.videoURL)||
    !(this.props.imgURL === nextProps.imgURL);
  }
  componentWillUpdate() {
    if(this.props.videoURL){
    }
  }
  playVideo(){
    this.refs.Content.videoPlay();
  }
	render() {
    return (
        <div className="video-wrap">
          <div className="video-bg"></div>
          <div className="video-box">
            <Content ref="Content" data={this.props} />
          </div>
        </div>
    );
  }
}
export default HomeVideo;


class Content extends Component {
  constructor(props) {
    super(props);
    this.handleVideoLoaded = this.handleVideoLoaded.bind(this);
    this.handleVideoLoadstart = this.handleVideoLoadstart.bind(this);
    this.handleVideoErrored = this.handleVideoErrored.bind(this);
    this.handleVideoEmptied = this.handleVideoEmptied.bind(this);
    this.myVideo = '';
    // this.startTrasition = this.startTrasition.bind(this);
  }
  componentDidMount() {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.data.videoURL === nextProps.data.videoURL)||
    !(this.props.data.imgURL === nextProps.data.imgURL);
  }
  componentDidUpdate(prevProps, prevState) {
     if(this.props.data.videoURL !== prevProps.data.videoURL){
      this.myVideo = $(findDOMNode(this.refs.videoBg));
      if(this.myVideo){
        this.myVideo.on("loadeddata", this.handleVideoLoaded);
        this.myVideo.on("loadstart", this.handleVideoLoadstart);
        this.myVideo.on("emptied", this.handleVideoEmptied);
        this.myVideo.on("error", this.handleVideoErrored);
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.data.videoURL !== nextProps.data.videoURL){
      if(this.myVideo){
        this.myVideo.off("loadeddata", this.handleVideoLoaded);
        this.myVideo.off("loadstart", this.handleVideoLoadstart);
        this.myVideo.off("emptied", this.handleVideoEmptied);
        this.myVideo.off("error", this.handleVideoErrored);
      }
    }
  }

  handleVideoEmptied(){
  }

  handleVideoLoadstart(){
  }

  handleVideoLoaded() {
    this.myVideo.css({visibility: 'hidden'});
    this.props.data.loadingOff();
  }
 
  videoPlay(){
    this.myVideo.css({visibility: 'visible'});
    this.myVideo[0].play();
  }

  handleVideoErrored() {
  }
  render() {
    const props = this.props.data;
    if(props.videoURL){
        return (
          <video className="videoBg"
              id="videoBg"
              ref="videoBg"
              src={props.videoURL} 
              loop="true" muted preload="" poster="" width="100%" height="100%">
          </video>
         );
      } else if (props.imgURL){
        return (
          <img className="imgBg"
              id="img"
              ref="img"
              alt="background each contents"
              src={props.imgURL} />
         );
      } else {
          return null;
      }
  }
}
          // <img src={sampleimg} className="video" alt="logo" />