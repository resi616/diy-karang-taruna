import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation, route }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userToken } = route.params || {};

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        'https://diy-karang-taruna.vercel.app/api/tutorials/categories',
        {
          headers: { 'x-auth-token': userToken },
        },
      );
      setCategories(res.data);
    } catch (error) {
      console.log('Error fetch kategori:', error.message);
      Alert.alert('Error', 'Gagal mengambil data kategori.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subWelcome}>
              Continue your carpentry journey
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { userToken })}
            style={styles.profileBtn}
          >
            <Image
              source={require('../assets/profile_Icon.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder='Search tutorials...'
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
        </View>

        {loading ? (
          <ActivityIndicator size='large' color='#8B5E3C' />
        ) : (
          categories.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('TutorialList', {
                  categoryId: item._id,
                  userToken: userToken,
                  categoryName: item.name,
                })
              }
            >
              <Image
                source={{ uri: item.image }}
                style={styles.categoryImage}
              />

              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                {/* Count otomatis dari aggregate backend lu */}
                <Text style={styles.tutorialCount}>
                  {item.count || 0} tutorials available
                </Text>

                <View style={styles.startRow}>
                  <Image
                    source={require('../assets/hammer_white_Icon.png')}
                    style={styles.hammerSmall}
                    resizeMode='contain'
                  />
                  <Text style={styles.startText}>Start Learning</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    backgroundColor: '#2D3748',
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeText: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  subWelcome: { color: '#A0AEC0', fontSize: 14, marginTop: 5 },
  profileBtn: {
    backgroundColor: '#8B5E3C',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: { width: 25, height: 25 },
  searchBar: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 55,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  scrollContent: { padding: 20 },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3748' },
  viewAll: { color: '#8B5E3C', fontWeight: 'bold' },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  categoryImage: { width: 110, height: 110 },
  categoryInfo: { padding: 15, flex: 1, justifyContent: 'center' },
  categoryName: { fontSize: 18, fontWeight: 'bold', color: '#2D3748' },
  tutorialCount: { color: '#718096', fontSize: 13, marginVertical: 5 },
  startRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  hammerSmall: { width: 18, height: 18, marginRight: 8 },
  startText: { color: '#8B5E3C', fontWeight: 'bold' },
  btnSecondary: {
    borderWidth: 1,
    borderColor: '#8B5E3C',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  btnTextSecondary: { color: '#8B5E3C', fontWeight: 'bold' },
});
