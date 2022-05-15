import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NaviHome from './screens/navigationHome';
import NaviMap from './screens/navigationMap';
import NaviDash from './screens/navigationDash';
const Stack = createNativeStackNavigator();

import {Appbar} from 'react-native-paper';

function CustomNavigationBar({navigation, back}) {
  return (
    <Appbar.Header style={{backgroundColor: '#2B6ED3'}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    </Appbar.Header>
  );
}

export default class App extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
          }}>
          <Stack.Screen name="NaviHome" component={NaviHome} />
          <Stack.Screen name="NaviMap" component={NaviMap} />
          <Stack.Screen name="NaviDash" component={NaviDash} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
