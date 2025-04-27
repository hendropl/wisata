import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { useDestination } from './context/destination-context'; // Importing the context

export default function DestinationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const { destinations } = useDestination(); // Using the context to get destinations
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  useEffect(() => {
    const keyword = (params.searchKeyword as string) ?? '';
    setSearchQuery(keyword);
    if (keyword) {
      const filtered = destinations.filter(dest =>
        dest.title.toLowerCase().includes(keyword.toLowerCase()) ||
        dest.description.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [params.searchKeyword, destinations]);

  const handleSearch = () => {
    const keyword = searchQuery.trim();
    if (keyword) {
      const filtered = destinations.filter(dest =>
        dest.title.toLowerCase().includes(keyword.toLowerCase()) ||
        dest.description.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
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
            <Icon
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
              onPress={handleSearch}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH"
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
          <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
            <Icon name="user" size={28} color="#fff" style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        {/* Profile Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isProfileModalVisible}
          onRequestClose={() => setProfileModalVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setProfileModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setProfileModalVisible(false);
                  router.push('/user');
                }}
              >
                <Text style={styles.modalText}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setProfileModalVisible(false);
                  router.push('/login-admin');
                }}
              >
                <Text style={styles.modalText}>Login sebagai Admin</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>

      {/* Destinations */}
      <View style={styles.cardContainer}>
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.ratingRow}>
                  <Icon name="star" size={18} color="#444" style={{ marginRight: 4 }} />
                  <Text style={styles.cardRating}>{item.rating}</Text>
                </View>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => router.push({
                    pathname: '/detail',
                    params: { id: item.id }
                  })}
                >
                  <Text style={styles.detailText}>View Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#79846e', fontSize: 20 }}>
            No results found.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dbdbcb',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#79846e',
    paddingHorizontal: 50,
    paddingVertical: 30,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navItemsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navItem: {
    marginRight: 25,
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 70,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wisataBaliWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 15,
    marginRight: 1,
  },
  wisataBaliText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 35,
    height: 40,
    width: 200,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  profileIcon: {
    paddingLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '35%',
    height: 820,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 600,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#79846e',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  cardRating: {
    fontWeight: 'bold',
    color: '#79846e',
    fontSize: 23,
  },
  cardDesc: {
    marginTop: 8,
    fontSize: 17,
    color: '#79846e'
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#79846e',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
});
