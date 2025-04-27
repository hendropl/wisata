import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Linking, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definisi navigation
type RootStackParamList = {
  Home: undefined;
  Maps: undefined;
  Destination: undefined;
  Blog: undefined;
  User: undefined;
  LoginAdmin: undefined;
};

type BlogScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Blog'>;

const blogArticles = [
  {
    title: '20 Tempat Liburan di Bali yang Tidak Boleh Dilewatkan',
    image: { uri: 'https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2023/06/tempat-liburan-di-bali.webp' },
    description:
      'Bali sebagai tempat tujuan wisata yang lengkap dan terpadu memiliki banyak sekali tempat wisata menarik, apa saja tempat wisata di Bali yang wajib dikunjungi? Baca rekomendasinya berikut ini.',
    url: 'https://blog.cove.id/tempat-liburan-di-bali/',
  },
  {
    title: '41 Tempat Wisata di Bali yang Wajib Dikunjungi',
    image:{ uri: 'https://anekatempatwisata.com/wp-content/uploads/2018/05/Air-Terjun-Sekumpul-hidwii-1080x600.jpg' },
    description:
      'Bali menjadi salah satu destinasi wisata yang banyak diminati masyarakat. Berikut ini adalah rekomendasi tempat liburan di Bali yang tidak boleh dilewatkan kalau kamu datang ke sana!',
    url: 'https://anekatempatwisata.com/15-tempat-wisata-di-bali-yang-wajib-dikunjungi/',
  },
  {
    title: 'Tempat Wisata Terbaik di Bali',
    image: { uri: 'https://cdn.shortpixel.ai/spai/w_2100+q_glossy+ret_img+to_webp/liburanbali.net/wp-content/uploads/2024/06/wisata-bali.jpg' },
    description:
      'Kali ini mimin hadir untuk membantu kamu nih, Sob. Di artikel ini kamu bakal nemuin beberapa rekomendasi tempat wisata yang sudah mimin bagi per daerah yang bisa kamu liat berikut ini:',
    url: 'https://liburanbali.net/tempat-wisata-di-bali/',
  },
  {
    title: '14 Tempat Wisata di Bali Terbaik yang Wajib Dikunjungi',
    image: { uri: 'https://jalanjalanyuk.co.id/wp-content/uploads/2024/09/6.-14-Tempat-Wisata-di-Bali-Terbaik-yang-Wajib-Dikunjungi-2.jpg' },
    description:
      'Tempat Wisata Bali - Bali memang memiliki keindahan dan daya tarik tersendiri untuk dinikmati di tengah liburan bersama rombongan wisata.',
    url: 'https://jalanjalanyuk.co.id/travel-blog/tempat-wisata-bali/',
  },
];

export default function BlogScreen() {
  const navigation = useNavigation<BlogScreenNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const filteredArticles = blogArticles.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {/* Wisata Bali Text */}
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

        {/* Search dan Profile */}
        <View style={styles.navRight}>
          <View style={styles.searchWrapper}>
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH"
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
            <Icon name="user" size={28} color="#fff" style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

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
                  navigation.navigate('User');
                }}
              >
                <Text style={styles.modalText}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setProfileModalVisible(false);
                  navigation.navigate('login-admin');
                }}
              >
                <Text style={styles.modalText}>Login sebagai Admin</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>

      {/* Artikel Blog */}
      <View style={styles.cardContainer}>
        {filteredArticles.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => Linking.openURL(item.url)}
              >
                <Text style={styles.detailText}>View Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Styles tetap sama, tidak diubah
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
  navLeft: {
    flexDirection: 'row',
  },
  navItem: {
    marginRight: 25,
  },
  navItemsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    justifyContent: 'left',
    alignItems: 'left',
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
    height: 720,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 500,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#79846e',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 16,
    color: '#79846e',
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
