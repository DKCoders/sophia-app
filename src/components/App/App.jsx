import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Columns, Column, Container } from 'sophia-components';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import PrivateRoute from '../PrivateRoute';
import Login from '../../routes/Login';
import Dashboard from '../../routes/Dashboard';
import Brands from '../../routes/Brands';

const App = () => (
  <Fragment>
    <Navbar />
    <Container fluid>
      <Columns>
        <Column oneQuarter style={{ marginTop: 10 }}>
          <Sidebar />
        </Column>
        <Column>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/brands" component={Brands} />
        </Column>
      </Columns>
    </Container>
  </Fragment>
);

App.propTypes = {};

App.defaultProps = {};

export default App;

