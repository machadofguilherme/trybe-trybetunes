import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-search">
          Busca.
        </div>
      </main>
    );
  }
}
