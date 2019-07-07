import React, {Component} from 'react'
import {Modal, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

import {connect} from 'react-redux'
import {addCategory, getCategory} from '../public/redux/action/category';

const mapStateToProps = state => {
	return {
		category: state.category
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addCategory: category => dispatch(addCategory(category))
	}
}

class AddCategoryModal extends Component {
	state = {
		modalVisible: false,
		categoryTitle: '',
		categoryURL: ''
	};

	setModalVisible(visible){
		this.setState({modalVisible: visible});
	}

	addCategory = () => {
        const category_title = this.state.categoryTitle;
        const category_url = this.state.categoryURL;

        if (category_title !== '' && category_url !== '') {
            this.props.dispatch(addCategory(
            	{
            		name: category_title,
            		image: category_url
            	}
            ));
            this.state.modalVisible(false);
            this.props.dispatch(getCategory());
        }
    }

	render() {
		return (
			<View>
				<Modal animationType='fade' transparent={true} visible={this.state.modalVisible} >
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<View style={{height: 170, width: '70%' ,backgroundColor: '#FFF' ,alignItems: 'center', justifyContent: 'center', elevation: 10, borderRadius: 10}}>
							<TextInput underlineColorAndroid='#4CAF50' style={{width:'80%'}} placeholder='Category Name' onChangeText={(category_title) => this.setState({category_title})}/>
							<TextInput underlineColorAndroid='#4CAF50' style={{marginBottom:20,width:'80%'}} placeholder='Image Url' onChangeText={(category_url) => this.setState({category_url})}/>
							<TouchableOpacity style={{position:'absolute',right:'33%',bottom:'10%'}} onPress={() => {this.addCategory()}}>
								<Text>Add</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{position:'absolute',right:'10%',bottom:'10%'}} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
								<Text style={{color: 'red'}}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<TouchableOpacity style={{height: 50}} onPress={() => {this.setModalVisible(true);}}>
					<Text style={styles.link}>Add Category</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export default connect(mapStateToProps)(AddCategoryModal)

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