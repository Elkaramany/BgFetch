import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.error('Error in background task:', error);
        return;
    }
    if (data) {
        const { locations } = data;
        if (locations.length > 0) {
            const location = locations[0];
            const { latitude, longitude } = location.coords;
            console.log(`Location fetched in background: ${latitude}, ${longitude}`);
            try {
                await fetch(`http://localhost:8000/location?lat=${latitude}&long=${longitude}`, {
                    method: 'POST',
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
});

export const startLocationUpdates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
    }

    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus !== 'granted') {
        console.error('Permission to access background location was denied');
        return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 180000, // 3 minutes in milliseconds
        distanceInterval: 0, // In meters
        showsBackgroundLocationIndicator: true,
    });
};

export const stopLocationUpdates = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};
