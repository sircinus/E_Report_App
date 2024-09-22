import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import LogoTHS from './assets/images/LogoTHS.png';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.replace('LoginScreen');
  }, 4000);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={LogoTHS} />
      <Text style={styles.titleText}>Toan Hwa School</Text>
      <Text style={styles.titleTextMandarin}>端 华 学 校</Text>
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
    color: '#1e4611',
    fontFamily: 'Montserrat-Black',
    fontSize: 24,
    textAlign: 'center',
  },
  titleTextMandarin: {
    color: '#1e4611',
    fontFamily: 'MaShanZheng-Regular',
    fontSize: 36,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 10,
  },
});

export default SplashScreen;
