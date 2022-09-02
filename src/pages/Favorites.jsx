import React, { Component } from 'react';

import Loading from '../components/Loading';
import Header from '../components/Header';

import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    isLoading: true,
    favorites: [],
    click: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: false });
    const myFavorites = await getFavoriteSongs();
    this.setState({ favorites: myFavorites });
  }

  handleChange = ({ target }) => {
    const { type } = target;

    const value = type === 'checkbox'
      && target.checked;

    this.setState({ click: value });
  };

  // Como obter as informações do álbum?
  handleClick = async () => {
    this.setState({ isLoading: true });
    await addSong();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, favorites, click } = this.state;
    console.log(favorites);

    return (
      <main>
        <Header />
        <div data-testid="page-favorites">

          { isLoading && <Loading /> }

          {
            favorites.map((favorite) => (
              <section key={ favorite.trackId }>
                <h5>
                  { favorite.trackName }
                  <label htmlFor="favorite">
                    <input
                      data-testid={ `checkbox-music-${favorite.trackId}` }
                      type="checkbox"
                      name="favorite"
                      id="favorite"
                      checked={ click }
                      onChange={ this.handleChange }
                      onClick={ this.handleClick }
                    />
                    Favorita
                  </label>
                </h5>
                <audio
                  data-testid="audio-component"
                  src={ favorite.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
              </section>
            ))
          }
        </div>
      </main>
    );
  }
}
