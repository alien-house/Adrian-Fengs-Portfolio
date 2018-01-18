import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Route, Link, Switch, NavLink } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import bgImg from '../images/works.jpg';
import WorksDetail from './WorksDetail';
import { siteConfig } from '../utils/config';


const categories = [
  {slug: "music_video", name: "Music Video"},
  {slug: "publicity_video", name: "Publicity Videos"},
  {slug: "short_film", name: "Short Film"}
]
class Works extends Component {
	constructor(props) {
    super(props);
    this.state = {
      currentNum: null,
      projectDataLength: null,
      projectData: [],
      postnumber:null
    };
    this.projectArrayTemp = [];
    this.title = 'Works | ' + props.winTitle;
	}

  componentDidMount() {
    let self = this;
    this.props.loadingOn();
    this.props.transitionOn(); // open the nav
    this.props.updateImgURLEvent(bgImg); 
    let worksURL = siteConfig.baseURL + siteConfig.restAPIURL + 'projects?_embed&per_page=50';
    Promise.all([this.getData(worksURL)]).then(function(){
      // console.log("FInished!!");
      // alert("FInished");
      self.props.loadingOff();
    });
  }
  
  getData(url){
    let self = this;
    return fetch(url)  
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      let currentNum = 0;
      self.setState({projectDataLength:json.length});
      json.forEach(function(element) {
        let project = new Project(
          element.id, 
          element.title.rendered, 
          element._embedded['wp:term'][0][0].name, 
          element._embedded['wp:term'][0][0].slug, 
          element.modified, 
          element.link, 
          element.content.rendered,
          element._embedded['wp:featuredmedia'][0].source_url,
          element.project_meta.video_url,
          element.project_meta.roles,
          element.slug,
        );
        self.projectArrayTemp.push(project);
        currentNum++;
        if(currentNum === self.state.projectDataLength){
          self.setState({projectData:self.projectArrayTemp});
          return "finished";
        }
      });
    })
  }

  setTimeFormat(timetxt){
    let date = new Date(timetxt);
    var options = {  
      weekday: "long", year: "numeric", month: "short",  
      day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    return date.toLocaleTimeString("en-us", options).toString();
  }

  WorksDetailComponents = (props) => {  
    return (
      <WorksDetail 
        winTitle={this.title}
        worksDetailData={this.state.projectData} 
        {...props}
      />
    );
  }

  CategoryBoxComponents = (props) => {  
    return (
        <CategoryBox 
          props={props}
          winTitle={this.title}
          state={this.state}
          baseURL={this.props.match.path}
          {...props}
        />
    );
  }
  TopBoxComponents = (props) => {  
    return (
        <CategoryBox 
          props={props}
          winTitle={this.title}
          state={this.state}
          baseURL={this.props.match.path}
          {...props}
        />
    );
  }
	render() {
    const baseURL = this.props.match.path;
    const projectData = this.state.projectData;
    const timeout = { enter: 300, exit: 200 };
    const projectDatas = projectData.map(function(data, i){
        let roleLength = data.role.length;
        const roles = data.role.map(function(rolesData, i){
        rolesData = roleLength-1 === i ? rolesData : rolesData + ",";
          return(
            <li key={i}>{rolesData}</li>
          )
        });
      return (
        <article key={i} className="unit unit--project">
          <Link to={{
              pathname: `${baseURL}/${data.category_slug}/${data.slug}`
            }} 
            data-postnum={i}
            className="unit-link">
            <figure className="unit-img"><img src={data.featuredmedia} alt={data.title} /></figure>
            <div className="unit-desc">
              <h1 className="unit-title">{data.title}</h1>
              <ul className="unit-role">
                {roles}
              </ul>
            </div>
          </Link>
        </article>
      );

    })

    return (
      <DocumentTitle title={ this.title }>
       <section id="works" className="works normalpage">
          <main className="contents">
            <h1 id="page-title" className="page-title">works</h1>
            <ul className="works-category-nav">
              <li><NavLink activeClassName="active" to={{pathname:`${baseURL}/music_video`}}>{categories[0]['name']}</NavLink></li>
              <li><NavLink activeClassName="active" to={{pathname:`${baseURL}/publicity_video`}}>{categories[1]['name']}</NavLink></li>
              <li><NavLink activeClassName="active" to={{pathname:`${baseURL}/short_film`}}>{categories[2]['name']}</NavLink></li>
            </ul>

            <TransitionGroup component="main" className="page-main">
              <CSSTransition key={this.props.location.key} timeout={timeout} classNames="fade" appear>
               <section className="page-main-inner">
                <Switch location={this.props.location}>
                    <Route exact path={this.props.match.url} render={() => (
                      <div className="project-box">
                        {projectDatas}
                      </div>
                    )}/>
                    <Route exact 
                      path={`${this.props.match.url}/:topicId`} 
                      component={this.CategoryBoxComponents} />
                    <Route 
                      path={`${this.props.match.url}/:topicId/:postId`} 
                      component={this.WorksDetailComponents} />
                </Switch>
                </section>
              </CSSTransition>
            </TransitionGroup>

          </main>
        </section>
      </DocumentTitle>
    );
  }
}
export default Works;

const CategoryBox = ({winTitle, state, baseURL, match: { params }}) => {
  const divState = Object.assign({}, state);
  const divParams = Object.assign({}, params);
  const projectData = divState.projectData;

  const cateTitle = categories.filter(e => e.slug === divParams.topicId)[0];
  let title;
  if(cateTitle){
    title = cateTitle.name + ' | ' + winTitle;
  }else{
    title =  winTitle;
  }

  const ProjectDatas = projectData.filter(function(e){
    return ( e.category_slug === divParams.topicId)
    })
    .map(function(data, i){
      let roleLength = data.role.length;
      const roles = data.role.map(function(rolesData, i){
      rolesData = roleLength-1 === i ? rolesData : rolesData + ",";
        return(
          <li key={i}>{rolesData}</li>
        )
      });
    
    return (
      <article key={i} className="unit unit--project">
        <Link to={{
            pathname: `${baseURL}/${data.category_slug}/${data.slug}`
          }} 
          data-postnum={i}
          className="unit-link">
          <figure className="unit-img"><img src={data.featuredmedia} alt={data.title} /></figure>
          <div className="unit-desc">
            <h1 className="unit-title">{data.title}</h1>
            <ul className="unit-role">
              {roles}
            </ul>
          </div>
        </Link>
      </article>
    );
   
  })
  return(
    <DocumentTitle title={title || 'Untitled'}>
      <div className="project-box">
        {ProjectDatas}
      </div>
    </DocumentTitle>
  );
}


class Project{
  constructor(id, title, category, category_slug, date, link, content, featuredmedia = null, videourl, role, slug){
    this.id = id;
    this.title = title;
    this.category = category;
    this.category_slug = category_slug;
    this.date = date;
    this.content = content;
    this.featuredmedia = featuredmedia;
    this.videourl = videourl;
    this.link = link;
    this.role = role;
    this.slug = slug;
  }
}

