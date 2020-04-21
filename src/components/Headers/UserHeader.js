import React from "react";
// import { connect } from 'react-redux';

// reactstrap components
import { Container, Row, Col } from "reactstrap";

const UserHeader = (props) => {
    // const { profile, registered } = this.props;
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/back.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hey there, {props.profile.UserName}!</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can use your Dashboard to fill out a request or view previous reports!
                </p>
                {/* <Button
                  color="info"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Edit profile
                </Button> */}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
  // const mapStateToProps = (state) => {
  //   return{
  //     profile: state.firebase.profile
  //     // authError: state.authState.authError
  //   }
  // };

export default (UserHeader);
