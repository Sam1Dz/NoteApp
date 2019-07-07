import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native';
import {Picker, Form, Item} from "native-base";

import {connect} from 'react-redux';
import {editNote, getNotes} from '../public/redux/action/notes';

const mapDispatchToProps = dispatch => {
	return {
		editNote: (id, data) => dispatch(editNote(id, data))
	}
}

const mapStateToProps = state => {
	return {
		category: state.category
	}
}

class EditNote extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: undefined,
			id: '',
			note_title: '',
			note_desc: ''
		};
	}

	editNote = () => {
		const id_note = this.state.id;
        const note_title = this.state.note_title;
        const note_desc = this.state.note_desc;
        const category_id = this.state.category;

        if (note_title !== '' && note_desc !== '' && category !== undefined) {
            this.props.dispatch(editNote(id_note,
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
		const {navigation} = this.props;
		const id = navigation.getParam('id_note');
		const note_title = navigation.getParam('note_title');
		const note_desc = navigation.getParam('note_desc');
		const category = navigation.getParam('id_category')
		this.setState({id, note_title, note_desc, category})
		this.props.navigation.setParams({
			editNote: this.editNote
		});
	}

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
        	headerTitle: 'EDIT NOTE',
        	headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				justifyContent: 'center',
				flexGrow: 1
			},
            headerRight: (
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity transparent onPress= { () => params.editNote()}>
						<Image source={require('../image/ok.png')} style={{height: 25, width: 25, paddingRight: 20, marginRight: 20}} />
					</TouchableOpacity>
				</View>
			),
        }
    }

	render() {
		return (
			<View style={styles.container} navigation={this.props.navigation}>
				<TextInput placeholder="ADD TITLE ..." style={{fontSize: 20}} value={this.state.note_title} onChangeText={(note_title) => this.setState({note_title})}></TextInput>
				<TextInput placeholder="ADD DESCRIPTION ..." style={{fontSize: 20}} multiline={true} numberOfLines={4} onChangeText={(note_desc) => this.setState({note_desc})}>{this.props.navigation.state.params.note_desc}</TextInput>
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

export default connect(mapStateToProps)(EditNote)