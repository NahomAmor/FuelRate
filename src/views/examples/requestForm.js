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
  CardTitle,
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
      console.log(SuggestedPrice, TotalDue, due, suggested )
      let info ={
        SuggestedPrice: suggested,
        TotalDue: due
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
        return(<Redirect to="/admin/requestForm" />);
        // <Redirect to=t/>
      
      }
      


    }
    handleDateChange = (dates, uid) => {
      let items = []
      for (const property in dates) {
        console.log(`${property}: ${dates[property]}`, uid);
        if(property === uid){
          const { RequestHistory } = dates[property];
          // const data = dates[property];
          console.log("gotcha : ", RequestHistory);
          // return dates[property].map((prop, key) => {
          //   if(this.props.firebase.auth.uid === prop){console.log("HIstory: ", prop, key);}
          for (const data in RequestHistory) {
            const { Gallons, date, SuggestedPrice, TotalDue, Address, uid, time } = RequestHistory[data];
            items.push(
                          <tr><th scope="row"><Media className="align-items-center"><a className="avatar rounded-circle mr-3" href="#pablo" onClick={e => e.preventDefault()}><img alt="..." src={require("assets/img/theme/angular.jpg")} /> </a> <Media> <span className="mb-0 text-sm"> {Gallons} G </span> </Media></Media></th>
                            <td> ${TotalDue} USD</td>
            <td><Badge color="" className="badge-dot"><i className="bg-success" />$ {SuggestedPrice} /Gallon</Badge></td>
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
                                    src={require("assets/img/theme/profile.png")}
                                  />
                                </a>
                              </div>
                            </td>
                            <td><div className="d-flex align-items-center"><span className="mr-2">100%</span><div><Progress max="100" value="100" barClassName="bg-success"/></div></div></td>
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
                          );
              
            } 
                            
                        // })
        }
      } return items;
        
    };
  render() {
    const { profile, predicted, rateState } = this.props;
    const {  due, suggested, Requests, uid, formula} = this.props;
    if (predicted && !due){
      this.props.history.push('/admin/requestsForm');
    }
    // const { suggest, due }= this.props.rateState;
    console.log("Request form info", this.state, this.props, "Requests:::", Requests);
    return (
      <>
        <Header items={Requests && suggested ? this.handleDateChange(Requests, uid): undefined} />
        {/* Dark table */}
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
        
          <Modal isOpen={this.state.toggle} toggle={() => this.handleinitial()} backdrop="static" >
          <ModalHeader className="text-center" ><h1>Thank You {profile.UserName} </h1></ModalHeader>
          <ModalBody><Card className="text-center border-0"><CardHeader className="text-center border-0" >Here are the Facts: </CardHeader><CardTitle className="text-center border-0"> Your Quote Lead to a suggested price of <span className="text-center text-success">$ {suggested} </span> Per Gallon <br/> Thus your total budget is: <span className="text-center text-success">$ {due} </span>USD </CardTitle><CardBody className="text-center border-0">Hope you agree with the Pricing Methods! <br/> Click Submit to Add Request to your History log. </CardBody></Card></ModalBody>
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
                              value={suggested ? parseFloat(suggested) :"$ "+2000}
                              id="input-currency"
                              // placeholder= {2000}
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
                              value={due ? due : "$ "+2000}
                              id="input-currency"
                              // placeholder={1000}
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
          
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  const Requests = state.firestore.data.Requests
  return{
    ...state,
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    histo: state.firestore.data.Requests,
    // Requester,
    Requests,
    predicted: state.rateState.predicted,
    rateState: state.rateState,
    due: state.rateState.due,
    suggested: state.rateState.suggested,
    formula: state.rateState.suggested
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    addRequestAction: (info) => dispatch( addRequestAction(info)),
    getRequestAction: (info) => dispatch( getRequestAction(info))
  }
};
export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(props => { return[
  { collection: 'Requests', doc: props.uid, subcollections: [{
    collection: 'RequestHistory'
}]}
]}))(Requester);
