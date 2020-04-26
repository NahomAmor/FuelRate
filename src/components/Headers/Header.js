import React from "react";

// reactstrap components
import { Card, Table, Container, Row, CardHeader } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
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
                      <th scope="col">Total Due</th>
                      <th scope="col">Suggested Price</th>
                      <th scope="col">Users</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.items}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
