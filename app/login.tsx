import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Ganti dengan useRouter dari expo-router

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Gunakan useRouter untuk navigasi

  return (
    <View style={styles.container}>
      {/* Bulatan Dekoratif */}
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />
      <View style={styles.circleMidLeft} />
      <View style={styles.circleMidRight} />

      {/* Icon User Besar */}
      <Ionicons name="person-circle-outline" size={90} color="#555" style={styles.userIcon} />

      {/* Toggle User / Admin */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, styles.activeToggle]}
        >
          <Text style={[styles.toggleText, styles.activeText]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => router.push('/login-admin')} // Menggunakan router.push untuk navigasi
        >
          <Text style={styles.toggleText}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Username */}
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#6e7362" style={styles.inputIcon} />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#bbb"
          style={styles.input}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#6e7362" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#bbb"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#6e7362" />
        </TouchableOpacity>
      </View>

      {/* Lupa Password */}
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 40 }}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Tombol Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/')} // Menggunakan router.push untuk navigasi ke Home
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9af9e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 300,
  },
  userIcon: {
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: '#d3d5c6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  activeToggle: {
    backgroundColor: '#79846e',
    borderRadius: 8,
  },
  toggleText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
  },
  forgot: {
    marginTop: 5,
    color: '#333',
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#5a6450',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 30,
    width: '30%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Background Circle Styles
  circleTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 250,
    height: 250,
    backgroundColor: '#6e7362',
    borderRadius: 125,
    zIndex: -1,
  },
  circleBottomRight: {
    position: 'absolute',
    bottom: -120,
    right: -120,
    width: 250,
    height: 250,
    backgroundColor: '#5a6450',
    borderRadius: 125,
    zIndex: -1,
  },
  circleMidLeft: {
    position: 'absolute',
    top: 220,
    left: -40,
    width: 100,
    height: 100,
    backgroundColor: '#d6d6d6',
    borderRadius: 50,
    zIndex: -1,
  },
  circleMidRight: {
    position: 'absolute',
    top: 300,
    right: -30,
    width: 80,
    height: 80,
    backgroundColor: '#d6d6d6',
    borderRadius: 40,
    zIndex: -1,
  },
});
