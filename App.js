import React, { Component } from 'react';
import { AppRegistry, Button, FlatList, Image, Platform, Text, View, StyleSheet, TextInput } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { AsyncStorage } from "react-native";

const instructions = Platform.select({
  ios: 'shake for device menu,',
  andriod: 'double tap for menu',
})

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center',
  },
  red: {
    color: 'red',
  },
});

export default class Bananas extends Component {

  constructor(props){
    super(props);

    this.state = {
      grade: '',
      desired: '',
      final: '',
      calc: 0
    };
  }

  buttonPressed = () => {
    const { grade, desired, final } = this.state;


    this.setState({
      calc: (Number(desired)-(1-Number(final))*Number(grade))/Number(final)
    });

  }

  nightMode = () => {
    this.setState({backgroundColor : '#000000'});
  }


  render() {
    let pic = {
      uri: 'https://wp-assets.futurism.com/2016/04/math-768x480.jpg'
    };

    return (
      <PinchZoomView>
      <Image source={pic} style={{width: 493, height: 210}}/>

        <Text style ={styles.bigBlue}> Enter Current Grade % </Text>
        <TextInput
          style={{height: 40}}
          placeholder="(e.g. 87.3)"
          keyboardType ='numeric'
          onChangeText={(grade) => this.setState({grade})}
        />
        <Text style ={styles.bigBlue}> Enter Desired Grade % </Text>
        <TextInput
          style={{height: 40}}
          placeholder="(e.g. 95)"
          keyboardType ='numeric'
          onChangeText={(desired) => this.setState({desired})}
        />
        <Text style ={styles.bigBlue}> Enter Final % </Text>
        <TextInput
          style={{height: 40}}
          placeholder="(e.g. 20)"
          keyboardType ='numeric'
          onChangeText={(final) => this.setState({final})}
        />
        <Button title={"Compute"} onPress={this.buttonPressed}/>

        <Text>{`You need a ${this.state.calc} on the final`}</Text>
        <FlatList
          data={[
            {key: this.state.calc},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        
        <Button title={"Night Mode"} onPress={this.ToggleDarkLight}/>
        


      </PinchZoomView>

    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Bananas);