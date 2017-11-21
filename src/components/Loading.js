import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import jQuery from 'jquery';
import loadingimg from '../images/loading.gif';
import { TweenLite } from "gsap";
const $ = jQuery;

class Loading extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.isActive === nextProps.isActive);
  }
  componentDidUpdate() {
	const self = this;
    const loadingDOM = $(findDOMNode(this.refs.loading));
	if(this.props.isActive){
		// this.props.trasitionEvent();
		this.props.startLoadingAnimate();
		// this.props.trasitionEvent(this.startTweenLite);
		TweenLite.to(loadingDOM, 0.5,{
			autoAlpha: 1,
			// delay:0.3,
			onComplete:function(){
			}
		})
	}else{
        // TweenLite.killTweensOf(loadingDOM);
		TweenLite.to(loadingDOM, 0.8,{
			autoAlpha: 0,
			onComplete:function(){
        		self.props.endLoadingAnimate();
			}
		})
	}
  }

  render() {
    return (
    	 <div ref="loading" id="loading" className="loading">
			<div className="loading__wrap">
				<img className="loadingImg" src={loadingimg} alt="loading..." />
			</div>
		</div>
    );
  }
}

export default Loading;
