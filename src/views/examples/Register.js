import React from "react";
import { connect } from "react-redux";
import registerAction from "actions/registerAction";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  state= {
    name: "",
    email: "",
    password: ""
  }
  onChange = (stateName, value) => 
  {this.setState({
      [stateName]: value
    });
  }
  render() {
    console.log(this.props, this.state.password.length)
    // const { len } = this.state.len
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
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="UserName" type="text" onChange={ e=>this.onChange("name", e.target.value)} />
                  </InputGroup>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" onChange={ e=>this.onChange("email", e.target.value)} />
                  </InputGroup>
                </FormGroup> */}
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" onChange={ e=>this.onChange("password", e.target.value)}/>
                  </InputGroup>
                </FormGroup>
                {console.log(this.state.password.length)}
                {
                (this.state.password.length === 0) ? (<span></span>): (<div className="text-muted font-italic">
                  <small>
                    password strength:  {((this.state.password.length > 6) ? ((this.state.password.length > 8) ? ((this.state.password.includes("1") || this.state.password.includes("2")|| this.state.password.includes("3")|| this.state.password.includes("4")|| this.state.password.includes("5")|| this.state.password.includes("6")|| this.state.password.includes("7")|| this.state.password.includes("8")|| this.state.password.includes("9")|| this.state.password.includes("0")) ? (<span className="text-success font-weight-700">strong</span>) : (<span className="text-primary font-weight-700">good</span>)) : (<span className="text-warning font-weight-700">weak</span>)) : (<span className="text-danger font-weight-700">bad</span>))}
                  </small>
                </div>)}
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
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
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={ ()=>this.props.registerAction(this.state.name, this.state.email, this.state.password)}>
                    Create account
                  </Button>
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
const mapDispatchToProps = dispatch => ({
  registerAction: (name, email,password) => dispatch(
    registerAction(
      name, email, password
    )
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
