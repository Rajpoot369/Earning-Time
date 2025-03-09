
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
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import WalletCard from '../components/WalletCard';
import AdCard from '../components/AdCard';
import RewardHistory from '../components/RewardHistory';

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  
  const handleAdWatch = (reward: number) => {
    setBalance(prev => prev + reward);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earn & Watch</Text>
        <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#FF6B6B" />
      </View>

      <ScrollView style={styles.content}>
        <WalletCard balance={balance} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Ads</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.adsList}>
            <AdCard 
              title="Watch Product Review"
              reward={5}
              duration="30s"
              imageUrl="https://api.a0.dev/assets/image?text=person%20reviewing%20product%20on%20camera%20professional%20setup&aspect=16:9"
              onWatch={handleAdWatch}
            />
            <AdCard 
              title="Game Trailer"
              reward={3}
              duration="15s"
              imageUrl="https://api.a0.dev/assets/image?text=exciting%20video%20game%20scene%20action&aspect=16:9"
              onWatch={handleAdWatch}
            />
            <AdCard 
              title="Tech Showcase"
              reward={8}
              duration="45s"
              imageUrl="https://api.a0.dev/assets/image?text=modern%20technology%20devices%20display&aspect=16:9"
              onWatch={handleAdWatch}
            />
          </ScrollView>
        </View>

        <RewardHistory balance={balance} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343A40',
    marginBottom: 12,
  },
  adsList: {
    flexGrow: 0,
  },
});