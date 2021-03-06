import React from "react";
import { connect } from "react-redux";
import { signUp, logOut } from "actions/loginActions";
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  FormFeedback,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Register extends React.Component {
  state= {
    username: "",
    email: "",
    password: "",
    agree: null,
    formErrors: {
      username: null,
      email: null,
      password: null,
      agree: null,
      pstate: null,
      valid: null
    }
  }
  onChange = (name, event) => {
    const isCheckbox = (event.target.type === "checkbox");
    console.log("Input type : ", event.target.type, (isCheckbox ? event.target.checked : (" length :"+event.target.value.length)));
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "username":
        formErrors.username =
          event.target.value.length < 3 ? "minimum 3 characaters required" : null;
        break;
      case "email":
        formErrors.email = event.target.value.length === 0 ? "* Required" : (emailRegex.test(event.target.value) ? null : "invalid email address");
        break;
      case "password":
        formErrors.password = (event.target.value !== null && event.target.value.length <  6) ? "minimum 6 characaters required": null;
        break;
      case "agree":
        formErrors.agree = event.target.checked ? null : "Agreement Policy Must be Checked";
        break;
      default:
        break;
    }
    this.setState({
      [name]: (isCheckbox ? event.target.checked : event.target.value),
      formErrors
    });
  };
  handleSubmit = (e) => 
  {
    e.preventDefault();
    
    let formErrors = { ...this.state.formErrors };
    const { username, email, password, agree } = this.state;
    console.log(formErrors);
    formErrors.username = ((username === null || username === "") ? formErrors.username="*Required" : formErrors.username);
    formErrors.email = ((email === null || email === "") ? formErrors.email="*Required" : formErrors.email);
    formErrors.password = ((password === null || password === "") ? formErrors.password="*Required" : formErrors.password);
    formErrors.agree = ((agree === null) ? formErrors.agree="*Required" : formErrors.agree);
    formErrors.valid = ((formErrors.username === null && formErrors.email === null && formErrors.password === null && (formErrors.agree === null && agree !== null)) ? null : "Incomplete! Please make sure all requirements are met.")
    if(formErrors.valid === null){
      this.props.signUp(this.state); 
      setTimeout(() => {this.props.logOut()}, 5000);
      
    }
    this.setState({
      formErrors
    });
  }
  
  render() {
    console.log(this.props)
    if(this.props.authState.signedUp){return(<Redirect to="/auth/login" />);}
    const { username, email, password, agree, formErrors } = this.state;
    // const { strength } = (len === 0) ? (<span> none </span>):((len > 6) ? ((len > 8) ? ((len >9) ? (<span className="text-success font-weight-700">strong</span>) : (<span className="text-primary font-weight-700">good</span>)) : (<span className="text-warning font-weight-700">weak</span>)) : (<span className="text-danger font-weight-700">bad</span>))
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
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
                <small>Or sign up with credentials</small>
              </div>
              <Form onSubmit={this.handleSubmit} role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Username" type="text" onChange={ e=>this.onChange("username", e)} invalid={username !== null && formErrors.username !== null ? true : undefined} style={username !== null && formErrors.username !== null ? ({borderBottom:"1mm solid #fb6340", borderRadius: "0.175rem", backgroundColor:"#FFFFFFF", textIndent: "6px", boxShadow: "0 2px 5px rgba(251, 99, 64, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)"}) : (username !== null && username !== "" && formErrors.username === null ? ({borderBottom:"1mm solid rgb(45, 206, 137)", borderRadius: "0.175rem", textIndent: "6px", boxShadow: "0 1px 3px rgba(45, 206, 137, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)"}): null)}/>
                    
                    <FormFeedback invalid={username !== null && formErrors.username !== null ? 'true'.toString(): undefined} className="text-center m-2"><span >{formErrors.username}</span><br/></FormFeedback>
                  </InputGroup>

                </FormGroup>
                {/* {username != null && formErrors.username != null ? (<span className="errorMessage">{formErrors.username}</span>) : null} */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" onChange={ e=>this.onChange("email", e)} invalid={formErrors.email !== null ? true : undefined}  style={email !== null && formErrors.email !== null ? ({borderBottom:"1mm solid #fb6340", borderRadius: "0.175rem", backgroundColor:"#FFFFFFF", textIndent: "6px", boxShadow: "0 2px 5px rgba(251, 99, 64, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)"}) : (email !== null && email !== "" && formErrors.email === null ? ({borderBottom:"1mm solid rgb(45, 206, 137)", borderRadius: "0.175rem", textIndent: "6px", boxShadow: "0 1px 3px rgba(45, 206, 137, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)"}): null)}/>
                    <FormFeedback invalid={formErrors.email !== null ? "anything": undefined} className="text-center m-2" ><span >{formErrors.email}</span><br/></FormFeedback>
                  </InputGroup>
                </FormGroup>
                {/* {email != null && formErrors.email != null ? (<span className="errorMessage">{formErrors.email}</span>) : null} */}
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" onChange={ e=>this.onChange("password", e)} invalid={formErrors.password !== null ? true: undefined} style={password !== null && formErrors.password !== null ? ({borderBottom:"1mm solid #fb6340", borderRadius: "0.175rem", backgroundColor:"#FFFFFFF", textIndent: "6px", boxShadow: "0 2px 5px rgba(251, 99, 64, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)"}) : (password !== null && password !== "" && formErrors.password === null ? ({borderBottom:"1mm solid rgb(45, 206, 137)", borderRadius: "0.175rem", textIndent: "6px", boxShadow: "0 1px 3px rgba(45, 206, 137, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)"}): null)}/>
                    <FormFeedback invalid={formErrors.password !== null ? "anything": undefined} className="text-center m-2"><span >{formErrors.password}</span><br/></FormFeedback>
                  </InputGroup>
                </FormGroup>
                {/* {password != null && formErrors.password != null ? (<span className="errorMessage">{formErrors.password}</span>) : null} */}
                {/* {console.log(this.state.password.length)} */}
                {
                (this.state.password.length === 0) ? (<span></span>): (<div className="text-muted font-italic">
                  <small>
                password strength: {this.state.password.length <= 5 ? <span><span className="text-danger font-weight-700">bad </span><br/> <span>{this.state.password.includes("1") || this.state.password.includes("2")|| this.state.password.includes("3")|| this.state.password.includes("4")|| this.state.password.includes("5")|| this.state.password.includes("6")|| this.state.password.includes("7")|| this.state.password.includes("8")|| this.state.password.includes("9")|| this.state.password.includes("0") ?  <span><span className="text-muted font-italic ml-7 mt-2" > - At least 6 Characters </span></span> : <span><span className="text-muted font-italic ml-7 mt-2" > - At least 6 Characters <br/></span><span className="text-muted font-italic ml-7 mt-2" > - At least 1 Number </span></span>}</span></span> : <span>{this.state.password.length >= 6 ?  <span>{this.state.password.includes("1") || this.state.password.includes("2")|| this.state.password.includes("3")|| this.state.password.includes("4")|| this.state.password.includes("5")|| this.state.password.includes("6")|| this.state.password.includes("7")|| this.state.password.includes("8")|| this.state.password.includes("9")|| this.state.password.includes("0") ?  <span className="text-success font-weight-700">strong</span> : <span><span className="text-primary font-weight-700">Okay</span><br/><span className="text-muted font-italic ml-7 mt-2" > -At least one Number</span></span>}</span> : <span>{this.state.password.includes("1") || this.state.password.includes("2")|| this.state.password.includes("3")|| this.state.password.includes("4")|| this.state.password.includes("5")|| this.state.password.includes("6")|| this.state.password.includes("7")|| this.state.password.includes("8")|| this.state.password.includes("9")|| this.state.password.includes("0") ?  <span><span className="text-primary font-weight-700">fair </span><br/><span className="text-muted font-italic ml-7 mt-2" > - At least 6 Characters </span></span> : undefined}</span>}</span> } 
                  </small>
                </div>)}
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        onChange={ e=>this.onChange("agree", e)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                    {agree != null && formErrors.agree != null ? (<span className="text-center errorMessage"><small className="text-center text-muted text-red ">* required <br/>  {formErrors.agree}</small></span>) : null}
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit" disabled={agree != null ? !agree : true} >
                    Register
                  </Button>
                  {formErrors.valid != null ? (<span className="errorMessage">{formErrors.valid}</span>) : null}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch) => {
  return{
    signUp: (cred) => dispatch( signUp(cred) ),
    logOut: () => dispatch(logOut())
}};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
