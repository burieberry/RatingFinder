import React, { Component } from 'react';
import GoogleResults from './GoogleResults';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { location: [] };
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.focus();
    this.setState({ location: this.textInput.value });
  }

  componentDidMount() {
    const autocomplete = new google.maps.places.SearchBox(this.textInput);

    autocomplete.addListener('place changed', () => {
      const places = autocomplete.getPlaces();
      this.focusTextInput();
    });
  }

  componentWillUnmount() {
    this.textInput.focusTextInput('destroy');
  }

  render() {
    const { location } = this.state;
    const { focusTextInput } = this;

    return (
      <div>
        <input ref={ input => this.textInput = input } type="text" size="50" />
        <button type="submit" onClick={ focusTextInput }>Submit</button>
        <GoogleResults loc={ location } />
        <div id="map" />
      </div>
    )
  }
}

export default SearchBox;
