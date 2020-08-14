import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimension, Button, Image, DeviceEventEmitter } from 'react-native';
import * as Contacts from 'expo-contacts';

//import { Magnetometer } from 'expo-sensors'
import { DeviceMotion } from 'expo-sensors'

//import * as Location from 'expo-location'
//import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

export default class App extends Component {
  state = {
    dm: null,
  }

  _setupDeviceMotionAsync = async () => {
    //const isAvailable = await DeviceMotion.isAvailableAsync()
    //console.log(isAvailable)
    DeviceMotion.addListener((dm) => { 
      this.setState({dm})
    })
    DeviceMotion.setUpdateInterval(16)
  }

  componentDidMount(){ //useEffect - []
    //this._setupMagnetometerAsync();
    this._setupDeviceMotionAsync()
  }
  
  componentWillUnmount(){
    DeviceMotion.removeAllListeners()
  }

  render(){
    let angle=0;
    if (this.state.dm && this.state.dm.rotation){
      angle= -this.state.dm.rotation.gamma //alpha // beta //gamma
    }

    return (
      <View style={styles.container}>
        <Image 
          source={require("../contacts.png")} 
          style={{
            height: 150,
            width: 150,
            transform: [{rotate: angle + "rad"}],
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
})

/*
<ImageBackground 
source={require("./CompassFace.png")} 
style={{
  height: 320,
  width: 320,
  alignItems: 'center',
  justifyContent: 'center',
}}
>
<Image 
source= {require("./CompassNeedle.png")} 
style = {{
  height: 420,
  width: 420,
  opacity: 0.65,
  transform [{rotate: theta}]
}}
/>
</ImageBackground>
*/


/*
cobertura familiar:
generar ahorro esta atado a los indice 
prima es lo que pagas anualmente 
(tenes un retorno del 1%)
- dolar solidario 93 pesos
- 38 
*/