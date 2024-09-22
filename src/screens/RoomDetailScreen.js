import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';

const RoomDetailScreen = ({route}) => {
  const handleUpdateRoom = () => {
    axios
      .put('https://modern-popular-coral.ngrok-free.app/room/updateRoom', {
        roomName: room,
        roomTeacher: selectedTeacher,
        status: selectedStatus,
      })
      .then(response => {
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error updating room:', error);
      });
  };

  const navigation = useNavigation();
  const {teacher, status, room} = route.params;

  const statusOptions = [
    {key: '1', value: 'Aktif'},
    {key: '2', value: 'Tidak Aktif'},
  ];

  const [teacherOptions, setTeacherOptions] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(teacher);
  const [selectedStatus, setSelectedStatus] = useState(status);

  useEffect(() => {
    axios
      .get('https://modern-popular-coral.ngrok-free.app/users/teacherList')
      .then(response => {
        const options = response.data.teacherNameData.map(item => ({
          key: item.name,
          value: item.name,
        }));
        setTeacherOptions(options);
      })
      .catch(error => {
        console.error('Error fetching teacher options:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapContainer}>
        <Text style={styles.label}>Kelas: </Text>
        <Text style={styles.roomName}>{room}</Text>
      </View>

      <Text style={styles.label}>Guru:</Text>
      <SelectList
        setSelected={setSelectedTeacher}
        data={teacherOptions}
        placeholder={teacher}
        boxStyles={styles.selectBox}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdownText}
        inputStyles={styles.inputText}
        defaultOption={{key: teacher, value: teacher}}
      />
      <Text style={styles.label}>Status: </Text>
      <SelectList
        setSelected={setSelectedStatus}
        data={statusOptions}
        placeholder={status}
        search={false}
        boxStyles={styles.selectBox}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdownText}
        inputStyles={styles.inputText}
        defaultOption={{key: status, value: status}}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateRoom}>
        <Text style={styles.buttonText}>Simpan Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fefce5',
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  selectBox: {
    borderColor: '#008000',
    backgroundColor: 'white',
  },
  dropdown: {
    borderColor: '#f2bf52',
    backgroundColor: '#f2bf52',
  },
  dropdownText: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  inputText: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#008000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#f2bf52',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  roomName: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    alignItems: 'center',
  },
});

export default RoomDetailScreen;
