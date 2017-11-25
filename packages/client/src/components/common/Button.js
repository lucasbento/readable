import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Icon from './Icon';

class Button extends PureComponent {
  render() {
    const {
      styleType = 'default',
      label,
      children,
      icon,
      style,
      iconStyle,
      disabled,
      ...props,
    } = this.props;

    if (styleType === 'default') {
      return (
        <button
          {...styles.container}
          {...style}
          disabled={disabled}
          {...props}
        >
          {icon && (
            <Icon
              name={icon}
              {...iconStyle}
            />
          )}
  
          {label && (
            <span {...styles.label}>{label.toUpperCase()}</span>
          )}
  
          {children}
  
          {!disabled && (
            <div className={`rippleJS ${icon ? 'fill' : ''}`} />
          )}
        </button>
      );
    }

    return (
      <button
        {...styles.containerFloat}
        {...style}
        disabled={disabled}
        {...props}
      >
        {icon && (
          <Icon
            name={icon}
            {...styles.iconFloat}
            {...iconStyle}
          />
        )}

        {!disabled && (
          <div className={`rippleJS ${icon ? 'fill' : ''}`} />
        )}
      </button>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: 35,
    padding: 10,
    borderRadius: 0,
    height: 60,
    justifyContent: 'center',
    width: 60,
    cursor: 'pointer',
  }),
  containerFloat: css({
    position: 'fixed',
    bottom: 25,
    right: 25,
    borderRadius: '50%',
    width: 60,
    height: 60,
    outline: 'none',
    borderWidth: 0,
    cursor: 'pointer',
  }),
  label: css({
    fontFamily: 'Open Sans',
    fontSize: 15,
  }),
  iconFloat: css({
    fontSize: 30,
  }),
};

export default Button;
