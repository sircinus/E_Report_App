import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = props => {
  const {navigation} = props;

  const handleLogout = async () => {
    try {
      // Clear all AsyncStorage
      await AsyncStorage.clear();

      // Navigate to the LoginScreen
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.button}>
        <Button title="Keluar" onPress={handleLogout} color="red" />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default CustomDrawerContent;
