import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const ListHeader = ({ columns }) => (
  <TableHead>
    <TableRow>
      {columns.map((col, idx) => (
        <TableCell
          key={`Header-${col.header}`}
          padding={idx === 0 ? 'none' : 'dense'}
          align={col.align || 'center'}
        >
          { col.header }
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

ListHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ListHeader.defaultProps = { };

export default ListHeader;
