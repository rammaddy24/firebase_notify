/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FCM, { FCMEvent } from "react-native-fcm";
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    FCM.getFCMToken().then(token => {
      token = token ? token : null;
      console.log("##token", token);
    });
    FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log("##device_token", token);
      //  AsyncStorage.setItem("device_token", '' + token);
    });
    const notificationChannelId = 'default';

    FCM.createNotificationChannel({
      id: notificationChannelId,
      name: notificationChannelId,
      priority: 'max'
    });

   
  }
  sendNotification(){
    const notificationChannelId = 'default';
    FCM.presentLocalNotification({
      title: 'BG',
      body: 'Hi this is test',
      priority: "low",
      show_in_foreground: true,
      local: true,
      channel: notificationChannelId,
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <TouchableOpacity  style ={{ backgroundColor: "#040935"}} onPress={() => this.sendNotification()}>
          <Text style={{ padding:10,color: "#fff" }}>Send Notification</Text>
        </TouchableOpacity>
      </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
