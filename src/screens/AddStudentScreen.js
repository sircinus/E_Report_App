import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';

const AddStudentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {gradeText, transformedYear} = route.params;
  const [name, setName] = useState('');
  const [NIS, setNIS] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(''); // State for selected room
  const [open, setOpen] = useState(false);

  const genderOptions = [
    {label: 'LAKI-LAKI', value: 'L'},
    {label: 'PEREMPUAN', value: 'P'},
  ];

  // Static room options for "Rombongan Belajar"
  const roomOptions = [
    {label: 'SPRING', value: 'SPRING'},
    {label: 'SUMMER', value: 'SUMMER'},
    {label: 'RAINBOW', value: 'RAINBOW'},
    {label: 'SUNSHINE', value: 'SUNSHINE'},
  ];

  const handleAddStudent = () => {
    if (!name || !NIS || !birthdate || !gender || !selectedRoom) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }

    const reqData = {
      gradeText,
      academicYear: transformedYear,
      name,
      NIS,
      birthdate,
      gender,
      room: selectedRoom, // Include selected room in request data
    };

    axios
      .post(
        `https://modern-popular-coral.ngrok-free.app/${gradeText}/create`,
        reqData,
      )
      .then(res => {
        ToastAndroid.show('Student added successfully', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show(
          'Error adding student, please try again.',
          ToastAndroid.SHORT,
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>Nama Lengkap:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        onChangeText={text => setName(text)}
        value={name}
      />
      <Text style={styles.subText}>NIS:</Text>
      <TextInput
        style={styles.input}
        placeholder="NIS"
        onChangeText={text => setNIS(text)}
        value={NIS}
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
        onChange={item => {
          setGender(item.value);
        }}
      />
      <Text style={styles.subText}>Rombongan Belajar:</Text>
      <Dropdown
        placeholderStyle={styles.placeholderStyle}
        itemTextStyle={styles.itemTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        style={styles.dropdown}
        data={roomOptions}
        labelField="label"
        valueField="value"
        placeholder="Pilih Kelas"
        value={selectedRoom}
        onChange={item => {
          setSelectedRoom(item.value);
        }}
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
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddStudent}>
          <Icon name="check" style={styles.addLogo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
    margin: 10,
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
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addLogo: {
    fontSize: 40,
    color: 'rgb(242, 191, 82)',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 50,
  },
  datePicker: {
    marginLeft: 30,
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
});

export default AddStudentScreen;
