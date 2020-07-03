import React from 'react';
import { StyleSheet, Text, View, Button, Separator } from 'react-native';


class Timer extends React.Component {
  constructor(){
    super()
    this.state = {
      time: 25,
      isCountingDown: false,
    }
    this.interval = null

    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  countdown() {
    console.log("countdown")
    if (this.state.time !== 0) {
      this.setState(prevState => ({
        time: prevState.time - 1 
      }))
    } else {
      this.restartTimer()
    }
  }

  startTimer() {
    if (!this.state.isCountingDown) {
      this.interval = setInterval(this.countdown, 1000),
      this.setState({isCountingDown: true}) 
    }
  }

  restartTimer() {
    clearInterval(this.interval)
    this.setState(prevState => ({
      time: 25,
      isCountingDown: false
    }))
  }

  stopTimer() {
    console.log("stop")
    clearInterval(this.interval)
    this.setState({
      isCountingDown: false
    })
  } 

  render() {
    return(
      <View>
        <Button title= "Start" onPress = {this.startTimer} />
        <Text style = {styles.time}>{this.state.time}</Text>
        <Button title= "Restart" onPress = {this.restartTimer} />
        <Button title= "Stop" onPress = {this.stopTimer} />
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showCounter: false
    }
  }

  toggleCounter = () => this.setState(prevState => ({
    showCounter: !prevState.showCounter,
  }))

  render() {
    if (this.state.showCounter){
      return (
        <View style={styles.container}>
          <Button 
          color= "#ff5c5c" 
          title= "¿Demasiado daño a la vista? Salir" onPress = {this.toggleCounter} />
          <Timer/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style= {styles.title}>{"El Pomodoro"}</Text>
          <Button title= "Arriesgarce?" onPress = {this.toggleCounter} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 46,
  },
  title: {
    fontSize: 50
  }
});
