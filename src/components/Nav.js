import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import jQuery from 'jquery';
import { TweenLite } from "gsap";
import FontAwesome from 'react-fontawesome';
const $ = jQuery;

class Nav extends Component {
	constructor(props) {
    super(props);
    this.state = {
      toggleNavOpen:false
    };
		this.btn = '';
		this.nav = '';
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
	}
	componentDidMount() {
    this.btn = document.getElementById('nav__button');
    this.nav = document.getElementById('navigation');
		this.btn.addEventListener('click', _ => this.listener(), false); 
	}
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.isTransition === nextProps.isTransition);
  }
  componentDidUpdate() {
    // console.log("isTransition:"+this.props.isTransition);
    if(!this.props.isTransition){
      if(this.state.toggleNavOpen){
        $(this.btn).addClass('is_open');
        this.toggleMenu(1);
      }else{
        $(this.btn).removeClass('is_open');
        this.toggleMenu(0);
      }
    }
  }
  openMenu(){
    this.props.transitionOn();
    this.props.clickNavBtnEvent(true);
    this.setState({ toggleNavOpen: true });
  }
  closeMenu(){
    this.props.transitionOn();
    this.props.clickNavBtnEvent(false);
    this.setState({ toggleNavOpen: false });
  }
  listener() { 
      let self = this;
      $(this.btn).toggleClass('is_open');
      if($(this.btn).hasClass('is_open')){
          self.openMenu();
      }else{
          self.closeMenu();
      }
  }

  toggleMenu(alpha){
    TweenLite.set(this.nav, {autoAlpha: alpha});
    // TweenLite.to(this.nav, 0.5, {
    //     autoAlpha: alpha,
    //     ease: Power3.easeInOut
    // });
  }

  
	render() {

    return (
     <nav id="nav" className="nav">
           <button id="nav__button" className="nav__burger">
               <span className="line--1"></span>
               <span className="line--2"></span>
               <span className="line--3"></span>
            </button>

            <div id="navigation" className="navigation">
              <div className="navigation__box">
                <ul id="menu" className="menu">
                  <li><Link to='/' onClick={this.closeMenu}>HOME</Link></li>
                  <li><Link to='/about' onClick={this.closeMenu}>ABOUT</Link></li>
                  <li><Link to='/works' onClick={this.closeMenu}>WORKS</Link></li>
                </ul>
                <aside className="home-profile">
                  <p className="home-profile__txt"><strong>Adrian Feng</strong><br />
  Visual Artist &amp; Director<br />
  VANCOUVER, CANADA</p>
                  <p className="home-profile__email"><a href="mailto:zak.logos@gmail.com">zak.logos@gmail.com</a></p>
                  <ul className="social">
                    <li><a href="http://insta.com" target="_blank" rel="noopener noreferrer"><FontAwesome name='youtube-play' /></a></li>
                    <li><a href="http://insta.com" target="_blank" rel="noopener noreferrer"><FontAwesome name='vimeo' /></a></li>
                    <li><a href="http://insta.com" target="_blank" rel="noopener noreferrer"><FontAwesome name='instagram' /></a></li>
                    <li><a href="http://insta.com" target="_blank" rel="noopener noreferrer"><FontAwesome name='facebook' /></a></li>
                  </ul>
                </aside>
              </div>
            </div>
          </nav>
    );
  }
}

export default Nav;
