import React, { Component } from 'react';

import Lists from './list/Lists';
import mobxify from './hoc/mobxify';

class Main extends Component {
  componentDidMount() {
    const { listsStore: store } = this.props;
    store.load();
  }

  render() {
    return (
      <div className="layout">
        <div className="layout-content">
          <Lists />
        </div>
      </div>
    );
  }
}


export default mobxify('listsStore')(Main);
