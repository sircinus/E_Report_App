import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const SemesterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {year, transformedYear, grade, gradeText, mapel, screenName} =
    route.params;

  const handleSemesterPress = semester => {
    navigation.navigate(screenName, {
      year: year,
      transformedYear: transformedYear,
      grade: grade,
      gradeText: gradeText,
      mapel: mapel,
      semester: semester,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSemesterPress('GANJIL')}>
        <Text style={styles.buttonText}>GANJIL</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSemesterPress('GENAP')}>
        <Text style={styles.buttonText}>GENAP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    top: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#008000',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: '#f2bf52',
  },
});

export default SemesterScreen;
