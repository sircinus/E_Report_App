import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TeacherDetailScreen = ({route}) => {
  const roles = [
    {label: 'Admin', value: 'Admin'},
    {label: 'Kepala Sekolah', value: 'Kepala Sekolah'},
    {label: 'Pendidik', value: 'Pendidik'},
  ];

  const grades = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'AB', value: 'AB'},
  ];

  const navigation = useNavigation();
  const {item} = route.params;
  console.log(item);
  const [userID, setUserID] = useState(item.userID);
  const [name, setName] = useState(item.name);
  const [role, setRole] = useState(item.role);
  const [NRGTY, setNRGTY] = useState(item.NRGTY);
  const [grade, setGrade] = useState(item.grade);
  const [isFocus, setIsFocus] = useState(false);

  const handleUpdateTeacher = () => {
    if (!userID || !name || !role) {
      ToastAndroid.show('Please fill in necessary fields', ToastAndroid.SHORT);
    } else {
      axios
        .put('https://lpa-tktoanhwa-api.loca.lt/users/updateTeacherDetail', {
          userID,
          name,
          role,
          NRGTY,
          grade,
        })
        .then(res => {
          console.log(res.data);
          ToastAndroid.show('Account Updated Successfully', ToastAndroid.SHORT);
          navigation.goBack();
        });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Delete',
          onPress: () => {
            axios
              .delete('https://lpa-tktoanhwa-api.loca.lt/users/deleteTeacher', {
                data: {userID},
              })
              .then(res => {
                console.log(res.data.message);
                ToastAndroid.show(
                  'Account Deleted Successfully',
                  ToastAndroid.SHORT,
                );
                navigation.goBack();
              })
              .catch(err => {
                console.log(err);
                ToastAndroid.show('Error Deleting Account', ToastAndroid.SHORT);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleResetPassword = () => {
    Alert.alert(
      'Reset Password',
      'Password akan direset sama dengan UserID',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: newPassword => {
            axios
              .put(
                'https://lpa-tktoanhwa-api.loca.lt/users/adminResetPassword',
                {
                  userID,
                },
              )
              .then(res => {
                ToastAndroid.show(
                  'Password Reset Successfully',
                  ToastAndroid.SHORT,
                );
              })
              .catch(err => {
                console.log(err);
                ToastAndroid.show(
                  'Error Resetting Password',
                  ToastAndroid.SHORT,
                );
              });
          },
        },
      ],
      'secure-text',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>ID:</Text>
      <TextInput
        style={styles.input}
        value={userID}
        onChangeText={setUserID}
        editable={false}
        disabled={true}
      />
      <Text style={styles.subText}>Nama Lengkap:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.subText}>Jabatan:</Text>
      <View style={styles.dropdown}>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          data={roles}
          labelField="label"
          valueField="value"
          placeholder={role}
          value={role}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRole(item.value);
          }}
        />
      </View>

      <Text style={styles.subText}>NRGTY:</Text>
      <TextInput style={styles.input} value={NRGTY} onChangeText={setNRGTY} />

      <TouchableOpacity style={styles.button} onPress={handleUpdateTeacher}>
        <MaterialIcons
          name="save-alt"
          style={styles.buttonIcon}
          color="black"
        />
        <Text style={styles.buttonText}>Simpan Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonPass} onPress={handleResetPassword}>
        <FontAwesome name="lock" style={styles.buttonIcon} color="black" />
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <FontAwesome name="trash" style={styles.buttonIcon} color="black" />
        <Text style={styles.buttonText}>Hapus Data</Text>
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
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  dropdown: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  placeholderStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'black',
  },
  itemTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'black',
  },
  subText: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonPass: {
    backgroundColor: '#f2bf52',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonDelete: {
    backgroundColor: '#e7141a',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
  buttonText: {
    color: '#fefce5',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonIcon: {
    color: 'white',
    fontSize: 24,
  },
});

export default TeacherDetailScreen;
