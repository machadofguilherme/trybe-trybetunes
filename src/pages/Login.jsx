import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading';
import Search from './Search';

import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    isDisable: true,
    isLoading: false,
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const number3 = 3;

    this.setState({ [name]: value });

    if (value.length >= number3) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  handleClick = async (e) => {
    e.preventDefault();

    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ redirect: true });
  };

  render() {
    const { isDisable, isLoading, redirect } = this.state;

    return (
      redirect
        ? <Redirect to="/search" component={ Search } />
        : (
          <div data-testid="page-login">
            {
              isLoading
                ? <Loading />
                : (
                  <form>
                    <label htmlFor="name">
                      Usuário:

                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={ this.handleChange }
                        data-testid="login-name-input"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={ isDisable }
                      onClick={ this.handleClick }
                      data-testid="login-submit-button"
                    >
                      Entrar
                    </button>

                  </form>
                )
            }
          </div>
        )
    );
  }
}
