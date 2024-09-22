import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const YearScreen = ({route}) => {
  const navigation = useNavigation();
  const {screenName, mapel} = route.params; // Get the screen name from HomeScreen
  const [currentYear, setCurrentYear] = useState('2024/2025');
  const [years, setYears] = useState(['2024/2025']);

  const getCurrentDate = () => {
    return new Date();
  };

  const getNextYear = year => {
    const [startYear, endYear] = year.split('/').map(Number);
    return `${startYear + 1}/${endYear + 1}`;
  };

  const shouldAddNextYear = currentDate => {
    const thresholdDate = new Date('2025-07-01');
    return currentDate >= thresholdDate;
  };

  useEffect(() => {
    const currentDate = getCurrentDate();

    if (shouldAddNextYear(currentDate)) {
      const nextYear = getNextYear(currentYear);
      if (!years.includes(nextYear)) {
        setYears([...years, nextYear]);
      }
    }
  }, [currentYear]);

  const handleYearPress = year => {
    const [firstPart, secondPart] = year.split('/');
    const transformedYear = firstPart.slice(-2) + secondPart.slice(-2);

    // Check if the target screen is related to grading
    if (
      screenName === 'MapelGradeScreen' ||
      screenName === 'DescriptionScreen'
    ) {
      // Navigate to SemesterScreen for grading
      navigation.navigate('SemesterScreen', {
        year: year,
        transformedYear: transformedYear,
        grade: route.params.grade,
        gradeText: route.params.gradeText,
        mapel: mapel,
        screenName: screenName, // Pass the grading screen name
      });
    } else {
      // Directly navigate to the specified screen if not grading
      navigation.navigate(screenName, {
        year: year,
        transformedYear: transformedYear,
        grade: route.params.grade,
        gradeText: route.params.gradeText,
        mapel: mapel,
      });
    }
  };

  const simulateNextYear = () => {
    const nextYear = getNextYear(currentYear);
    if (!years.includes(nextYear)) {
      setYears([...years, nextYear]);
      setCurrentYear(nextYear); // Optionally update the current year to the next year
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sekarang berada di tahun ajaran {currentYear}
      </Text>
      <ScrollView style={styles.scrollView}>
        {years.map((year, index) => (
          <TouchableOpacity
            key={index}
            style={styles.yearButton}
            onPress={() => handleYearPress(year)}>
            <Text style={styles.yearText}>Tahun Ajaran {year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.simulateButton}
        onPress={simulateNextYear}>
        <Text style={styles.simulateButtonText}>Simulate Next Year</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fefce5',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  yearButton: {
    padding: 15,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#008000',
  },
  yearText: {
    color: '#f2bf52',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  simulateButton: {
    padding: 15,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f2bf52',
  },
  simulateButtonText: {
    color: '#008000',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default YearScreen;
