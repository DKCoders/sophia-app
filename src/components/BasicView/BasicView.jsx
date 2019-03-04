/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BasicInfo from '../BasicInfo';

const BasicView = ({
  item,
  mainRoute,
  routeTitle,
  additionalNodes,
  properties: {
    title, subtitle, avatarSrc, avatarAlt,
  },
}) => (!item ? null : (
    <>
      <IconButton component={Link} to={mainRoute}><ArrowBackIcon /></IconButton>
      <BasicInfo
        routeTitle={routeTitle}
        avatarSrc={item[avatarSrc]}
        avatarAlt={item[avatarAlt]}
        title={item[title]}
        subtitle={item[subtitle]}
        additionalNodes={!!additionalNodes && additionalNodes(item)}
      />
      <Fab color="secondary" aria-label="Edit" component={Link} to={`${mainRoute}/${item._id}/edit`}>
        <EditIcon />
      </Fab>
    </>
));

BasicView.propTypes = {
  item: PropTypes.shape(),
};

BasicView.defaultProps = {
  item: null,
};

export default BasicView;
