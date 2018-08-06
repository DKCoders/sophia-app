import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Callout, Intent, Card, Classes, InputGroup, Button } from '@blueprintjs/core';
import { Container, Column, Columns, Image } from 'sophia-components';
import { compose, withStateHandlers, didSubscribe, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import Auth from '../../services/auth';
import logo from '../../assets/img/sophia-logo.png';

const initialState = {
  isLogged: false, username: '', password: '', error: false,
};
const stateHandlers = {
  onInputChange: () => ({ target: { name, value } }) => ({ [name]: value }),
  setError: () => () => ({ username: '', password: '', error: true }),
  checkToken: () => () => {
    if (Auth.getToken()) {
      return { isLogged: true };
    }
    return {};
  },
};
const handlers = {
  onLoginClick: ({
    checkToken,
    setError,
    username,
    password,
  }) => async () => {
    if (await Auth.login({ username, password })) {
      checkToken();
    } else {
      setError();
    }
  },
};

const P = compose(
  withStateHandlers(initialState, stateHandlers),
  withHandlers(handlers),
  didSubscribe(({ checkToken }) => checkToken()),
);

const Login = ({
  isLogged, username, password, error, onLoginClick, onInputChange,
}) => {
  const redirect = !isLogged ? null : <Redirect to="/" />;
  const errorNotification = !error ? null : (
    <Callout intent={Intent.DANGER}>
      Username, Email and Password incorrect.
    </Callout>
  );
  const nodes = (<div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
    }}
  >
    {redirect}
    <Container>
      <div className="login-content">
        <Columns>
          <Column four offsetFour className={Classes.RUNNING_TEXT}>
            <Card>
              <Image src={logo} alt="Login img" ratio="2by1" style={{ marginBottom: 10 }} />
              <InputGroup
                className="login-input"
                name="username"
                placeholder="Your username or email"
                large
                onChange={onInputChange}
                value={username}
              />
              <InputGroup
                className="login-input"
                name="password"
                type="password"
                placeholder="Your password"
                large
                onChange={onInputChange}
                value={password}
              />
              {errorNotification}
              <Button
                className="login-button"
                onClick={onLoginClick}
                text="Login"
                intent={Intent.PRIMARY}
                fill
              />
            </Card>
          </Column>
        </Columns>
      </div>
    </Container>
  </div>);
  return ReactDOM.createPortal(nodes, document.getElementById('portal'));
};

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default attach(P)(Login);
