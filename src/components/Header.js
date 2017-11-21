import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom'
import ScrollMagic from 'scrollmagic';
import 'animation.gsap'
import 'debug.addIndicators'
import Logo from './Logo';
import jQuery from 'jquery';
import { Power3, TimelineLite } from "gsap";
const $ = jQuery;
const controller = new ScrollMagic.Controller();

class Header extends Component {

	componentDidMount() {
    	const title = $(findDOMNode(this.refs.title));
    	const position = $(findDOMNode(this.refs.position));
		this.createAnimation(title, position);
	}

	createAnimation(title, position){
		let tl = new TimelineLite();

		tl.fromTo(title, 1.0, { 
		      y: '0'
		    }, { 
		      y: '-40px', 
		      autoAlpha: 0,
		      ease: Power3.easeInOut
		    });
		tl.fromTo(position, 1.0, { 
		      y: '0' 
		    }, { 
		      y: '-40px', 
		      autoAlpha: 0,
		      delay:-0.9,
		      ease: Power3.easeInOut
		    });

    	new ScrollMagic.Scene({
                  triggerHook: 'onEnter', offset: 10
                })
                .setTween(tl) // trigger a TweenMax.to tween
                // .addIndicators({name: "3 (duration: 0)"}) // add indicators (requires plugin)
                .addTo(controller);
	}

	render() {
		
		return (
			<header className="home-header">
				<h1 ref="title"><Link to='/'><Logo /></Link></h1>
				<h2 ref="position">Visual Artist, Director</h2>
			</header>
		);
	}
}

export default Header;
