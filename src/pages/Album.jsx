import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-album">
          Álbum.
        </div>
      </main>
    );
  }
}
