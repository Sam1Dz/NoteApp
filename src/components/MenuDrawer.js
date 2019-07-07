import React, {Component} from 'react';
import {View, Text, Platform, Dimensions, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import AddCategoryModal from './AddCategoryModal'

import {connect} from 'react-redux';
import {getCategory} from '../public/redux/action/category';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MenuDrawer extends Component {

	componentDidMount = () => {
		this.props.dispatch(getCategory());
	}

	renderItem = ({ item }) => (
		<TouchableOpacity style={{height: 50}}>
			<Text style={styles.link}>{item.name}</Text>
		</TouchableOpacity>
	)

	render() {
		return (
			<SafeAreaView forceInset={{top: 'always', horizontal: 'never'}} style={{flex: 1}}>
				<View style={{height: 200, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
					<Image source={require('../image/user.jpg')} style={{height: 100, width: 100, borderRadius: 55}} />
					<Text style={{paddingTop: '5%', color: 'black', fontSize: 20, fontWeight: 'bold'}}>Pratama Dimas</Text>
				</View>
				<ScrollView>
					{
						this.props.category.isLoading ?
						<ActivityIndicator size="large" color="#000000" /> : 
						this.props.category.isError ? 
						<Text>An Error Occured</Text> :
						(
							<FlatList
								data={this.props.category.category}
								keyExtractor={(item, index) => item.id_category.toString()}
								renderItem={this.renderItem}
							>
							</FlatList>
						)
					}
					<AddCategoryModal />
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return {
		category: state.category
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	link: {
		fontSize: 20,
		color: '#000',
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	}
})

export default connect(mapStateToProps)(MenuDrawer);