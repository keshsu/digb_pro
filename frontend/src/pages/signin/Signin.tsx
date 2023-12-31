import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  FormCheck,
  Container,
  InputGroup,
  Button,
  Card,
} from "react-bootstrap";

import Alert from "components/Alert/Alert";

import { alertService } from "services/alertService";
import { authService } from "services/authService";
import { ROUTES } from "constants/routes";
import { Link, useLocation } from "react-router-dom";
import { history } from "utils/history";

const Signin = () => {
  const location = useLocation();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const { username, password } = inputs;

  const { from } = location.state || { from: ROUTES.Index.path };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setInputs((inputs: any) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitted(true);

    authService
      .login(username, password)
      .then((user: any) => {
        if (user.key) {
          localStorage.clear();
          localStorage.setItem("token", user.key);
          alertService.success("Login Successfully", {
            keepAfterRouteChange: true,
            autoClose: true,
          });
          window.location.href = from;
        } else {
          // setInputs("");
          localStorage.clear();
        }
      })
      .catch(() => {
        alertService.error("Invalid Email or Password", {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      });
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <main>
      <section
        className="signin-wrapper d-flex align-items-center"
        style={{
          height: "100vh",

          backgroundImage: `url('https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-tax-form-of-state-government-taxation-with-forms-png-image_4966178.png'), url('https://www.w3schools.com/images/background_in_space.gif')`,
          backgroundRepeat: "no-repeat, repeat",
          backgroundPosition: "right bottom, center center",
          // backgroundSize: "100%, 100%",
        }}
      >
        <Container>
          <Row className="justify-content-center bg-top">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <Card className="custom-card signin-card rounded p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h1 className="mb-3">Sign in to</h1>
                  <h3>Digb Taxation Process</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="username"
                      />
                    </InputGroup>
                    {submitted && !username && (
                      <div className="invalid-feedback">
                        Email Address is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <InputGroup.Text>
                        <Button
                          disabled={passwordShown}
                          onClick={togglePasswordVisiblity}
                        >
                          Show
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>

                    {submitted && !password && (
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                    </div>
                  </Form.Group>
                  <button
                    type="submit"
                    className="button small cursor-pointer w-100"
                  >
                    Sign in
                  </button>
                  <p className="text-center my-2">
                    Don't have an account?
                    <Link
                      to={ROUTES.Register.path}
                      className="ms-2 text-primary cursor-pointer"
                    >
                      Register
                    </Link>
                  </p>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <Alert />
    </main>
  );
};
export default Signin;
