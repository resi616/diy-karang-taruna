import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert('Error', 'Semua field harus diisi');
    }

    try {
      const response = await axios.post(
        'https://diy-karang-taruna.vercel.app/api/auth/register',
        {
          name,
          email,
          password,
        },
      );

      const token = response.data.token;

      Alert.alert('Sukses', 'Akun berhasil dibuat!');

      navigation.replace('Home', { userToken: token });
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || 'Gagal mendaftar, coba lagi nanti';
      Alert.alert('Register Gagal', errorMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill in your details to join Karang Taruna
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your full name'
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='your@email.com'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder='Create password'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By joining, you agree to our community guidelines
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  scrollContent: { padding: 30, paddingTop: 50 },
  backBtn: { marginBottom: 30 },
  backText: { color: '#2D3748', fontSize: 16, fontWeight: '500' },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: '#718096', marginBottom: 40 },
  inputContainer: { width: '100%' },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  btnPrimary: {
    backgroundColor: '#8B5E3C',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  footerText: {
    color: '#A0AEC0',
    marginTop: 30,
    textAlign: 'center',
    fontSize: 12,
  },
});
