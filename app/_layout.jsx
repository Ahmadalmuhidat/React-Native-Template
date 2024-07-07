import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Home = () => {
  const [SearchValue, setSearchValue] = useState('');
  const [ReservationData, setReservationData] = useState(null);

  const updateSearch = (search) => {
    setSearchValue(search);
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date.toLocaleTimeString(
      undefined,
      {
        hour: 'numeric',
        minute: 'numeric'
      });
  };

  const StoretReservationInfo = async (ReservationID) => {
    await AsyncStorage.setItem('Reservation', ReservationID);
  };

  const RemoveReservationInfo = async () => {
    await AsyncStorage.removeItem('Reservation');
    setReservationData(null);
  };

  const GetReservationInfo = async () => {
    try {
      const serverUrl = 'http://192.168.1.112:3000/reservations';
      const response = await axios.post(serverUrl, {
        ReservationID: SearchValue
      });

      await setReservationData(response.data.data);
      Alert.alert(
        "Your Reseravtion has been found",
        "Do you want to store Reseravtion information?",
        [
          {
            text: "No",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => StoretReservationInfo(response.data.data.ReservationID)
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const checkReservation = (checkInTime, checkOutTime) => {
    const today = new Date();
    const checkInDate = new Date(checkInTime);
    const checkOutDate = new Date(checkOutTime);
    const Valid = today >= checkInDate && today <= checkOutDate;

    if (Valid) {
      return true;
    } else {
      Alert.alert(
        "Sorry, your reservation has ended.",
        "Do you want to remove reservation information?",
        [
          {
            text: "No",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => RemoveReservationInfo()
          }
        ],
        { cancelable: false }
      );
      return false;
    }
  };

  const handleOpenDoor = async () => {
    const CheckInTime = ReservationData.CheckInTime;
    const CheckOutTime = ReservationData.CheckOutTime;

    if (checkReservation(CheckInTime, CheckOutTime)) {
      const LockName = ReservationData.LockName;
      const serverUrl = `https://blynk.cloud/external/api/update?token=-escySCayMWSFg1BeT2XD36nhAqPw0xp&${LockName}=1`;

      await axios.get(serverUrl);
    }
  };

  const GetStoredReservation = async () => {
    try {
      const Reservation = await AsyncStorage.getItem('Reservation');
      if (Reservation) {
        const serverUrl = 'http://192.168.1.112:3000/reservations';
        const response = await axios.post(serverUrl, {
          ReservationID: Reservation
        });

        await setReservationData(response.data.data);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  useEffect(() => {
    GetStoredReservation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Reservation Number"
        onChangeText={updateSearch}
        value={SearchValue}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        onSubmitEditing={GetReservationInfo}
      />

      {ReservationData ?
        <>
          <View style={styles.card}>
            <View style={styles.Field}>
              <View style={styles.FieldConent}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.FieldConent}>
                <Text style={styles.RightLabel}>
                  Guest Name
                </Text>
                <Text style={styles.RightValue}>
                  {ReservationData.GuestName}
                </Text>
              </View>
            </View>
            <View style={styles.Field}>
              <View style={styles.FieldConent}>
                <Text style={styles.LeftLabel}>
                  Reservation ID
                </Text>
                <Text style={styles.LeftValue}>
                  {ReservationData.ReservationID}
                </Text>
              </View>
              <View style={styles.FieldConent}>
                <Text style={styles.RightLabel}>
                  Room Number
                </Text>
                <Text style={styles.RightValue}>
                  {ReservationData.RoomNumber}
                </Text>
              </View>
            </View>
            <View style={styles.Field}>
              <View style={styles.FieldConent}>
                <Text style={styles.LeftLabel}>
                  Check In Date
                </Text>
                <Text style={styles.LeftValue}>
                  {formatDateTime(ReservationData.CheckInDate)}
                </Text>
              </View>
              <View style={styles.FieldConent}>
                <Text style={styles.RightLabel}>
                  Check Out Date
                </Text>
                <Text style={styles.RightValue}>
                  {formatDateTime(ReservationData.CheckOutDate)}
                </Text>
              </View>
            </View>
            <View style={styles.Field}>
              <View style={styles.FieldConent}>
                <Text style={styles.LeftLabel}>
                  Check In Time
                </Text>
                <Text style={styles.LeftValue}>
                  {formatTime(ReservationData.CheckInTime)}
                </Text>
              </View>
              <View style={styles.FieldConent}>
                <Text style={styles.RightLabel}>
                  Check Out Time
                </Text>
                <Text style={styles.RightValue}>
                  {formatTime(ReservationData.CheckOutTime)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color='#fff'
              title="Open Door"
              onPress={handleOpenDoor}
            />
          </View>
        </>
        :
        <Text>
          You have no reservation stored at the Moment
        </Text>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    width: '85%',
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: '#EDEDED',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  Field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  FieldConent: {
    flex: 1,
    marginRight: 5,
  },
  LeftLabel: {
    fontSize: 12,
    color: '#888'
  },
  LeftValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  RightLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right'
  },
  RightValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  logo: {
    width: 100,
    height: 80
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#284184',
    borderRadius: 10,
    padding: 10,
    width: '80%'
  },
});

export default Home;