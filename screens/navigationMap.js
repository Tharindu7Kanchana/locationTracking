import React from 'react';
import {View} from 'react-native';
import {Surface, Card, Title, Button} from 'react-native-paper';

export default function NaviMap({navigation}) {
  return (
    <View>
      <Surface>
        <Card>
          <Title>Navigation</Title>
        </Card>
      </Surface>
      <Surface>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NaviHome')}>
          Home
        </Button>
      </Surface>
    </View>
  );
}
