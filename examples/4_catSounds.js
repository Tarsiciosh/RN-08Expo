import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Video , Audio } from 'expo-av'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'

let green = "#477009"
let yellow = "#fcd602"

export default class App extends React.Component {
  
  state = {
    isReady: false,
  }

  _setAudioModeAsync = async () => {
    await Audio.setAudioModeAsync ({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
    })
  }

  _loadFontAsync = async () => {
    await Font.loadAsync({
      CooperBlackRegular: require("../assets/CooperBlackRegular.ttf")
    })
  }

  _loadAssetsAsync = async () => {
    await Asset.loadAsync([
      require("../assets/1.mp4"),
      require("../assets/2.mp4"),
      require("../assets/3.mp4"),
      require("../assets/4.mp4"),
      require("../assets/5.mp4"),
      require("../assets/6.mp4"),
      require("../assets/7.mp4"),
      require("../assets/8.mp4"),
      require("../assets/9.mp4"),
    ])
  }

  _setupAsync = async () => {
    await Promise.all([
      this._loadAssetsAsync(),
      this._setAudioModeAsync(),
      this._loadFontAsync(),
    ])
    this.setState({isReady: true})
  }

  componentWillMount (){
    this._setupAsync()
  }
  
  render(){
    if (!this.state.isReady) {
      return (<AppLoading/>)
    }

    let size = 100
    return (
      <View style={styles.container}>
        <Text 
          style={{
            color:yellow,
            fontSize: 42,
            fontFamily: "CooperBlackRegular",
          }}
        > 
          Cat Sounds 
        </Text>

        <View style={{flexDirection: 'row'}}>
          <CatVideoButton source={require("../assets/1.mp4")} size={size}/>
          <CatVideoButton source={require("../assets/2.mp4")} size={size}/>
          <CatVideoButton source={require("../assets/3.mp4")} size={size}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <CatVideoButton source={require("../assets/4.mp4")} size={size}/>
          <CatVideoButton source={require("../assets/5.mp4")} size={size}/>
          <CatVideoButton source={require("../assets/6.mp4")} size={size}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <CatVideoButton source={require("../assets/7.mp4")} size={size}/>
          <CatVideoButton source={require("../assets/8.mp4")} size={size}/>
          <CatVideoButton source={require("../assets/9.mp4")} size={size}/>
        </View>
  
        <StatusBar style="auto" />
      </View>
    ) 
  }
}

class CatVideoButton extends React.Component {
  
  resetAsync = async () => {
    await this._video.stopAsync()
    await this._video.setPositionAsync(0)
  }

  playAsync = async () => {
    await this._video.replayAsync()
  }
  
  render() {
    return ( 
      <View style={{margin:10,}}>
        <TouchableHighlight onPress={()=>{
          this.playAsync()
        }} >
          <View>
            <Video 
              source={this.props.source} 
              style={{
                width: this.props.width || this.props.size || 400,
                height: this.props.height || this.props.size || 400,
              }}
              resizeMode="cover"
              
              ref={(c) => { this._video = c}}
              onPlaybackStatusUpdate= {(status) => {
                if (status.didJustFinish) {
                  this.resetAsync()
                }
              }}
            />      
          </View>
        </TouchableHighlight>
      </View>   
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: green,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

//shouldPlay