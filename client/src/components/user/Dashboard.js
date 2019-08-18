import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Dashboard = ({ user, message, onClick }) => {
   return (
      <Container
         style={{ height: "75vh" }}
         className="d-flex flex-column justify-content-center align-items-center"
      >
         <Row>
            <Col>
               <h2>Welcome {user.name ? user.name : ""}</h2>
            </Col>
         </Row>
         <Row>
            <Col>
               {message ? (
                  <span className="text-secondary">{message}</span>
               ) : (
                  <Button variant="outline-info" onClick={onClick}>
                     Get Info
                  </Button>
               )}
            </Col>
         </Row>
      </Container>
   );
};

Dashboard.propTypes = {
   message: PropTypes.string.isRequired,
   user: PropTypes.object.isRequired,
   onClick: PropTypes.func.isRequired
};

export default Dashboard;
