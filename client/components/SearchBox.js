import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLocation } from '../store';
import GoogleResults from './GoogleResults';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { setLocation } = this.props;
    this.textInput.focus();

    const service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.textSearch({ query: this.textInput.value}, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('All results:', results);
        service.getDetails({ placeId: results[0].place_id }, (result, status) => {
          console.log('Place details:', result);
          setLocation(result);
        })
      }
    });
  }

  componentDidMount() {
    const autocomplete = new google.maps.places.SearchBox(this.textInput);

    autocomplete.addListener('place changed', () => {
      const places = autocomplete.getPlaces();
      this.onClick();
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUnmount() {
    this.textInput.onClick('destroy');
  }

  render() {
    const { location } = this.props;
    const { onClick } = this;

    return (
      <div>
        <input ref={ input => this.textInput = input } type="text" size="50" />
        <button type="submit" onClick={ onClick }>Submit</button>
        <GoogleResults location={ location } />
        <div id="map" />
      </div>
    )
  }
}

const mapStateToProps = ({ location }) => {
  return { location };
};

const mapDispatch = { setLocation };

export default connect(mapStateToProps, mapDispatch)(SearchBox);
