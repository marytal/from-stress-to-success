import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import TagFaces from 'material-ui/lib/svg-icons/image/tag-faces'
import IconButton from 'material-ui/lib/icon-button';

export default class Header extends Component {
  render() {
    return (
      <AppBar
        title="From Stress to Success"
        iconElementLeft={<IconButton><TagFaces /></IconButton>}
      >
      </AppBar>
    );
  }
}
