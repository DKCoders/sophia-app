import React, { Component } from 'react';
import { render } from 'react-dom';

let resolve;
let reject;
const asService = ({
  activeProp,
  resolveProp,
  rejectProp,
  forceResolveOnReject = false,
  rejectValue = null,
  resolveValue,
} = {}) => (Comp) => {
  class AsService extends Component {
    static create(props = {}) {
      const containerElement = document.createElement('div');
      document.body.appendChild(containerElement);
      return render(<AsService createProps={props} />, containerElement);
    }

    constructor(props) {
      super(props);
      this.props = props;

      this.state = {
        isOpen: false,
        innerProps: {},
      };

      this.handleCancel = this.handleCancel.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.show = this.show.bind(this);
    }

    handleCancel() {
      this.setState({ isOpen: false });
      if (forceResolveOnReject) {
        resolve(rejectValue);
      } else {
        reject(rejectValue);
      }
    }

    handleConfirm(...params) {
      this.setState({ isOpen: false });
      if (resolveValue !== undefined) {
        resolve(resolveValue);
      } else {
        resolve(...params);
      }
    }

    show(props = {}) {
      const { createProps } = this.props;
      const innerProps = { ...createProps, ...props };
      this.setState({ isOpen: true, innerProps });
      return new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
    }

    render() {
      const { isOpen, innerProps } = this.state;
      const compProps = {
        [activeProp]: isOpen,
        [resolveProp]: this.handleConfirm,
        [rejectProp]: this.handleCancel,
        ...innerProps,
      };
      return (
        <Comp {...compProps} />
      );
    }
  }

  AsService.propTypes = {};

  AsService.defaultProps = {};

  return AsService;
};


export default asService;
