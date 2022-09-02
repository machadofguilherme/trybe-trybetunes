import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleClick = async () => {
    const { infoMusic, getFavoriteFunc } = this.props;
    this.setState({ isLoading: true });
    await addSong(infoMusic);
    await getFavoriteFunc();
    this.setState({ isLoading: false });
  };

  render() {
    const { infoMusic, getFavorite } = this.props;
    const { isLoading } = this.state;

    return (
      <main>
        {
          /* Com a ajuda de Arthur Debiasi.
          Popularmente conhecido como Debian. */

          isLoading
            && <Loading />
        }

        <div>
          {/* Com a ajuda de Vinícius Bortoletto. */}
          <h5>
            { infoMusic.trackName }
            <label htmlFor="favorite">
              <input
                data-testid={ `checkbox-music-${infoMusic.trackId}` }
                type="checkbox"
                name="favorite"
                id="favorite"
                onChange={ this.handleClick }
                checked={ getFavorite.some((xablaida) => (
                  xablaida.trackId === infoMusic.trackId)) }
              />
              Favorita
            </label>
          </h5>
          <audio
            data-testid="audio-component"
            src={ infoMusic.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      </main>
    );
  }
}

MusicCard.propTypes = {
  getFavorite: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  getFavoriteFunc: PropTypes.func.isRequired,

  infoMusic: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
