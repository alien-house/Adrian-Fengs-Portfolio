import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import {  Power1, TimelineLite } from "gsap";
import { siteConfig } from '../utils/config';
import DocumentTitle from 'react-document-title';
import { SiteInfo } from '../utils/ResponsiveSetting.js';
const $ = jQuery;

class HomeProject extends Component {
	constructor(props) {
    super(props);
		this.btn = '';
		this.nav = '';
    this.interval = '';
    this.appearAnimation = '';
    this.disappearAnimation = '';
    this.state = {
      currentNum: null,
      maxNum: null,
      interval:'',
      duration:20000,
      videoSlideShowData:[],
      first:true
    };
    this.videoArrayTemp = [];
    this.stopSildeShow = this.stopSildeShow.bind(this);
    this.resumeSildeShow = this.resumeSildeShow.bind(this);
    this.clickProjectBtnPrevious = this.clickProjectBtnPrevious.bind(this);
    this.clickProjectBtnNext = this.clickProjectBtnNext.bind(this);
    this.clickNavBtnFnc = this.clickNavBtnFnc.bind(this);
	}

  stopSildeShow(){
      window.clearInterval(this.interval);//読み込みがあるので一旦スライドショーを止める
  }

  resumeSildeShow(){
      this.interval = setInterval(this.increaseNumber.bind(this), this.state.duration);
  }

	componentDidMount() {
    let self = this;
    this.props.loadingOn();
    this.props.transitionOn(); 
    let homevideoURL = siteConfig.baseURL + siteConfig.restAPIURL + 'videoslideshow?_embed';

    Promise.all([this.getData(homevideoURL)]).then(function(){
      // self.props.loadingOff();
      self.init(true);
      const pl = $(findDOMNode(self.refs.projectLink));
      pl.bind('oanimationend animationend webkitAnimationEnd', function() { 
        pl.removeClass('animationToRight');
      });
    });
	}

