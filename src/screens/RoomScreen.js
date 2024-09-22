import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const RoomScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [springData, setSpringData] = useState({teacher: '', status: ''});
  const [summerData, setSummerData] = useState({teacher: '', status: ''});
  const [rainbowData, setRainbowData] = useState({teacher: '', status: ''});
  const [sunshineData, setSunshineData] = useState({teacher: '', status: ''});
  const [inggrisData, setEnglishData] = useState({teacher: '', status: ''});
  const [mandarinData, setMandarinData] = useState({teacher: '', status: ''});

  // Function to fetch teacher and status data for a specific room
  const fetchRoomData = async (roomName, setRoomData) => {
    try {
      const response = await axios.get(
        `https://modern-popular-coral.ngrok-free.app/room/list/${roomName}`,
      );
      const roomInfo = response.data.roomsData[0];
      const teacherName = roomInfo.roomTeacher || '-';
      const roomStatus = roomInfo.status || '-';
      setRoomData({teacher: teacherName, status: roomStatus});
    } catch (error) {
      console.error(`Error fetching data for ${roomName}:`, error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchRoomData('SPRING', setSpringData);
      fetchRoomData('SUMMER', setSummerData);
      fetchRoomData('RAINBOW', setRainbowData);
      fetchRoomData('SUNSHINE', setSunshineData);
      fetchRoomData('INGGRIS', setEnglishData);
      fetchRoomData('MANDARIN', setMandarinData);
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.roomSubtitle}>Rombongan Kelas</Text>
      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() =>
          navigation.navigate('RoomDetailScreen', {
            teacher: springData.teacher,
            status: springData.status,
            room: 'SPRING',
          })
        }>
        <View style={styles.wrapContainer}>
          <Text style={styles.roomTitle}>TK-B SPRING</Text>
          <Text style={styles.statusText}>{springData.status}</Text>
        </View>
        <Text style={styles.roomTeacher}>Guru: {springData.teacher}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() =>
          navigation.navigate('RoomDetailScreen', {
            teacher: summerData.teacher,
            status: summerData.status,
            room: 'SUMMER',
          })
        }>
        <View style={styles.wrapContainer}>
          <Text style={styles.roomTitle}>TK-B SUMMER</Text>
          <Text style={styles.statusText}>{summerData.status}</Text>
        </View>
        <Text style={styles.roomTeacher}>Guru: {summerData.teacher}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() =>
          navigation.navigate('RoomDetailScreen', {
            teacher: rainbowData.teacher,
            status: rainbowData.status,
            room: 'RAINBOW',
          })
        }>
        <View style={styles.wrapContainer}>
          <Text style={styles.roomTitle}>TK-A RAINBOW</Text>
          <Text style={styles.statusText}>{rainbowData.status}</Text>
        </View>
        <Text style={styles.roomTeacher}>Guru: {rainbowData.teacher}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() =>
          navigation.navigate('RoomDetailScreen', {
            teacher: sunshineData.teacher,
            status: sunshineData.status,
            room: 'SUNSHINE',
          })
        }>
        <View style={styles.wrapContainer}>
          <Text style={styles.roomTitle}>TK-A SUNSHINE</Text>
          <Text style={styles.statusText}>{sunshineData.status}</Text>
        </View>
        <Text style={styles.roomTeacher}>Guru: {sunshineData.teacher}</Text>
      </TouchableOpacity>

      <Text style={styles.roomSubtitle}>Mata Pelajaran</Text>
      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() =>
          navigation.navigate('RoomDetailScreen', {
            teacher: inggrisData.teacher,
            status: inggrisData.status,
            room: 'INGGRIS',
          })
        }>
        <View style={styles.wrapContainer}>
          <Text style={styles.roomTitle}>BAHASA INGGRIS</Text>
          <Text style={styles.statusText}>{inggrisData.status}</Text>
        </View>
        <Text style={styles.roomTeacher}>Guru: {inggrisData.teacher}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() =>
          navigation.navigate('RoomDetailScreen', {
            teacher: mandarinData.teacher,
            status: mandarinData.status,
            room: 'MANDARIN',
          })
        }>
        <View style={styles.wrapContainer}>
          <Text style={styles.roomTitle}>BAHASA MANDARIN</Text>
          <Text style={styles.statusText}>{mandarinData.status}</Text>
        </View>
        <Text style={styles.roomTeacher}>Guru: {mandarinData.teacher}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefce5',
  },
  roomTitle: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  roomTeacher: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Regular',
    width: '75%',
  },
  roomContainer: {
    backgroundColor: 'white',
    margin: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#008000',
    borderWidth: 2,
  },
  roomSubtitle: {
    color: 'black',
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginVertical: 10,
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default RoomScreen;
