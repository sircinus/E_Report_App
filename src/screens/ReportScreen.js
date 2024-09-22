import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const ReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {transformedYear, semester, year} = route.params;
  const [classRoom, setClassRoom] = useState('SPRING');
  const [showSPRING, setShowSPRING] = useState(true);
  const [showSUMMER, setShowSUMMER] = useState(false);
  const [showRAINBOW, setShowRAINBOW] = useState(false);
  const [showSUNSHINE, setShowSUNSHINE] = useState(false);
  const [studentName, setStudentName] = useState([]);

  const handleshowSPRING = () => {
    setShowSPRING(true);
    setShowSUMMER(false);
    setShowRAINBOW(false);
    setShowSUNSHINE(false);

    setClassRoom('SPRING');
  };

  const handleshowSUMMER = () => {
    setShowSPRING(false);
    setShowSUMMER(true);
    setShowRAINBOW(false);
    setShowSUNSHINE(false);

    setClassRoom('SUMMER');
  };

  const handleshowRAINBOW = () => {
    setShowSPRING(false);
    setShowSUMMER(false);
    setShowRAINBOW(true);
    setShowSUNSHINE(false);

    setClassRoom('RAINBOW');
  };

  const handleshowSUNSHINE = () => {
    setShowSPRING(false);
    setShowSUMMER(false);
    setShowRAINBOW(false);
    setShowSUNSHINE(true);

    setClassRoom('SUNSHINE');
  };

  const fetchStudentName = () => {
    axios
      .get(
        `http://192.168.1.8:3000/room/list/${classRoom}/students/${transformedYear}`,
      )
      .then(res => {
        let studentsData;

        switch (classRoom) {
          case 'SPRING':
            studentsData = res.data.gradeBData;
            break;
          case 'SUMMER':
            studentsData = res.data.gradeBData;
            break;
          case 'RAINBOW':
            studentsData = res.data.gradeAData;
            break;
          case 'SUNSHINE':
            studentsData = res.data.gradeAData;
            break;
          default:
            console.log('No Class');
        }

        setStudentName(studentsData); // Update the state with fetched students
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudentName();
  }, [classRoom]);

  const renderStudentList = () => {
    if (studentName.length > 0) {
      // Sort the student names alphabetically by the 'name' property
      const sortedStudents = [...studentName].sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      // Wrap the entire list of students in one ScrollView
      return (
        <ScrollView>
          {sortedStudents.map((student, index) => (
            <TouchableOpacity
              key={index}
              style={styles.studentContainer}
              onPress={() =>
                navigation.navigate('PrintReportScreen', {
                  student,
                  semester: semester,
                  transformedYear: transformedYear,
                  year: year,
                })
              }>
              <Text style={styles.studentName}>{student.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return <Text style={styles.noStudentText}>Kelas Tidak Aktif</Text>;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Cetak LPA</Text>
      <Text style={styles.bigText}>
        Tahun Pelajaran: {year} | Semester: {semester}
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={handleshowSPRING}
          style={[
            styles.filterButton,
            showSPRING ? styles.activeButton : null,
          ]}>
          <Text style={styles.buttonTextFilter}>TK-B SPRING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleshowSUMMER}
          style={[
            styles.filterButton,
            showSUMMER ? styles.activeButton : null,
          ]}>
          <Text style={styles.buttonTextFilter}>TK-B SUMMER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleshowRAINBOW}
          style={[
            styles.filterButton,
            showRAINBOW ? styles.activeButton : null,
          ]}>
          <Text style={styles.buttonTextFilter}>TK-A RAINBOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleshowSUNSHINE}
          style={[
            styles.filterButton,
            showSUNSHINE ? styles.activeButton : null,
          ]}>
          <Text style={styles.buttonTextFilter}>TK-A SUNSHINE</Text>
        </TouchableOpacity>
      </View>

      {/* Render the student list here */}
      <View style={styles.studentList}>{renderStudentList()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
    paddingBottom: 190,
  },
  titleText: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  bigText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    gap: 5,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#008000',
  },
  buttonTextFilter: {
    paddingHorizontal: 5,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: 16,
  },
  studentList: {
    padding: 10,
  },
  studentName: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  noStudentText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: 'red',
    textAlign: 'center',
  },
  studentContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#008000',
  },
});

export default ReportScreen;
