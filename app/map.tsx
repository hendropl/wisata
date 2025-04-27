import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'; // <-- Add this import
import { Link } from 'expo-router';
import { Modal, Pressable } from 'react-native';

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// Destinasi dengan koordinat
const destinations = {
  "Tirta Gangga": { lat: -8.411706259741209, lng: 115.58765697164289 },
  "Kuta Beach": { lat: -8.7177, lng: 115.1682 },
  "Handara Gate": { lat: -8.253492381204655, lng: 115.15757046256803 },
  "Sekumpul Waterfall": { lat: -8.171582715439424, lng: 115.18691893568513 },
  "Ubud": { lat: -8.5069, lng: 115.2625 },
  "Besakih Temple": { lat: -8.373785302557534, lng: 115.45262106811093 },
  "Mount Agung": { lat: -8.3432, lng: 115.5080 },
  "Tegallalang Rice Terraces": { lat: -8.431350353776613, lng: 115.27920643557287 },
  "Nusa Dua Beach": { lat: -8.7990, lng: 115.2279 },
  "Sanur Beach": { lat: -8.6841, lng: 115.2633 },
};

// Tipe kunci dari objek destinasi
type DestinationKey = keyof typeof destinations;

// HTML untuk Leaflet map
const LeafletMapHtml = `<!DOCTYPE html>
<html>
<head>
  <title>React Native Leaflet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <style>
    html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map('map').setView([-8.4142, 115.4546], 13);
    const markerGroup = L.layerGroup().addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    function addMarker(lat, lng) {
      const marker = L.marker([lat, lng]);
      markerGroup.addLayer(marker);
    }

    function centerMap(lat, lng) {
      map.setView([lat, lng], 15);
    }

    window.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "CENTER_MAP_TO") {
        centerMap(data.lat, data.lng);
      }
    });
  </script>
</body>
</html>`;

export default function MapScreen() {
  const navigation = useNavigation();
  const [selectedDestination, setSelectedDestination] = useState("Tirta Gangga");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const webViewRef = useRef<WebView>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const postMessageToMap = (message: object) => {
    const msgStr = JSON.stringify(message);
    if (isWeb && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(msgStr, "*");
    } else if (webViewRef.current) {
      webViewRef.current.postMessage(msgStr);
    }
  };

  const onSelectDestination = (destination: string) => {
    setSelectedDestination(destination);
    const coords = destinations[destination as DestinationKey];
    if (coords) {
      postMessageToMap({ type: "CENTER_MAP_TO", lat: coords.lat, lng: coords.lng });
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/destination',
        params: { searchKeyword: searchQuery.trim() },
      });
    }
    };    

  return (
    <View style={styles.container}>
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
              value={searchQuery}
              onChangeText={handleSearchChange}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
            <Icon name="person-circle-outline" size={28} color="#fff" style={styles.profileIcon} />
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
  
      {/* --- Sekarang di luar Navbar --- */}
  
      {/* Pilih Destinasi */}
      <View style={styles.destinationContainer}>
        <Text style={styles.destinationLabel}>Destinasi Wisata</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDestination}
            onValueChange={onSelectDestination}
            style={styles.picker}
          >
            {Object.keys(destinations).map((dest, idx) => (
              <Picker.Item key={idx} label={dest} value={dest} />
            ))}
          </Picker>
        </View>
      </View>
  
      {/* Map */}
      <View style={styles.mapContainer}>
        {isWeb ? (
          <iframe
            ref={iframeRef}
            srcDoc={LeafletMapHtml}
            style={styles.map}
            title="LeafletMap"
          />
        ) : (
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: LeafletMapHtml }}
            style={styles.map}
          />
        )}
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dbdbcb",
    flex: 1,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#79846e",
    paddingHorizontal: 50,
    paddingVertical: 30,
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: '100%',
  },
  navItemsWrapper: {
    flexDirection: 'row', // Mengubah arah dari kolom ke baris
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
    flexDirection: "row",
    alignItems: "center",
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
    position: "relative",
    marginRight: 10,
    width: 200,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 35,
    height: 40,
    width: '100%',
    fontSize: 16,
    color: "#000",
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  profileIcon: {
    paddingLeft: 10,
  },
  destinationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '83%',
    alignItems: 'left',
  },
  destinationLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerWrapper: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    width: '100%',
  },
  picker: {
    height: 40,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: '10%',
    marginBottom: 20,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
    width: '80%',
  },
  map: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
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