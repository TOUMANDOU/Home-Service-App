import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/WarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
           
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./../../../assets/Images/login.png')}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text style={styles.mainText}>
          Let's Find
          <Text style={{ fontWeight: 'bold' }}> Professional Cleaning and repair </Text>
          Service
        </Text>
        <Text style={styles.subText}>
          Best App to find services near you which deliver a professional service
        </Text>
        <TouchableOpacity style={styles.button} 
        onPress={(onPress)}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 3,
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%'
  },
  loginImage: {
    width: 230,
    height: 450, // Adjusted for better fit on various screen sizes
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    height: '90%', // Adjusted width for better appearance
    backgroundColor: Colors.PRIMARY,
    marginTop: -20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 27,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    color: Colors.WHITE,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: Colors.PRIMARY,
  },
});
