import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Appbar, RadioButton, Checkbox } from 'react-native-paper';

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
  _goBack = () => console.log('Went back');
  // set strict bounds yes or no
  handleStrictBounds = () => {
    var isChecked = this.state.isStrictBounds;
    this.setState({
      isStrictBounds: !isChecked,
      checked: !isChecked
    }); 
    
    if(!isChecked){
      this.getCountryShortName();
    }
    else {
      this.setState({ country: null });
    } 
  }
  getCountryShortName = () => {
    var addr = this.state.addrComp;            
    for (var i=0; i<addr.length; i++) {
      if (addr[i].types[0] === "country") {
        var cnty = addr[i].short_name; 
        this.setState({
          country: 'country:' + cnty
        });
      }
    }
  }
  handleChangeOption = (val) => {
    this.setState({ 
      option: val,
      searchType: val === 'all' ? [''] : val
    });
  }
  render() {
    return (
      <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title="Google Places Autocomplete"
        />
      </Appbar.Header>
      <View style={styles.options}>
          <RadioButton.Group
            onValueChange={value => this.handleChangeOption(value)}
            value={this.state.option}    
          >
            <View style={styles.eachOption}>
              <RadioButton value="all" />
              <Text style={styles.textSpacing}>All</Text>  
            </View>
            <View style={styles.eachOption}>
              <RadioButton value="establishment" />
              <Text style={styles.textSpacing}>Establishment</Text>             
            </View>
            <View style={styles.eachOption}>
              <RadioButton value="address" />
              <Text style={styles.textSpacing}>Address</Text>
            </View>
            <View style={styles.eachOption}>
              <RadioButton value="geocode" />
              <Text style={styles.textSpacing}>Geocode</Text>
            </View>          
          </RadioButton.Group>
        </View>
        <View style={styles.bounds}>
          <Checkbox
            status={this.state.checked ? 'checked' : 'unchecked'}
            onPress={() => this.handleStrictBounds()}
          />
          <Text style={styles.textSpacing}>Strict Bounds</Text>
        </View>
        <View style={styles.main}>   
          <MapView style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
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
        
          <View style={styles.autocomplete}>
            <GooglePlacesAutocomplete
              placeholder='Enter Location'
              debounce={200}
              style={styles.results}
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
          </View>
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
  header: {
    backgroundColor: '#ADCFFF'
  },
  main: {
    justifyContent: 'flex-end',
    height: '80%'
  },
  options:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  eachOption: {
    flexDirection: 'row'
  },
  textSpacing: {
    paddingTop: 8
  },
  bounds:{
    alignSelf: 'center',
    flexDirection: 'row'
  },
  autocomplete: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0
  },
  results: {
    backgroundColor: 'white', 
    color: 'black'
  }
});
