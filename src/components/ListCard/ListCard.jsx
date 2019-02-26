/* eslint-disable */
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

const StyledCard = withStyles({
  root: {
    cursor: 'pointer',
  },
})(Card);

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
  onClickCard: ({ item, onClick }) => (event) => {
    if (onClick) onClick(item, event);
  },
  onMoreButtonClick: ({ item, onMoreClick }) => (event) => {
    event.stopPropagation();
    if (onMoreClick) onMoreClick(item, event);
  },
});

const ListCard = ({
  title, subtitle, avatarSrc, avatarAlt, onMoreButtonClick, onClickCard, onClick, onMoreClick,
}) => {
  const CardComponent = !onClick ? Card : StyledCard;
  return (
    <CardComponent onClick={onClickCard}>
      <StyledCardHeader
        avatar={avatarSrc && (<BigAvatar><img src={avatarSrc} alt={avatarAlt} /></BigAvatar>)}
        title={title}
        subheader={subtitle}
        action={(!!onMoreClick && <IconButton onClick={onMoreButtonClick}><MoreVertIcon /></IconButton>)}
        titleTypographyProps={cardHeaderTypographyProps}
      />
    </CardComponent>
  );
};

ListCard.propTypes = {
  item: PropTypes.shape().isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  avatarSrc: PropTypes.string,
  avatarAlt: PropTypes.string,
  onClickCard: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onMoreClick: PropTypes.func,
  onMoreButtonClick: PropTypes.func.isRequired,
};

const dummyFunc = () => {};
ListCard.defaultProps = {
  subtitle: null,
  action: null,
  avatarSrc: null,
  avatarAlt: null,
  onClick: dummyFunc,
};

export default attach(P)(ListCard);
