import React, { Component } from 'react';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-profile">
          Perfil.
        </div>
      </main>
    );
  }
}
