import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Octicons from 'react-native-vector-icons/Octicons';

import SplashScreen from './src/SplashScreen';
import LoginScreen from './src/LoginScreen';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import CustomDrawerContent from './src/utils/customDrawerContent';
import TeacherDataScreen from './src/screens/TeacherDataScreen';
import AddTeacherScreen from './src/screens/AddTeacherScreen';
import TeacherDetailScreen from './src/screens/TeacherDetailScreen';
import YearScreen from './src/screens/YearScreen';
import StudentDataScreen from './src/screens/StudentDataScreen';
import AddStudentScreen from './src/screens/AddStudentScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import RoomScreen from './src/screens/RoomScreen';
import RoomDetailScreen from './src/screens/RoomDetailScreen';
import AccountScreen from './src/screens/AccountScreen';
import PrincipalHomeScreen from './src/screens/PrincipalHomeScreen';
import TeacherHomeScreen from './src/screens/TeacherHomeScreen';
import MapelScreen from './src/screens/MapelScreen';
import ENGIndicatorScreen from './src/screens/ENGIndicatorScreen';
import MDRIndicatorScreen from './src/screens/MDRIndicatorScreen';
import MapelGradeScreen from './src/screens/MapelGradeScreen';
import SemesterScreen from './src/screens/SemesterScreen';
import DescriptionScreen from './src/screens/DescriptionScreen';
import DescInputScreen from './src/screens/DescInputScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AdminHomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f2bf52',
        },
      }}
      initialRouteName="AdminHomeScreen"
      drawerContent={props => <CustomDrawerContent {...props} />} // Use custom drawer content
    >
      <Drawer.Screen
        name="Home"
        component={AdminHomeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="home" color={'#008000'} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="person" color={'#008000'} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const PrincipalHomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f2bf52',
        },
      }}
      initialRouteName="PrincipalHomeScreen"
      drawerContent={props => <CustomDrawerContent {...props} />} // Use custom drawer content
    >
      <Drawer.Screen
        name="Home"
        component={PrincipalHomeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="home" color={'#008000'} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="person" color={'#008000'} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const TeacherHomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f2bf52',
        },
      }}
      initialRouteName="TeacherHomeScreen"
      drawerContent={props => <CustomDrawerContent {...props} />} // Use custom drawer content
    >
      <Drawer.Screen
        name="Home"
        component={TeacherHomeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="home" color={'#008000'} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Octicons name="person" color={'#008000'} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminHomeDrawer" component={AdminHomeDrawer} />
        <Stack.Screen name="TeacherHomeDrawer" component={TeacherHomeDrawer} />
        <Stack.Screen
          name="PrincipalHomeDrawer"
          component={PrincipalHomeDrawer}
        />
        <Stack.Screen
          name="PrincipalHomeScreen"
          component={PrincipalHomeScreen}
        />
        <Stack.Screen
          name="TeacherDataScreen"
          component={TeacherDataScreen}
          options={{
            headerShown: true,
            headerTitle: 'Data Pendidik',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="AddTeacherScreen"
          component={AddTeacherScreen}
          options={{
            headerShown: true,
            headerTitle: 'Tambah Data',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="TeacherDetailScreen"
          component={TeacherDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Detail Data Pendidik',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="YearScreen"
          component={YearScreen}
          options={{
            headerShown: true,
            headerTitle: 'Pilih Tahun Ajaran',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="StudentDataScreen"
          component={StudentDataScreen}
          options={{
            headerShown: true,
            headerTitle: 'Data Peserta Didik',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="AddStudentScreen"
          component={AddStudentScreen}
          options={{
            headerShown: true,
            headerTitle: 'Tambah Peserta Didik',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="StudentDetailScreen"
          component={StudentDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Data Peserta Didik',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={{
            headerShown: true,
            headerTitle: 'Data Rombongan Kelas',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="RoomDetailScreen"
          component={RoomDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Ubah Data Rombongan Kelas',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="MapelScreen"
          component={MapelScreen}
          options={{
            headerShown: true,
            headerTitle: 'Mata Pelajaran',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="ENGIndicatorScreen"
          component={ENGIndicatorScreen}
          options={{
            headerShown: true,
            headerTitle: 'Indikator Penilaian Inggris',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="MDRIndicatorScreen"
          component={MDRIndicatorScreen}
          options={{
            headerShown: true,
            headerTitle: 'Indikator Penilaian Mandarin',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="MapelGradeScreen"
          component={MapelGradeScreen}
          options={{
            headerShown: true,
            headerTitle: 'Penilaian',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="SemesterScreen"
          component={SemesterScreen}
          options={{
            headerShown: true,
            headerTitle: 'Pilih Semester',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="DescriptionScreen"
          component={DescriptionScreen}
          options={{
            headerShown: true,
            headerTitle: 'Deskripsi',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
        <Stack.Screen
          name="DescInputScreen"
          component={DescInputScreen}
          options={{
            headerShown: true,
            headerTitle: 'Isi Deskripsi',
            headerStyle: {
              backgroundColor: '#f2bf52',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
