import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = ({route}) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [storedUserID, setStoredUserID] = useState(null);
  const [storedPassword, setStoredPassword] = useState(null);
  const [storedRole, setStoredRole] = useState(null);

  useEffect(() => {
    // Fetch data from AsyncStorage
    const getStoredData = async () => {
      try {
        const userID = await AsyncStorage.getItem('userID');
        const password = await AsyncStorage.getItem('password');
        const role = await AsyncStorage.getItem('role');

        // Set the state variables
        setStoredUserID(userID);
        setStoredPassword(password);
        setStoredRole(role);

        // Log the retrieved values
        console.log('Stored UserID:', userID);
        console.log('Stored Password:', password);
        console.log('Stored Role:', role);
      } catch (error) {
        console.error('Failed to load data from AsyncStorage', error);
      }
    };

    getStoredData();
  }, []);

  const handlePassword = async () => {
    if (!password || !passwordBaru || !passwordConfirm) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }

    if (passwordBaru !== passwordConfirm) {
      ToastAndroid.show('Password baru tidak sama', ToastAndroid.SHORT);
      return;
    }

    try {
      // Retrieve stored values from AsyncStorage
      const storedUserID = await AsyncStorage.getItem('userID');
      const storedRole = await AsyncStorage.getItem('role');

      if (!storedUserID || !storedRole) {
        ToastAndroid.show('Failed to retrieve user data', ToastAndroid.SHORT);
        return;
      }

      // Make the request to verify the old password and update to the new one
      const response = await axios.put(
        'http://192.168.1.8:3000/users/updateTeacherPassword',
        {
          userID: storedUserID,
          password: password, // Use the current password inputted by the user
          passwordBaru: passwordBaru,
          role: storedRole,
        },
      );

      // Handle success response
      if (response.status === 200) {
        ToastAndroid.show('Password Changed Successfully', ToastAndroid.SHORT);
        navigation.navigate('LoginScreen');
        ToastAndroid.show('Silahkan Ulang Login!', ToastAndroid.SHORT); // Navigate back on success
      }
    } catch (error) {
      ToastAndroid.show('Password Lama Salah', ToastAndroid.SHORT); // Incorrect old password
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>Password Lama: </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.subText}>Password Baru: </Text>
      <TextInput
        value={passwordBaru}
        onChangeText={setPasswordBaru}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.subText}>Konfirmasi Password Baru: </Text>
      <TextInput
        onChangeText={setPasswordConfirm}
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handlePassword}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: 'white',
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  subText: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: '#008000',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f2bf52',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
});

export default AccountScreen;
