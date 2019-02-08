/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TableListCell from './components/ListCell';
import ListHeader from './components/ListHeader';

const styles = theme => ({
  root: {
    maxHeight: '90%',
    [theme.breakpoints.up('sm')]: {
      overflowY: 'auto',
    },
  },
});

const isFirstOrLast = (number, final) => (number === 0 || (number === final - 1));

const List = ({ classes, data, columns }) => {
  const emptyRow = (
    <TableRow>
      <TableCell colSpan={columns.length}>
        No results found.
      </TableCell>
    </TableRow>
  );
  return (
    <Grid container className={classes.root}>
      <Grid item xs sm={12} md={12}>
        <Table>
          <Hidden only={['xs', 'sm']}>
            <ListHeader columns={columns} />
          </Hidden>
          <TableBody>
            {data.length ? (
              data.map(row => (
                <TableRow key={row._id}>
                  {columns.map((col, idx) => (
                    /* eslint-disable react/no-array-index-key */
                    <TableListCell
                      key={`cell-${row._id}-${idx}`}
                      row={row}
                      hasPadding={isFirstOrLast(idx, columns.length)}
                      alignment={col.align || 'inherit'}
                      colData={col}
                    />
                  ))}
                </TableRow>
              ))
            ) : (
              emptyRow
            )}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

List.propTypes = {
  classes: PropTypes.shape().isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

List.defaultProps = {
  data: null,
};

export default withStyles(styles)(List);
