import React from 'react';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {Card, Surface, Button, Title, Paragraph} from 'react-native-paper';

export default class NaviDash extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
    };
  }

  componentDidMount() {
    if (this.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({location: position});
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
        },
      );
    }
    Geolocation.watchPosition(
      position => {
        console.log(position);
        this.setState({location: position});
      },
      error => {
        console.error(error.code, error.message);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    console.log('fine');
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  render() {
    const {location} = this.state;

    return (
      <SafeAreaView>
        <ScrollView style={styles.innercontainer}>
          {location && (
            <React.Fragment>
              <View style={styles.row}>
                <Card style={styles.card}>
                  <Card.Title>Speed</Card.Title>
                  <Card.Content>
                    <Surface style={styles.surface}>
                      <Paragraph>{location.coords.speed}</Paragraph>
                    </Surface>
                    <Title>Speed</Title>
                  </Card.Content>
                </Card>

                <Card style={styles.card}>
                  <Card.Content>
                    <Surface style={styles.surface}>
                      <Paragraph>{location.coords.altitude}</Paragraph>
                    </Surface>
                    <Title>Altitude</Title>
                  </Card.Content>
                </Card>
              </View>

              <View style={{alignItems: 'flex-start'}}>
                <View style={styles.row}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Surface style={styles.surface}>
                        <Paragraph>{location.coords.latitude}</Paragraph>
                      </Surface>

                      <Title>Latitude</Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.card}>
                    <Card.Content>
                      <Surface style={styles.surface}>
                        <Paragraph>{location.coords.longitude}</Paragraph>
                      </Surface>
                      <Title>Longitude</Title>
                    </Card.Content>
                  </Card>
                </View>

                <View style={styles.row}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Surface style={styles.surface}>
                        <Paragraph>{location.coords.accuracy}</Paragraph>
                      </Surface>
                      <Title>Accuracy</Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.card}>
                    <Card.Content>
                      <Surface style={styles.surface}>
                        <Paragraph>{location.coords.heading}</Paragraph>
                      </Surface>
                      <Title>Heading</Title>
                    </Card.Content>
                  </Card>
                </View>

                <View style={styles.row}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Surface style={styles.surface}>
                        <Paragraph>{location.timestamp}</Paragraph>
                      </Surface>
                      <Title>Timestamp</Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.card}>
                    <Card.Content>
                      <Surface style={styles.surface}>
                        <Paragraph>
                          {moment(location.timestamp).format(
                            'MM-DD-YYYY h:mm:ss',
                          )}
                        </Paragraph>
                      </Surface>
                      <Title>Date / Time</Title>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            </React.Fragment>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    marginVertical: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  detailBox: {
    padding: 15,
    justifyContent: 'center',
  },
  card: {
    margin: 5,
    padding: 5,
    width: '49%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#41729F',
  },
  surface: {
    margin: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    fontSize: 12,
    backgroundColor: '#C3E0E5',
  },
});
