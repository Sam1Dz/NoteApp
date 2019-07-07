import React, {Component} from 'react';
import {Platform, Dimensions} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../screen/Home';
import AddNoteScreen from '../screen/AddNote';
import EditNoteScreen from '../screen/EditNote';

import MenuDrawer from '../components/MenuDrawer';

// Import Dimensions of the Window. Allowing get Width from Screen
const WIDTH = Dimensions.get('window').width;

const appStack = createStackNavigator(
	{
		Notes: {
			screen: HomeScreen
		},
		AddNote: {
			screen: AddNoteScreen
		},
		EditNote: {
			screen: EditNoteScreen
		},
	},
	initialRootName = HomeScreen
)

const Navigator = createDrawerNavigator({
	Notes: { screen: appStack },
	}, {
	drawerWidth: WIDTH*0.83,
	contentComponent: MenuDrawer
});

export default createAppContainer(Navigator);