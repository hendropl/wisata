import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { DestinationProvider, useDestination } from './context/destination-context'; // Import useDestination dan DestinationProvider
import Icon from 'react-native-vector-icons/FontAwesome';

const ManajemenWisataScreen = () => {
  const { destinations, addDestination, editDestination, deleteDestination } = useDestination();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('');
  const [editing, setEditing] = useState<null | { id: string; title: string; description: string; image?: string; rating?: string }>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<null | { id: string }>(null);

  const handleAdd = () => {
    if (title && description) {
      const newDestination = {
        id: Date.now().toString(),
        title,
        description,
        image,
        rating,
      };
      addDestination(newDestination);
      setTitle('');
      setDescription('');
      setImage('');
      setRating('');
    }
  };

  const handleEdit = () => {
    if (title && description) {
      const updatedDestination = {
        id: editing!.id,
        title,
        description,
        image,
        rating,
      };
      editDestination(editing!.id, updatedDestination);
      resetForm();
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteDestination(id);
    setConfirmDelete(false); // Close confirmation
  };

  const handleDeleteClick = (item: any) => {
    setDestinationToDelete(item);
    setConfirmDelete(true); // Show confirmation
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setRating('');
  };

  const handleEditClick = (item: any) => {
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.image || '');
    setRating(item.rating || '');
    setEditing(item);
  };

  return (
    <DestinationProvider>  {/* Membungkus dengan DestinationProvider */}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.menuBar}>
            <Link href="/dashboard">
              <Text style={styles.menuText}>DASHBOARD</Text>
            </Link>
            <Link href="/manajemen-wisata">
              <Text style={styles.menuText}>MANAJEMEN WISATA</Text>
            </Link>
            <Link href="/manajemen-user">
              <Text style={styles.menuText}>MANAJEMEN USER</Text>
            </Link>
          </View>

          <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
              <View style={styles.profileIcon}>
                <Icon name="user" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

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
                  router.push('/login');  // Navigate using expo-router
                }}
              >
                <Text style={styles.dropdownText}>Login sebagai User</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.title}>{editing ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Wisata'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Judul"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Deskripsi"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="URL Gambar"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating (optional)"
          value={rating}
          onChangeText={setRating}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={editing ? handleEdit : handleAdd}
        >
          <Text style={styles.addButtonText}>{editing ? 'Simpan Perubahan' : 'Tambah'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Daftar Destinasi</Text>

        <FlatList
          data={destinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : null}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                {item.rating ? <Text style={styles.cardRating}>Rating: {item.rating}</Text> : null}
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditClick(item)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteClick(item)}
                  >
                    <Text style={styles.buttonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* Konfirmasi Penghapusan */}
        {confirmDelete && destinationToDelete && (
          <View style={styles.confirmDeleteCard}>
            <Text style={styles.confirmDeleteText}>Apakah Anda yakin ingin menghapus {destinationToDelete.title}?</Text>
            <View style={styles.confirmDeleteActions}>
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={() => handleDelete(destinationToDelete.id)}
              >
                <Text style={styles.buttonText}>Ya, Hapus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={() => setConfirmDelete(false)}
              >
                <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </DestinationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4c0ab',
  },
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
    gap: 40,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#6e6c50',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 15,
    color: '#555',
  },
  cardRating: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    color: '#007BFF',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  confirmDeleteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmDeleteText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmDeleteActions: {
    flexDirection: 'row',
    gap: 15,
  },
  confirmDeleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
});

export default ManajemenWisataScreen;
