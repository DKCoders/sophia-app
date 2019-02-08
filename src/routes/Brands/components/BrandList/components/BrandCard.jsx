/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const StyledCardHeader = withStyles({
  content: { minWidth: 0 },
})(CardHeader);

const BigAvatar = withStyles({
  root: {
    height: 64,
    width: 64,
  },
})(Avatar);

const cardHeaderTypographyProps = { noWrap: true, variant: 'h6' };

const P = withHandlers({
  onMoreButtonClick: ({ brand, onMoreClick }) => (event) => {
    if (onMoreClick) onMoreClick(brand, event);
  },
});

const BrandCard = ({ brand, onMoreButtonClick }) => (
  <Card>
    <StyledCardHeader
      avatar={(<BigAvatar><img src={brand.logo} alt={`${brand.name} logo`} /></BigAvatar>)}
      title={brand.name}
      subheader={brand.code}
      action={(<IconButton onClick={onMoreButtonClick}><MoreVertIcon /></IconButton>)}
      titleTypographyProps={cardHeaderTypographyProps}
    />
  </Card>
);

BrandCard.propTypes = {
  brand: PropTypes.shape().isRequired,
  onMoreClick: PropTypes.func,
  onMoreButtonClick: PropTypes.func.isRequired,
};

BrandCard.defaultProps = {
  onMoreClick: null,
};

export default attach(P)(BrandCard);
