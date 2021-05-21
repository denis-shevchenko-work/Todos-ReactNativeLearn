import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Splash = () => (
  <View style={styles.contentContainer}>
    <ActivityIndicator color="black" />
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
