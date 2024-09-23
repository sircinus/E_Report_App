import {View, Text, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {SelectList} from 'react-native-dropdown-select-list';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MapelGradeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {mapel, transformedYear, semester, year} = route.params;

  const nilaiMapel = mapel === 'MANDARIN' ? 'nilaiMDR' : 'nilaiENG';
  const poinMapel = mapel === 'MANDARIN' ? 'poinMDR' : 'poinENG';

  const [studentNameA, setStudentNameA] = useState([]);
  const [studentNameB, setStudentNameB] = useState([]);
  const [studentScores, setStudentScores] = useState({});
  const [poinData, setPoinData] = useState([]);
  const [showA, setShowA] = useState(true); // Default to showing Group A
  const [showB, setShowB] = useState(false);

  // Fetch student names for Group A
  const getStudentNameA = () => {
    axios
      .get(`https://lpa-tktoanhwa-api.loca.lt/gradeA/list/${transformedYear}`)
      .then(res => {
        setStudentNameA(res.data.gradeA);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Fetch student names for Group B
  const getStudentNameB = () => {
    axios
      .get(`https://lpa-tktoanhwa-api.loca.lt/gradeB/list/${transformedYear}`)
      .then(res => {
        setStudentNameB(res.data.gradeB);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getPoinData = () => {
    axios
      .get(`https://lpa-tktoanhwa-api.loca.lt/${poinMapel}/list`)
      .then(res => {
        setPoinData(res.data[`${poinMapel}`]);
      })
      .catch(err => {
        console.log('Error fetching poin data:', err);
      });
  };

  // Fetch existing scores for the selected semester
  const getScores = () => {
    axios
      .get(
        `https://lpa-tktoanhwa-api.loca.lt/${nilaiMapel}/list/${semester}/${transformedYear}`,
      )
      .then(res => {
        const scores = res.data[`${nilaiMapel}`];
        const scoresMap = {};
        scores.forEach(score => {
          scoresMap[score.NIS] = {
            nilai1: score.nilai1,
            nilai2: score.nilai2,
            nilai3: score.nilai3,
            nilai4: score.nilai4,
            nilai5: score.nilai5,
          };
        });
        setStudentScores(scoresMap);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudentNameA();
    getStudentNameB();
    getScores();
    getPoinData();
  }, []);

  // Handle score changes
  const handleScoreChange = (NIS, field, value) => {
    setStudentScores(prevScores => ({
      ...prevScores,
      [NIS]: {
        ...prevScores[NIS],
        [field]: value,
      },
    }));
  };

  // Manually render each student's 5 score fields
  const renderStudentList = (students, grade) => {
    const nilaiOptions = [
      {key: 'BB', value: 'BB'},
      {key: 'MB', value: 'MB'},
      {key: 'BSH', value: 'BSH'},
      {key: 'BSB', value: 'BSB'},
    ];

    return (
      <View>
        {students.map((student, index) => {
          const studentNIS = student.NIS;
          const studentScore = studentScores[studentNIS] || {};

          return (
            <View key={index} style={styles.bigContainer}>
              <View style={styles.wrapContainer}>
                <Text style={styles.nameText}>{student.name}</Text>
                <Text style={styles.NISText}>{student.NIS}</Text>
              </View>

              {[1, 2, 3, 4, 5].map(num => (
                <View key={num} style={styles.wrapContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.boldText}>
                      {poinData[num - 1]?.namaPoin}
                    </Text>
                    <Text style={styles.subText}>
                      {poinData[num - 1]?.keteranganPoin}
                    </Text>
                  </View>

                  <SelectList
                    setSelected={value =>
                      handleScoreChange(studentNIS, `nilai${num}`, value)
                    }
                    data={nilaiOptions}
                    placeholder={studentScore[`nilai${num}`] || 'Nilai'}
                    boxStyles={styles.selectBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.inputText}
                    maxHeight={100}
                    dropdownTextStyles={styles.dropdownItem}
                    search={false}
                  />
                </View>
              ))}
            </View>
          );
        })}
      </View>
    );
  };

  const handleSave = () => {
    const allStudents = [...studentNameA, ...studentNameB];
    const savePromises = [];

    allStudents.forEach(student => {
      const studentNIS = student.NIS;
      const studentScoresToSave = {
        NIS: studentNIS,
        name: student.name,
        year: transformedYear,
        semester: semester,
        nilai1: studentScores[studentNIS]?.nilai1 || null,
        nilai2: studentScores[studentNIS]?.nilai2 || null,
        nilai3: studentScores[studentNIS]?.nilai3 || null,
        nilai4: studentScores[studentNIS]?.nilai4 || null,
        nilai5: studentScores[studentNIS]?.nilai5 || null,
      };

      savePromises.push(
        axios.post(
          `https://lpa-tktoanhwa-api.loca.lt/${nilaiMapel}/createorupdate`,
          studentScoresToSave,
        ),
      );
    });

    Promise.all(savePromises)
      .then(responses => {
        ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT); // Show toast once after all saves are done
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };
  const handleShowA = () => {
    setShowA(true);
    setShowB(false);
  };

  const handleShowB = () => {
    setShowA(false);
    setShowB(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mata Pelajaran {mapel}</Text>
      <Text style={styles.bigText}>
        Tahun Pelajaran: {year} | Semester: {semester}
      </Text>

      {/* Button group for filtering lists */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.filterButton, showA ? styles.activeButton : null]}
          onPress={handleShowA}>
          <Text style={styles.buttonTextFilter}>Kelompok A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, showB ? styles.activeButton : null]}
          onPress={handleShowB}>
          <Text style={styles.buttonTextFilter}>Kelompok B</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {showA && renderStudentList(studentNameA, 'TK A')}
        {showB && renderStudentList(studentNameB, 'TK B')}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Simpan Nilai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#008000',
  },
  buttonTextFilter: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  textContainer: {
    width: '65%',
    borderBottomWidth: 1,
    padding: 5,
  },
  titleText: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize',
  },
  bigText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize',
  },
  bigContainer: {
    borderColor: '#008000',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectBox: {
    backgroundColor: '#f2bf52',
    borderWidth: 0,
  },
  sideText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  subText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
  },
  NISText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: '#f2bf52',
    borderWidth: 0,
  },
  dropdownItem: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  inputText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fefce5',
    paddingVertical: 10,
  },
  saveButton: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#008000',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f2bf52',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
  boldText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
  nameText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    width: '65%',
  },
  // ... rest of the styles (from previous code)
});

export default MapelGradeScreen;
