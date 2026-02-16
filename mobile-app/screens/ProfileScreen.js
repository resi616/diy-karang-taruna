import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function ProfileScreen({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userToken } = route.params || {};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          'https://diy-karang-taruna.vercel.app/api/users/profile',
          {
            headers: { 'x-auth-token': userToken },
          },
        );
        setUser(res.data);
      } catch (e) {
        console.log('Error fetch profile:', e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <ActivityIndicator size='large' color='#8B5E3C' style={{ flex: 1 }} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={{ color: '#FFF', fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/profile_Icon.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>{user?.name || 'Budi Santoso'}</Text>
        <Text style={styles.memberSince}>Member since February 2026</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.menuGrid}>
          <View style={styles.menuItem}>
            <Image
              source={require('../assets/setting_Icon.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Settings</Text>
          </View>
          <View style={styles.menuItem}>
            <Image
              source={require('../assets/notifIcon.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Notifications</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Progress</Text>
        <View style={styles.card}>
          <Image
            source={require('../assets/tutorialscompleted_Icon.png')}
            style={styles.cardIcon}
          />
          <View>
            <Text style={styles.cardVal}>
              {user?.completed_tutorials?.length || 0}
            </Text>
            <Text style={styles.cardLab}>Tutorials Completed</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            source={require('../assets/hours_Icon.png')}
            style={styles.cardIcon}
          />
          <View>
            <Text style={styles.cardVal}>8.5</Text>
            <Text style={styles.cardLab}>Hours Learned</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            source={require('../assets/certificates_icon.png')}
            style={styles.cardIcon}
          />
          <View>
            <Text style={styles.cardVal}>3</Text>
            <Text style={styles.cardLab}>Certificates Earned</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    backgroundColor: '#2D3748',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: { alignSelf: 'flex-start' },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5E3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: { width: 40, height: 40 },
  userName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  memberSince: { color: '#A0AEC0', fontSize: 14 },
  content: { padding: 20 },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  menuIcon: { width: 25, height: 25, marginBottom: 10 },
  menuLabel: { fontWeight: 'bold', color: '#2D3748' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: { width: 30, height: 30, marginRight: 20 },
  cardVal: { fontSize: 22, fontWeight: 'bold', color: '#2D3748' },
  cardLab: { color: '#A0AEC0', fontSize: 14 },
  achieve: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  achIcon: { width: 45, height: 45, marginRight: 15 },
  achTitle: { fontWeight: 'bold', fontSize: 16, color: '#2D3748' },
  achDesc: { color: '#A0AEC0', fontSize: 12 },
  logoutBtn: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E53E3E',
    alignItems: 'center',
  },
  logoutText: { color: '#E53E3E', fontWeight: 'bold' },
});
