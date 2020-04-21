import React from "react";
import { connect } from "react-redux";
import { loginActions } from "actions/loginActions";
import { Link } from "react-router-dom";
// import validate from '../forms/validate'
// import renderField from '../forms/renderField'
// import PropTypes from 'prop-types';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  // Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  FormFeedback,
  // FormText,
  Col
} from "reactstrap";




class Login extends React.Component {
  state = {
    email: "",
    password: "",
    validate: {
      emailState: "",
      passState: "",
      etouch: false,
      ptouch: false,
      pEmpty: true,
      eEmpty: true
    },
    response: [
      {
        errors: undefined,
        warning: undefined,
      },
      {
        errors: undefined,
        warning: undefined,
      }

    ]
  }
  
  validateForm = () => {
    if (this.state.validate.emailState !== "has-success" && this.state.validate.passState !== "has-success") {
      return false;
    }else{
      return true;;
    }
  }
  validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    const respond = this.state.response
    
    if (emailRex.test(e.target.value) && e.target.value !== "") {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
      respond[0].errors= "Uh oh! Invalid email address, please input a correct email.";
    }
    if (e.target.value === "" && validate.etouch){validate.emailState = "has-danger";
    respond[0].errors= "* Required";}
    this.setState({ 
      validate: validate,
      response: respond
     });
  }
  validatePass = (e) => {
    // const { etouch, ptouch, eEmpty, pEmpty, passState } = this.state.validate
    const { validate } = this.state;
    const respond = this.state.response
    if(e.target.value !== "" && validate.ptouch && !validate.pEmpty){respond[1].errors = undefined;  validate.passState = "has-success";} else{respond[1].errors = " * Required "; validate.passState = "has-danger";}
    this.setState({ 
      validate: validate,
      response: respond
     });
  }
  onChange = (stateName, e) => { 
    // const { etouch, ptouch, eEmpty, pEmpty } = this.state.validate;
    const { validate } = this.state;
    if(stateName === "email"){ this.validateEmail(e);
    if(e.target.value !== ""){ validate.etouch = true; validate.eEmpty = false; }else{ validate.eEmpty = true; }}
    if(stateName === "password"){
      if(e.target.value !== ""){ validate.pEmpty =false; validate.ptouch = true; }else{  validate.pEmpty = true;}} 
    this.setState({
    [stateName]: e.target.value,
    validate});
    if(stateName === "email"){ this.validateEmail(e);}
    if(stateName === "password"){ this.validatePass(e);}
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.signedUp){
      this.setState({signedUp: false});
    }
    this.props.loginActions(this.state)
  } //allows submission with actions like enter key
  render() {
    const{ authState } = this.props;
    const authError = authState.authError;
    // const auth = auth.uid;
    const { email } = this.state;
    const { perrors, pwarnings } = this.state.response[1];
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-1">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <Form onSubmit={this.handleSubmit} role="form">
              <FormGroup >
                  
                  <InputGroup  className="input-group-alternative" style={{boxShadow:"0"}}>
                  
                    <InputGroupAddon addonType="prepend" >
                      <InputGroupText >
                        <i className="ni ni-email-83" />
                      </InputGroupText> 
                    </InputGroupAddon>
                    <FormFeedback valid /> 
                    <Input  id="loginEmail" placeholder="Email" type="email" autoComplete="new-email" 
                      value={email}
                      valid={this.state.validate.emailState === "has-success" ? true : undefined}
                      invalid={this.state.validate.emailState === "has-danger" ? true : undefined}
                      onChange={ e=>{
                        this.onChange("email", e);
                      }}
                      style={this.state.validate.emailState === "has-danger" ? ({borderBottom:"1mm ridge #fb6340", borderRadius: "0.175rem", backgroundColor:"#E8F0FE"}):(this.state.validate.emailState === "has-success" ? ({borderBottom:"1mm ridge #2dce89", borderRadius: "0.175rem", backgroundColor:"#E8F0FE"}): null)}
                      
                    />
                    
                    <FormFeedback valid />
                    
                    <FormFeedback className="text-center m-2"><span >{this.state.response[0].errors}</span><br/></FormFeedback>
                      
                    
                    
                    </InputGroup>
          
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">{ (this.state.validate.emailState == "has-success") ?<FormFeedback valid >Looks Good!</FormFeedback> : <span className="red-text">{this.state.response[0].errors}</span>}</div>                   */}
                  
                  
                
                
                {/* <FormText><div className="red-text custom-control custom-control-alternative custom-checkbox">authError ? <p>{authError}</p> : null* Required </div> </FormText>                   */}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input  type="password" autoComplete="new-password"
                  valid={this.state.validate.passState === "has-success" ? true : undefined}
                  invalid={this.state.validate.passState === "has-danger" ? true : undefined} 
                  onChange={ e=>{this.onChange("password", e);}}
                  style={this.state.validate.passState === "has-danger" ? ({borderBottom:"1mm ridge #fb6340", borderRadius: "0.175rem", backgroundColor:"#E8F0FE"}):(this.state.validate.passState === "has-success" ? ({borderBottom:"1mm ridge #2dce89", borderRadius: "0.175rem", backgroundColor:"#E8F0FE"}): null)}                  
                  />
                  <FormFeedback valid />                    
                  <FormFeedback className="text-center m-2"><span >{this.state.response[1].errors}</span><br/></FormFeedback>
                </InputGroup>
              </FormGroup>
              <div className="red-text center">
                    { (perrors !== "" || pwarnings !== "") ? <p>{perrors}{pwarnings}</p> : null}
              </div>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={(this.validateForm() ? false : true)}>
                    Sign in
                  </Button>
                  <div className="red-text center">
                    { authError ? <p>{authError}</p> : null}
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <Link to="/auth/register">
              <span
                className="text-light"                
              >
                <small>Not Registered? <br/>Create new account</small>
              </span></Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return{
    ...state,
    signedUp: state.authState.signedUp,
    authState: state.authState,
    auth: state.firebase.auth

  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    loginActions: (creds) => dispatch( loginActions(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)((Login));
