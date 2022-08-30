import React, { Component } from 'react';

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

      isLoading
        ? <Loading />
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">
              Nome de usuário:
              { username }
            </p>
          </header>
        )
    );
  }
}
