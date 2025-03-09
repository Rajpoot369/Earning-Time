
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

import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import WebView from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';

interface AdModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
  onError: () => void;
}

export default function AdModal({ visible, onClose, onComplete, onError }: AdModalProps) {
  const adHTML = `
    <html>
      <body style="margin: 0; display: flex; justify-content: center; align-items: center; background-color: black;">
        <div id="ad-container"></div>
        <script>
          // Initialize ad container
          window.addEventListener('load', function() {
            try {
              const script = document.createElement('script');
              script.src = '//whephiwums.com/sdk.js';
              script.setAttribute('data-zone', '9057468');
              script.setAttribute('data-sdk', 'show_9057468');
              script.onload = function() {
                // Notify React Native when ad loads
                window.ReactNativeWebView.postMessage('AD_LOADED');
              };
              script.onerror = function() {
                // Notify React Native on error
                window.ReactNativeWebView.postMessage('AD_ERROR');
              };
              document.getElementById('ad-container').appendChild(script);
            } catch (error) {
              window.ReactNativeWebView.postMessage('AD_ERROR');
            }
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === 'AD_LOADED') {
      // Wait for typical ad duration
      setTimeout(() => {
        onComplete();
      }, 15000); // 15 seconds ad view time
    } else if (message === 'AD_ERROR') {
      onError();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Watch Ad to Earn</Text>
        </View>
        
        <WebView
          source={{ html: adHTML }}
          onMessage={handleMessage}
          onError={onError}
          style={styles.webview}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
        
        <View style={styles.footer}>
          <ActivityIndicator color="#4C6FFF" />
          <Text style={styles.footerText}>Loading advertisement...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  footer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  footerText: {
    color: 'white',
    marginLeft: 12,
    fontSize: 14,
  },
});