import React, { Component } from 'react';
import jQuery from 'jquery';
import {  TimelineMax, Power3 } from "gsap";
import DocumentTitle from 'react-document-title';
import ScrollMagic from 'scrollmagic';
import 'animation.gsap'
import 'debug.addIndicators'
import bgImg from '../images/about.jpg';
import FontAwesome from 'react-fontawesome';
import { userData } from '../utils/config';
const $ = jQuery;
const controller = new ScrollMagic.Controller();

class About extends Component {
	constructor(props) {
    super(props);
    this.state = {
      currentNum: null
    };
    this.title = 'About | ' + props.winTitle;
	}

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.isTransition === nextProps.isTransition);
  }
  componentDidMount() {
    this.props.updateImgURLEvent(bgImg); 
    this.props.transitionOn(); // open the nav
  }
  componentDidUpdate() {
    if(!this.props.isTransition){
      this.init();
    }
  }

  init(){

    this.createAnimationToRight(".about-name");
    this.createAnimationToRight(".about-caption");

    this.createAnimationToRight($(".col-item").eq(0), ".col-item");
    this.createAnimationToRight($(".col-item").eq(1), ".col-item", 0.5);
    this.createAnimationToRight("#socialLarge");

    this.createAnimationToRight("#title-award");
    this.createAnimationToRight(".sec-anibox");

    this.createAnimationToRight("#contact-title");
    this.createAnimationToRight("#contact-box");
  }

  createAnimationToRight(element, trigger = null, delaytime = 0){
    let newTrigger = trigger;
    let tween = new TimelineMax()
      .fromTo(element, 1, {
        autoAlpha: 0,
        x:'30px'
      }, {
        autoAlpha: 1, 
        x:'0',
        delay:delaytime,
        ease: Power3.easeInOut
      });
    if(trigger == null){
      newTrigger = element;
    }
    new ScrollMagic.Scene({
                  triggerElement: newTrigger,
                  triggerHook: 0.8,
                  reverse:false
                })
                .setTween(tween) 
                // .addIndicators({name: "3 (duration: 0)"}) // add indicators (requires plugin)
                .addTo(controller);
  }


	render() {
    return (
      <DocumentTitle title={this.title}>
        <section id="about" className="about normalpage">
          <main className="contents">
            <h1 id="page-title" className="page-title">about</h1>

            <p className="about-name"><strong>Adrian Feng</strong></p>
            <p className="about-caption">From age 13, <br />
Adrian started exploring around the world till now.</p>
            
            <div className="paragraph paragraph-col2" id="p1">
              <div className="col-item">
                <p>Having been being influenced by what he sees from different corners of this planet, Adrian reinterprets his life experience from traveling and turns all his steps into a sort of philosophical story‐telling approach for all his visual art projects.</p>
                <p>Having been to Iceland, Japan, India, Fiji, New Zealand, and even some other less‐known places, from the north to the south, from the east to the west, Adrian enjoys fusing his visual art works with poetic images along with critical thoughts.</p>
              </div>
              <div className="col-item">
                <p>Having presented his first co‐work photography exhibi on with a French artist in 2012, Adrian keeps exploring more possibilities and connections amongst the essence of visual art, human beings, as well as the nature. Since 2006, Adrian has been actively co‐working with different artists on commercials, music videos and independent film productions worldwide.</p>
              </div>
            </div>

            <ul className="social--large" id="socialLarge">
              <li><a href={userData['youtubeURL']} target="_blank" rel="noopener noreferrer"><FontAwesome name='youtube-play' />Youtube</a></li>
              <li><a href={userData['instagramURL']} target="_blank" rel="noopener noreferrer"><FontAwesome name='instagram' />Instagram</a></li>
              <li><a href={userData['facebookURL']} target="_blank" rel="noopener noreferrer"><FontAwesome name='facebook' />facebook</a></li>
            </ul>
            <section className="sec">
              <h2 id="title-award">AWARDS & EXHIBITIONS</h2>
              <section className="sec-anibox">
                <h3>2017</h3>
                <dl className="dllist">
                  <dt>Your Island, My Ocean</dt>
                  <dd>Thailand and Taiwan Cultural Exchange Program-Art Commission, Taichung City, Taiwan</dd>
                  <dd className="right">
                    <div className="btn-normal btn-normal--right"><a href="https://www.youtube.com/watch?v=G0k5txJYPP0" rel="noopener noreferrer" target="_blank"> Youtube <span aria-hidden="true" className="fa fa-external-link"></span></a></div>
                  </dd>
                </dl>
              </section>
              <section className="sec-anibox">
                <h3>2016</h3>
                <dl className="dllist">
                  <dt>SIX–THE VERSE</dt>
                  <dd>Cheer Chen ‘Being, Not Being’ Solo Exhibition / Nominated Promotional Video (Taipei, Taiwan) Editor, Director, Producer
                  </dd>
                  <dd className="right">
                    <div className="btn-normal btn-normal--right"><a href="https://www.youtube.com/watch?v=yqacrAM83Ys" rel="noopener noreferrer" target="_blank"> Youtube <span aria-hidden="true" className="fa fa-external-link"></span></a></div>
                  </dd>

                  <dt>WHAT’S WRONG?!</dt>
                  <dd>Cheer Chen ‘Being, Not Being’ Solo Exhibition / Nominated Promotional Video (Taipei, Taiwan) Editor, Director, Producer </dd>
                  <dd className="right">
                    <div className="btn-normal btn-normal--right"><a href="https://www.youtube.com/watch?v=Ly998nrhqoE" rel="noopener noreferrer" target="_blank"> Youtube <span aria-hidden="true" className="fa fa-external-link"></span></a></div>
                  </dd>

                  <dt>Her Islands</dt>
                  <dd>
                  Solo Visual Art Exhibition，  Hola Heima Cafe  (Taichung, Taiwan) </dd>
                  <dd className="right">
                    <div className="btn-normal btn-normal--right"><a href="https://www.youtube.com/watch?v=CF_5NbCZeEU" rel="noopener noreferrer" target="_blank"> Youtube <span aria-hidden="true" className="fa fa-external-link"></span></a></div>
                  </dd>
                  
                  <dt>Tainan，Map of the sound</dt>
                  <dd>
                  Taiwan and Malta art residency co-exhibition at WE-love apartment hostel (Tainan, Taiwan)</dd>
                  <dd className="right">
                    <div className="btn-normal btn-normal--right"><a href="https://drive.google.com/file/d/0B9hu76zUw2jqNUxKSzFHNGhiMFE/view" rel="noopener noreferrer" target="_blank"> Movie <span aria-hidden="true" className="fa fa-external-link"></span></a></div>
                  </dd>
                </dl>
              </section>
              <section className="sec-anibox">
                <h3>2015</h3>
                <dl className="dllist">
                  <dt>The Dreamer</dt>
                  <dd>Honorable Mention, Burnaby Film Forum/ Multicultural Art Festival, BC, CA</dd>
                </dl>
              </section>
              <section className="sec-anibox">
                <h3>2014</h3>
                <dl className="dllist">
                  <dt>Hush - An Tôn Thất x Adrian Feng</dt>
                  <dd>Photography Co- Exhibition</dd>
                </dl>
              </section>
              <section className="sec-anibox">
                <h3>2012</h3>
                <dl className="dllist">
                  <dt>We were here - An Tôn Thất x Adrian Feng</dt>
                  <dd>Photography Co- Exhibition</dd>
                </dl>
              </section>
              <section className="sec-anibox">
                <h3>2011</h3>
                <dl className="dllist">
                  <dt>WHAT’S WRONG?!</dt>
                  <dd>
                  <p>The Best Film, 4th National Chengchi University Dream Film Festival</p>
                  <p>The Best Film, 6th Taiwan Student Audio And Video Festival</p>
                  </dd>
                </dl>
              </section>
              <section className="sec-anibox">
                <h3>2008</h3>
                <dl className="dllist">
                  <dt>Extra-Ordinary</dt>
                  <dd>
                  <p>The Best Film, 2nd National Chengchi University Dream Film Festival</p>
                  <p>Honorable Mention, Taipei Urban Nomad Film Festival</p>
                  </dd>
                </dl>
              </section>
            </section>
            <section className="sec">
              <h2 className="contact-title" id="contact-title">Contact Me</h2>
              <div id="contact-box">
                <p className="contact-area">VANCOUVER, CANADA</p>
                <p className="contact-tel">+1 604-716-2713</p>
                <p className="contact-email"><a href="mailto:zak.logos@gmail.com">zak.logos@gmail.com</a></p>
                <ul className="social--small">
                  <li><a href={userData['youtubeURL']} target="_blank" rel="noopener noreferrer"><FontAwesome name='youtube-play' /></a></li>
                  <li><a href={userData['instagramURL']} target="_blank" rel="noopener noreferrer"><FontAwesome name='instagram' /></a></li>
                  <li><a href={userData['facebookURL']} target="_blank" rel="noopener noreferrer"><FontAwesome name='facebook' /></a></li>
                </ul>
              </div>
            </section>
          </main>
          
        </section>
      </DocumentTitle>
    );
  }
}

export default About;
