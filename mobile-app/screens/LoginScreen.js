import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://diy-karang-taruna.vercel.app/api/auth/login',
        {
          email: email.toLowerCase().trim(),
          password,
        },
        { email, password },
      );
      const token = response.data.token;
      Alert.alert('Sukses', 'Login Berhasil!');
      navigation.replace('Home', { userToken: token });
    } catch (error) {
      console.log('Detail Error Login:', error.response?.data);
      Alert.alert('Error', error.response?.data?.msg || 'Login Gagal');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/hammer_Icon.png')}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.title}>DIY Carpentry</Text>
        <Text style={styles.subtitle}>Karang Taruna Workshop</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='your@email.com'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder='********'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        {/* Tombol Join as Member ke Register Page */}
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.btnTextSecondary}>Join as Member</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Learn carpentry skills from the community
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  content: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#8B5E3C',
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  logo: { width: 60, height: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2D3748' },
  subtitle: { fontSize: 16, color: '#A0AEC0', marginBottom: 40 },
  inputContainer: { width: '100%' },
  label: { fontWeight: 'bold', marginBottom: 8, color: '#2D3748' },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  btnPrimary: {
    backgroundColor: '#8B5E3C',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: '#8B5E3C',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  btnTextSecondary: { color: '#8B5E3C', fontWeight: 'bold', fontSize: 18 },
  footerText: { color: '#A0AEC0', marginTop: 30, textAlign: 'center' },
});
