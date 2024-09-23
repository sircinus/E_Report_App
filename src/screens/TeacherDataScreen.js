import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

const TeacherDataScreen = () => {
  const navigation = useNavigation();
  const [teacher, setTeacher] = useState([]);
  const isFocused = useIsFocused();

  const fetchUsers = () => {
    axios
      .get('https://lpa-tktoanhwa-api.loca.lt/users/list')
      .then(res => {
        const sortedTeachers = res.data.users.sort((a, b) => {
          const roleOrder = {
            Admin: 1,
            'Kepala Sekolah': 2,
            Pendidik: 3,
          };
          return roleOrder[a.role] - roleOrder[b.role];
        });
        setTeacher(sortedTeachers);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {teacher.map((item, index) => (
          <View key={index} style={styles.teacherContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TeacherDetailScreen', {item})
              }>
              <View style={styles.wrapContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.roleText}>{item.role}</Text>
              </View>
              <Text style={styles.NRGTY}>NRGTY : {item.NRGTY}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('AddTeacherScreen')}>
        <AntDesign
          style={styles.buttonText}
          name="pluscircleo"
          size={30}
          color="white"
        />
        <Text style={styles.buttonText}>Tambah Data Baru</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fefce5',
    paddingBottom: 100,
  },
  teacherContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: '#008000',
    borderWidth: 2,
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  roleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#008000',
    marginVertical: 10,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#f2bf52',
  },
  NRGTY: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  grade: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'black',
    marginVertical: 5,
  },
});

export default TeacherDataScreen;
