import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'sophia-components';
import { withState, withHandlers, compose } from 'proppy';
import { attach } from 'proppy-react';

const style = {
  background: 'none',
  border: 'none',
  width: 'auto',
  maxWidth: 'none',
  boxShadow: 'inset 0 1px 2px rgba(10, 10, 10, 0.1)',
  marginBottom: 'inherit',
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

const withEditIcon = (Comp, { inputClassName, inputStyle = {} } = {}) => {
  const P = compose(
    withState('hovered', 'setHovered', false),
    withState('editable', 'setEditable', null),
    withState('saving', 'setSaving', false),
    withHandlers({
      startSaveRequest: props => async () => {
        props.setSaving(true);
        try {
          const result = await props.onSaveClick(props.editable);
          if (result) {
            props.setSaving(false);
            props.setEditable(null);
          } else {
            props.setSaving(false);
          }
        } catch (err) {
          props.setSaving(false);
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
    const element = editable === null ? children : (
      <EditInput
        className={[inputClassName, additionaInputClassName].join(' ')}
        style={{ ...style, ...inputStyle }}
        type="text"
        value={editable}
        onChange={({ target: { value } }) => setEditable(value)}
        disabled={saving}
      />
    );
    const editIcon = !hovered || editable !== null ? null : (
      <Icon
        icon="fas fa-edit"
        style={{ marginLeft: 20, cursor: 'pointer' }}
        onClick={() => setEditable(children)}
      />
    );
    const saveIcon = editable === null ? null : (
      <Icon
        disabled={saving}
        icon="fas fa-save"
        style={{ marginLeft: 20, cursor: 'pointer' }}
        onClick={startSaveRequest}
      />
    );
    const cancelIcon = editable === null ? null : (
      <Icon
        disabled={saving}
        icon="fas fa-cancel"
        style={{ marginLeft: 20, cursor: 'pointer' }}
        onClick={() => setEditable(null)}
      />
    );
    return (
      <Comp {...props}>
        <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {element}
          {editIcon}
          {saveIcon}
          {cancelIcon}
        </span>
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


export default withEditIcon;
