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
import { useLocation } from "react-router-dom";

const Signup = () => {
  const location = useLocation();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [notMatchError, setNoMatchError] = useState<string>("");
  const { username, password, password2 } = inputs;

  const { from } = location.state || { from: ROUTES.Index.path };

  const setRePassword = (value: string) => {
    if (value === inputs?.password) {
      setConfirmPassword(value);
    } else {
      setNoMatchError("Password didn't matched.");
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setInputs((inputs: any) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitted(true);

    authService
      .register({
        ...inputs,
      })
      .then((res) => {
        alertService.success(res.detail, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
        setSubmitted(false);
        window.location.href = from;
      })
      .catch((err) => {
        alertService.error(err, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
        setSubmitted(false);
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
                  <h1 className="mb-3">Sign Up to</h1>
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
                  <Form.Group id="password2" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type={showRePassword ? "text" : "password"}
                        name="password2"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                      />
                      <InputGroup.Text>
                        <Button
                          disabled={showRePassword}
                          onClick={() => setShowRePassword(!showRePassword)}
                        >
                          Show
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>

                    {submitted && !password2 && (
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    )}
                  </Form.Group>
                  <button
                    type="submit"
                    className="button small cursor-pointer w-100"
                  >
                    Create account
                  </button>
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
export default Signup;
