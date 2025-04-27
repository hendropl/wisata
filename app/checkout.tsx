import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '.'; // Pastikan path ini sesuai

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

export default function CheckoutScreen() {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const route = useRoute<CheckoutScreenRouteProp>();
  const { destination } = route.params; // Ambil destination dari params

  const facilities = [
    'Mata Air Alami',
    'Menara Air',
    'Jalan Setapak Diatas Air',
    'Ikan Hias Dikolam',
    'Jembatan Patung Naga',
    'Patung Prajurit',
  ];

  return (
    <ScrollView style={styles.container}>
      
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Checkout</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Title & Info */}
        <View style={styles.header}>
          <Text style={styles.title}>{destination.title}</Text>
          <View style={styles.infoRow}>
            <Icon name="star" size={18} color="#79846e" />
            <Text style={styles.infoText}>{destination.rating}</Text>
            <Icon name="dollar-sign" size={18} color="#79846e" style={{ marginLeft: 12 }} />
            <Text style={styles.infoText}>25.000</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Image
            source={destination.image}
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          {/* Facilities */}
          <View style={styles.facilitiesSection}>
            <Text style={styles.facilitiesTitle}>Fasilitas</Text>
            {facilities.map((item, idx) => (
              <Text key={idx} style={styles.facilityItem}>• {item}</Text>
            ))}
          </View>
        </View>

        {/* Thumbnail Images */}
        <View style={styles.thumbnailRow}>
          {[0, 1, 2].map((_, index) => (
            <Image
              key={index}
              source={destination.image}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          ))}
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dbdbcb',
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#79846e',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  backButton: {
    marginRight: 20,
  },
  navTitle: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f1f1e8',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#79846e',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 25,
    color: '#79846e',
    fontWeight: 'bold',
  },
  mainContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  mainImage: {
    width: '50%',
    height: 400,
    borderRadius: 10,
  },
  facilitiesSection: {
    marginLeft: 20,
    flex: 1,
  },
  facilitiesTitle: {
    fontSize: 22,
    color: '#79846e',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  facilityItem: {
    fontSize: 16,
    color: '#79846e',
    marginBottom: 6,
  },
  thumbnailRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'left',
  },
  thumbnail: {
    width: '15%',
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  checkoutButton: {
    backgroundColor: '#79846e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
