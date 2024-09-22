import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = props => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const getUserID = async () => {
      const storedUserID = await AsyncStorage.getItem('userID');
      if (storedUserID) {
        setUserID(storedUserID);
        fetchUserData(storedUserID);
      }
    };

    getUserID();
  }, []);

  const fetchUserData = async userID => {
    try {
      const response = await axios.get(
        `https://modern-popular-coral.ngrok-free.app/users/${userID}`,
      );

      setUserName(response.data.users.name);
      setRole(response.data.users.role);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.selamatText}>Selamat Datang,</Text>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>{userName}</Text>
          <Text style={styles.introText}>{role}</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('TeacherDataScreen');
          }}>
          <Text style={styles.buttonText}>
            Data Kepala Sekolah & Tenaga Pendidik
          </Text>
          <FontAwesome5
            name="chalkboard-teacher"
            style={styles.buttonIcon}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('RoomScreen')}>
          <Text style={styles.buttonText}>Rombongan Kelas</Text>
          <FontAwesome name="group" style={styles.buttonIcon} color="black" />
        </TouchableOpacity>

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
          <FontAwesome
            name="language"
            style={styles.buttonIcon}
            color="black"
          />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
  },
  introContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selamatText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
    marginTop: 10,
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
