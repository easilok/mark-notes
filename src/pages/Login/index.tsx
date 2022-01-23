import React, { useState } from 'react';
import { Mail, Lock } from 'react-feather';

import { LoginCredentials } from '../../types';
import '../../styles/forms.scss';
import './login.scss';

interface LoginProps {
  onLogin: (authData: LoginCredentials) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputChangeHandler = (
    input: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (input === 'email') {
      setEmail(event.target.value);
    }
    if (input === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      username: email,
      password: password,
    });
  };

  return (
    <div className="container login">
      <div>
        <header className="login__header">
          <h1 className="title">Mark Notes</h1>
        </header>
        <div className="login__panel">
          {/* <section className="login__oauth">
            <h2 className="subtitle">Log In</h2>
            <button className="button is-info">Use Google Account</button>
          </section> 
          <section className="login__separator">
            <div className="text-separator">
              <span>Or</span></div>
          </section>
          */}
          <section className="login__credentials">
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="label has-text-grey" htmlFor="email">
                  Email Address
                </label>
                <p className="form-control has-icons-left">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={inputChangeHandler.bind(this, 'email')}
                  />
                  <span className="icon is-small is-left">
                    <Mail />
                  </span>
                  {/*
                <span className="icon is-small is-right">
                  <Check />
                </span>
                */}
                </p>
              </div>
              <div className="form-group">
                <label className="label has-text-grey" htmlFor="password">
                  Password
                </label>
                <p className="form-control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={inputChangeHandler.bind(this, 'password')}
                  />
                  <span className="icon is-small is-left">
                    <Lock />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="form-control">
                  <button className="button">Log In</button>
                </p>
              </div>
            </form>
          </section>
        </div>
        {/* <section className="login__register">
          <span>{"Don't have an account?"}</span>
          <button className="button is-dark">Sign Up</button>
        </section> */}
      </div>
    </div>
  );
};

export default Login;
