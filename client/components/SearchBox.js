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
    const service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.textSearch({ query: this.textInput.value}, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('All results:', results);
        service.getDetails({ placeId: results[0].place_id }, (result, status) => {
          console.log('Place details:', result);
          this.setState({ location: result });
        })
      }
    });
  }

  componentDidMount() {
    const autocomplete = new google.maps.places.SearchBox(this.textInput);

    autocomplete.addListener('place changed', () => {
      const places = autocomplete.getPlaces();
      this.focusTextInput();
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
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

        <div className="col-sm-6">
          <div id="map" style={{ height: '300px' }} />
        </div>
      </div>
    )
  }
}

export default SearchBox;
