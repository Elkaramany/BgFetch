import BackgroundTimer from 'react-native-background-timer';
import * as Location from 'expo-location';

const fetchLocationPeriodically = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(`Location fetched: ${latitude}, ${longitude}`);
    try {
        await fetch(`http://localhost:8000/location?lat=${latitude}&long=${longitude}`, {
            method: 'POST',
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const startBackgroundTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
        fetchLocationPeriodically();
    }, 180000); // 3 minutes in milliseconds
};

export const stopBackgroundTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
};
