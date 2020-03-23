import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
    console.log('component mounted')
  }
  componentDidUpdate(prevProps, prevState, props){
    console.log('component updated');
    // console.log('current', props, 'previous p' , prevProps, 'previous s' ,prevState);
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        console.log('layout is not auth')
        return null;
      }
    });
  };
  render() {
    console.log(this.props);
    if(
      this.props.authState.loggedIn
    ){
      return(
        <Redirect
        to="/admin/user-profile"/>
      )
    }
    else{
    return (
      <>
        <div className="main-content" ref="mainContent">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome</h1>
                    <p className="text-lead text-light">
                      Get a free estimate Today!
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--9 pb-6" >
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
    }
  }
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps,{})(Auth);
