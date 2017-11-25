import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Icon from './Icon';

class Select extends PureComponent {
  handleChange = ({ target }) =>
    this.props.onChange({
      name: target.name,
      value: target.value,
    });

  render() {
    const { label, options, ...props } = this.props;

    return (
      <div {...styles.container}>
        <label {...styles.label}>
          {label}
        </label>

        <select
          ref={ref => this.select = ref}
          {...styles.select}
          {...props}
          onChange={this.handleChange}
        >
          {options.map(({ value, label }, index) => (
            <option
              key={`select-${index}`}
              value={value}
              children={label}
            />
          ))}
        </select>

        <Icon
          name="arrow_drop_down"
          {...styles.icon}
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
    position: 'relative',
  }),
  label: css({
    marginRight: 10,
  }),
  select: css({
    fontFamily: 'Open Sans',
    flex: 1,
    fontSize: 20,
    borderRadius: 0,
    border: '1px solid #CCC',
    backgroundColor: 'transparent',
    padding: 10,
    appearance: 'none',
    zIndex: 1,
  }),
  icon: css({
    position: 'absolute',
    right: 10,
  }),
};

export default Select;
