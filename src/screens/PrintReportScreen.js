import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {logoBase64} from '../assets/images/base64images';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const PrintReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [deskripsi, setDeskripsi] = useState([]);

  const {year, student, semester, transformedYear} = route.params;
  console.log('tahun:', year);
  console.log('student name:', deskripsi.name);
  console.log('student NIS: ', deskripsi.NIS);
  console.log('semester:', semester);
  console.log('agama dan budi pekerti: ', deskripsi.textAgama);
  console.log('jati diri: ', deskripsi.textJatiDiri);
  console.log('literasi: ', deskripsi.textLiterasi);
  console.log('sakit: ', deskripsi.sickDays);
  console.log('izin: ', deskripsi.permissionDays);
  console.log('alpha: ', deskripsi.alphaDays);
  console.log('tinggi badan: ', deskripsi.height);
  console.log('berat badan: ', deskripsi.weight);

  const handleGetDeskripsi = () => {
    axios
      .get(
        `http://192.168.1.8:3000/deskripsi/list/${student.NIS}/${transformedYear}/${semester}`,
      )
      .then(response => {
        setDeskripsi(response.data.deskripsi);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetDeskripsi();
  }, []);
  // Function to generate PDF
  const createPDF = async () => {
    const htmlContent = `
      <!DOCTYPE html>
<html lang="en, zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Perkembangan Peserta Didik</title>
    <style>

        @page {
            size: A4;
            margin: 0 auto;
            padding: 0;
        }

        * {
            box-sizing: border-box;
            font-family: 'Times New Roman', sans-serif;
        }

        .page {
            page-break-after: always;
        }

        .page:last-child {
            page-break-after: auto;
        }

        .content {
            padding-top: 50px;
            padding-bottom: 50px;
            width: 100%;
        }

        .kopHeader {
            text-align: center;
            margin-top: 10px;
        }

        .kopBoldText {
            font-weight: bold;
            margin: 0;
            font-size: 20px;
            letter-spacing: 3px;
        }

        .kopSubText {
            margin: 0;
            font-size: 16px;
        }

        .seperatorLine {
            width: 100%;
            margin-top: 2px;
            margin-bottom: 2px;
            height: 3px;
            border-bottom: 1px solid black;
        }

        .logo {
            width: 100px;
            height: 95px;
            position: fixed;
            left: 0;
            top: 1.25%;
        }

        .headerTitle {
            text-align: center;
            margin-top: 10px;
        }

        .headerText {
            margin: 0;
            font-size: 20px;
        }

        .identitasAnak {
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .identitasLeftSubText {
            width: 20%;
            margin: 0;
            font-size: 16px;
        }

        .identitasRightSubText {
            width: 12%;
            margin: 0;
            font-size: 16px;
        }

        .identitasRightText {
            width: 25%;
            margin: 0;
            font-size: 16px;
        }

        .descriptionBox {
            width: 90%;
            margin: 0 auto;
            border: 1px solid black;
            border-bottom: none;
            background-color: #e5b8b7;
        }

        .descriptionBox2 {
            width: 90%;
            margin: 0 auto;
            border: 1px solid black;
            background-color: #e5b8b7;
            border-bottom: none;
            margin-top: 20px;
        }

        .descriptionBox3 {
            width: 90%;
            margin: 0 auto;
            border: 1px solid black;
            background-color: #e5b8b7;
            border-bottom: none;
        }

        .descriptionTitle {
            margin: 0;
            font-size: 16px;
            text-align: center;
            font-weight: bold;
        }

        .allPhotoContainer {
            width: 90%;
            margin: 0 auto;
            border: black 1px solid;
            height: 200px;
            align-items: center;
            display: flex;
            justify-content: center;
            border-bottom: none;
        }

        .photoContainer {
            width: 20%;
            height: 90%;
            background-color: red;
            border: solid 1px black;
            margin: 10px;
        }

        .photo {
            width: 100%;
            height: 100%;
        }

        .namContainer {
            height: 475px;
            border: 1px solid black;
            width: 90%;
            margin: 0 auto;
        }

        .jdContainer {
            height: 425px;
            border: 1px solid black;
            border-bottom: none;
            width: 90%;
            margin: 0 auto;
        }

        .steamContainer {
            height: 425px;
            border: 1px solid black;
            width: 90%;
            margin: 0 auto;
        }

        .descriptionText {
            margin-top: 5px;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 16px;
            text-align: justify;
            line-height:  1.5;
        }

        .closingContainer {
            width: 90%;
            height: 25%;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 16px;
            display: flex;
            justify-content: space-around;
        }

        .attendanceContainer {
            width: 50%;
            border: 1px solid black;
            padding-top: 25px;
        }

        .commentContainer {
            width: 50%;
            border: 1px solid black;
            border-left: none;
        }

        .dateText {
            text-align: right;
            margin-right: 10px;
        }

        .commentText {
            text-align: left;
            margin-left: 15px;
            margin-top: 50px;
            margin-bottom: 15px;
        }

        .parentSignName {
            font-weight: bold;
            margin: 0 auto;
            margin-top: 80px;
            padding: 5px;
            border-top: 1px solid black;
            width: 50%;
        }

        .inputDots {
            margin: 10px;
        }

        .attendanceInput {
            text-align: left;
            margin-left: 10px;
            margin-top: 20px;
        }

        .attendanceTitle {
            margin-top: 50px;
            margin-left: 10px;
            text-align: left;
        }

        .attendanceText {
            margin: 0;
            font-size: 16px;
        }

        .mandarinTable, .englishTable {
            text-align: center;
            margin-top: 20px;
            line-height: 25px;
            
        }

        .inputTable {
            width: 90%;
            margin: 0 auto;
            border-collapse: collapse;
            font-size: 16px;
        }

        th {
            border: 1px solid black;
            background-color: #8eaadb;
        }

        tr {
            border: 1px solid black;
        }

        .inputTable td {
            border: 1px solid black;
        }

        tr td:nth-child(2) {
            text-align: left;
            padding-left: 5px;
        }

        th:nth-child(1) {
            width: 5%;
        }

        th:nth-child(3) {
            width: 25%;
        }

        .gradeDesc {
            font-size: 12px;
            font-weight: bold;
            width: 90%;
            margin: 0 auto;
            margin-top: 10px;
        }

        .gradeDescText {
            margin: 0;
        }

        .hwTable {
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            font-size: 16px;
            border: 1px solid black;
        }

        .hwTable td:nth-child(1) {
            width: 20%;
        }

        .signContainer {
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            height: 15%;
            border: 1px solid black;
            display: flex;
            justify-content: left;
        }

        .signLeftContainer {
            border-right: 1px solid black;
            width: 50%;
            text-align: center;
        }

        .signRightContainer {
            width: 50%;
           text-align: center;
        }

        .signDateText {
            margin: auto 0;
            margin-top: 5px;
        }

        .signBoldText {
            font-weight: bold;
            margin: 0;
            margin-top: 5px;
        }

        .leftText {
            margin: auto 0;
            margin-top: 5px;
        }

        .boldNameText {
            font-weight: bold;
            margin: 0 auto;
            text-decoration: underline;
            margin-top: 80px;
        }

        .NRGTYText {
            margin: 0 auto;
        }

    </style>
</head>

<body>
    <div class="page">
        <div class="kopHeader">
            <img src="${logoBase64}" class="logo" alt="logo sekolah">
            <h1 class="kopBoldText">YAYASAN TOAN HWA KEPRI</h1>
            <h1 class="kopBoldText">TAMAN KANAK-KANAK TOAN HWA</h1>
            <h1 class="kopBoldText">TERAKREDITASI: A</h1>
            <p class="kopSubText">Jalan Engku Puteri, Kecamatan Bukit Bestari, Tanjungpinang</p>
            <p class="kopSubText">Telp: 0771-28585 | Email: toanhwa@sch.id | Website: http://www.toanhwa.sch.id</p>
            <div class="seperatorLine"></div>
            <div class="seperatorLine"></div>
        </div>
        <div class="headerTitle">
            <h3 class="headerText">
                LAPORAN PERKEMBANGAN PESERTA DIDIK
            </h3>
            <h3 class="headerText">KELOMPOK USIA 5 - 6 TAHUN</h3>
            <h3 class="headerText">
                TAHUN AJARAN ${year}
            </h3>
        </div>
        <div>
            <table class="identitasAnak" border="0">
                <tr>
                    <td class="identitasLeftSubText">NAMA ANAK</td>
                    <td>: <b>${student.name}</b></td>
                    <td class="identitasRightSubText">USIA</td>
                    <td class="identitasRightText">: 6 TAHUN 1 BULAN</td>
                </tr>
                <tr>
                    <td class="identitasLeftSubText">NOMOR INDUK</td>
                    <td>: ${student.NIS}</td>
                    <td class="identitasRightSubText">SEMESTER</td>
                    <td class="identitasRightText">: ${semester}</td>
                </tr>
            </table>
        </div>
        <div class="descriptionBox">
            <div>
                <p class="descriptionTitle">DOKUMENTASI FOTO BERSERI</p>
            </div>
        </div>
        <div class="allPhotoContainer">
            <div class="photoContainer">
                <img src="${deskripsi.image1}" class="photo" alt="photo 1">
            </div>
            <div class="photoContainer">
                <img src="${deskripsi.image2}" class="photo" alt="photo 2">
            </div>
            <div class="photoContainer">
                <img src="${deskripsi.image3}" class="photo" alt="photo 3">
            </div>
            <div class="photoContainer">
                <img src="${deskripsi.image4}" class="photo" alt="photo 4">
            </div>
        </div>
        <div class="descriptionBox">
            <div>
                <p class="descriptionTitle">NILAI AGAMA & BUDI PEKERTI</p>
            </div>
        </div>
        <div class="namContainer">
            <p class="descriptionText">${deskripsi.textAgama}</p>

        </div>
    </div>

    <div class="page">
        <div class="kopHeader">
            <img src="${logoBase64}" class="logo" alt="logo sekolah">
            <h1 class="kopBoldText">YAYASAN TOAN HWA KEPRI</h1>
            <h1 class="kopBoldText">TAMAN KANAK-KANAK TOAN HWA</h1>
            <h1 class="kopBoldText">TERAKREDITASI: A</h1>
            <p class="kopSubText">Jalan Engku Puteri, Kecamatan Bukit Bestari, Tanjungpinang</p>
            <p class="kopSubText">Telp: 0771-28585 | Email: toanhwa@sch.id | Website: http://www.toanhwa.sch.id</p>
            <div class="seperatorLine"></div>
            <div class="seperatorLine"></div>
        </div>

        <div class="descriptionBox2">
            <div>
                <p class="descriptionTitle">${deskripsi.textJatiDiri}</p>
            </div>
        </div>
        <div class="jdContainer">
            <p class="descriptionText">
                (Tidak Lebih Dari 250 Kata)
            </p>
        </div>
        <div class="descriptionBox3">
            <div>
                <p class="descriptionTitle">${deskripsi.textLiterasi}</p>
            </div>
        </div>
        <div class="steamContainer">
<p class="descriptionText">(Tidak Lebih Dari 250 Kata)</p>
        </div>
    </div>

    <div class="page">
        <div class="kopHeader">
            <img src="${logoBase64}" class="logo" alt="logo sekolah">
            <h1 class="kopBoldText">YAYASAN TOAN HWA KEPRI</h1>
            <h1 class="kopBoldText">TAMAN KANAK-KANAK TOAN HWA</h1>
            <h1 class="kopBoldText">TERAKREDITASI: A</h1>
            <p class="kopSubText">Jalan Engku Puteri, Kecamatan Bukit Bestari, Tanjungpinang</p>
            <p class="kopSubText">Telp: 0771-28585 | Email: toanhwa@sch.id | Website: http://www.toanhwa.sch.id</p>
            <div class="seperatorLine"></div>
            <div class="seperatorLine"></div>
        </div>
        <div class="mandarinTable">
            <table border="0" class="inputTable">
                <th>NO</th>
                <th>MUATAN LOKAL BAHASA MANDARIN</th>
                <th>HASIL PENILAIAN</th>
                <tr>
                    <td>1</td>
                    <td>听力 & 问答 <br>(Mendengar & Menjawab)</td>
                    <td>BSH</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td> 搭配单词 <br>(Mencocokkan Kosakata dengan Gambar)</td>
                    <td>BSH</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td> 数学 <br>(Angka & Menghitung)</td>
                    <td>BSH</td>
                </tr>
              
                <tr>
                    <td>4</td>
                    <td> 口语 <br>(Lisan)</td>
                    <td>BSH</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td> 笔画 <br>(Goresan)</td>
                    <td>BSH</td>
                </tr>
            </table>
        </div>
        <div class="englishTable">
            <table border="0" class="inputTable">
                <th>NO</th>
                <th>MUATAN LOKAL BAHASA INGGRIS</th>
                <th>HASIL PENILAIAN</th>
                <tr>
                    <td>1</td>
                    <td>Listening and Focus on the Lessons <br>(Mendengarkan & Fokus pada Pembelajaran)</td>
                    <td>BSH</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td> Writing Letters & Words <br>(Menulis Huruf & Kata)</td>
                    <td>BSH</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td> Speaking & Following What the Teacher Say <br>(Berbicara dan Mengikuti Apa yang Diucapkan Guru)</td>
                    <td>BSH</td>
                </tr>
              
                <tr>
                    <td>4</td>
                    <td> Answering Questions <br>(Menjawab Pertanyaan)</td>
                    <td>BSH</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td> Determine the Right & Wrong Answers <br>(Menentukan Jawaban yang Benar & Salah)</td>
                    <td>BSH</td>
                </tr>
            </table>
        </div>
        <table border="0" class="gradeDesc">
            <tr>
                <td><p class="gradeDescText">*BB : Belum Berkembang (Perlu Dibantu Guru)</p></td>
                <td><p class="gradeDescText">*BSH : Berkembang Sesuai Harapan (Tanpa Bantuan)</p></td>
            </tr>
            <tr>
                <td><p class="gradeDescText">*MB : Mulai Berkembang (Bisa, Masih Diingatkan)</p></td>
                <td><p class="gradeDescText">*BSB : Berkembang Sangat Baik (Bisa, Membantu Teman)</p></td>
            </tr>
        </table>
        <div>
            <table class="hwTable">
                <tr>
                    <td>Tinggi Badan</td>
                    <td>: ${deskripsi.height} cm</td>
                </tr>
                <tr>
                    <td>Berat Badan</td>
                    <td>: ${deskripsi.weight} kg</td>
            </table>
        </div>
        <div class="signContainer">
            <div class="signLeftContainer">
                <p class="leftText">Mengetahui,</p>
                <p class="signBoldText">Kepala TK Toan Hwa</p>
                <p class="boldNameText">WAHYU MURNI SARI</p>
                <p class="NRGTYText">NRGTY 005.072015.19911702</p>
            </div>
          <div class="signRightContainer">
            <p class="signDateText">Tanjungpinang, 8 September 2024</p>
            <p class="signBoldText">Guru Kelas TK-A SUNSHINE</p>
            <p class="boldNameText">FITRIANTI, S.Pd.</p>
            <p class="NRGTYText">NRGTY 016.07.2016.19891505</p>
          </div>
           

        </div>
    </div>

    <div class="page">
        <div class="kopHeader">
            <img src="${logoBase64}" class="logo" alt="logo sekolah">
            <h1 class="kopBoldText">YAYASAN TOAN HWA KEPRI</h1>
            <h1 class="kopBoldText">TAMAN KANAK-KANAK TOAN HWA</h1>
            <h1 class="kopBoldText">TERAKREDITASI: A</h1>
            <p class="kopSubText">Jalan Engku Puteri, Kecamatan Bukit Bestari, Tanjungpinang</p>
            <p class="kopSubText">Telp: 0771-28585 | Email: toanhwa@sch.id | Website: http://www.toanhwa.sch.id</p>
            <div class="seperatorLine"></div>
            <div class="seperatorLine"></div>
        </div>
        <div class="closingContainer">
            <div class="attendanceContainer">
                <p class="attendanceTitle">Kehadiran: </p>
                <div class="attendanceInput">
                    <table border="0">
                        <tr>
                            <td>
                                <p class="attendanceText">Sakit</p>
                            </td>
                            <td>
                                <p class="attendanceText">: ${deskripsi.sickDays} (hari)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="attendanceText">Izin</p>
                            </td>
                            <td>
                                <p class="attendanceText">: ${deskripsi.permissionDays} (hari)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="attendanceText">Alpha</p>
                            </td>
                            <td>
                                <p class="attendanceText">: ${deskripsi.alphaDays} (hari)</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="commentContainer">
                <p class="dateText">
                    Tanjungpinang, ..................................................</p>
                <p class="commentText">Tanggapan Orang Tua:</p>
                <p class="inputDots">............................................................................</p>
                <p class="inputDots">............................................................................</p>
                <p class="parentSignName">Orang Tua</p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    try {
      const options = {
        html: htmlContent, // Your HTML content
        fileName: 'report',
        directory: 'Documents', // Folder where the PDF will be saved
      };

      const file = await RNHTMLtoPDF.convert(options);

      Alert.alert('PDF Generated', `PDF saved at: ${file.filePath}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Print Report Screen</Text>
      <TouchableOpacity style={styles.button} onPress={createPDF}>
        <Text style={styles.buttonText}>Generate PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PrintReportScreen;
