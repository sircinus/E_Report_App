import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const navigation = useNavigation();

  const role = props.route.params.role;
  return (
    <View style={styles.container}>
      <Text style={styles.selamatText}>Selamat Datang,</Text>
      <View style={styles.introContainer}>
        <Text style={styles.introText}>{props.route.params.name}</Text>
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
