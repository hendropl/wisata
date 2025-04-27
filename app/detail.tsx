import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const DetailScreen: React.FC = () => {
  const router = useRouter();
  const { title, rating, image } = useLocalSearchParams();

  // Function buat buka Google Maps
  const openGoogleMaps = () => {
    const mapsUrl = 'https://www.bing.com/maps?q=Tirta+Gangga&satid=id.sid%3A8dc5fab5-ae93-a8c0-3baf-e5723b07f440&FORM=KC2MAP&cp=-8.411944%7E115.586901&lvl=16.0';
    Linking.openURL(mapsUrl);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#e9e6dc' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#68755C', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontSize: 24 }}>{'←'}</Text>
        </TouchableOpacity>

        {/* Judul dan Rating */}
        <View style={{ marginLeft: 25 }}>
          <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text style={{ color: '#fff', fontSize: 30 }}>⭐</Text>
            <Text style={{ color: '#fff', fontSize: 30, marginLeft: 4 }}>{rating}</Text>
          </View>
        </View>
      </View>

      {/* Sub Info */}
      <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, color: '#404040' }}>
          • Historic Sites   • Points of Interest & Landmarks   • Gardens
        </Text>
        <Text style={{ fontSize: 18, color: '#404040', marginBottom: 10 }}>
          Open Now • 7:00 AM – 7:00 PM
        </Text>
      </View>

      {/* Content */}
      <View style={{ flexDirection: 'row', padding: 20, flex: 1 }}>
        
        {/* About Card */}
        <View style={{ flex: 1, backgroundColor: '#f6f3e7', borderRadius: 10, padding: 20, marginRight: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#404534' }}>About</Text>
          <Text style={{ fontSize: 20, color: '#2f2f2f', marginBottom: 10 }}>
            Bekas istana kerajaan Tirtagangga (yang berarti air sungai Gangga, sungai suci umat Hindu) memiliki air mancur bertingkat, taman, dan patung batu makhluk mitos yang menyemburkan air ke kolam pemandian. Tepat di luar halaman istana, pemandangan sawah yang subur di timur laut Bali sangat menakjubkan.
          </Text>

          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#404534' }}>Location</Text>
          <Text style={{ fontSize: 20, color: '#2f2f2f', marginBottom: 5 }}>
            Tirta Gangga berada di dekat desa Ababi di Kabupaten Abang, sekitar 7 kilometer sebelah utara Amlapura (Kabupaten Karangasem) dan sebelah tenggara Gunung Agung.
          </Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#404534', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30 }}
              onPress={openGoogleMaps}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>View Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: '#404534', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30 }}
              onPress={() => {
                router.push({
                  pathname: '/checkout',
                  params: {
                    title: title as string,
                    rating: rating as string,
                    image: image as string
                  }
                });
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Order Ticket</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Image Section */}
        <View style={{ flex: 1 }}>
          {/* Main Image */}
          <Image
            source={{ uri: image as string }}
            style={{ width: '100%', height: 300, borderRadius: 10 }}
            resizeMode="cover"
          />

          {/* Thumbnail Images */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            {[0, 1, 2].map((_, index) => (
              <Image
                key={index}
                source={{ uri: image as string }}
                style={{ width: '30%', height: 80, borderRadius: 8 }}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

export default DetailScreen;
