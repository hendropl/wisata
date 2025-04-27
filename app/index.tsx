import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const banners = [
    'https://th.bing.com/th/id/OIP.2HAhoIYHyQbDHb3iIpRm-AHaFS?w=198&h=142&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    'https://th.bing.com/th/id/OIP.lgw7W1NeRkbagSgIlfLSHgHaEK?w=198&h=111&c=7&r=0&o=5&dpr=1.8&pid=1.7',
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    let newIndex = currentIndex + (direction === 'right' ? 1 : -1);
    newIndex = Math.max(0, Math.min(newIndex, banners.length - 1));
    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.wisataBaliWrapper}>
          <Text style={styles.wisataBaliText}>Wisata Bali</Text>
        </View>

        <View style={styles.navItemsWrapper}>
          {['HOME', 'MAPS', 'DESTINATION', 'BLOG'].map((item, index) => (
            <Link
              key={index}
              href={
                item === 'HOME' ? '/' :
                item === 'MAPS' ? '/map' :
                item === 'DESTINATION' ? '/destination' :
                '/blog'
              }
              style={styles.navItem}
            >
              <Text style={styles.navText}>{item}</Text>
            </Link>
          ))}
        </View>

        <View style={styles.navRight}>
          <View style={styles.searchWrapper}>
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH"
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
            <Icon name="user" size={28} color="#fff" style={styles.profileIcon} />
          </TouchableOpacity>

          {/* Modal Profile */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isProfileModalVisible}
            onRequestClose={() => setProfileModalVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setProfileModalVisible(false)}>
              <View style={styles.modalContainer}>
                <Link href="/user" asChild>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => setProfileModalVisible(false)}
                  >
                    <Text style={styles.modalText}>User</Text>
                  </TouchableOpacity>
                </Link>

                <Link href="/login-admin" asChild>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => setProfileModalVisible(false)}
                  >
                    <Text style={styles.modalText}>Login sebagai Admin</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Pressable>
          </Modal>
        </View>
      </View>

      {/* Banner */}
      <View style={styles.bannerWrapper}>
        <TouchableOpacity style={[styles.arrowButton, { left: 10 }]} onPress={() => handleScroll('left')}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.bannerScroll}
        >
          {banners.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.bannerImage} />
          ))}
        </ScrollView>

        <TouchableOpacity style={[styles.arrowButton, { right: 10 }]} onPress={() => handleScroll('right')}>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DestinationCard
              title="Tirta Gangga"
              image={{ uri: "https://th.bing.com/th/id/OIP.wnYY-W_b7dQJfSC06AubSQHaE8?w=272&h=181&c=7&r=0&o=5&dpr=1.8&pid=1.7" }}
              rating={4.9}
            />
            <DestinationCard
              title="Kuta Beach"
              image={{ uri: "https://th.bing.com/th/id/OIP.RNhAm7ZIRPq0Z4tUdfo1MwHaE7?w=299&h=200&c=7&r=0&o=5&dpr=1.8&pid=1.7" }}
              rating={5.0}
            />
          </ScrollView>

          <Link href="/destination" asChild>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreButtonText}>View More</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Keywords Section */}
        <View style={styles.keywordsContainer}>
          <Text style={styles.keywordsTitle}>KEYWORDS</Text>
          {['Tirta Gangga', 'Beach', 'Pura'].map((keyword, index) => (
            <View key={index} style={styles.keywordItem}>
              <Icon name="search" size={18} color="#555" style={styles.keywordIcon} />
              <Text style={styles.keywordText}>{keyword}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

type CardProps = {
  title: string;
  image: any;
  rating: number;
};

const DestinationCard = ({ title, image, rating }: CardProps) => (
  <View style={styles.card}>
    <Image source={image} style={styles.cardImage} />
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.cardRating}>⭐ {rating.toFixed(1)}</Text>
      </View>
    </View>
  </View>
);

// StyleSheet
const styles = StyleSheet.create({
  container: { backgroundColor: '#e8ebdf' },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#79846e',
    paddingHorizontal: 50,
    paddingVertical: 30,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navItemsWrapper: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  navItem: { marginRight: 25 },
  navText: { color: '#fff', fontWeight: 'bold', fontSize: 20, marginRight: 70 },
  navRight: { flexDirection: 'row', alignItems: 'center' },
  wisataBaliWrapper: { justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 15, marginRight: 1 },
  wisataBaliText: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  searchWrapper: { position: 'relative', marginRight: 10 },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 35,
    height: 40,
    width: 200,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: { position: 'absolute', top: 10, left: 10, zIndex: 1 },
  profileIcon: { paddingLeft: 10 },
  bannerWrapper: {
    position: 'relative',
    width: '100%',
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerScroll: { width: '100%' },
  bannerImage: { width: screenWidth, height: 700, resizeMode: 'cover' },
  arrowButton: {
    position: 'absolute',
    top: '45%',
    zIndex: 10,
    backgroundColor: '#000a',
    padding: 10,
    borderRadius: 30,
  },
  arrowText: { fontSize: 24, color: '#fff' },
  mainContent: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, flexWrap: 'wrap' },
  cardsContainer: { flex: 2, marginRight: 1 },
  card: {
    width: 400,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 15,
  },
  cardImage: { width: '100%', height: 200 },
  cardOverlay: {
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'space-between',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 18, color: '#fff', height: '100%' },
  ratingContainer: { backgroundColor: '#333c', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5, alignSelf: 'flex-start' },
  cardRating: { fontSize: 14, color: '#fff' },
  viewMoreButton: {
    marginTop: 20,
    backgroundColor: '#79846e',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewMoreButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  keywordsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  keywordsTitle: { fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: '#555' },
  keywordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8ebdf',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  keywordIcon: { marginRight: 10 },
  keywordText: { fontSize: 16, color: '#333' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: 250, backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalOption: { paddingVertical: 10 },
  modalText: { fontSize: 18, color: '#333' },
});
