import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { fieldExtractor } from '../../../utils/helpers';

const styles = theme => ({
  noLineRow: {
    borderBottom: '0px',
  },
  spaceRow: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const ListCell = ({
  classes,
  row,
  hasPadding,
  alignment,
  colData,
}) => {
  const data = colData.field ? fieldExtractor(colData.field, row) : row;
  const cell = (
    <TableCell
      key={`row-${row._id}`}
      padding={hasPadding ? 'none' : 'dense'}
      align={alignment}
      className={`${classes.noLineRow} ${classes.spaceRow}`}
    >
      {colData.render ? (
        colData.render(data)
      ) : (
        data
      )}
    </TableCell>
  );
  return (
    colData.hiddenOnMobile ? (
      <Hidden only={['xs', 'sm']}>
        {cell}
      </Hidden>
    ) : (
      cell
    )
  );
};

ListCell.propTypes = {
  classes: PropTypes.shape().isRequired,
  row: PropTypes.shape().isRequired,
  colData: PropTypes.shape().isRequired,
  hasPadding: PropTypes.bool,
  alignment: PropTypes.string.isRequired,
};

ListCell.defaultProps = {
  hasPadding: false,
};

export default withStyles(styles)(ListCell);
