import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {logoBase64} from '../assets/images/base64images';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import DatePicker from 'react-native-date-picker';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';

const PrintReportScreen = () => {
  const handlePoinMDR = () => {
    axios.get(`https://lpa-tktoanhwa-api.loca.lt/poinMDR/list`).then(
      response => {
        const poinData = response.data.poinMDR;

        if (poinData.length > 0) {
          setPoinMDR1(poinData[0].namaPoin);
          setKetPoinMDR1(poinData[0].keteranganPoin);
        }
        if (poinData.length > 1) {
          setPoinMDR2(poinData[1].namaPoin);
          setKetPoinMDR2(poinData[1].keteranganPoin);
        }
        if (poinData.length > 2) {
          setPoinMDR3(poinData[2].namaPoin);
          setKetPoinMDR3(poinData[2].keteranganPoin);
        }
        if (poinData.length > 3) {
          setPoinMDR4(poinData[3].namaPoin);
          setKetPoinMDR4(poinData[3].keteranganPoin);
        }
        if (poinData.length > 4) {
          setPoinMDR5(poinData[4].namaPoin);
          setKetPoinMDR5(poinData[4].keteranganPoin);
        }
        ToastAndroid.show(
          'Indikator Bahasa Mandarin Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        );
      },

      error => {
        ToastAndroid.show('Error Indikator Mandarin', ToastAndroid.SHORT);
      },
    );
  };

  const handlePoinENG = () => {
    axios.get(`https://lpa-tktoanhwa-api.loca.lt/poinENG/list`).then(
      response => {
        const poinData = response.data.poinENG;

        if (poinData.length > 0) {
          setPoinENG1(poinData[0].namaPoin);
          setKetPoinENG1(poinData[0].keteranganPoin);
        }
        if (poinData.length > 1) {
          setPoinENG2(poinData[1].namaPoin);
          setKetPoinENG2(poinData[1].keteranganPoin);
        }
        if (poinData.length > 2) {
          setPoinENG3(poinData[2].namaPoin);
          setKetPoinENG3(poinData[2].keteranganPoin);
        }
        if (poinData.length > 3) {
          setPoinENG4(poinData[3].namaPoin);
          setKetPoinENG4(poinData[3].keteranganPoin);
        }
        if (poinData.length > 4) {
          setPoinENG5(poinData[4].namaPoin);
          setKetPoinENG5(poinData[4].keteranganPoin);
        }
        ToastAndroid.show(
          'Indikator Bahasa Inggris Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        );
      },
      error => {
        ToastAndroid.show('Error Indikator English', ToastAndroid.SHORT);
      },
    );
  };

  const calculateAge = birthdate => {
    const birthDate = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} TAHUN ${months} BULAN`;
  };

  const handleGetDeskripsi = () => {
    axios
      .get(
        `https://lpa-tktoanhwa-api.loca.lt/deskripsi/list/${student.NIS}/${transformedYear}/${semester}`,
      )
      .then(response => {
        setDeskripsi(response.data.deskripsi);
        ToastAndroid.show(
          'Deskripsi Perkembangan Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        ToastAndroid.show(
          'Belum Ada Deskripsi Perkembangan',
          ToastAndroid.SHORT,
        );
      });
  };

  const handleNilaiMDR = () => {
    axios
      .get(
        `https://lpa-tktoanhwa-api.loca.lt/nilaiMDR/list/${semester}/${transformedYear}/${student.NIS}`,
      )
      .then(response => {
        const data = response.data.nilaiMDR;

        // Assuming data is an array, and you want to use the first item
        if (data.length > 0) {
          const firstRecord = data[0];

          // Set individual nilai states
          setNilaiMDR1(firstRecord.nilai1);
          setNilaiMDR2(firstRecord.nilai2);
          setNilaiMDR3(firstRecord.nilai3);
          setNilaiMDR4(firstRecord.nilai4);
          setNilaiMDR5(firstRecord.nilai5);
        }

        setNilaiMDR(data);
        ToastAndroid.show(
          'Nilai Bahasa Mandarin Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        ); // Store the entire response in nilaiMDR as before
      })
      .catch(error => {
        ToastAndroid.show('Belum Ada Nilai Mandarin', ToastAndroid.SHORT);
      });
  };

  const handleNilaiENG = () => {
    axios
      .get(
        `https://lpa-tktoanhwa-api.loca.lt/nilaiENG/list/${semester}/${transformedYear}/${student.NIS}`,
      )
      .then(response => {
        const data = response.data.nilaiENG;

        if (data.length > 0) {
          const firstRecord = data[0];

          // Set individual nilai states
          setNilaiENG1(firstRecord.nilai1);
          setNilaiENG2(firstRecord.nilai2);
          setNilaiENG3(firstRecord.nilai3);
          setNilaiENG4(firstRecord.nilai4);
          setNilaiENG5(firstRecord.nilai5);
        }

        setNilaiENG(data);
        ToastAndroid.show(
          'Nilai Bahasa Inggris Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        ToastAndroid.show('Belum Ada Nilai English', ToastAndroid.SHORT);
      });
  };

  const handleName = () => {
    handleTeacherName();
    handlePrincipalName();
  };

  const handlePrincipalName = () => {
    axios
      .get(`https://lpa-tktoanhwa-api.loca.lt/users/principalName`)
      .then(response => {
        setPrincipalName(response.data.principalNameData.name);
        setPrincipalNRGTY(response.data.principalNameData.NRGTY);
        ToastAndroid.show(
          'Nama Kepala Sekolah Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        ToastAndroid.show(
          'Tidak Tersedia Nama Kepala Sekolah',
          ToastAndroid.SHORT,
        );
      });
  };

  const handleTeacherName = () => {
    axios
      .get(`https://lpa-tktoanhwa-api.loca.lt/room/${student.room}`)
      .then(response => {
        setTeacherName(response.data.teacherName);
        setTeacherNRGTY(response.data.NRGTY);
        ToastAndroid.show(
          'Nama Guru Kelas Berhasil Dimuat Ulang',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        ToastAndroid.show('Tidak Tersedia Nama Guru Kelas', ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    handleGetDeskripsi();
    handleNilaiMDR();
    handleNilaiENG();
    handlePoinMDR();
    handlePoinENG();
    handleName();
  }, []);

  const navigation = useNavigation();
  const route = useRoute();
  const {year, student, semester, transformedYear} = route.params;
  const kelompokUsia = student.gradeType == 'B' ? '5-6 TAHUN' : '4-5 TAHUN';
  const ageText = calculateAge(student.birthdate);
  const [principalName, setPrincipalName] = useState('');
  const [principalNRGTY, setPrincipalNRGTY] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherNRGTY, setTeacherNRGTY] = useState('');
  const [date, setDate] = useState(new Date());

  const formattedDate = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }); // Directly format the date without using additional state

  const [open, setOpen] = useState(false);

  const [deskripsi, setDeskripsi] = useState([]);
  const [nilaiMDR, setNilaiMDR] = useState([]);
  const [nilaiMDR1, setNilaiMDR1] = useState('');
  const [nilaiMDR2, setNilaiMDR2] = useState('');
  const [nilaiMDR3, setNilaiMDR3] = useState('');
  const [nilaiMDR4, setNilaiMDR4] = useState('');
  const [nilaiMDR5, setNilaiMDR5] = useState('');

  const [nilaiENG, setNilaiENG] = useState([]);
  const [nilaiENG1, setNilaiENG1] = useState('');
  const [nilaiENG2, setNilaiENG2] = useState('');
  const [nilaiENG3, setNilaiENG3] = useState('');
  const [nilaiENG4, setNilaiENG4] = useState('');
  const [nilaiENG5, setNilaiENG5] = useState('');

  const [poinMDR, setPoinMDR] = useState([]);
  const [poinMDR1, setPoinMDR1] = useState('');
  const [poinMDR2, setPoinMDR2] = useState('');
  const [poinMDR3, setPoinMDR3] = useState('');
  const [poinMDR4, setPoinMDR4] = useState('');
  const [poinMDR5, setPoinMDR5] = useState('');

  const [poinENG, setPoinENG] = useState([]);
  const [poinENG1, setPoinENG1] = useState('');
  const [poinENG2, setPoinENG2] = useState('');
  const [poinENG3, setPoinENG3] = useState('');
  const [poinENG4, setPoinENG4] = useState('');
  const [poinENG5, setPoinENG5] = useState('');

  const [ketPoinMDR, setKetPoinMDR] = useState([]);
  const [ketPoinMDR1, setKetPoinMDR1] = useState('');
  const [ketPoinMDR2, setKetPoinMDR2] = useState('');
  const [ketPoinMDR3, setKetPoinMDR3] = useState('');
  const [ketPoinMDR4, setKetPoinMDR4] = useState('');
  const [ketPoinMDR5, setKetPoinMDR5] = useState('');

  const [ketPoinENG, setKetPoinENG] = useState([]);
  const [ketPoinENG1, setKetPoinENG1] = useState('');
  const [ketPoinENG2, setKetPoinENG2] = useState('');
  const [ketPoinENG3, setKetPoinENG3] = useState('');
  const [ketPoinENG4, setKetPoinENG4] = useState('');
  const [ketPoinENG5, setKetPoinENG5] = useState('');

  const textAgamaFormatted = deskripsi.textAgama?.replace(/\n/g, '<br>') || '';
  const textJatiDiriFormatted =
    deskripsi.textJatiDiri?.replace(/\n/g, '<br>') || '';
  const textLiterasiFormatted =
    deskripsi.textLiterasi?.replace(/\n/g, '<br>') || '';

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
            font-size: 14px;
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
            <h3 class="headerText">KELOMPOK USIA ${kelompokUsia}</h3>
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
                    <td class="identitasRightText">: ${ageText}</td>
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
                <p class="descriptionTitle">DOKUMENTASI FOTO DESKRIPSI</p>
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
            <p class="descriptionText">${textAgamaFormatted}</p>

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
                <p class="descriptionTitle">JATI DIRI</p>
            </div>
        </div>
        <div class="jdContainer">
            <p class="descriptionText">
            ${textJatiDiriFormatted}
            </p>
        </div>
        <div class="descriptionBox3">
            <div>
                <p class="descriptionTitle">DASAR LITERASI DAN STEAM</p>
            </div>
        </div>
        <div class="steamContainer">
<p class="descriptionText">${textLiterasiFormatted}</p>
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
                    <td>${poinMDR1}<br>(${ketPoinMDR1})</td>
                    <td>${nilaiMDR1}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>${poinMDR2} <br>(${ketPoinMDR2})</td>
                    <td>${nilaiMDR2}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td> ${poinMDR3}<br>(${ketPoinMDR3})</td>
                    <td>${nilaiMDR3}</td>
                </tr>
              
                <tr>
                    <td>4</td>
                    <td>${poinMDR4}<br>(${ketPoinMDR4})</td>
                    <td>${nilaiMDR4}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td> ${poinMDR5} <br>(${ketPoinMDR5})</td>
                    <td>${nilaiMDR5}</td>
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
                    <td>${poinENG1} <br>(${ketPoinENG1})</td>
                    <td>${nilaiENG1}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>${poinENG2} <br>(${ketPoinENG2})</td>
                    <td>${nilaiENG2}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>${poinENG3}<br>(${ketPoinENG3})</td>
                    <td>${nilaiENG3}</td>
                </tr>
              
                <tr>
                    <td>4</td>
                    <td>${poinENG4} <br>(${ketPoinENG4})</td>
                    <td>${nilaiENG4}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td> ${poinENG5} <br>(${ketPoinENG5})</td>
                    <td>${nilaiENG5}</td>
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
                <p class="boldNameText">${principalName}</p>
                <p class="NRGTYText">NRGTY ${principalNRGTY}</p>
            </div>
          <div class="signRightContainer">
            <p class="signDateText">Tanjungpinang, ${formattedDate}</p>
            <p class="signBoldText">Guru Kelas TK ${student.gradeType} ${student.room}</p>
            <p class="boldNameText">${teacherName}</p>
            <p class="NRGTYText">NRGTY ${teacherNRGTY}</p>
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
      // Set up options for creating the PDF
      const options = {
        html: htmlContent, // HTML content to convert to PDF
        fileName: `${student.name}`, // Name of the PDF file
        directory: 'Documents', // Directory where the PDF will be saved
      };

      // Create the PDF
      const file = await RNHTMLtoPDF.convert(options);
      const filePath = file.filePath;

      console.log('PDF file created at:', filePath); // Log the file path for debugging

      // Check if the file exists
      const fileExists = await RNFS.exists(filePath);
      console.log('File exists:', fileExists);

      if (fileExists) {
        // Open the PDF file using FileViewer
        await FileViewer.open(filePath);
        console.log('PDF opened successfully');
      } else {
        console.error('PDF file does not exist:', filePath);
        Alert.alert('Error: PDF file does not exist');
      }
    } catch (error) {
      // Handle any errors that occur during PDF creation or opening
      console.error('Error creating or opening PDF:', error);
      Alert.alert('Error: ' + error.message); // Show error to the user
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          title="Pilih Tanggal Pembagian Laporan"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Tahun Pelajaran: {year}</Text>
          <Text style={styles.text}>Semester: {semester}</Text>
          <Text style={styles.text}>Nama: {student.name}</Text>
          <Text style={styles.text}>NIS: {student.NIS}</Text>
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Pilih Tanggal Cetak LPA: {formattedDate}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.pickDateButton}
            onPress={() => setOpen(true)} // Set open to true to show the date picker
          >
            <Icon name="calendar" size={28} color="#008000" />
          </TouchableOpacity>
        </View>

        <View style={styles.flexButtonContainer}>
          <TouchableOpacity
            style={
              !deskripsi.textAgama ? styles.refreshButton : styles.fetchedButton
            }
            onPress={handleGetDeskripsi}>
            <Text style={styles.refreshText}>Deskripsi Perkembangan Anak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !principalName || !teacherName
                ? styles.refreshButton
                : styles.fetchedButton
            }
            onPress={handlePrincipalName}>
            <Text style={styles.refreshText}>
              Nama Kepala Sekolah & Guru Kelas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!poinMDR1 ? styles.refreshButton : styles.fetchedButton}
            onPress={handlePoinMDR}>
            <Text style={styles.refreshText}>Indikator Bahasa Mandarin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!poinENG1 ? styles.refreshButton : styles.fetchedButton}
            onPress={handlePoinENG}>
            <Text style={styles.refreshText}>Indikator Bahasa English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!nilaiMDR1 ? styles.refreshButton : styles.fetchedButton}
            onPress={handleNilaiMDR}>
            <Text style={styles.refreshText}>Nilai Bahasa Mandarin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!nilaiENG1 ? styles.refreshButton : styles.fetchedButton}
            onPress={handleNilaiENG}>
            <Text style={styles.refreshText}>Nilai Bahasa English</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={createPDF}>
          <Text style={styles.buttonText}>Cetak Laporan PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce5',
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left',
  },
  textSub: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#008000',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#f2bf52',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  refreshButton: {
    backgroundColor: '#eb1420',
    width: '45%',
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
    alignItems: 'center',
  },
  fetchedButton: {
    backgroundColor: 'limegreen',
    width: '45%',
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
    alignItems: 'center',
  },
  pickDateButton: {
    backgroundColor: '#f2bf52',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
  },
  refreshText: {
    color: '#000',
    fontSize: 14,
    padding: 5,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  flexButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default PrintReportScreen;
