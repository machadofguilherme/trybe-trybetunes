import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    username: '',
    isLoading: true,
  };

  async componentDidMount() {
    const request = await getUser();
    const userName = request.name;
    this.setState({ username: userName });

    if (userName.length > 0) this.setState({ isLoading: false });
  }

  render() {
    const { username, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {
          isLoading
            ? <Loading />
            : (
              <p data-testid="header-user-name">
                Nome de usuário:
                { username }
              </p>
            )
        }

        <nav>
          <Link to="/search" data-testid="link-to-search">
            Pesquisa
          </Link>

          <Link to="/favorites" data-testid="link-to-favorites">
            Músicas favoritas
          </Link>

          <Link to="/profile" data-testid="link-to-profile">
            Meu perfil
          </Link>
        </nav>
      </header>
    );
  }
}
