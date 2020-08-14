import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

import * as Location from 'expo-location'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

export default class App extends Component {
  state= {
    location: null,
  }

  _getLocationAsync = async () => {
    let {status} = await Location.requestPermissionsAsync ()
    if (status!== 'granted') {
      console.error('location permission not granted')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    let someLocation = (await Location.geocodeAsync("455 Post St."))[0]
    let where = (await Location.reverseGeocodeAsync(location.coords))[0]
    
    
    console.log(location.coords)
    console.log("someLocation")
    console.log(someLocation)
    this.setState({
      location, 
      places: {
        someLocation,
      },
      where,
    })
  }

  componentDidMount(){
    this._getLocationAsync()
  }

  render(){
    if (!this.state.location) {
      return (<Text> no location </Text>)
    }
    return (
      <View style={styles.container}>
        <MapView  
          style= {styles.mapStyle}
          initialRegion ={{
            latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922/2.5,
            longitudeDelta: 0.0421/2.5,
          }}>
        <Marker 
          coordinate={this.state.location.coords}
          title = "you are here"
          description={this.state.where.name}
          pinColor="green"
        />
        <Marker 
          coordinate={this.state.places.someLocation}
          pinColor="blue"
        />
        </MapView>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})


/*
export default  function App() {

  const [location, setLocation] = useState(null)
  
  useEffect(()=> {
    (async () => {
      let {status} = await Location.requestPermissionsAsync()
      if (status !== 'granted'){
        console.error('permission to acces location was denied')
        return 
      }
      let myLocation = await Location.getCurrentPositionAsync ({})
      setLocation(myLocation)
      //console.log(location)
      console.log(location.coords)
    }
  })(),[location])
  

  if (!location){
    console.log("in the the if")
    console.log(location)
    return (<Text style={{flex :1}} > 
              no location 
            </Text> 
            )
  } else {
  
    return (
      <View style={styles.container}>
        <MapView  
          style= {styles.mapStyle}
          initialRegion ={{
            latitude: 37.78, 37.78
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
        />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
*/