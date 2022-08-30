import React, { Component } from 'react';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-profile-edit">
          Editar perfil.
        </div>
      </main>
    );
  }
}
