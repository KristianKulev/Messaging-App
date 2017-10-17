/**
*
* PureCompCss
*
*/

import React from 'react';

import styles from './styles.scss';

class PureCompCss extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="pure-comp-css-component">PureCompCss</div>
    );
  }
}

PureCompCss.propTypes = {

};

export default PureCompCss;
