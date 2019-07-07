import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native';
import {Picker, Form, Item} from "native-base";

import {connect} from 'react-redux';
import {addNote, getNotes} from '../public/redux/action/notes';

const mapStateToProps = state => {
	return {
		category: state.category
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addNote: note => dispatch(addNote(note))
	}
}

class AddNote extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: undefined,
			note_title: '',
			note_desc: ''
		};
	}

	addNote = () => {
        const note_title = this.state.note_title;
        const note_desc = this.state.note_desc;
        const category_id = this.state.category;

        if (note_title !== '' && note_desc !== '' && category !== undefined) {
            this.props.dispatch(addNote(
            	{
            		note_title: note_title, 
            		note_desc: note_desc, 
            		category_id: category_id
            	}));
            this.props.navigation.pop();
            this.props.dispatch(getNotes());
        } else {
            this.props.navigation.pop()
        }
    }

    componentDidMount() {
		this.props.navigation.setParams({
			addNote: this.addNote
		});
	}

    static navigationOptions = ({ navigation }) => {
        const {params={}} = navigation.state;
        return {
        	headerTitle: 'ADD NOTE',
        	headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				justifyContent: 'center',
				flexGrow: 1
			},
            headerRight: (
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity transparent onPress = {() => params.addNote()}>
						<Image source={require('../image/ok.png')} style={{height: 25, width: 25, paddingRight: 20, marginRight: 20}} />
					</TouchableOpacity>
				</View>
			),
        }
    }

	render() {
		return (
			<View style={styles.container} navigation={this.props.navigation}>
				<TextInput placeholder="ADD TITLE ..." style={{fontSize: 20}} onChangeText={(note_title) => this.setState({note_title})}/>
				<TextInput placeholder="ADD DESCRIPTION ..." style={{fontSize: 20}} multiline={true} numberOfLines={4} onChangeText={(note_desc) => this.setState({note_desc})}/>
				<View>
					<Text style={{fontSize: 20, color: 'black'}}>Category</Text>
					<Form>
						<Picker 
							mode='dropdown'
							style={{width: 200}}
							selectedValue={this.state.category}
							onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}
							>
							<Picker.Item label="Select" value="0" key="0" />
							{
								this.props.category.category.map((item) => {
									return (
										<Picker.Item label={item.name} value={item.id_category} key={item.id_category} />
									)
								})
							}
						</Picker>
					</Form>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
		backgroundColor: '#FFF',
	},
	textInfo: {
		fontSize: 25,
		textAlign: 'left',
		color: 'black',
		margin: 10,
	},
});

export default connect(mapStateToProps)(AddNote)