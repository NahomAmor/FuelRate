import React from "react";
import { connect } from "react-redux";
// import { signUp } from "actions/loginActions";
import { firestoreConnect } from 'react-redux-firebase'
import { updateProfile } from "actions/getProfiles";
import { compose } from 'redux'
import json from "./states"
// reactstrap components



import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Collapse,
  FormFeedback,
  Container,
  Row,
  Col, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
// import Autocomplete from '@material-ui/lab/Autocomplete';
// core components
import UserHeader from "components/Headers/UserHeader.js";
import UserProfile from "components/Headers/UserProfile";
import "./styles.css";
import { Redirect } from "react-router-dom";

const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
class Profile extends React.Component {
  // componentDidMount() {
  //   // document.body.classList.add("bg-default");
  //   console.log('component mounted state then props', this.state, this.props)
  // }
  state= {
    FullName: undefined,
    Email: undefined,
    State: undefined,
    City: undefined,
    Zipcode: 0,
    MainAddress: undefined,
    Address2: undefined, 
    UserName: undefined,
    AboutMe: undefined,
    formErrors: {
      FullName: null,
      UserName: null,
      Email: null,
      State: null,
      City: null,
      MainAddress:null,
      Address2: null,
      Zipcode: null,
      AboutMe: null,
      valid: null
    },
    collapse: false,
    nested: true,
    valid: false,
    status: "Closed"
  }
  createStates = json => {
    let items = []
    return json.map((prop, key) => {
      items.push(<option key={key} value={prop.abbreviation}>{prop.name}</option>);
        
        return items;
          
      }) 
    };
  onChange = (name, value) => {
    let formErrors = { ...this.state.formErrors };
    const {  Email, State, Zipcode, FullName,  MainAddress, City } = this.state;
    switch (name) {
      case "Email":
        formErrors.Email = value.length === 0 ? "* Required" : (emailRegex.test(value) ? null : "invalid email address");
        break;
      case "UserName":
          formErrors.UserName = value.length === 0 ? "* Required" : null;
          break;
      case "FullName":
        formErrors.FullName = value.length === 0 ? "* Required" : null;
        break;
      case "State":
        formErrors.State = value.length === 0 ? "* Required" : null;
        break;
      case "City":
        formErrors.City = value.length === 0 ? "* Required" : null;
        break;
      case "MainAddress":
        formErrors.MainAddress = value.length === 0 ? "* Required" : null;
        break;
      case "Zipcode":
        formErrors.Zipcode = value.length === 0 ? "* Required" : (value.length <= 4 ? "* Input is less than 6 digits" : null);
        break;
      default:
        break;
    }
    formErrors.valid = ((formErrors.UserName === null && (formErrors.Email === null && Email !== "") && formErrors.State === null && (formErrors.City === null)  && (formErrors.MainAddress === null && MainAddress !== "") && (formErrors.Zipcode === null)) ? null : "Incomplete! Please make sure all requirements are met.")
    this.setState({
      [name]: value,
      formErrors,
      valid: (Email !== "" && State !== "" && Zipcode !== 0 && City !== "" && FullName !== "" && MainAddress !== "")
    });
  }
  handleinitial = () => {
    const { FullName, UserName, Email, State, City, MainAddress, Address2, Zipcode, AboutMe } = this.props.profile;
    let formErrors = { ...this.state.formErrors };
    formErrors.valid = (((formErrors.UserName === null && UserName !== "") && (formErrors.Email === null && Email !== "") && formErrors.State === null && (formErrors.City === null)  && (formErrors.MainAddress === null && MainAddress !== "" && MainAddress !== undefined ) && (formErrors.Zipcode === null)) ? null : "Incomplete! Please make sure all requirements are met.")
    console.log("props profile ", FullName, UserName, Email, State, City, MainAddress, Address2, Zipcode, AboutMe)
    this.setState({
      FullName: FullName,
      Email: Email,
      State: State,
      City: City,
      Zipcode: Zipcode,
      MainAddress: MainAddress,
      Address2: Address2, 
      UserName:  UserName,
      AboutMe: AboutMe,
      nested: false,
      formErrors: {
        FullName: "* Required",
        State: "* Required",
        City: "* Required",
        MainAddress: "* Required",
        Zipcode: "* Required",
      },
      collapse: true,
      valid: false
    });
  }
  onEntering = () => this.setState({status: 'Opening...'});

