
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


  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StyleSheet } from 'react-native';
  import { SafeAreaProvider } from "react-native-safe-area-context"
  import { Toaster } from 'sonner-native';
  import HomeScreen from "./screens/HomeScreen"
  
  const Stack = createNativeStackNavigator();
  
  function RootStack() {
    return (
      <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }
  
  export default function App() {
    return (
      <SafeAreaProvider style={styles.container}>
      <Toaster />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
