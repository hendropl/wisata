import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Destination {
  id: string;
  title: string;
  description: string;
  image?: string;
  rating?: string;
}

interface DestinationContextProps {
  destinations: Destination[];
  addDestination: (destination: Destination) => void;
  editDestination: (id: string, updated: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
}

const DestinationContext = createContext<DestinationContextProps | undefined>(undefined);

export const DestinationProvider = ({ children }: { children: ReactNode }) => {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: '1',
      title: 'Tirta Gangga',
      description: 'Tirta Gangga adalah bekas istana kerajaan di Bali timur, Indonesia.',
      rating: '4.9',
      image: 'https://th.bing.com/th/id/OIP.wnYY-W_b7dQJfSC06AubSQHaE8?w=272&h=181&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    },
    {
      id: '2',
      title: 'Kuta Beach',
      description: 'Pantai paling populer di Bali, terkenal dengan pasir putih.',
      rating: '5.0',
      image: 'https://th.bing.com/th/id/OIP.RNhAm7ZIRPq0Z4tUdfo1MwHaE7?w=299&h=200&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    },
    {
      id: '3',
      title: 'Sekumpul Waterfall',
      description: 'Air terjun paling indah di Bali dengan pemandangan luar biasa.',
      rating: '4.8',
      image: 'https://th.bing.com/th/id/OIP.HLnIE4HQzI4z6uuN6sxQdQHaE8?w=258&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    },
    {
      id: '4',
      title: 'Handara Gate',
      description: 'Gerbang ikonik di Bali dengan latar pegunungan.',
      rating: '4.7',
      image: 'https://th.bing.com/th/id/OIP.juw9s8zXbfXacmvtmkJJkQHaES?w=298&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    },
  ]);

  const addDestination = (destination: Destination) => {
    setDestinations((prev) => [...prev, destination]);
  };

  const editDestination = (id: string, updated: Partial<Destination>) => {
    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, ...updated } : dest))
    );
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  return (
    <DestinationContext.Provider value={{ destinations, addDestination, editDestination, deleteDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestination must be used within DestinationProvider');
  }
  return context;
};