  //変更お知らせを制限
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.currentNum === nextState.currentNum) || 
    !(this.state.videoSlideShowData === nextState.videoSlideShowData) || 
    !(this.props.isClickNavActive === nextProps.isClickNavActive)|| 
    !(this.props.isLoading === nextProps.isLoading)|| 
    !(this.props.isTransition === nextProps.isTransition)|| 
    !(this.props.isLoadingAnimate === nextProps.isLoadingAnimate);
  }

  // レンダーされる前に実行さっれる
  componentWillUpdate(nextProps, nextState) {

    if(this.state.currentNum !== nextState.currentNum){
      if(!this.state.first){
        this.props.transitionOn(); 
      }
      if(SiteInfo.getWinWidth() >= SiteInfo.spWidth){
        this.props.loadingOn();
        this.props.updateVideoURLEvent(this.state.videoSlideShowData[nextState.currentNum].videourl);
      }else{
        this.props.updateImgURLEvent(this.state.videoSlideShowData[nextState.currentNum].spimgurl);
      }
      this.stopSildeShow();
    }

    if(this.props.isTransition !== nextProps.isTransition || this.props.isLoading !== nextProps.isLoading || this.props.isLoadingAnimate !== nextProps.isLoadingAnimate){
      if(!nextProps.isTransition && !nextProps.isLoading && !nextProps.isLoadingAnimate && !nextProps.isClickNavActive){
        this.appear();
        this.resumeSildeShow();
      }
    }

    if(!(this.props.isClickNavActive === nextProps.isClickNavActive)){
      if(nextProps.isClickNavActive){
        this.stopSildeShow();
      }
    }
  }
  
  getData(url){
    let self = this;
    return fetch(url)  
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      let currentNum = 0;
      self.setState({maxNum:json.length});
      json.forEach(function(element) {
        let video = new Video(
          element.title.rendered, 
          element.modified, 
          element._embedded['wp:term'][0][0].slug, 
          element.videoslideshow_meta.videoURL,
          element.videoslideshow_meta.sp_replace_img,
          element.videoslideshow_meta.role,
          element.slug
        );
        self.videoArrayTemp.push(video);
        currentNum++;
        if(currentNum === self.state.maxNum){
          self.setState({videoSlideShowData:self.videoArrayTemp});
          return "finished";
        }
      });
    })
  }

  init(isFirst = false){
    this.increaseNumber(isFirst);
  }

  increaseNumber(isFirst = false) {
    let num = 0;
    if(this.state.currentNum == null){
      num = 0;
    }else if(this.state.maxNum - 1 > this.state.currentNum){
      num =  this.state.currentNum + 1;
    }else{
      num = 0;
    }
    if(isFirst){
      this.setState({ currentNum: num });
      this.setState({ first: false });
    }else{
      this.disappear(num);
    }
  }

  clickProjectBtnPrevious(){
    let num = 0;
    if(this.state.currentNum == null){
      num = 0;
    }else if(0 < this.state.currentNum){
      num = this.state.currentNum - 1;
    }else{
      num = this.state.maxNum - 1;
    }
    this.disappear(num);
  }

  clickProjectBtnNext(){
    let num = 0;
    if(this.state.currentNum == null){
      num = 0;
    }else if(this.state.maxNum - 1 > this.state.currentNum){
      num =  this.state.currentNum + 1;
    }else{
      num = 0;
    }
    this.disappear(num);

  }

  appear(){
    const nc = $(findDOMNode(this.refs.numberCurrent));
    const pt = $(findDOMNode(this.refs.projectTitle));
    const pp = $(findDOMNode(this.refs.projectPosition));
    const pl = $(findDOMNode(this.refs.projectLink));
    if(SiteInfo.getWinWidth() >= SiteInfo.spWidth){
      this.props.playVideo();
    }
    this.appearAnimation = new TimelineLite();
    this.appearAnimation.play();
    this.appearAnimation.fromTo(nc, 0.8, { 
      y: '-30px', 
      autoAlpha: 0
    }, { 
      y: '0', 
      autoAlpha: 1,
      // delay: 0.2,
      ease: Power1.easeInOut
    });
    this.appearAnimation.fromTo(pt, 0.8, 
      { 
        x: '50px', 
        autoAlpha: 0
      }, { 
        x: '0', 
        autoAlpha: 1,
        ease: Power1.easeInOut,
        delay: -0.8
      });
    this.appearAnimation.fromTo(pp, 0.8, 
      { 
        x: '50px', 
        autoAlpha: 0
      }, { 
        x: '0', 
        autoAlpha: 1,
        ease: Power1.easeInOut,
        delay: -0.7
      });
    this.appearAnimation.fromTo(pl, 0.8, { 
        autoAlpha: 0,
        y: '20px', 
      }, { 
        autoAlpha: 1,
        y: '0', 
        delay: -0.6,
        ease: Power1.easeInOut,
        onStart:function(){
          pl.addClass("animationToRight");
        }
      });
  }

  disappear(num){
    let self = this;
    this.disappearAnimation = new TimelineLite({
      onComplete:function(){
        self.setState({ currentNum: num });
      }
    });
    this.disappearAnimation.play();

    this.disappearAnimation.to($("#number-current"), 0.8, { 
      y: '15px', 
      autoAlpha: 0,
      ease: Power1.easeInOut
    });
    this.disappearAnimation.to($("#project-title"), 0.8, { 
      x: '-30px', 
      autoAlpha: 0,
      ease: Power1.easeInOut,
      delay: -0.8
    });
    this.disappearAnimation.to($("#project-position"), 0.8, { 
      x: '-30px', 
      autoAlpha: 0,
      ease: Power1.easeInOut,
      delay: -0.7
    });
    this.disappearAnimation.to($("#project-link"), 0.8, {
      autoAlpha: 0,
      delay: -0.6,
      ease: Power1.easeInOut
    });
  }

  clickNavBtnFnc(){
    this.props.clickNavBtn(false);
  }

	render() {
    if(this.state.videoSlideShowData.length === 0 || this.state.currentNum === null) return false; // no allowed to render, if there is no state
      let roleLength = this.state.videoSlideShowData[this.state.currentNum].role.length;
      const roles = this.state.videoSlideShowData[this.state.currentNum].role.map(function(rolesData, i){
        rolesData = roleLength - 1 === i ? rolesData : rolesData + ", ";
          return(
            <span key={i}>{rolesData}</span>
          )
      });

      let cn = this.state.currentNum + 1;
      if((cn / 10) < 1){
        cn = "0" + cn;
      }
    return (
      <DocumentTitle title={this.props.winTitle}>
        <section id="home-project" className="home-project">
          <div className="home-project-inner">
            <div className="home-project-box">
              <div className="number">
                <div className="number-info">
                  <div ref="numberCurrent" className="number-current" id="number-current">{cn}</div>
                  <div className="number-line"></div>
                  <div className="number-max" id="number-max">05</div>
                </div>
                <ul className="home-project-arrow">
                  <li><button id="project-btn-left" onClick={this.clickProjectBtnPrevious}><i className="fa fa-chevron-left" aria-hidden="true"></i></button></li>
                  <li><button id="project-btn-right" onClick={this.clickProjectBtnNext}><i className="fa fa-chevron-right" aria-hidden="true"></i></button></li>
                </ul>
              </div>

              <div className="project-info">
                <div className="project-info-txt">
                  <h1 ref="projectTitle" id="project-title">{this.state.videoSlideShowData[this.state.currentNum].title}</h1>
                  <p ref="projectPosition" id="project-position">{roles}</p>
                </div>
                <div className="btn-normal" id="project-btn">
                <Link ref="projectLink" to={`/works/${this.state.videoSlideShowData[this.state.currentNum].category_slug}/${this.state.videoSlideShowData[this.state.currentNum].slug}`} onClick={this.clickNavBtnFnc} id="project-link" className="unit-link">EXPLORE</Link>
                </div>
              </div>
            </div>
          </div>

        </section>
      </DocumentTitle>
    );
  }
}

export default HomeProject;

class Video{
  constructor(title, date, category_slug, videourl = null, spimgurl = null, role, slug){
    this.title = title;
    this.date = date;
    this.category_slug = category_slug;
    this.videourl = videourl;
    this.spimgurl = spimgurl;
    this.role = role;
    this.slug = slug;
  }
}