  onEntered = () => this.setState({status: 'Opened'});

  onExiting = () => this.setState({status: 'Closing...'});

  onExited = () => this.setState({status: 'Closed'});
  editProfile = (e) => {
    e.preventDefault();
    const expand = this.state.collapse
    this.setState({collapse: !expand ? true : false});}
  handleSubmit = (e) => 
  {
    e.preventDefault();
    let formErrors = { ...this.state.formErrors };
    let profile ={ ...this.props.profile };
    const { FullName, UserName, Email, State, City, MainAddress, Address2, Zipcode, AboutMe } = this.state;
    let info ={
      FullName: FullName===undefined ? profile.FullName : FullName,
      Email: Email===undefined ? profile.Email : Email,
      State: State===undefined ? profile.State : State,
      City: City===undefined ? profile.City : City,
      Zipcode: Zipcode===undefined ? profile.Zipcode : Zipcode,
      MainAddress: MainAddress===undefined ? profile.MainAddress : MainAddress,
      Address2: Address2===undefined ? profile.Address2 : Address2, 
      UserName:  UserName===undefined ? profile.UserName : UserName,
      AboutMe: AboutMe===undefined ? profile.AboutMe : AboutMe
    };
    this.setState({
      ...info
    });
    if(formErrors.valid === null){
      this.props.updateProfile(info);
      this.setState({
        collapse: false,

      }); 
      return(<Redirect to="/admin/requestsForm" />)
    }
  }
 
