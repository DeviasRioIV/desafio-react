import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class TimeInputs extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<View style={ styles.container }>

				<TextInput
					onChangeText={ val => { this.props.updateTime( this.props.timer,'hours',val ) } }
					value={ this.props.val.hours.toString() }
					keyboardType="numeric"
					style={ styles.input }></TextInput>

				<Text>:</Text>

				<TextInput
					onChangeText={ val => { this.props.updateTime( this.props.timer,'minutes',val ) } }
					value={ this.props.val.minutes.toString() }
					keyboardType="numeric"
					style={ styles.input }></TextInput>

				<Text>:</Text>

				<TextInput
					onChangeText={ val => { this.props.updateTime( this.props.timer,'seconds',val ) } }
					value={ this.props.val.seconds.toString() }
					keyboardType="numeric"
					style={ styles.input }></TextInput>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		marginTop: 0,
		marginBottom: 0,
		flex: .5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input : {
		marginTop: 3,
		marginBottom: 0,
		marginLeft: 5,
		marginRight: 5,
		padding: 5,
		textAlign: 'center',
		borderWidth: 1,
		borderColor: "#000"
	},
	buttonContainer : {
		marginTop: 10
	}
});
