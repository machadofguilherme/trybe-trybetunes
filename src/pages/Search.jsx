import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;

    if (value >= 2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <main>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              placeholder="Nome do artista"
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />

            <button
              type="submit"
              disabled={ isDisabled }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </main>
    );
  }
}
