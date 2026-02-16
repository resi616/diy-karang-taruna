import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function TutorialDetailScreen({ navigation, route }) {
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const { tutorialId, userToken } = route.params || {};

  const handleComplete = async () => {
    try {
      const res = await axios.put(
        `https://diy-karang-taruna.vercel.app/api/tutorials/complete/${tutorialId}`,
        {},
        {
          headers: { 'x-auth-token': userToken },
        },
      );

      if (res.status === 200) {
        Alert.alert(
          'Selamat!',
          'Tutorial ini sudah kamu selesaikan dan tercatat di profil.',
          [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
      }
    } catch (error) {
      console.log(
        'Error Mark as Complete:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Gagal menyimpan progres.',
      );
    }
  };

  const getYouTubeID = (url) => {
    if (!url) return '';
    const regex =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regex);
    return match && match[7].length === 11 ? match[7] : url;
  };

  useEffect(() => {
    const fetchTutorialDetail = async () => {
      try {
        const res = await axios.get(
          `https://diy-karang-taruna.vercel.app/api/tutorials/${tutorialId}`,
          {
            headers: { 'x-auth-token': userToken },
          },
        );
        setTutorial(res.data);
      } catch (error) {
        console.log('Error fetch detail:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorialDetail();
  }, [tutorialId]);

  if (loading)
    return (
      <ActivityIndicator size='large' color='#8B5E3C' style={{ flex: 1 }} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.videoHeader}>
          <YoutubePlayer
            height={230}
            play={playing}
            videoId={getYouTubeID(tutorial?.video_url)}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={{ color: '#FFF', fontSize: 24 }}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.title}>{tutorial?.title}</Text>
          <View style={styles.metaRow}>
            <Image
              source={require('../assets/clock_brown_Icon.png')}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{tutorial?.duration} min</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.metaText}>{tutorial?.level}</Text>
          </View>

          <Text style={styles.sectionTitle}>Step-by-Step Guide</Text>
          {tutorial?.steps?.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>{step.step_number}</Text>
              </View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
            </View>
          ))}

          <View style={styles.materialsHeader}>
            <Image
              source={require('../assets/hammer_brown_Icon.png')}
              style={styles.materialsIcon}
            />
            <Text style={styles.sectionTitle}>Materials Needed</Text>
          </View>
          <View style={styles.materialsCard}>
            {tutorial?.materials?.map((item, index) => (
              <View key={index} style={styles.materialRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.materialName}>{item.name}</Text>
                <Text style={styles.materialQty}>({item.quantity})</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
            <Text style={styles.completeText}>Mark as Complete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  videoHeader: { width: '100%', backgroundColor: '#000' },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  infoSection: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  metaIcon: { width: 16, height: 16, marginRight: 8 },
  metaText: { color: '#718096', fontSize: 14 },
  separator: { color: '#CBD5E0', marginHorizontal: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginVertical: 15,
  },
  stepItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 1,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B5E3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumber: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  stepTextContainer: { flex: 1 },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  stepDesc: { fontSize: 13, color: '#718096', lineHeight: 18 },
  materialsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  materialsIcon: { width: 20, height: 20, marginRight: 10 },
  materialsCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  materialRow: { flexDirection: 'row', marginBottom: 8 },
  bullet: { color: '#8B5E3C', marginRight: 10, fontWeight: 'bold' },
  materialName: { fontSize: 14, color: '#2D3748', flex: 1 },
  materialQty: { fontSize: 13, color: '#A0AEC0' },
  completeBtn: {
    backgroundColor: '#8B5E3C',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  completeText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
