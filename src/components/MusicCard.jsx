import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  handleClick = async () => {
    const { infoMusic } = this.props;

    this.setState({ isLoading: true });
    await addSong(infoMusic);
    this.setState({ isLoading: false });
  };

  render() {
    const { infoMusic } = this.props;
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
          <h5>
            { infoMusic.trackName }
            <label htmlFor="favorite">
              <input
                data-testid={ `checkbox-music-${infoMusic.trackId}` }
                type="checkbox"
                name="favorite"
                id="favorite"
                onClick={ this.handleClick }
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
  infoMusic: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
