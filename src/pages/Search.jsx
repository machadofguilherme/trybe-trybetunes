import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    isDisabled: true,
    keyword: '',
    isLoading: false,
    data: [],
    error: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;

    if (value.length >= 2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { data } = this.state;

    const input = document.querySelector('input');
    const artist = input.value;

    this.setState({
      keyword: artist,
      isLoading: true,
    });

    const response = await searchAlbumsAPI(artist);

    this.setState({
      isLoading: false,
      data: response,
    });

    if (data.length === 0) {
      this.setState({
        error: 'Nenhum álbum foi encontrado',
      });
    }

    input.value = '';
    return artist;
  };

  render() {
    const { isDisabled, isLoading, keyword, data, error } = this.state;

    const form = (
      <form>
        <input
          type="text"
          autoComplete="off"
          placeholder="Nome do artista"
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />

        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClick }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
    );

    return (
      <main>
        <Header />
        <div data-testid="page-search">

          {
            isLoading
              ? <Loading />
              : form
          }

          <section>
            {
              data.length > 0
                && (
                  <p>
                    { `Resultado de álbuns de: ${keyword}` }
                  </p>
                )
            }

            { data.length === 0 && <p>{ error }</p> }

            {
              data.map((album) => (

                <Link
                  key={ album.collectionId }
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <article>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <h2>{album.collectionName}</h2>
                    <p>{album.artistName}</p>
                  </article>
                </Link>
              ))
            }
          </section>
        </div>
      </main>
    );
  }
}
