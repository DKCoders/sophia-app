import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import RouteTitle from '../RouteTitle';

const styles = () => ({
  logo: {
    height: 200,
    width: 200,
  },
});

const BasicInfo = ({
  classes, routeTitle, avatarSrc, avatarAlt, title, subtitle, additionalNodes,
}) => (
  <>
    <RouteTitle title={routeTitle} />
    {!!avatarSrc && <Avatar alt={avatarAlt} src={avatarSrc} className={classes.logo} />}
    <Typography variant="h4">{title}</Typography>
    {!!subtitle && <Typography variant="h3">{subtitle}</Typography>}
    {additionalNodes}
  </>
);

BasicInfo.propTypes = {
  routeTitle: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  additionalNodes: PropTypes.node,
};

BasicInfo.defaultProps = {
  subtitle: null,
  avatarSrc: null,
  avatarAlt: null,
  additionalNodes: null,
};

export default withStyles(styles)(BasicInfo);