  render() {
    const { profile, registered } = this.props;
    const { FullName, UserName, Email, State, City, MainAddress, Address2, Zipcode, AboutMe, formErrors, collapse } = this.state;
    return (
      <>
        <UserHeader profile={profile} />
        <Container className="mt--7" fluid>
        {/* test = {(Email === undefined) ? (this.handleinitial(profile)) : undefined }; */}
        {/* Page content */}
        {(registered) ? 

          <Modal isOpen={this.state.nested} toggle={() => this.handleinitial()} backdrop="static" >
          <ModalHeader>Welcome {profile.UserName}</ModalHeader>
          <ModalBody>Please fill out some information to complete you're registration</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleinitial()}>Got it!</Button>{' '}
            {/* <Button color="secondary" onClick={toggleAll}>All Done</Button> */}
          </ModalFooter>
          </Modal> :<Container className="mt--7" fluid> <Collapse className="mt--7" isOpen={!collapse}><Row className="text-center mb-6 mt--7" ><Col className="text-center mt--7"><Button className="text-center" color="primary" type="button" onClick={this.editProfile}> Edit Profile </Button></Col></Row><Row className="text-center" ><Col className="text-center" ><UserProfile profile={profile} /></Col></Row><Row className="text center mt-4"><Col className="text center"></Col></Row></Collapse></Container> }
                  
                    
                
          
          <Collapse
            isOpen={collapse}
            onEntering={() => this.onEntering()}
            onEntered={() => this.onEntered()}
            onExiting={() => this.onExiting()}
            onExited={() => this.onExited()}
          >
        <Container className="mt--7" fluid>
        {/* <Container className="mt--7 " fluid style={{marginTop: "-1rem !important"}}> */}
          <Row>
            <Col className="order-xl-1 mt--7 mb-7" >
              <Card className=" shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col className="text-center" xs="12">
                      <h3 className="mb-0">My Account Profile</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form onSubmit={this.handleSubmit} role="form">
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              value={UserName===undefined ? profile.UserName : UserName}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              required
                              label="Required"
                              maxLength="50"
                              // valid={formErrors.UserName === null ? true : undefined}
                              invalid={(formErrors.UserName !== null) ? "true" : undefined}
                              onChange={ e=>this.onChange("UserName", e.target.value)}
                            />
                            <FormFeedback className="text-center m-2"><span >{formErrors.UserName}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              defaultValue={Email===undefined ? profile.Email : Email}
                              id="input-email"
                              placeholder="john@example.com"
                              type="email"
                              required
                              label="Required"
                              invalid={formErrors.Email !== null ? "true" : undefined}
                              onChange={ e=>this.onChange("Email", (Email===undefined ? profile.Email : e.target.value ))}
                            />
                            <FormFeedback className="text-center m-2"><span >{formErrors.Email}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="10">
                          <FormGroup required >
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              required
                            >
                              Full Name <span className="text-muted">*</span>
                            </label>
                            <Input
                              value={FullName===undefined ? profile.FullName : FullName}
                              id="input-first-name"
                              placeholder="Full name"
                              type="text"
                              required
                              label="Required"
                              maxLength="50"
                              invalid={formErrors.FullName !== null ? "true" : undefined}
                              onChange={ e=>this.onChange("FullName", e.target.value)}
                            />
                            <FormFeedback valid />
                            <FormFeedback className="text-center m-2"><span >{formErrors.FullName}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address <span className="text-muted">*</span>
                            </label>
                            
                            <Input
                              // className="form-control"
                              value={MainAddress===undefined ? profile.MainAddress : MainAddress}
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              required
                              label="Required"
                              maxLength="100"
                              // valid={formErrors.MainAddress === null ? true : undefined}
                              invalid={formErrors.MainAddress !== null ? "true" : undefined}
                              onChange={ e=>this.onChange("MainAddress", e.target.value)}
                              // style={{border:"2px solid"}}
                            />
                            {/* <FormFeedback valid /> */}
                            <FormFeedback invalid className="text-center m-2"><span >{formErrors.MainAddress}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address 2
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={Address2===undefined ? profile.Address2 : Address2}
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              maxLength="100"
                              onChange={ e=>this.onChange("Address2", e.target.value)}
                            />
                            <FormFeedback className="text-center m-2" invalid ><span >{formErrors.Address2}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City <span className="text-muted">*</span>
                            </label>
                            <Input
                              value={City===undefined ? profile.City : City}
                              id="input-city"
                              placeholder="City"
                              type="text"
                              required
                              label="Required"
                              maxLength="100"
                              // valid={formErrors.City === null ? true : undefined}
                              invalid={formErrors.City !== null ? "true" : undefined}
                              onChange={ e=>this.onChange("City", e.target.value)}
                            />
                            <FormFeedback invalid className="text-center m-2"><span >{formErrors.City}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-state"
                            >
                              State <span className="text-muted">*</span>
                            </label>
                            <Input
                              value={State===undefined ? profile.State : State}
                              id="input-state"
                              placeholder="State"
                              name="select"
                              type="select"
                              maxLength="2"
                              invalid={formErrors.State !== null ? "true" : undefined}
                              onChange={ e=>this.onChange("State", e.target.value)}
                            >
                              {this.createStates(json)}
                            </Input>
                            <FormFeedback invalid className="text-center m-2"><span >{formErrors.State}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Zipcode <span className="text-muted">*</span>
                            </label>
                            <Input
                              value={Zipcode===undefined ? profile.Zipcode : Zipcode}
                              id="input-postal-code"
                              placeholder={77894}
                              type="number"
                              maxLength="9"
                              minLength="5"
                              // valid={formErrors.Zipcode === null ? true : false}
                              invalid={formErrors.Zipcode !== null ? "true" : undefined}
                              onChange={ e=>this.onChange("Zipcode", e.target.value)}
                            />
                            <FormFeedback invalid className="text-center m-2"><span >{formErrors.Zipcode}</span><br/></FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          value={AboutMe===undefined ? profile.AboutMe : AboutMe}
                          type="textarea"
                          onChange={ e=>this.onChange("AboutMe", e.target.value)}
                        />
                      </FormGroup>
                    </div>
                    <div className="text-center">
                      <Button className="mt-4" color="primary" type="submit" disabled={(formErrors.valid === null ) ? false : true}>
                        Save
                      </Button>
                      {registered ? null:<Button className="mt-4" color="danger" type="button" onClick={this.editProfile}> Cancel </Button>}                      
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        </Collapse>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return{
    ...state,
    registered: state.authState.registered,
    profile: state.firebase.profile,
    getProfile: state.rateState.getProfile
    // authError: state.authState.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    updateProfile: (info) => dispatch( updateProfile(info))
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([
  { collection: 'Profiles' }
]))(Profile);