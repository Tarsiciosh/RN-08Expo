import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimension, Button } from 'react-native';

import { Magnetometer } from 'expo-sensors'

export default class App extends Component {
  state= {
    isReady: false,
    v: null,
  }

  _setupMagnetometerAsync = async () => {
    Magnetometer.addListener((v) => {
      this.setState({v})
    })
  }

  componentDidMount(){ //useEffect - []
    this._setupMagnetometerAsync();
  }

  render(){
    let theta = "0rad";
    if (this.state.v){
      let {x,y,z} = this.state.v;
      theta = Math.atan(-x/y)
      if (-x > 0 && y > 0){
        //
      } else if (y>0) {
        theta += Math.PI;
     } else {
       theta += Math.PI *2
     }

    }

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify (this.state.v)}</Text>
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