// App.js
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { startLocationUpdates, stopLocationUpdates } from './background/location';
import { startBackgroundTimer, stopBackgroundTimer } from './background/timer';

export default function App() {
    useEffect(() => {
        // Start background location updates and timer when the app is mounted
        startLocationUpdates();
        startBackgroundTimer();

        return () => {
            // Stop background location updates and timer when the app is unmounted
            stopLocationUpdates();
            stopBackgroundTimer();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>Background Location Updates and Timer</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});
