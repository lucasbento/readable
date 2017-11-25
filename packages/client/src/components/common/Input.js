import React, { PureComponent } from 'react';
import { css } from 'glamor';

class Input extends PureComponent {
  handleChange = ({ target }) =>
    this.props.onChange({
      name: target.name,
      value: target.value,
    });

  render() {
    const { label, ...props } = this.props;

    return (
      <div {...styles.container}>
        <label {...styles.label}>
          {label}
        </label>

        <input
          {...styles.input}
          {...props}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  label: css({
    marginRight: 10,
  }),
  input: css({
    fontFamily: 'Open Sans',
    marginBottom: 5,
  }),
};

export default Input;
