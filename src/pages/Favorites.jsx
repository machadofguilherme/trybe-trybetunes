import React, { Component } from 'react';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-favorites">
          Favoritos.
        </div>
      </main>
    );
  }
}
