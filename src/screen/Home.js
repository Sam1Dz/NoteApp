import React, {Component} from 'react';
import {Platform, StyleSheet, View, Button, Image, TextInput, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, Dimensions} from 'react-native';
import {Container, Header, Content, Text, Body, Item, Input, Icon, Fab} from 'native-base';
import {Avatar} from "react-native-elements";
import moment from 'moment'

import {connect} from 'react-redux';
import {getNotes, deleteNote} from '../public/redux/action/notes';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			refreshing: false,
			searchText: '',
		}
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'NOTE APP',
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center',
			justifyContent: 'center',
			flexGrow: 1
		},
		headerLeft: (
			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity transparent onPress = {() => navigation.toggleDrawer()}>
					<Avatar rounded source={require('../image/user.jpg')} style={{height: 35, width: 35, left: 15}} />
				</TouchableOpacity>
			</View>
			),
		headerRight: (
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<TouchableOpacity transparent onPress = {() => {}}>
					<Image source={require('../image/sort.png')} style={{height: 20, width: 20, paddingRight: 20, marginRight: 20}} />
				</TouchableOpacity>
			</View>
		),
	});

	componentDidMount() {
		this.props.dispatch(getNotes());
	}

	_onLongPressButton(id) {
		Alert.alert(
			'Delete Notes '+id,
			'Are you sure want to Delete this Notes?',
			[
				{text: 'Cancel', onPress: () => {}},
				{text: 'Yes', onPress: () => {this.props.dispatch(deleteNote(id)), this.props.dispatch(getNotes())}}
			]
		)
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.props.dispatch(getNotes()).then(() => {
			this.setState({refreshing: false});
		})
	}

	renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.boxItem, {backgroundColor: '#2FC2DF'}]} onLongPress={() => this._onLongPressButton(item.id_note)} onPress={() => this.props.navigation.navigate('EditNote', item)}>
        	<Text style={styles.dateItem}>{moment(item.time_update).format('DD MMMM')}</Text>
			<Text style={styles.titleItem} numberOfLines={1}>{item.note_title}</Text>
			<Text style={styles.categoryItem} numberOfLines={1}>{item.name}</Text>
			<Text style={styles.descriptionItem} numberOfLines={4}>{item.note_desc}</Text>
		</TouchableOpacity>
    )

	render() {
		return (
			<Container>
				<Content>
					<Item style={{marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5, posisition: 'fixed', elevation: 2.5}} rounded>
						<Input placeholder='Search' onChangeText={(searchText) => {
								this.setState({searchText})
								this.props.dispatch(getNotes(searchText))
								}
							}
						/>
						<Icon active name='search' style={{paddingLeft: 3}}/>
					</Item>
					{
						this.props.notes.isLoading ?
						<ActivityIndicator size="large" color="#000000" /> : 
						this.props.notes.isError ? 
						<Text>Error when loading Note, please try again!</Text>
                        :
                        (
                        	<View style={{flex: 1, justifyContent: 'center'}}>
                            	<FlatList 
                            		data={this.props.notes.notes}
									keyExtractor={(item, index) => item.id_note}
									refreshControl={
										<RefreshControl
											refreshing={this.state.refreshing}
											onRefresh={this._onRefresh}
										/>
									}
									renderItem={this.renderItem}
									numColumns={2}
									>
								</FlatList>
							</View>
                        )
                    }
				</Content>
				<Fab
					style={{ backgroundColor: '#FFFCFC'}}
					position="bottomRight"
					onPress={() => {this.props.navigation.navigate('AddNote')}}>
					<Icon name="add" style={{color: 'black'}} />
				</Fab>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notes,
	}
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
	boxItem: {
		elevation: 5,
		display: 'flex',
		flexDirection: 'column',
		width: 150,
		height: Dimensions.get('window').width/2,
		margin: 5,
		borderRadius: 5,
	},
	dateItem: {
		color: 'white',
		textAlign: 'right',
		fontSize: 12.5,
		paddingRight: 5,
		fontWeight: 'bold',
	},
	titleItem: {
		color: 'white',
		fontSize: 17.5,
		fontWeight: 'bold',
		paddingLeft: 10,
		paddingRight: 10,
	},
	categoryItem: {
		color: '#FFFBFB',
		fontSize: 10,
		fontWeight: 'normal',
		paddingLeft: 10,
		paddingRight: 10,
	},
	descriptionItem: {
		color: 'white',
		fontSize: 12.5,
		paddingLeft: 10,
		paddingRight: 10,
	},
});
