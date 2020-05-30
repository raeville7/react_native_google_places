import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
      <>
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
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: this.state.location.lat,
              longitude: this.state.location.lng,
              latitudeDelta: 0.069,
              longitudeDelta: 0.049,
            }}    
          >
            <Marker 
              coordinate={{ 
                latitude: this.state.location.lat, 
                longitude: this.state.location.lng 
              }}
              draggable />
          </MapView>
        </View>
        
      </>  
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
  mapContainer: {
    height: '70%'
  }
});
