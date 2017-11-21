import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

class WorksDetail extends Component {
	constructor(props) {
    super(props);
    this.state = {
      currentNum: null,
      postData:{}
    };
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
 
	render() {
      if(this.state.postData !== null){
        var videoParam = this.getUrlParameter(this.state.postData.videourl).v;
      }

    const VideoDetail = () => {
      if(this.state.postData != null)
        return(
            <iframe
            title={this.state.postData.title}
            src={`https://www.youtube.com/embed/${videoParam}`}
            frameBorder="0" allowFullScreen>
            </iframe>
        );
      else return null;
    }
    
    return (
      <DocumentTitle title={this.state.postData.title || 'Untitled'}>
        <article className="projectDetail-box">
          <div className="projectDetail-video">
            <VideoDetail />
          </div>
          <h1 className="projectDetail-title">{this.state.postData.title}</h1>
          <div className="projectDetail-contents" dangerouslySetInnerHTML={{__html: this.state.postData.content}} />
            
        </article>
      </DocumentTitle>
    );
  }
}

export default WorksDetail;

