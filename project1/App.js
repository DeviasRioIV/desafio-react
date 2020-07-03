import React from 'react';
import { StyleSheet, Text, View, Button, Spacer } from 'react-native';


class Timer extends React.Component {
  constructor(){
    super()
    this.state = {
      time: 1500,
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
    this.stopTimer()
    console.log("restart")
    this.setState({
      time: 1500,
      isCountingDown: false
    })
  }

  stopTimer() {
    if (this.state.isCountingDown) {
      console.log("stop")
      clearInterval(this.interval)
      this.setState({
        isCountingDown: false
      })
    }
  } 

  componentWillUnmount(){
    clearInterval(this.interval)
  }
  
  render() {
    let min = Math.floor(this.state.time / 60)  //minutes
    let sec = this.state.time % 60 //seconds
    return(
      <View>
        <Button title= "Start/Continue" onPress = {this.startTimer} />
        <Text style= {styles.title}>{`${min < 10 ? ('0' + min.toString()) : min} : ${sec < 10 ? ('0' + sec.toString()) : sec }`}</Text>
        <Button title= "Restart" onPress = {this.restartTimer} />
        <Button
        color= "#d8df07" 
        title= <Text style = {{color: "#000000" }}>{"Stop"}</Text> 
        onPress = {this.stopTimer} />
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
          title= <Text style = {{color: "#000000" }}>
          {"¿Demasiado daño a la vista? Salir"}</Text>
          onPress = {this.toggleCounter} />
          <View style={styles.timer}>
            <Timer/>
          </View>
        </View>      
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style= {styles.title}>{"El Pomodoro"}</Text>
          <Button title= "¿Arriesgarse?" onPress = {this.toggleCounter} />
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
  title: {
    fontSize: 50
  },
  timer: {
    marginTop: 10
  }
});