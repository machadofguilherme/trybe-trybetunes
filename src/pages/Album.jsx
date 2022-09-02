import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Favorites from './Favorites';

export default class Album extends Component {
  state = {
    collection: [],
    artist: '',
    albumName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const response = await getMusics(id);
    const collection = response;
    const artist = collection[0].artistName;
    const albumName = collection[0].collectionName;

    this.setState({
      collection: [...collection],
      artist,
      albumName,
    });
  }

  render() {
    const { collection, artist, albumName } = this.state;

    return (
      <main>
        <Header />

        <div data-testid="page-album">
          <article>
            <h5 data-testid="artist-name">
              { artist }
            </h5>
            <h3 data-testid="album-name">
              { albumName }
            </h3>

            {
              // Com a ajuda de Vinícius Bortoletto.
              collection
                .filter((track) => track.trackName)
                .map((album) => (
                  <>
                    <MusicCard
                      key={ album.trackName }
                      infoMusic={ album }
                    />

                    <Favorites
                      key={ album.trackName }
                      infoMusic={ album }
                    />
                  </>
                ))
            }
          </article>
        </div>
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
