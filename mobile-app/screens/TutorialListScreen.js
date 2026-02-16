import React, { useEffect, useState } from 'react';
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

export default function TutorialListScreen({ navigation, route }) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId, userToken, categoryName } = route.params || {};

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      // Endpoint ambil tutorial berdasarkan ID kategori
      const res = await axios.get(
        `https://diy-karang-taruna.vercel.app/api/tutorials/category/${categoryId}`,
        {
          headers: { 'x-auth-token': userToken },
        },
      );
      setTutorials(res.data);
    } catch (error) {
      console.log('Error fetch tutorials:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.categoryTitle}>{categoryName || 'Tutorials'}</Text>
        <Text style={styles.tutorialCount}>
          {tutorials.length} tutorials available
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size='large' color='#8B5E3C' />
        ) : (
          tutorials.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.videoCard}
              onPress={() =>
                navigation.navigate('TutorialDetail', {
                  tutorialId: item._id,
                  userToken,
                })
              }
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />

              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{item.title}</Text>

                <View style={styles.metaRow}>
                  <Image
                    source={require('../assets/clock_brown_Icon.png')}
                    style={styles.metaIcon}
                  />
                  <Text style={styles.metaText}>{item.duration} min</Text>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.metaText}>{item.level}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: {
    backgroundColor: '#2D3748',
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backIcon: { color: '#FFF', fontSize: 20, marginRight: 10 },
  backText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
  categoryTitle: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  tutorialCount: { color: '#A0AEC0', fontSize: 14, marginTop: 5 },
  scrollContent: { padding: 20 },
  videoCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  thumbnail: { width: '100%', height: 180 },
  videoInfo: { padding: 20 },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaIcon: { width: 14, height: 14, marginRight: 5 },
  metaText: { color: '#718096', fontSize: 14 },
  separator: { color: '#CBD5E0', marginHorizontal: 10 },
});
