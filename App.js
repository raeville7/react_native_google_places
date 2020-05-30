import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: { 
        lat: 37.78825, 
        lng: -122.4324 
      },
      option: 'all',
      checked: false,
      isStrictBounds: false,
      country: null,
      addrComp: [],
      searchType: ['']
    }
  }
  render() {
    return (
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          debounce={200}
          style={{flex: 1}}
          minLength={2}
          autoFocus={true}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.setState({ 
              location: details.geometry.location,
              addrComp: details.address_components 
            })
          }}
          query={{
            key: 'AIzaSyAQTIQGNx6fdYSsaSqlqK4AEO89LdkIslk',
            language: 'en',
            type: this.state.searchType,
            components: this.state.country
          }}
        /> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
