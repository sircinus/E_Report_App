import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';

const DescInputScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {student, transformedYear, year, semester} = route.params;

  // Local state to store text input
  const [textAgama, setTextAgama] = useState('');
  const [textJatiDiri, setTextJatiDiri] = useState('');
  const [textLiterasi, setTextLiterasi] = useState('');
  const [loading, setLoading] = useState(true);
  const [sickDays, setSickDays] = useState(0);
  const [permissionDays, setPermissionDays] = useState(0);
  const [alphaDays, setAlphaDays] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const NIS = student.NIS;

  // Fetch the existing data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.8:3000/deskripsi/list/${NIS}/${transformedYear}/${semester}`,
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
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'There was a problem fetching the record. Please try again.',
        );
        console.error(error);
      } finally {
        setLoading(false); // Stop loading when the data is fetched
      }
    };

    fetchData();
  }, [NIS, transformedYear, semester]);

  // Function to handle saving description
  const handleSave = async () => {
    // Build the payload for API
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
    };

    try {
      // Make the POST request to create or update the description
      const response = await axios.post(
        `http://192.168.1.8:3000/deskripsi/createorupdate`,
        payload,
      );
      // Handle successful response
      if (response.status === 200) {
        Alert.alert('Tersimpan', 'Record saved successfully!');
      }
    } catch (error) {
      // Handle errors
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>
          Tahun Pelajaran: {year} | Semester: {semester}
        </Text>
        <Text style={styles.nameText}>{student.name}</Text>

        <Text style={styles.subText}>1. Nilai Agama & Budi Pekerti: </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Deskripsi Capaian Pembelajaran"
          value={textAgama}
          onChangeText={setTextAgama}
        />

        <Text style={styles.subText}>2. Jati Diri: </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Deskripsi Capaian Pembelajaran"
          value={textJatiDiri}
          onChangeText={setTextJatiDiri}
        />

        <Text style={styles.subText}>
          3. Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan
          Seni:
        </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Deskripsi Capaian Pembelajaran"
          value={textLiterasi}
          onChangeText={setTextLiterasi}
        />

        <View style={styles.hwContainer}>
          <View>
            <Text style={styles.subText}>Berat Badan:</Text>
            <View style={styles.subHWContainer}>
              <TextInput
                style={styles.inputHW}
                placeholder="BB"
                keyboardType="numeric"
                onChangeText={text => setWeight(Number(text))}
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
                keyboardType="numeric"
                onChangeText={text => setHeight(Number(text))}
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
              placeholder="Sakit"
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
              placeholder="Izin"
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
              placeholder="Alfa"
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
    padding: 5,
    maxWidth: '20%',
  },
});

export default DescInputScreen;
