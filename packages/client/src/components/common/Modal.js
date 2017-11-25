import React, { PureComponent } from 'react';
import { css } from 'glamor';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class Modal extends PureComponent {
  render() {
    const { show, ...props } = this.props;

    if (!show) {
      return null;
    }

    return (
      <ModalContainer onClose={props.onClose}>
        <ModalDialog
          {...styles.container}
          {...props}
        />
      </ModalContainer>
    );
  }
}

const styles = {
  container: css({
    fontFamily: 'Open Sans',
    display: 'flex',
    flexDirection: 'column',
  }),
};

export default Modal;
