import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Hero,
  HeroBody,
  Container,
  Column,
  Title,
  Subtitle,
  Box,
  Image,
  Field,
  Control,
  Input,
  Button,
  Notification,
} from 'sophia-components';
import { compose, withStateHandlers, didSubscribe, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import Auth from '../../services/auth';

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
    <Notification danger>
      Username, Email and Password incorrect.
    </Notification>
  );
  return (
    <Hero
      light
      fullheight
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
      }}
    >
      <HeroBody>
        {redirect}
        <Container textCentered>
          <Column four offsetFour>
            <Title text="grey">Login</Title>
            <Subtitle text="grey">Please login to proceed.</Subtitle>
            <Box>
              <Image src="/static/img/sophia-logo.png" alt="Login img" ratio="2by1" style={{ marginBottom: 10 }} />
              <Field>
                <Control>
                  <Input
                    large
                    name="username"
                    onChange={onInputChange}
                    type="text"
                    placeholder="Your Username or Email"
                    value={username}
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    large
                    name="password"
                    onChange={onInputChange}
                    type="password"
                    placeholder="Your Password"
                    value={password}
                  />
                </Control>
              </Field>
              {errorNotification}
              <Button
                block
                info
                large
                fullwidth
                onClick={onLoginClick}
              >
                  Login
              </Button>
            </Box>
          </Column>
        </Container>
      </HeroBody>
    </Hero>
  );
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
