import React, {Component} from 'react';
import {Platform,} from 'react-native';
import {Item, Input, Icon} from 'native-base';

import {connect} from 'react-redux';
import {getNotes} from '../public/redux/action/notes';

class Search extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchText: '',
		}
	}

	noteData = (search, sort) => {
		this.props.dispatch(fetch(search, sort))
	}

	render() {
		return (
			<Item style={{marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5, posisition: 'fixed', elevation: 2.5}} rounded>
				<Input
					placeholder='Search'
					onChangeText={(searchText) => {
						this.setState({searchText})
						this.props.dispatch(noteData(searchText))
						}
					}
				/>
				<Icon active name='search' style={{paddingLeft: 3}}/>
			</Item>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes,
	}
}

export default connect(mapStateToProps)(Search)