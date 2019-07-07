import React, {Component} from 'react'
import {Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'

export default class AddCategoryModal extends Component {
	state = {modalVisible: false,};
	setModalVisible(visible){
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View>
				<Modal animationType='fade' transparent={true} visible={this.state.modalVisible} >
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<View style={{height: 170, width: '70%' ,backgroundColor: '#DDD' ,alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Ascending</Text>
							<Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Descending</Text>
						</View>
					</View>
				</Modal>
				<TouchableOpacity style={{height: 50}} onPress={() => {this.setModalVisible(true);}}>
					 <Image source={require('../image/sort.png')} style={{height: 20, width: 20, paddingRight: 20, marginRight: 20}} />
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	link: {
		fontSize: 20,
		color: '#000',
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	}
})