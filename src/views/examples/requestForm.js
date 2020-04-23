import React from "react";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'; 
import { addRequestAction } from "actions/addRequestAction";
import { getRequestAction } from "actions/getRequestAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Button,
  CardBody,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  FormGroup,
  Form,
  Input,
  Col,
  FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "./styles.css";
import moment from "moment";
// import { KeyboardDatePicker } from '@material-ui/pickers';
// var dt = new Date();
// dt = moment().HTML5_FMT.DATETIME_LOCAL;
class Requester extends React.Component{
    state = {
      date: new Date(),
      Gallons: undefined,
      Address: undefined,
      SuggestedPrice: undefined,
      TotalDue: undefined,
      formErrors: {
        date: null,
        Gallons: null,
        Address: undefined,
        SuggestedPrice: undefined,
        TotalDue: undefined,
        valid: false
      },
      valid: false,
      toggle: false

    }
    onChange = (name, value) => {
      let formErrors = { ...this.state.formErrors };
      const {  date, Gallons} = this.state;
      switch (name) {
        case "date":
          formErrors.date = value.length === 0 ? "* Required" : null;
          break;
        case "Gallons":
            formErrors.Gallons = value.length === 0 ? "* Required" : null;
            break;
        // case "Address":
        //   formErrors.Address = value.length === 0 ? "* Required" : null;
        //   break;
        // case "SuggestedPrice":
        //   formErrors.SuggestedPrice = value.length === 0 ? "* Required" : null;
        //   break;
        // case "TotalDue":
        //   formErrors.TotalDue = value.length === 0 ? "* Required" : null;
        //   break;
        default:
          break;
      }
      formErrors.valid = ((formErrors.date === null && date !== null) && (formErrors.Gallons === null && Gallons !== 0) ? null : "Incomplete! Please make sure all requirements are met.")
      this.setState({
        [name]: value,
        formErrors,
        valid: ( Gallons !== undefined && date !== undefined)
      });
      console.log(Gallons, "Valid : ", this.state.valid );
    }
    handleinitial = () => {
      // let formErrors = { ...this.state.formErrors };
      const { SuggestedPrice, TotalDue } = this.state;
      const {  due, suggested} = this.props.rateState;
      let info ={
        SuggestedPrice: SuggestedPrice===undefined ? suggested : SuggestedPrice,
        TotalDue: TotalDue===undefined ? due : TotalDue
      };
      this.setState({
        ...info,
        toggle: false,
        valid: true
      });
    }
    handleSubmit = (e) => 
    {
      e.preventDefault();
      let formErrors = { ...this.state.formErrors };
      let requests ={ ...this.props.Requests };
      const { date, Gallons, Address,  SuggestedPrice, TotalDue } = this.state;
      let info ={
        date: date===undefined ? requests.date : date,
        Gallons: Gallons===undefined ? requests.Gallons : Gallons,
        Address: Address===undefined ? requests.Address : Address,
        SuggestedPrice: SuggestedPrice===undefined ? requests.SuggestedPrice : SuggestedPrice,
        TotalDue: TotalDue===undefined ? requests.TotalDue : TotalDue
      };
      this.setState({
        ...info
      });
      if(formErrors.valid === null){
        this.props.addRequestAction(info);
        // this.setState({
        //   collapse: false,
        // }); 
        return(<Redirect to="/admin/index" />);
      }
    }
    handleGetPrice= (e) => 
    {
      const { date, Gallons, Address, formErrors,  } = this.state
      e.preventDefault();
      let info ={
        date: date===undefined ? moment(this.state.date).format("YYYY-MM-DDTHH:mm") : date,
        Gallons: Gallons===undefined ? 100 : Gallons,
        Address: Address===undefined ? this.props.profile.State : Address

      }
      console.log(info);
      this.setState({
        ...info,
        toggle: true
      });
      if(formErrors.valid === null){
        this.props.getRequestAction(info);
        this.props.history.push('/admin');
        // <Redirect to=t/>
      
      }
      


    }
    handleDateChange = date => {
      this.setState({date});
    };
  render() {
    const { profile, predicted, rateState } = this.props;
    const {  due, suggested} = this.props.rateState;
    if (predicted && !due){
      this.props.history.push('/admin/requestsForm');
    }
    // const { suggest, due }= this.props.rateState;
    console.log("Request form info", this.state, this.props);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
        
          <Modal isOpen={this.state.toggle} toggle={() => this.handleinitial()} backdrop="static" >
          <ModalHeader>Thank You {profile.UserName}</ModalHeader>
          <ModalBody>Let us know if you agree with the Pricing Methods ....</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleinitial()}>Got it!</Button>{' '}
            {/* <Button color="secondary" onClick={toggleAll}>All Done</Button> */}
          </ModalFooter>
          </Modal>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 text-center mb--2" mt="2">
                  <h2 className="my-4 text-center"> Quote Request Form </h2>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">                  
                  <Form onSubmit={this.handleSubmit} role="form">
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Fuel Quote Form</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Gallons Requested {this.state.formErrors.Gallons !== null && !this.state.Gallons ?  <small className="text-center text-muted text-red ">* required</small>: undefined}
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rateState.request !== null ? rateState.request.Gallons : 100}
                              id="input-amount"
                              placeholder={100}
                              type="number"
                              invalid={this.state.formErrors.Gallons !== null && !this.state.Gallons ? true : undefined}
                              required
                              label="Required"
                              style={this.state.formErrors.Gallons !== null && !this.state.Gallons ? ({borderBottom:"1mm solid #FB200A", borderRadius: "0.175rem", backgroundColor:"#FFFFFF", boxShadow: "0px 0px 1px 1px #FB200A" }): null}
                              onChange= {e=>{this.onChange("Gallons", e.target.value);}}
                              onMouseEnter= {e=>{this.onChange("Gallons", e.target.value);}}
                              onLoad={e =>{ console.log(" Address loaded data capture", e);}}
                            />
                            <FormFeedback invalid ></FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-date"
                            >
                              Delivery Date {this.state.formErrors.date !== null && !this.state.date ?  <small className="text-center text-muted text-red ">* required</small>: undefined}
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rateState.request !== null ? rateState.request.date : moment(this.state.date).format("YYYY-MM-DDTHH:mm")}
                              id="input-date"
                              placeholder="YYYY-MM-DDTHH:mm"
                              type="datetime-local"
                              invalid={this.state.formErrors.date !== null && !this.state.date ? true : undefined}
                              required
                              style={this.state.formErrors.date !== null && !this.state.date ? ({borderBottom:"1mm solid #FB200A", borderRadius: "0.175rem", backgroundColor:"#FFFFFF", boxShadow: "0px 0px 1px 1px #FB200A" }): null}
                              label="Required"
                              onChange= {e=>{this.onChange("date", e.target.value);}}
                              onMouseEnter={e=>{this.onChange("date", e.target.value);}}
                            />
                            <FormFeedback invalid></FormFeedback>
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
                              Delivery Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={profile.MainAddress+' '+profile.City+' '+profile.State+' '+profile.Zipcode}
                              id="input-address"
                              placeholder="Delivery Address"
                              disabled
                              onBeforeInput= {e =>{ console.log(" Address loaded data capture", e);}}
                              onLoad={e =>{ console.log(" Address loaded data capture", e);}}
                              type="text"
                              onMouseEnter={e=>{this.onChange("Address", this.props.profile.MainAddress);}}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row  className="text-center" style={{content: "text-center"}}>
                        <Col  className="text-center" style={{content: "text-center"}}>
                      <Button className="mt-4 " color="default" type="button" disabled={this.state.valid ? undefined : true} onClick={this.handleGetPrice} >
                        Get Price
                      </Button></Col></Row>
                      <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Pricing Module</h6>
                    {/* <div className="pl-lg-4"></div> */}
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Suggested Price
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              defaultValue={suggested ? suggested :"$ "+2000}
                              id="input-currency"
                              placeholder= {2000}
                              type="currency"
                              required
                              label="Required"
                              onBeforeInput= {e =>{ console.log(" Address loaded data capture", e);}}
                              onLoad={e =>{ console.log(" Address loaded data capture", e);}}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Total Amount Due
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              defaultValue={due ? due : "$ "+2000}
                              id="input-currency"
                              placeholder={1000}
                              type="currency"
                              required
                              label="Required"
                              onBeforeInput= {e =>{ console.log(" Address loaded data capture", e);}}
                              onLoad={e =>{ console.log(" Address loaded data capture", e);}}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="text-center" style={{content: "text-center"}} >
                        <Col className="text-center" style={{content: "text-center"}} >
                        {predicted ? <Button className="mt-4" color="default" type="submit" >Submit</Button>: undefined}
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />                    
                  </Form>
                </CardBody>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Request History</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Gallons</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Status</th>
                      <th scope="col">Users</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              1700 G
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$2,500 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          pending
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip731399078"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731399078"
                          >
                            2,652 G
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip491083084"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip491083084"
                          >
                            1,252 G
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip528540780"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip528540780"
                          >
                            952 G
                          </UncontrolledTooltip>
                          {/* <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip237898869"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip237898869"
                          >
                            Jessica Doe
                          </UncontrolledTooltip> */}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-warning"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Revisit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something Else
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/angular.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                                1,252 G
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$1,800 USD</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {/* <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip188614932"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip188614932"
                          >
                            
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip66535734"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip66535734"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip427561578"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip427561578"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip904098289"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip904098289"
                          >
                            Jessica Doe
                          </UncontrolledTooltip> */}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">100%</span>
                          <div>
                            <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/sketch.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                                1,052 G
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$3,150 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-danger" />
                          delayed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip707904950"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip707904950"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          {/* <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip353988222"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip353988222"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip467171202"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip467171202"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip362118155"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362118155"
                          >
                            Jessica Doe
                          </UncontrolledTooltip> */}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">72%</span>
                          <div>
                            <Progress
                              max="100"
                              value="72"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/react.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              React Material Dashboard
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$4,400 USD</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-info" />
                          on schedule
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip226319315"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip226319315"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          {/* <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip711961370"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip711961370"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip216246707"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip216246707"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip638048561"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip638048561"
                          >
                            Jessica Doe
                          </UncontrolledTooltip> */}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">90%</span>
                          <div>
                            <Progress
                              max="100"
                              value="90"
                              barClassName="bg-info"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/vue.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                                2,658 G
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>$2,200 USD</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip781594051"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip781594051"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          {/* <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip840372212"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip840372212"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip497647175"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip497647175"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip951447946"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip951447946"
                          >
                            Jessica Doe
                          </UncontrolledTooltip> */}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">100%</span>
                          <div>
                            <Progress
                              max="100"
                              value="100"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return{
    ...state,
    profile: state.firebase.profile,
    Requests: state.firebase,
    predicted: state.rateState.predicted,
    rateState: state.rateState
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    addRequestAction: (info) => dispatch( addRequestAction(info)),
    getRequestAction: (info) => dispatch( getRequestAction(info))
  }
};
export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([
  { collection: 'Requests' }
]))(Requester);
