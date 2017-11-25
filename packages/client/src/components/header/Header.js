import React, { Component } from 'react';
import { css } from 'glamor';

class Header extends Component {
  goToIndex = () => this.props.history.push('/');

  render() {
    return [
      <nav
        key="header"
        {...styles.container}
      >
        <h1
          {...styles.title}
          onClick={this.goToIndex}
        >
          Readable
        </h1>
      </nav>,
      <div
        key="content"
        {...styles.content}
      >
        {this.props.children}
      </div>,
    ];
  }
}

const styles = {
  container: css({
    flex: 1,
    backgroundColor: '#6BABE8',
    boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(39, 113, 176, 0.46)',
    padding: 30,
    color: 'white',
  }),
  title: css({
    fontFamily: 'Open Sans',
    margin: 0,
    cursor: 'pointer',
  }),
  content: css({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  }),
};

export default Header;
