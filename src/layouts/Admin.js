import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// reactstrap components
import { Container, Spinner} from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { firestoreConnect } from 'react-redux-firebase';
// import { getProfile } from "actions/getProfiles";
import { compose } from 'redux'
// import { getProfiles } from "actions/getProfiles";

class Admin extends React.Component {
  // componentDidMount(){
  //   this.authListener();
  // }
  // componentDidUpdate(e) {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   // this.refs.mainContent.scrollTop = 0;
  // }
  
  // authListener(){
  //   this.props.firebase.auth().onAuthStateChanged((user) =>{
  //     console.log(user, "admin authstate change")
  //     if(user){
  //       this.setState({ user });
  //     } else {
  //       this.setState({user: null});
  //     }
  //   });
  // }
  state= {
    status: true,
  }
  getRoutes = (routes, profile) => {
    // this.props.getProfiles();
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            profile= {profile}
          />
        );
      } else {
        return null;
      }
    });
  };
  toggle = () => this.setState({status: false});
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        console.log(routes[i].name);
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // getProfile = () => {
  //   const { user } = this.props.

  // }
  render() {
    
    // this.authListener();
    
    const{ profile, authState, auth } = this.props;
    if(!auth.uid){
      return( <Redirect to="/auth/login"/> )
    }
    if(profile.isEmpty){

      return(
          <>
            <div className="main-content" ref="mainContent">
            <Container className="mt--7" fluid>
              <h1>Loading...</h1>
              <Spinner size="lg" color="primary"/>
            </Container>

            </div>

          </>
      );
    }else{
          console.log("profile :" , this.props.profile);
          if(authState.registered){
            // return( <Redirect to="/auth/create-account"/> )
            console.log("New Register");
          }
          return (
            <>
              <Sidebar
                {...this.props}
                routes={routes}
                logo={{
                  innerLink: "/admin/index",
                  imgSrc: require("assets/img/brand/Fuel-Image.png"),
                  imgAlt: "Side Fuel Image"
                }}
              />
              <div className="main-content" ref="mainContent">
                <AdminNavbar
                  {...this.props}
                  brandText={this.getBrandText(this.props.location.pathname)}
                  profile={profile}
                />
                <Switch>
                  {this.getRoutes(routes, this.props.profile)}
                  <Redirect from="*" to="/admin/index" />
                </Switch>
                <Container fluid>
                  <AdminFooter />
                </Container>
              </div>
          </>
        );
  }
}
}

const mapStateToProps = (state) => {
  const reg = state.rateState.profileLoaded ? false : state.authState.registered;
  return{
    ...state,
    // Requests: state.firestore,
    profile: state.firebase.profile,
    authState: state.authState,
    auth: state.firebase.auth,
    rateState: state.rateState,
    registered: reg

  }
}

// const mapDispatchToProps = (dispatch) => {

//   return{
//     // getProfiles: () => dispatch(getProfiles())
//   }
// }

export default compose(
  connect(mapStateToProps, {}), firestoreConnect([ { collection: 'Profiles'} ]))(Admin);
