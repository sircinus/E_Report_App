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
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddTeacherScreen = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);
  const [NRGTY, setNRGTY] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const roles = [
    {label: 'Admin', value: 'Admin'},
    {label: 'Kepala Sekolah', value: 'Kepala Sekolah'},
    {label: 'Pendidik', value: 'Pendidik'},
  ];

  const handleAddTeacher = () => {
    if (!userID || !name || !role || !NRGTY || !password) {
      ToastAndroid.show('Please fill in necessary fields', ToastAndroid.SHORT);
    } else {
      axios
        .post('https://lpa-tktoanhwa-api.loca.lt/users/register', {
          userID,
          name,
          role,
          NRGTY,
          password,
        })
        .then(res => {
          console.log(res.data);
          navigation.navigate('TeacherDataScreen');
          ToastAndroid.show('Account Added Successfully', ToastAndroid.SHORT);
        })
        .catch(err => {
          console.log(err);
          ToastAndroid.show('User ID already exists', ToastAndroid.SHORT);
        });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="User ID"
        placeholderTextColor={'gray'}
        onChangeText={text => setUserID(text)}
        setUserID={setUserID}
        style={styles.input}
      />
      <TextInput
        placeholder="Nama Lengkap"
        placeholderTextColor={'gray'}
        onChangeText={text => setName(text)}
        setName={setName}
        style={styles.input}
      />
      <View style={styles.dropdown}>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          data={roles}
          labelField="label"
          valueField="value"
          placeholder="Jabatan"
          value={role}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRole(item.value);
          }}
        />
      </View>
      <TextInput
        placeholder="Password"
        placeholderTextColor={'gray'}
        onChangeText={text => setPassword(text)}
        setPassword={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="NRGTY"
        placeholderTextColor={'gray'}
        onChangeText={text => setNRGTY(text)}
        setNRGTY={setNRGTY}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTeacher}>
        <MaterialIcons
          name="save-alt"
          style={styles.buttonIcon}
          color="black"
        />
        <Text style={styles.buttonText}>Simpan Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
  },
  button: {
    backgroundColor: '#008000',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  buttonText: {
    color: '#f2bf52',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonIcon: {
    fontSize: 24,
    color: '#f2bf52',
  },
  dropdown: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  itemTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
  },
});

export default AddTeacherScreen;
