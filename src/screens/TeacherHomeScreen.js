import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const HomeScreen = props => {
  const navigation = useNavigation();
  const userName = props.route.params.name;
  const role = props.route.params.role;
  const userID = props.route.params.userID;

  const [classRoom, setClassRoom] = useState('');

  const getClassRoom = () => {
    axios
      .get(`https://modern-popular-coral.ngrok-free.app/room/${userID}`)
      .then(response => {
        // Since response.data is directly { roomName: "MANDARIN" }, no need for destructuring `data`
        const roomName = response.data.roomName;

        // Update the state with the room name
        setClassRoom(roomName);
      })
      .catch(error => {
        console.error('Error fetching the classroom', error);
      });
  };

  useEffect(() => {
    getClassRoom();
  }, []); // This runs when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.selamatText}>Selamat Datang,</Text>
      <View style={styles.introContainer}>
        <Text style={styles.introText}>{userName}</Text>
        <Text style={styles.introText}>{role}</Text>
      </View>

      <Text style={styles.classText}>Anda memegang kelas {classRoom} </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('YearScreen', {
            screenName: 'StudentDataScreen',
            grade: 'B',
            gradeText: 'gradeB',
          })
        }>
        <Text style={styles.buttonText}>Data Peserta Didik Kelompok B</Text>
        <FontAwesome name="user" style={styles.buttonIcon} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('YearScreen', {
            screenName: 'StudentDataScreen',
            grade: 'A',
            gradeText: 'gradeA',
          })
        }>
        <Text style={styles.buttonText}>Data Peserta Didik Kelompok A</Text>
        <FontAwesome name="user" style={styles.buttonIcon} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('YearScreen', {
            screenName: 'DescriptionScreen',
          })
        }>
        <Text style={styles.buttonText}>
          Deskripsi Perkembangan Peserta Didik
        </Text>
        <FontAwesome name="book" style={styles.buttonIcon} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('MapelScreen')}>
        <Text style={styles.buttonText}>Penilaian Mata Pelajaran</Text>
        <FontAwesome name="language" style={styles.buttonIcon} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('YearScreen', {screenName: 'ReportScreen'})
        }>
        <Text style={styles.buttonText}>
          Cetak Laporan Perkembangan Peserta Didik
        </Text>
        <FontAwesome
          name="file-pdf-o"
          style={styles.buttonIcon}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
  },
  selamatText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  classText: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 5,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: '#008000',
    color: '#f2bf52',
    fontSize: 16,
    textAlign: 'center',
  },
  introContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  introText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
  buttonContainer: {
    borderColor: '#008000',
    borderWidth: 2,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: 'black',
    width: '80%',
    alignSelf: 'center',
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonIcon: {
    fontSize: 40,
    alignSelf: 'center',
    color: '#008000',
  },
});

export default HomeScreen;
