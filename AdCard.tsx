
import { useEffect } from 'react';

const loadAds = () => {
    const script = document.createElement('script');
    script.src = '//whephiwums.com/sdk.js';
    script.dataset.zone = '9057468';
    script.dataset.sdk = 'show_9057468';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
        console.log("✅ Ad SDK Loaded Successfully");
    };

    script.onerror = () => {
        console.error("❌ Failed to Load Ad SDK");
    };
};

const showInterstitialAd = () => {
    if (typeof show_9057468 === 'function') {
        show_9057468({
            type: 'inApp',
            inAppSettings: {
                frequency: 2,
                capping: 0.1,
                interval: 30,
                timeout: 5,
                everyPage: false
            }
        }).then(() => {
            console.log("✅ Interstitial Ad Shown");
        }).catch(error => {
            console.error("❌ Error Showing Ad:", error);
        });
    }
};

useEffect(() => {
    loadAds();
}, []);

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import AdModal from './AdModal';

interface AdCardProps {
  title: string;
  reward: number;
  duration: string;
  imageUrl: string;
  onWatch: (reward: number) => void;
}

export default function AdCard({ title, reward, duration, imageUrl, onWatch }: AdCardProps) {
  const [isWatched, setIsWatched] = useState(false);  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const handleWatch = () => {
    if (isWatched) {
      toast.error('You have already watched this ad');
      return;
    }
    
    setIsLoading(true);
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    setIsLoading(false);
    setShowAdModal(false);
    setIsWatched(true);
    onWatch(reward);
    toast.success(`Earned $${reward.toFixed(2)}!`);
  };

  const handleAdError = () => {
    setIsLoading(false);
    setShowAdModal(false);
    toast.error('Failed to load ad. Please try again.');
  };  return (
    <View style={styles.card}>
      <AdModal
        visible={showAdModal}
        onClose={() => setShowAdModal(false)}
        onComplete={handleAdComplete}
        onError={handleAdError}
      />
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoRow}>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>${reward.toFixed(2)}</Text>
          </View>
          <Text style={styles.duration}>{duration}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.watchButton, isWatched && styles.watchedButton]}
          onPress={handleWatch}
        >
          <MaterialIcons 
            name={isWatched ? "check-circle" : "play-circle-filled"} 
            size={20} 
            color={isWatched ? "#198754" : "white"} 
          />
          <Text style={[styles.watchText, isWatched && styles.watchedText]}>
            {isWatched ? 'Completed' : 'Watch Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 280,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardBadge: {
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  rewardText: {
    color: '#495057',
    fontSize: 12,
    fontWeight: '600',
  },
  duration: {
    color: '#6C757D',
    fontSize: 12,
  },
  watchButton: {
    backgroundColor: '#4C6FFF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchedButton: {
    backgroundColor: '#E9ECEF',
  },
  watchText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  watchedText: {
    color: '#198754',
  },
});