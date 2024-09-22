import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const MapelScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Indikator Penilaian</Text>
      <View style={styles.wrapContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('MDRIndicatorScreen')}>
          <Text style={styles.buttonText2}>Bahasa Mandarin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('ENGIndicatorScreen')}>
          <Text style={styles.buttonText2}>Bahasa Inggris</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>Penilaian</Text>
      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={() =>
          navigation.navigate('YearScreen', {
            screenName: 'MapelGradeScreen',
            mapel: 'MANDARIN',
          })
        }>
        <Text style={styles.buttonText}>Penilaian Bahasa Mandarin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer2}
        onPress={() =>
          navigation.navigate('YearScreen', {
            screenName: 'MapelGradeScreen',
            mapel: 'INGGRIS',
          })
        }>
        <Text style={styles.buttonText}>Penilaian Bahasa Inggris</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefce5',
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    width: '45%',
    textAlign: 'center',
    borderColor: '#008000',
    borderWidth: 2,
    flex: 1,
  },
  buttonContainer2: {
    backgroundColor: '#008000',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#f2bf52',
    textAlign: 'center',
  },
  buttonText2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default MapelScreen;
