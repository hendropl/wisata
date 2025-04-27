import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router'; // Menggunakan useRouter dari expo-router
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const router = useRouter(); // Menggunakan useRouter
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => router.push('/dashboard')}> {/* Menggunakan router.push */}
            <Text style={styles.menuText}>DASHBOARD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/manajemen-wisata')}> {/* Menggunakan router.push */}
            <Text style={styles.menuText}>MANAJEMEN WISATA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/manajemen-user')}> {/* Menggunakan router.push */}
            <Text style={styles.menuText}>MANAJEMEN USER</Text>
          </TouchableOpacity>
        </View>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <View style={styles.profileIcon}>
              <Icon name="user" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* DROPDOWN */}
      {dropdownVisible && (
        <View style={styles.dropdownWrapper}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => setDropdownVisible(false)}
            >
              <Text style={styles.dropdownText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={styles.dropdownItem}
             onPress={() => {
               setDropdownVisible(false);
               router.push('/login'); // Menggunakan router.push
             }}
             >
              <Text style={styles.dropdownText}>Login sebagai User</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardLarge}>
          <Text style={styles.cardTitle}>Statistik Pengguna</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
              datasets: [
                { data: [50, 60, 55, 80, 90, 70], color: () => '#9b59b6' },
                { data: [20, 25, 23, 45, 40, 60], color: () => '#1abc9c' },
              ],
              legend: ['Aktif', 'Baru']
            }}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.cardSmallWrapper}>
          <View style={styles.cardSmall}>
            <Text style={styles.cardTitle}>Statistik Jumlah Tempat Wisata</Text>
            <BarChart
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{ data: [40, 20, 30, 50, 10, 60, 30] }],
              }}
              width={screenWidth / 2.3}
              height={180}
              chartConfig={chartConfigBar}
              style={styles.chart}
            />
          </View>

          <View style={styles.cardSmall}>
            <Text style={styles.cardTitle}>Pengunjung Berdasarkan Negara</Text>
            <PieChart
              data={[
                { name: 'USA', population: 60, color: '#f1c40f', legendFontColor: '#333', legendFontSize: 12 },
                { name: 'India', population: 80, color: '#f39c12', legendFontColor: '#333', legendFontSize: 12 },
                { name: 'Canada', population: 50, color: '#e67e22', legendFontColor: '#333', legendFontSize: 12 },
                { name: 'Japan', population: 30, color: '#d35400', legendFontColor: '#333', legendFontSize: 12 },
                { name: 'France', population: 20, color: '#e74c3c', legendFontColor: '#333', legendFontSize: 12 },
              ]}
              width={screenWidth / 2.3}
              height={180}
              chartConfig={chartConfigProgress}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

// CHART CONFIG
const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#f8f8f8',
  backgroundGradientTo: '#f8f8f8',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
  labelColor: () => '#333',
};

const chartConfigBar = {
  ...chartConfig,
  color: () => '#f04e8b',
};

const chartConfigProgress = {
  ...chartConfig,
  color: () => '#f1c40f',
};

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#c4c0ab' },

  header: {
    backgroundColor: '#6e6c50',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  menuBar: {
    flexDirection: 'row',
    gap: 20,
  },
  menuText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileIcon: {
    backgroundColor: '#9a9880',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },

  dropdownWrapper: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 1000,
    elevation: 10,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    width: 180,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },

  content: {
    padding: 20,
    gap: 20,
  },
  cardLarge: {
    backgroundColor: '#e7e4db',
    padding: 20,
    borderRadius: 15,
  },
  cardSmallWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 15,
  },
  cardSmall: {
    backgroundColor: '#d4d0c3',
    padding: 15,
    borderRadius: 15,
    width: screenWidth / 2.2,
  },
  cardTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  chart: {
    borderRadius: 10,
  },
});
