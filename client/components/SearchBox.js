import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { location: 'New York, NY' };
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.focus();
    this.setState({ location: this.textInput.value });
  }

  componentDidMount() {
    const autocomplete = new google.maps.places.SearchBox(this.textInput);

    autocomplete.addListener('place changed', () => {
      const place = autocomplete.getPlace();
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
        <ul>
          <li>Name: { location }</li>
        </ul>
      </div>
    )
  }
}

export default SearchBox;
