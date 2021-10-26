import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() !== '') {
      this.props.onSubmit(this.state.search);
      this.setState({ search: '' });
    } else alert('Add your search query');
  };
  onChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.onChange}
            name="searh"
            value={this.state.search}
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};