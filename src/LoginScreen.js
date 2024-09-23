import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import React, {useState} from 'react';
import LogoTKTH from './assets/images/LogoTKTH.png';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const roles = [
  {label: 'Admin', value: 'Admin'},
  {label: 'Kepala Sekolah', value: 'Kepala Sekolah'},
  {label: 'Pendidik', value: 'Pendidik'},
];

const LoginScreen = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();

  const handleLogin = (userID, password, role) => {
    if (!userID || !password || !role) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
    }

    axios
      .post('https://lpa-tktoanhwa-api.loca.lt/users/login', {
        userID,
        password,
        role,
      })
      .then(res => {
        ToastAndroid.show('Login Success', ToastAndroid.SHORT);
        AsyncStorage.setItem('userID', userID);
        AsyncStorage.setItem('role', role);
        AsyncStorage.setItem('password', password);
        if (res.data.userID.role === 'Admin') {
          navigation.navigate('AdminHomeDrawer', {
            screen: 'Home',
            params: {
              userID: userID,
              role: role,
              name: res.data.userID.name,
            },
          });
        } else if (res.data.userID.role === 'Kepala Sekolah') {
          navigation.navigate('PrincipalHomeDrawer', {
            screen: 'Home',
            params: {
              userID: userID,
              role: role,
              name: res.data.userID.name,
            },
          });
        } else if (res.data.userID.role === 'Pendidik') {
          navigation.navigate('TeacherHomeDrawer', {
            screen: 'Home',
            params: {
              userID: userID,
              role: role,
              name: res.data.userID.name,
            },
          });
        }
      })
      .catch(err => {
        ToastAndroid.show(
          'Incorrect ID, Password, or Role',
          ToastAndroid.SHORT,
        );
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={LogoTKTH} />
      <Text style={styles.titleText}>
        Aplikasi Laporan Perkembangan Peserta Didik TK Toan Hwa
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="ID"
          placeholderTextColor={'gray'}
          value={userID}
          onChangeText={setUserID}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.layout}>
        <View style={styles.dropdown}>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            itemTextStyle={styles.itemTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={roles}
            labelField="label"
            valueField="value"
            placeholder="Jabatan"
            value={role}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setRole(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Icon style={styles.icon} name="person" size={18} />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin(userID, password, role)}>
          <Text style={styles.loginText}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    width: '80%',
    marginVertical: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
  dropdown: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '60%',
    padding: 10,
    marginTop: 20,
  },
  icon: {
    color: 'black',
    marginRight: 10,
  },
  selectedTextStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  inputField: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 5,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginHorizontal: 10,
    color: '#000',
  },
  inputContainer: {
    width: '90%',
  },
  layout: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: '#008000',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    flexGrow: 0.6,
  },
  loginText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#f2bf52',
  },
  itemTextStyle: {
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  placeholderStyle: {
    fontFamily: 'Montserrat-Regular',
    color: 'grey',
  },
});

export default LoginScreen;
