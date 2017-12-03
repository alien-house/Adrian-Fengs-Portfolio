import React, { Component } from 'react';
import jQuery from 'jquery';
import { TweenLite } from "gsap";
const $ = jQuery;
class Transition extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  func:null
		};
	}

	// componentDidMount() {
	// 	let self = this;
 //        // $(".transition").bind('oanimationend animationend webkitAnimationEnd', function() { 
 //        //     $('#transition').removeClass('is_transitioning');
 //        //     if(self.state.func != null){
 //        //     	self.state.func();
 //        //     }
 //        // });
	// }

    shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.isLoadingAnimate === nextProps.isLoadingAnimate)||
     !(this.props.isTransition === nextProps.isTransition);
    }

    componentDidUpdate() {
        const self = this;
        if(this.props.isTransition){
            const self = this;
            TweenLite.fromTo($('#transition'), 0.5 , {
                right: '-100%'
            }, {
                right: 0,
                // delay:0.3,
                onComplete:function(){
                    self.props.transitionOff();
                    self.props.transitionBeginAnimateEndOn();
                }
                
            });
        }else{
            if(!this.props.isLoadingAnimate){
                TweenLite.fromTo($('#transition'), 0.5, {
                    right: 0
                },{
                    right: '100%',
                    onComplete:function(){
                        self.props.transitionOff();
                        self.props.transitionBeginAnimateEndOff();
                    }
                });
            }
        }
    }

  render() {
    return (
    	<div id="transition" className="transition2"></div>
    );
  }
}

export default Transition;