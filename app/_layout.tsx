import { Stack } from 'expo-router';
import { DestinationProvider } from './context/destination-context';

export default function Layout() {
  return (
    <DestinationProvider>
      <Stack
        screenOptions={{
          headerShown: false, // <<< Ini yang matiin header
        }}
      />
    </DestinationProvider>
  );
}
