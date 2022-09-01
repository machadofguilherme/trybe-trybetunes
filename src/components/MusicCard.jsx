import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { infoMusic } = this.props;

    return (
      <div>
        <h5>
          {
            infoMusic.trackName
          }
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
    );
  }
}

MusicCard.propTypes = {
  infoMusic: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
  }).isRequired,
};
