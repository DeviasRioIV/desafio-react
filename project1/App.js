import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Vibration } from 'react-native';
import vibrate from './utils/index.js';
import TimeInputs from './components/timeInputs.js';
import Constants from 'expo-constants';

export default class App extends React.Component {

	constructor() {

		super()

		this.state = {
			timer  : 'Work',
			count  : 600,
			time   : '',
			work   : {
				hours   : 0,
				minutes : 10,
				seconds : 0
			},
			break  : {
				hours   : 0,
				minutes : 5,
				seconds : 0
			}
		}

		this.start      = this.start.bind( this )

		this.count      = this.count.bind( this)

		this.format     = this.format.bind( this)

		this.pause      = this.pause.bind( this )

		this.reset      = this.reset.bind( this )
		
		this.swap       = this.swap.bind( this )
		
		this.updateTime = this.updateTime.bind( this )
	}

	componentDidMount() {
		this.format();
	}

	/**
	 * Starts the count interval
	*/
	start() {
		this.counter = setInterval( this.count, 1000 )
	}

	/**
	 * Makes the coundown every second
	 * Makes the swap between timers
	*/
	count() {

		this.setState( prevState => ({
			count : prevState.count - 1
		}))

		this.format();

		if (this.state.count === 0) {
			this.swap()
		}
	}

	/**
	 * Formats the count from seconds to HH:MM:SS format
	*/
	format() {

		let intSeconds = parseInt( this.state.count, 10 );
		let hours      = Math.floor( intSeconds / 3600 );
		let minutes    = Math.floor( ( intSeconds - ( hours * 3600 ) ) / 60 );
		let seconds    = intSeconds - ( hours * 3600 ) - ( minutes * 60 );

		hours   = hours < 10 ? '0' + hours : hours
		minutes = minutes < 10 ? '0' + minutes : minutes
		seconds = seconds < 10 ? '0' + seconds : seconds

		let time = hours + ':' + minutes + ':' + seconds;

		this.setState( prevState => ({
			time : time 
		}))
	}

	/**
	 * Pauses the count
	*/
	pause() {
		clearInterval(this.counter)
	}

	/**
	 * Resets the count
	*/
	reset() {

		let timer    = this.state.timer.toLowerCase();
		let newCount = this.state[timer].hours * 60 * 60 + this.state[timer].minutes * 60 + this.state[timer].seconds;

		this.setState(prevState => ({
			count : newCount
		}), () => {

			this.format()
	
			clearInterval(this.counter)
		});
	}

	/**
	 * Swaps between timers
	*/
	swap() {

		Vibration.vibrate([500, 500, 500])

		clearInterval(this.counter)

		if ( this.state.timer === 'Work' ) {

			this.setState(
				prevState => ({ timer : 'Break' }),
				() => {
					this.reset()
				}
			);
		} else {

			this.setState(
				prevState => ({ timer : 'Work' }),
				() => {
					this.reset()
				}
			);
		}

		setTimeout( () => {
			this.start()
		},0)
	}

	/**
	 * Updates the timers HH:MM:SS values
	*/
	updateTime(timer,time,val) {

		clearInterval(this.counter)

		// Empty values should be set to 0
		if (!val)
			val = '0'

		// "hours" can't be higher than 23
		if ( time === 'hours' && val >= 24 )
			return false

		// "minutes" and "seconds" can't be higher than 59
		if ( ( time === 'minutes' || time === 'seconds') && val >= 60 )
			return false

		this.setState( prevState => ({
			[timer]: {
				...prevState[timer],
				[time] : parseInt(val)
			}
		}), () => {

			// Prevent counter from being 0
			let count = this.state[timer].hours * 60 * 60 + this.state[timer].minutes * 60 + this.state[timer].seconds;
	
			if ( count === 0 ) {

				this.setState( prevState => ({
					[timer]: {
						...prevState[timer],
						['minutes'] : 1
					}
				}), () => {
					this.reset();
				});
			} else {
				this.reset();
			}
		});

	}

	/**
	 * Intervals "clean up"
	*/
	componentWillUnmount () {
		clearInterval(this.counter)
	}

	render() {
		return(
			<View style={ styles.container }>

				<Text style={ styles.timer }>{ this.state.timer }</Text>

				<Text style={ styles.time }>{ this.state.time }</Text>

				<View style={ styles.timeInputs }>
					<Text>Work Time:</Text>
					<TimeInputs
						timer="work"
						val={ this.state.work }
						updateTime={ this.updateTime }
						></TimeInputs>
				</View>

				<View style={ styles.timeInputs }>
					<Text>Break Time:</Text>
					<TimeInputs
						timer="break"
						val={ this.state.break }
						updateTime={ this.updateTime }
						></TimeInputs>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						title="Start"
						onPress={ this.start }
					></Button>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						title="Pause"
						onPress={ this.pause }
					></Button>
				</View>


				<View style={styles.buttonContainer}>
					<Button
						title="Reset"
						onPress={ this.reset }
					></Button>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		marginBottom: 20,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	timer : {
		fontSize: 30
	},
	time : {
		fontSize: 50
	},
	timeInputs : {
		marginTop: 0,
		marginBottom: 0,
		flex: .3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer : {
		marginTop: 10
	}
});
