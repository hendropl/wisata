import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';  // Import useRouter
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';

export default function ManajemenUserScreen() {
  const router = useRouter();  // Use the router hook
  const [search, setSearch] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [users, setUsers] = useState([
    { name: 'Mutiara Bunga', email: 'mutiara@gmail.com', location: 'Bandung', joined: 'October 2, 2010', permission: 'Admin' },
    { name: 'Bunga Citra', email: 'bunga@gmail.com', location: 'Tanggerang', joined: 'October 3, 2011', permission: 'Admin' },
    { name: 'Ari Irham', email: 'ari@gmail.com', location: 'Makasar', joined: 'May 20, 2015', permission: 'Admin' },
    { name: 'Nanda Ilham', email: 'nanda@gmail.com', location: 'Cibubur', joined: 'July 14, 2015', permission: 'Contributor' },
    { name: 'Rafi Saputra', email: 'rafi@gmail.com', location: 'Lampung', joined: 'October, 2016', permission: 'Contributor' },
    { name: 'Jaya Wijaya', email: 'jaya@gmail.com', location: 'Jakarta', joined: 'June 5, 2016', permission: 'Viewer' },
    { name: 'Petra Wijaya', email: 'petra@gmail.com', location: 'Medan', joined: 'June 15, 2015', permission: 'Contributor' },
    { name: 'Ade Wira Utama', email: 'andre@gmail.com', location: 'Pekan Baru', joined: 'March 13, 2018', permission: 'Contributor' },
    { name: 'Jorge Pratama', email: 'jorge@gmail.com', location: 'Bali', joined: 'March 14, 2018', permission: 'Contributor' },
  ]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    location: '',
    permission: '',
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email || !newUser.location || !newUser.permission) {
      alert('Harap isi semua field.');
      return;
    }
    const newUserData = {
      ...newUser,
      joined: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setUsers([...users, newUserData]);
    setShowNewUserForm(false);
    setNewUser({ name: '', email: '', location: '', permission: 'r' });
  };

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    location: '',
    permission: '',
  });

  const handleEditUser = (index: number) => {
    setEditIndex(index);
    setEditedUser(users[index]);
  };
  
  const handleUpdateUser = () => {
    if (!editedUser.name || !editedUser.email || !editedUser.location || !editedUser.permission) {
      alert('Harap isi semua field.');
      return;
    }
    const updatedUsers = [...users];
    updatedUsers[editIndex!] = { ...updatedUsers[editIndex!], ...editedUser };
    setUsers(updatedUsers);
    setEditIndex(null);
  };
  
  const handleDeleteUser = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };
  
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => router.push('/dashboard')}>
            <Text style={styles.menuText}>DASHBOARD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/manajemen-wisata')}>
            <Text style={styles.menuText}>MANAJEMEN WISATA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('manajemen-user')}>
            <Text style={styles.menuText}>MANAJEMEN USER</Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <View style={styles.profileIcon}>
              <Icon name="user" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          {/* Dropdown */}
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
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Manajemen User</Text>

        <View style={styles.topBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.newUserButton} onPress={() => setShowNewUserForm(!showNewUserForm)}>
            <Text style={styles.newUserButtonText}>{showNewUserForm ? 'Cancel' : 'New User'}</Text>
          </TouchableOpacity>
        </View>

        {/* New User Form */}
        {showNewUserForm && (
          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Add New User</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={newUser.name}
              onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={newUser.email}
              onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newUser.location}
              onChangeText={(text) => setNewUser({ ...newUser, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Permission (Admin / Contributor / Viewer)"
              value={newUser.permission}
              onChangeText={(text) => setNewUser({ ...newUser, permission: text })}
            />
            <TouchableOpacity style={[styles.newUserButton, { marginTop: 10 }]} onPress={handleSaveUser}>
              <Text style={styles.newUserButtonText}>Save User</Text>
            </TouchableOpacity>
          </View>
        )}

        {editIndex !== null && (
          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Edit User</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={editedUser.name}
              onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={editedUser.email}
              onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={editedUser.location}
              onChangeText={(text) => setEditedUser({ ...editedUser, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Permission (Admin / Contributor / Viewer)"
              value={editedUser.permission}
              onChangeText={(text) => setEditedUser({ ...editedUser, permission: text })}
            />
            <TouchableOpacity style={[styles.newUserButton, { marginTop: 10 }]} onPress={handleUpdateUser}>
              <Text style={styles.newUserButtonText}>Update User</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* User Table */}
        <View style={styles.card}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, { flex: 2 }]}>Full Name</Text>
              <Text style={styles.tableHeader}>Email Address</Text>
              <Text style={styles.tableHeader}>Location</Text>
              <Text style={styles.tableHeader}>Joined</Text>
              <Text style={styles.tableHeader}>Permissions</Text>
              <Text style={styles.tableHeader}>Aksi</Text>
            </View>

            {/* Table Body */}
            {filteredUsers.map((user, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 2, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                  <View style={styles.avatar}>
                    <Text style={{ color: '#fff' }}>{user.name[0]}</Text>
                  </View>
                  <Text>{user.name}</Text>
                </View>
                <Text style={styles.tableCell}>{user.email}</Text>
                <Text style={styles.tableCell}>{user.location}</Text>
                <Text style={styles.tableCell}>{user.joined}</Text>
                <Text style={[
                  styles.tableCell,
                  {
                    color: user.permission === 'Admin' ? 'red' :
                           user.permission === 'Viewer' ? 'blue' : 'green',
                    fontWeight: 'bold'
                  }
                ]}>
                  {user.permission}
                </Text>
                <View style={[styles.tableCell, { flexDirection: 'row', gap: 5 }]}>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEditUser(index)}>
                        <Text style={styles.buttonText}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(index)}>
                        <Text style={styles.buttonText}>HAPUS</Text>
                    </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <Text>Show: 10 rows</Text>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  navbar: {
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
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    marginTop: 5,
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
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  topBar: { flexDirection: 'row', marginBottom: 20, alignItems: 'center', gap: 10 },
  searchInput: { flex: 1, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10 },
  newUserButton: { backgroundColor: '#FFA500', padding: 10, borderRadius: 8 },
  newUserButtonText: { color: 'white', fontWeight: 'bold' },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 10, marginBottom: 20 },
  table: {},
  tableRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  tableHeader: { flex: 1, fontWeight: 'bold', fontSize: 12 },
  tableCell: { flex: 1, fontSize: 12 },
  avatar: {
    backgroundColor: '#ccc',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: { backgroundColor: '#4CAF50', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 4 },
  deleteButton: { backgroundColor: '#F44336', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 4 },
  buttonText: { color: 'white', fontSize: 12 },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
});
