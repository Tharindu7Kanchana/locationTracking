import React from 'react';
import {View, Text} from 'react-native';
import {Surface, Card, Title, Button} from 'react-native-paper';

export default function NaviHome({navigation}) {
  return (
    <View>
      <Surface>
        <Card>
          <Title>Map</Title>
        </Card>
        <Button mode="contained" onPress={() => navigation.navigate('NaviMap')}>
          Map
        </Button>
      </Surface>

      <Surface>
        <Card>
          <Title>DashBoard</Title>
        </Card>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NaviDash')}>
          DashBoard
        </Button>
      </Surface>
    </View>
  );
}
