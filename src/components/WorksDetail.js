import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

class WorksDetail extends Component {
	constructor(props) {
    super(props);
    this.state = {
      currentNum: null,
      postData:{}
    };
    this.goBack = this.goBack.bind(this);
	}

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.worksDetailData === nextProps.worksDetailData)||
    !(this.state.postData === nextState.postData);
  }

  componentWillUpdate(nextProps, nextState) {
    let self = this;
    if(this.props.worksDetailData !== nextProps.worksDetailData){

      if(nextProps.worksDetailData.length >= 1){

       const WorksDetailData = nextProps.worksDetailData.filter(function(e){
          return ( e.slug === self.props.match.params.postId)
          })
   
      this.setState({postData:WorksDetailData[0]});

      }
    }
  }

  componentWillMount(){
    let self = this;

      if(this.props.worksDetailData.length >= 1){
       const WorksDetailData = this.props.worksDetailData.filter(function(e){
          return ( e.slug === self.props.match.params.postId)
          })
      this.setState({postData:WorksDetailData[0]});
    }
  }


  getUrlParameter(path) {
    if (!path) return false;
    var param = path.match(/\?([^?]*)$/);
    if (!param || param[1] === '') return false;
    var tmpParams = param[1].split('&');
    var keyValue  = [];
    var params    = {};
    for (var i = 0, len = tmpParams.length; i < len; i++) {
        keyValue = tmpParams[i].split('=');
        params[keyValue[0]] = keyValue[1];
    }
    return params;
  }

  goBack(){
      this.props.history.goBack();
  }
 
	render() {
    let postData = this.state.postData;
      if(postData !== null && postData !== undefined){
        var videoParam = this.getUrlParameter(postData.videourl).v;
      }else if(postData === undefined){
        console.log(postData);
      }

    const VideoDetail = () => {
      if(postData != null)
        return(
          <DocumentTitle title={postData.title || 'Untitled'}>
            <article className="projectDetail-box">
              <div className="projectDetail-video">
                <iframe
                title={postData.title}
                src={`https://www.youtube.com/embed/${videoParam}`}
                frameBorder="0" allowFullScreen>
                </iframe>
              </div>
              <h1 className="projectDetail-title">{postData.title}</h1>
              <div className="projectDetail-contents" dangerouslySetInnerHTML={{__html: postData.content}} />
              <div className="center">
                <button className="btnBack" onClick={this.goBack}><FontAwesome name='long-arrow-left' /> Back</button>
              </div>
            </article>
          </DocumentTitle>
        );
      else {
        return <NoMatch />
      }
    }
    
    return (
        <VideoDetail />
    );
  }
}

export default WorksDetail;


const NoMatch = ({ winTitle }) => {
  return(
    <div className="etc">
      <div className="text-area">
        <p>We couldn’t find this project.</p>
        <p>Maybe it’s out there, somewhere.<br />
        You can always find other works on <Link to={`/works/`}>my project page</Link>.</p>
      </div>
    </div>
  )
}