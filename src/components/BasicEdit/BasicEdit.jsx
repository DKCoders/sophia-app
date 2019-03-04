import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';

const P = withHandlers({
  onSaveComplete: ({ history, item, mainRoute }) => (redirectId = null) => {
    history.replace(`${mainRoute}/${redirectId || item._id}`);
  },
  onCancelClick: ({
    history, item, isNew, mainRoute,
  }) => () => {
    history.replace(`${mainRoute}${isNew ? '' : `/${item._id}`}`);
  },
});

const BasicEdit = ({
  item, onSaveComplete, isClone, isNew, onCancelClick, FormComponent, routeTitle,
}) => (
  <Grid container justify="center">
    <Grid item>
      <Typography variant="h2" align="center">{routeTitle}</Typography>
      {!item ? <CircularProgress /> : (
        <FormComponent
          initial={item}
          itemId={!isClone && !isNew ? item._id : null}
          onCancelClick={onCancelClick}
          onSaveComplete={onSaveComplete}
        />
      )}
    </Grid>
  </Grid>
);

BasicEdit.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  mainRoute: PropTypes.string.isRequired,
  routeTitle: PropTypes.string.isRequired,
  item: PropTypes.shape(),
  FormComponent: PropTypes.func.isRequired,
  onSaveComplete: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  isClone: PropTypes.bool,
  isNew: PropTypes.bool,
};

BasicEdit.defaultProps = {
  item: null,
  isClone: false,
  isNew: false,
};

export default attach(P)(BasicEdit);
