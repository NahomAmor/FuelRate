import React from "react";
// import { connect } from "react-redux";
// import { signUp } from "actions/loginActions";
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const handleEdit= (getProfile) =>{
  return (<Redirect registered={getProfile}  to="/admin/user-profile"/>);

}

const UserProfile = (props) => {
    const { profile, registered, getProfile } = props;
    return (
      <>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    > */}
                      {/* Message
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          {/* <span className="heading">22</span>
                          <span className="description">Friends</span> */}
                        </div>
                        <div>
                          <span className="heading">0</span>
                          <span className="description">Quote Requests</span>
                        </div>
                        <div>
                          {/* <span className="heading">89</span>
                          <span className="description">Comments</span> */}
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {props.profile.FullName}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {props.profile.State, props.profile.City}
                    </div>
                    {/* <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p> */}
                    <Button color= "primary" type="submit" onClick={ () => handleEdit(getProfile)}>
                      Edit Profile
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            </>
    );
  }
  const mapStateToProps = (state) => {
    return{
      profile: state.firebase.profile,
      getProfile: true
      // authError: state.authState.authError
    }
  };

export default connect(mapStateToProps, null)(UserProfile);