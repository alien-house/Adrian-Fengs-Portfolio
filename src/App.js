import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './components/Loading';
import DocumentTitle from 'react-document-title';
import Nav from './components/Nav';
import Header from './components/Header';
import HomeVideo from './components/HomeVideo';
import HomeProject from './components/HomeProject';
import About from './components/About';
import Works from './components/Works';
import Transition from './components/Transition.js';
import './App.css';
import { ResponsiveSetting } from './utils/ResponsiveSetting.js';
import { BrowserRouter } from 'react-g-analytics';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingAnimate: false,
      transitionBeginAnimateEnd: false,
      transition: false,
      videURL:null,
      imgURL:null,
      videoloaded:false,
      isClickNav:false,
      home:true
    };
    this.title = 'Adrian Feng - Visual Artist, Director';
    this.responsiveSetting = new ResponsiveSetting();
    this.updateVideoURL = this.updateVideoURL.bind(this);
    this.updateImgURL = this.updateImgURL.bind(this);
    this.startLoadingAnimate = this.startLoadingAnimate.bind(this);
    this.endLoadingAnimate = this.endLoadingAnimate.bind(this);
    this.clickNavBtn = this.clickNavBtn.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.changeHomeState = this.changeHomeState.bind(this);
    this.transitionOn = this.transitionOn.bind(this);
    this.transitionOff = this.transitionOff.bind(this);
    this.transitionBeginAnimateEndOn = this.transitionBeginAnimateEndOn.bind(this);
    this.transitionBeginAnimateEndOff = this.transitionBeginAnimateEndOff.bind(this);
    this.loadingOn = this.loadingOn.bind(this);
    this.loadingOff = this.loadingOff.bind(this);
  }

  componentDidMount() {
    this.responsiveSetting.init();
    this.changeHomeState();
  }

  changeHomeState(){
      if(this.refs.HomeProject === undefined){
        this.setState({ home: false });
      }else{
        this.setState({ home: true });
      }
  }

  transitionOn(){
    this.setState({ transition: true });
  }
  transitionOff(){
    this.setState({ transition: false });
  }
  transitionBeginAnimateEndOn(){ this.setState({ transitionBeginAnimateEnd: true }); }
  transitionBeginAnimateEndOff(){ this.setState({ transitionBeginAnimateEnd: false }); }
  loadingOn(){
    this.setState({ loading: true });
  }
  loadingOff(){
    this.setState({ loading: false });
  }
  updateVideoURL(url){
    this.setState({ videURL: url });
    this.setState({ imgURL: null });//here null
  }
  updateImgURL(url){
    this.setState({ imgURL: url });
    this.setState({ videURL: null });//here null
  }
  startLoadingAnimate(){
    this.setState({ loadingAnimate: true });
  }
  endLoadingAnimate(){
    this.setState({ loadingAnimate: false });
  }
  playVideo(){
    this.refs.homeVideo.playVideo();
  }
  clickNavBtn(isActive){
    this.setState({ isClickNav: isActive });
  }

  AboutComponents = (props) => {  
    return (
      <About 
        winTitle={this.title}
        isTransition={this.state.transition}
        transitionOn={this.transitionOn} 
        updateImgURLEvent={this.updateImgURL} 
        {...props}
      />
    );
  }
  WorksComponents = (props) => {  
    return (
      <Works 
        winTitle={this.title}
        isTransition={this.state.transition}
        isLoading={this.state.loading}
        transitionOn={this.transitionOn} 
        loadingOn={this.loadingOn}
        loadingOff={this.loadingOff}
        updateImgURLEvent={this.updateImgURL} 
        {...props}
      />
    );
  }

  render() {
    return (
      <BrowserRouter id="UA-112497350-1">
      <div className="App">
        <Transition 
          ref="Transition" 
          isLoading={this.state.loading} 
          isLoadingAnimate={this.state.loadingAnimate} 
          isTransition={this.state.transition}
          transitionOff={this.transitionOff}
          transitionBeginAnimateEndOff={this.transitionBeginAnimateEndOff}
          transitionBeginAnimateEndOn={this.transitionBeginAnimateEndOn}  />
        <Loading 
          isActive={this.state.loading} 
          isTransitionBeginAnimateEnd={this.state.transitionBeginAnimateEnd}
          // isTransition={this.state.transition} 
          endLoadingAnimate={this.endLoadingAnimate} 
          startLoadingAnimate={this.startLoadingAnimate} />
        
          <div className="site-information">
            <Header isHome={this.state.home} />
            <Nav 
              transitionOn={this.transitionOn} 
              isTransition={this.state.transition}
              clickNavBtnEvent={this.clickNavBtn} />
          </div>

          <Switch>
            <Route ref="HomeProject" exact path='/' render={() => 
              <HomeProject 
                    winTitle={this.title}
                    isTransition={this.state.transition}
                    isLoading={this.state.loading}
                    isLoadingAnimate={this.state.loadingAnimate} 
                    transitionOn={this.transitionOn} 
                    loadingOn={this.loadingOn}
                    loadingOff={this.loadingOff}
                    isClickNavActive={this.state.isClickNav}
                    clickNavBtn={this.clickNavBtn}
                    playVideo={this.playVideo}
                    updateVideoURLEvent={this.updateVideoURL} 
                    updateImgURLEvent={this.updateImgURL}  />
            }/>
            <Route path="/about" component={this.AboutComponents} />
            <Route path="/works" component={this.WorksComponents} />
           
            <Route path="*" render={() => 
              <NoMatch winTitle={this.title} />
            }/>
          </Switch>
        
        <div className="grid">
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
        </div>
        <HomeVideo 
          ref="homeVideo"
          imgURL={this.state.imgURL} 
          videoURL={this.state.videURL} 
          loadingOff={this.loadingOff}
          />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

const NoMatch = ({ winTitle }) => {
  return(
    <DocumentTitle title={winTitle}>
      <section id="etc" className="etc normalpage">
        <main className="contents">
          <h1 id="page-title" className="page-title">not found</h1>
          <div className="text-area">
            <p>We couldn’t find this page.</p>
            <p>Maybe it’s out there, somewhere.<br />
            You can always find my works on <Link to={`/works/`}>my project page</Link>.</p>
          </div>
        </main>
        
      </section>
    </DocumentTitle>
  )
}
