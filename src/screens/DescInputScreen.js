import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const DescInputScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {student, transformedYear, year, semester} = route.params;

  const [textAgama, setTextAgama] = useState('');
  const [textJatiDiri, setTextJatiDiri] = useState('');
  const [textLiterasi, setTextLiterasi] = useState('');
  const [loading, setLoading] = useState(true);
  const [sickDays, setSickDays] = useState(0);
  const [permissionDays, setPermissionDays] = useState(0);
  const [alphaDays, setAlphaDays] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const NIS = student.NIS;

  const clearImages = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lpa-tktoanhwa-api.loca.lt/deskripsi/list/${NIS}/${transformedYear}/${semester}`,
        );
        const deskripsi = response.data.deskripsi;
        if (deskripsi) {
          setTextAgama(deskripsi.textAgama || '');
          setTextJatiDiri(deskripsi.textJatiDiri || '');
          setTextLiterasi(deskripsi.textLiterasi || '');
          setSickDays(deskripsi.sickDays || 0);
          setPermissionDays(deskripsi.permissionDays || 0);
          setAlphaDays(deskripsi.alphaDays || 0);
          setHeight(deskripsi.height || '');
          setWeight(deskripsi.weight || '');
          setImage1(deskripsi.image1 || null);
          setImage2(deskripsi.image2 || null);
          setImage3(deskripsi.image3 || null);
          setImage4(deskripsi.image4 || null);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'There was a problem fetching the record. Please try again.',
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [NIS, transformedYear, semester]);

  const pickImage = async setImage => {
    try {
      const image = await ImagePicker.openPicker({
        width: 450,
        height: 800,
        cropping: true,
        includeBase64: true,
      });
      setImage(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      if (error.message.includes('User cancelled image selection')) {
        console.log('Image selection was canceled.');
      } else {
        console.error('Error picking image: ', error);
        Alert.alert('Error', 'There was a problem picking the image.');
      }
    }
  };

  const handleSave = async () => {
    const payload = {
      NIS: student.NIS,
      name: student.name,
      year: transformedYear,
      semester: semester,
      textAgama: textAgama,
      textJatiDiri: textJatiDiri,
      textLiterasi: textLiterasi,
      sickDays: sickDays,
      permissionDays: permissionDays,
      alphaDays: alphaDays,
      height: height,
      weight: weight,
      image1: image1, // Base64 string
      image2: image2, // Base64 string
      image3: image3, // Base64 string
      image4: image4, // Base64 string
    };

    try {
      const response = await axios.post(
        'https://lpa-tktoanhwa-api.loca.lt/deskripsi/createorupdate',
        payload,
      );
      if (response.status === 200) {
        Alert.alert('Tersimpan', 'Record saved successfully!');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was a problem saving the record. Please try again.',
      );
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleKeyPress = e => {
    if (e.nativeEvent.key === 'Enter') {
      // Handle Enter key if needed
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>
          Tahun Pelajaran: {year} | Semester: {semester}
        </Text>
        <Text style={styles.nameText}>{student.name}</Text>

        {/* Image upload section */}
        <Text style={styles.subText}>Foto Deskripsi:</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => pickImage(setImage1)}
            style={styles.imagePickerButton}>
            {image1 ? (
              <Image source={{uri: image1}} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Pilih Foto 1</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage(setImage2)}
            style={styles.imagePickerButton}>
            {image2 ? (
              <Image source={{uri: image2}} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Pilih Foto 2</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage(setImage3)}
            style={styles.imagePickerButton}>
            {image3 ? (
              <Image source={{uri: image3}} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Pilih Foto 3</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage(setImage4)}
            style={styles.imagePickerButton}>
            {image4 ? (
              <Image source={{uri: image4}} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Pilih Foto 4</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearImages}>
          <Text style={styles.clearButtonText}>Hapus Foto Deskripsi</Text>
        </TouchableOpacity>

        <Text style={styles.subText}>Capaian Pembelajaran:</Text>

        <Text style={styles.subText}>1. Nilai Agama & Budi Pekerti: </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Deskripsi Capaian Pembelajaran"
          placeholderTextColor={'#ddd'}
          value={textAgama}
          onChangeText={setTextAgama}
          onKeyPress={handleKeyPress}
        />

        <Text style={styles.subText}>2. Jati Diri: </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Deskripsi Capaian Pembelajaran"
          placeholderTextColor={'#ddd'}
          value={textJatiDiri}
          onChangeText={setTextJatiDiri}
          onKeyPress={handleKeyPress}
        />

        <Text style={styles.subText}>
          3. Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan
          Seni:
        </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Deskripsi Capaian Pembelajaran"
          placeholderTextColor={'#ddd'}
          value={textLiterasi}
          onChangeText={setTextLiterasi}
          onKeyPress={handleKeyPress}
        />

        <View style={styles.hwContainer}>
          <View>
            <Text style={styles.subText}>Berat Badan:</Text>
            <View style={styles.subHWContainer}>
              <TextInput
                style={styles.inputHW}
                placeholder="BB"
                keyboardType="decimal-pad" // Use decimal-pad instead of numeric
                placeholderTextColor={'#ddd'}
                onChangeText={text =>
                  setWeight(parseFloat(text.replace(',', '.')))
                } // Replace comma with dot
                value={String(weight)}
              />
              <Text style={styles.unitText}>Kg</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subText}>Tinggi Badan:</Text>
            <View style={styles.subHWContainer}>
              <TextInput
                style={styles.inputHW}
                placeholder="TB"
                placeholderTextColor={'#ddd'}
                keyboardType="decimal-pad" // Use decimal-pad for height too
                onChangeText={text =>
                  setHeight(parseFloat(text.replace(',', '.')))
                } // Replace comma with dot
                value={String(height)}
              />
              <Text style={styles.unitText}>Cm</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.subHWContainer}>
            <Text style={styles.subText}>Sakit :</Text>
            <TextInput
              style={styles.inputSIA}
              placeholder="S"
              placeholderTextColor={'#ddd'}
              value={String(sickDays)}
              onChangeText={text => setSickDays(Number(text))}
              keyboardType="numeric"
            />
            <Text style={styles.unitDayText}>Hari</Text>
          </View>

          <View style={styles.subHWContainer}>
            <Text style={styles.subText}>Izin :</Text>
            <TextInput
              style={styles.inputSIA}
              placeholder="I"
              placeholderTextColor={'#ddd'}
              value={String(permissionDays)}
              keyboardType="numeric"
              onChangeText={text => setPermissionDays(Number(text))}
            />
            <Text style={styles.unitDayText}>Hari</Text>
          </View>

          <View style={styles.subHWContainer}>
            <Text style={styles.subText}>Alpha :</Text>
            <TextInput
              style={styles.inputSIA}
              placeholder="0"
              placeholderTextColor={'#ddd'}
              value={String(alphaDays)}
              keyboardType="numeric"
              onChangeText={text => setAlphaDays(Number(text))}
            />
            <Text style={styles.unitDayText}>Hari</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan Deskripsi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#f2bf52',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  titleText: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    textTransform: 'capitalize',
  },
  nameText: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textTransform: 'capitalize',
  },
  subText: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    margin: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  hwContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#43bc61',
  },
  subHWContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  unitText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  unitDayText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  inputHW: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    padding: 5,
  },
  inputSIA: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  imagePickerButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 124,
    width: 81,
    backgroundColor: '#ddd',
  },
  imagePickerText: {
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  imagePreview: {
    height: 124,
    width: 81,
  },
  clearButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  clearButtonText: {
    color: '#fefce5',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default DescInputScreen;
