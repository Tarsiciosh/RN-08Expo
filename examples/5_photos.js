import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { Camera } from 'expo-camera';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class App extends React.Component {
  state = {
    chosenImage: null,
    takenImage: null,
    customCameraReady: false,
    camaraType: Camera.Constants.Type.back,
  }

  componentDidMount () {
    this._launchCustomCameraAsync()
  }

  _launchCamaraRollAsync = async () => {
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== 'granted'){
      console.log("permissions not granted")
      return 
    }
    let img = await ImagePicker.launchImageLibraryAsync() 

    const flippedImage = await ImageManipulator.manipulateAsync(img.uri,[{
      flip: ImageManipulator.FlipType.Horizontal }])

    this.setState({chosenImage: flippedImage})
  }

  _launchCamaraAsync = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted'){
      console.log("permissions not granted")
      return 
    }
    let img = await ImagePicker.launchCameraAsync({allowsEditing: true})
    this.setState({takenImage: img})
  }
  
  _launchCustomCameraAsync = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status !== 'granted'){
      console.log("permissions not granted")
      return 
    }
    this.setState ({
      customCameraReady: true
    })
  }

  _flipCamera = () => {
    if (this.state.camaraType === Camera.Constants.Type.front)
      this.setState({camaraType: Camera.Constants.Type.back})
    else 
      this.setState({camaraType: Camera.Constants.Type.front}) 
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Photos</Text>
        <View style={{flexDirection: 'row'}}>
          <Image source={require("../contacts.png")} style={{height: 200, width: 200}}/>
          <Image source={require("../contacts.png")} style={{height: 200, width: 200}}/>
        </View>
        
        <Button 
          title="Launch Roll"
          onPress={ () => {
            this._launchCamaraRollAsync()
          }} 
        />

        <Button 
          title="Launch Camara"
          onPress={ () => {
            this._launchCamaraAsync()
          }}
        />

        {this.state.customCameraReady && (
          <TouchableHighlight onPress = {() => {
              this._flipCamera()          
              }} >
            <Camera style={{ width: 200, height: 200}} type={this.state.camaraType} />
          </TouchableHighlight>
        ) || null }

        {this.state.chosenImage && (<Image source={{uri: this.state.chosenImage.uri}} 
          style={{width:200, height:200}} 
        />) ||  null}

      
        {this.state.takenImage && (<Image source={{uri: this.state.takenImage.uri}} 
          style={{width:200, height:200}} 
        />) ||  null} 

        <StatusBar style="auto" />
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122233',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

//shouldPlay