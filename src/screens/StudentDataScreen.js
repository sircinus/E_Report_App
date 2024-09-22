import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

const StudentDataScreen = ({route}) => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const {year, grade, gradeText, transformedYear} = route.params;

  const fetchStudents = () => {
    axios
      .get(
        `https://modern-popular-coral.ngrok-free.app/${gradeText}/list/${transformedYear}`,
      )
      .then(res => {
        let studentsData;

        switch (gradeText) {
          case 'gradeB':
            studentsData = res.data.gradeB;
            break;
          case 'gradeA':
            studentsData = res.data.gradeA;
            break;
          default:
            console.log('Error');
        }

        studentsData.sort((a, b) => a.name.localeCompare(b.name));

        studentsData = studentsData.map(student => ({
          ...student,
          age: calculateAge(student.birthdate),
        }));

        setStudents(studentsData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const calculateAge = birthdate => {
    const birthDate = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} Tahun, ${months} Bulan`;
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStudents();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapContainer}>
        <Text style={styles.headerText}>Tahun Ajaran: {year}</Text>
        <Text style={styles.headerText}>Kelompok: {grade}</Text>
      </View>
      <ScrollView>
        {students.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StudentDetailScreen', {item, gradeText})
              }
              style={[
                styles.studentContainer,
                {
                  borderColor: item.gender === 'L' ? 'lightblue' : 'pink',
                },
              ]}>
              <View style={styles.wrapContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.nisText}>NIS: {item.NIS}</Text>
              </View>
              <Text style={styles.ageText}>Kelas: {item.room} </Text>
              <Text style={styles.ageText}>Usia: {item.age}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addStudentButton}
        onPress={() =>
          navigation.navigate('AddStudentScreen', {gradeText, transformedYear})
        }>
        <Text style={styles.addButtonText}>Tambah Peserta Didik Baru</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fefce5',
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  studentContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  nameText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    width: '75%',
  },
  nisText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  birthdateText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  ageText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  addStudentButton: {
    backgroundColor: '#008000',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#f2bf52',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default StudentDataScreen;
