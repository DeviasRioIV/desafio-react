import React from 'react';
import { StyleSheet, Text, View, Button, TIMER} from 'react-native';
import Vibration from './utils/vibrate.js'
import { Constants } from 'expo'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  count: {
     fontSize: 48
   }

});

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      
      countMinWork: 0,
      countSegtWork: 10,
      iniciar: false, 

      tiempoDescanso: true,
      vibrar: Vibration,
      tiempoDe: 'Trabajo'

    }
  }

// //compoenentDidMount se ejecuta siempre cuando se terminan de montar todos los componentes
//   componentDidMount(){    

//   }

  

//   componentWillUnmount(){
 
//   }

 
iniciarButton = () => {
       
       this.interval = setInterval(this.dec,1000)
       this.setState(prevState => ({
       iniciar: !prevState.iniciar,
   }))

}


 detenerButton = () => {
       
  
       clearInterval(this.interval)

       this.setState(prevState => ({
       iniciar: !prevState.iniciar,
   }))

}


 reanudarButton = () => {
       
  
       clearInterval(this.interval)
    
       this.setState(prevState => ({

       iniciar: false,
       countMinWork: 0,
       countSegtWork: 10,
       tiempoDescanso: true,
       tiempoDe:'Trabajo'


   }))

}

rellenarCeros = (minutos) => {

  if (minutos<10)  {

    return'0'
  } else {
    return ''
  }

}

// definimos asi inc en vez de inc() por que automaticamente la estamos vicnculando a la clase
  dec = () => {
    
    if ((this.state.countSegtWork===0)&&(this.state.countMinWork===0)) {

       if (this.state.tiempoDescanso){

           this.state.vibrar()
           this.setState(prevState => ({
                          countMinWork:0,
                          countSegtWork:5,
                          tiempoDescanso: !prevState.tiempoDescanso,
                          tiempoDe:'Descanso'

                        }))

       } else {

        

        this.state.vibrar()
        this.setState(prevState => ({
                          countMinWork:0,
                          countSegtWork:10,
                          tiempoDescanso: !prevState.tiempoDescanso,
                          tiempoDe:'Trabajo'

                        }))


       }

      

      


    } else {


          
          if ((this.state.countSegtWork===0)&&(this.state.countMinWork!==0)) {
            
                this.setState(prevState => ({
                              countMinWork:prevState.countMinWork-1,
                              countSegtWork:59,

                }))
        } else {

          if (this.state.countSegtWork!==0) {

                this.setState(prevState => ({     
                countSegtWork:prevState.countSegtWork-1,
          }))
            
        }



        }

    }
    
  }

  

render(){
  return (
    <View style={styles.container}>
      
      <Text > POMODORO TIMER </Text>
      <Text > {this.state.tiempoDe} </Text>
      
  
        <Text style={styles.count}>{this.rellenarCeros(this.state.countMinWork)}{this.state.countMinWork} : {this.rellenarCeros(this.state.countSegtWork)}{this.state.countSegtWork}</Text>
    
       
      <Button
        disabled={this.state.iniciar}
        onPress={this.iniciarButton}
        
        title="INICIAR"
        color="#008b8b"

        
      />

      <Button
        disabled={!this.state.iniciar}
        onPress={this.detenerButton}
        title="DETENER"
        color="#dc143c"
        
      />

      <Button
        onPress={this.reanudarButton}
        disabled={this.state.iniciar}
        title="REANUDAR"
        color="#ffd700"
        
      />

      

    </View>
  );



}

}



