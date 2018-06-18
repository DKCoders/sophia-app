import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'sophia-components';
import { withState, withHandlers, compose } from 'proppy';
import { attach } from 'proppy-react';

const style = {
  boxShadow: 'inset 0 1px 2px rgba(10, 10, 10, 0.1)',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  background: 'inherit',
  border: 'inherit',
};

class EditInput extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <input {...this.props} ref={(input) => { this.input = input; }} />
    );
  }
}

const withEditable = (Comp, { inputClassName, inputStyle = {} } = {}) => {
  const P = compose(
    withState('hovered', 'setHovered', false),
    withState('editable', 'setEditable', null),
    withState('saving', 'setSaving', false),
    withHandlers({
      startSaveRequest: props => async () => {
        if (!props.saving) {
          props.setSaving(true);
          try {
            await new Promise((resolve, reject) =>
              props.onSaveClick(props.editable, props.data, resolve, reject));
            props.setSaving(false);
            props.setEditable(null);
          } catch (err) {
            props.setSaving(false);
          }
        }
      },
    }),
  );

  const Hoc = ({
    children,
    hovered,
    setHovered,
    editable,
    setEditable,
    inputClassName: additionaInputClassName,
    startSaveRequest,
    saving,
    ...props
  }) => {
    const editIcon = !hovered || editable !== null ? null : (
      <Icon
        key="edit-icon"
        icon="fas fa-edit"
        small
        style={{ marginLeft: 20, cursor: 'pointer' }}
        onClick={() => setEditable(children)}
      />
    );
    const saveIcon = editable === null ? null : (
      <Icon
        key="save-icon"
        icon="fas fa-check"
        style={{ marginLeft: 20, cursor: !saving ? 'pointer' : 'not-allowed' }}
        onClick={startSaveRequest}
      />
    );
    const cancelIcon = editable === null ? null : (
      <Icon
        key="cancel-icon"
        disabled={saving}
        icon="fas fa-ban"
        style={{ marginLeft: 20, cursor: 'pointer' }}
        onClick={() => setEditable(null)}
      />
    );
    return editable === null ? (
      <Comp {...props} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {children}
        {editIcon}
      </Comp>
    ) : (
      <Comp {...props} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <EditInput
          className={[inputClassName, additionaInputClassName].join(' ')}
          style={{ ...style, ...inputStyle }}
          type="text"
          value={editable}
          onChange={({ target: { value } }) => setEditable(value)}
          disabled={saving}
        />
        {saveIcon}
        {cancelIcon}
      </Comp>
    );
  };
  Hoc.propTypes = {
    children: PropTypes.string.isRequired,
    ...Comp.propTypes,
  };
  Hoc.defaultProps = { ...Comp.defaultProps };
  return attach(P)(Hoc);
};


export default withEditable;
