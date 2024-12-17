import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EnglishScreen = () => {
  const [data, setData] = useState([]);

  const handleGetData = () => {
    axios
      .get('https://lpa-tktoanhwa-api.loca.lt/poinENG/list')
      .then(response => {
        setData(response.data.poinENG);
        console.log(response.data.poinENG);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // Update individual fields in the data state
  const handleInputChange = (text, field, index) => {
    const updatedData = [...data];
    updatedData[index][field] = text;
    setData(updatedData);
  };

  // Save the updated data to the server
  const handleUpdate = item => {
    axios
      .put(
        `https://lpa-tktoanhwa-api.loca.lt/poinENG/update/${item.kodePoin}`,
        {
          namaPoin: item.namaPoin,
          keteranganPoin: item.keteranganPoin,
        },
      )
      .then(response => {
        console.log('Update successful:', response.data);
        ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT);
        handleGetData();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} style={styles.buttonContainer}>
          <TextInput
            multiline={true}
            style={styles.textInputTitle}
            placeholder="Isi Indikator Penilaian"
            value={item.namaPoin}
            onChangeText={text => handleInputChange(text, 'namaPoin', index)}
          />
          <TextInput
            multiline={true}
            placeholder="Isi Keterangan Indikator Penilaian"
            style={styles.textInputSubTitle}
            value={item.keteranganPoin}
            onChangeText={text =>
              handleInputChange(text, 'keteranganPoin', index)
            }
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdate(item)}>
            <Text style={styles.updateButtonText}>SIMPAN</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefce5',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fefce5',
    borderColor: '#008000',
    borderWidth: 1,
  },
  textInputTitle: {
    borderRadius: 5,
    padding: 5,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
  },
  textInputSubTitle: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'black',
  },
  updateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#008000',
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#f2bf52',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default EnglishScreen;
