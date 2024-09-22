import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const StudentDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {item, gradeText} = route.params;

  const [name, setName] = useState(item.name);
  const [NIS, setNIS] = useState(String(item.NIS));
  const [birthdate, setBirthdate] = useState(new Date(item.birthdate));
  const [gender, setGender] = useState(item.gender);
  const [open, setOpen] = useState(false);

  // Static room options
  const roomOptions = [
    {label: 'SPRING', value: 'SPRING'},
    {label: 'SUMMER', value: 'SUMMER'},
    {label: 'RAINBOW', value: 'RAINBOW'},
    {label: 'SUNSHINE', value: 'SUNSHINE'},
  ];

  // Set the initial selected room based on item.room
  const [selectedRoom, setSelectedRoom] = useState(item.room || null);

  const genderOptions = [
    {label: 'LAKI-LAKI', value: 'L'},
    {label: 'PEREMPUAN', value: 'P'},
  ];

  // Update student information
  const handleUpdateStudent = () => {
    if (!name || !NIS || !birthdate || !gender || !selectedRoom) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }

    axios
      .put(`https://modern-popular-coral.ngrok-free.app/${gradeText}/update`, {
        name,
        NIS,
        birthdate,
        gender,
        room: selectedRoom,
      })
      .then(res => {
        ToastAndroid.show('Account Updated Successfully', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };

  const handleDeleteStudent = () => {
    Alert.alert(
      'Hapus Data',
      'Apakah yakin menghapus data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            axios
              .delete(
                `https://modern-popular-coral.ngrok-free.app/${gradeText}/delete`,
                {
                  data: {NIS},
                },
              )
              .then(res => {
                ToastAndroid.show(
                  'Account Deleted Successfully',
                  ToastAndroid.SHORT,
                );
                navigation.goBack();
              })
              .catch(error => {
                console.error('Error deleting student:', error);
                ToastAndroid.show('Error Deleting Account', ToastAndroid.SHORT);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.subText}>Nama Lengkap:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          placeholderTextColor={'#000000'}
          onChangeText={text => setName(text)}
          value={name}
        />
        <Text style={styles.subText}>NIS:</Text>
        <TextInput
          style={styles.input}
          placeholder="NIS"
          value={NIS}
          editable={false}
        />
        <Text style={styles.subText}>Jenis Kelamin:</Text>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.dropdown}
          data={genderOptions}
          labelField="label"
          valueField="value"
          placeholder="Pilih Jenis Kelamin"
          value={gender}
          onChange={item => setGender(item.value)}
        />
        <Text style={styles.subText}>Rombongan Belajar:</Text>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.dropdown}
          data={roomOptions} // Use static room options directly
          labelField="label"
          valueField="value"
          placeholder="Pilih Kelas"
          value={selectedRoom}
          onChange={item => setSelectedRoom(item.value)}
        />
        <View style={styles.flexContainer}>
          <Text style={styles.subDateText}>Tanggal Lahir:</Text>
          <Text style={styles.dateText}>{birthdate.toLocaleDateString()}</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setOpen(true)}>
            <Icon name="calendar" style={styles.dateIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.datePicker}>
          <DatePicker
            modal
            open={open}
            date={birthdate}
            mode="date"
            title="Pilih Tanggal Lahir"
            onConfirm={date => {
              setOpen(false);
              setBirthdate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleUpdateStudent}>
          <Text style={styles.buttonText}>Simpan Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteStudent}>
          <Text style={styles.buttonText}>Hapus Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fefce5',
  },
  subText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'black',
  },
  subDateText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'black',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 10,
    color: 'black',
    padding: 10,
  },

  dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  dateIcon: {
    fontSize: 30,
    color: 'green',
    backgroundColor: 'rgb(242, 191, 82)',
    padding: 10,
    borderRadius: 5,
  },
  datePicker: {
    marginLeft: 30,
  },
  selectedTextStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  placeholderStyle: {
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
  },
  itemTextStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  buttonRow: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#008000',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e7141a',
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#fefce5',
  },
});

export default StudentDetailScreen;
