import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../form/Input";

const Login = ({ loading, user, onChange, onBlur, onSubmit }) => {
   const { email, password, errors } = user;
   return (
      <Container>
         <Row>
            <Col className="mx-auto" sm={11} md={7} lg={5}>
               <Card className="my-4">
                  <Form
                     noValidate
                     onSubmit={onSubmit}
                     className="p-sm-3 p-xs-1"
                  >
                     <Card.Body>
                        <Card.Title
                           as="h3"
                           className="text-center text-dark mb-4 mt-2"
                        >
                           Login
                        </Card.Title>
                        <Input
                           name="email"
                           type="email"
                           placeholder="Enter Email"
                           value={email}
                           onChange={onChange}
                           onBlur={onBlur}
                           text={{
                              module: "login",
                              label: "Email",
                              error: errors.email
                           }}
                        />
                        <Input
                           name="password"
                           type="password"
                           placeholder="Enter Password"
                           value={password}
                           onBlur={onBlur}
                           onChange={onChange}
                           text={{
                              module: "login",
                              label: "Password",
                              error: errors.password
                           }}
                        />
                        <Button
                           variant="primary"
                           type="submit"
                           className="mt-3"
                           disabled={loading}
                        >
                           Submit
                        </Button>

                        <Card.Text className="mt-2">
                           Don't have an account?{" "}
                           <Link to={"/signup"}>SignUp</Link>
                        </Card.Text>
                     </Card.Body>
                  </Form>
               </Card>
            </Col>
         </Row>
      </Container>
   );
};

Login.propTypes = {
   onSubmit: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   onBlur: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   loading: PropTypes.bool.isRequired
};

export default Login;
