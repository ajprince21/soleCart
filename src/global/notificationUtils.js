import notifee from '@notifee/react-native';

export async function displayNotification(title, body, channelId = 'default', smallIcon = 'ic_launcher') {
    try {
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a channel (required for Android)
        await notifee.createChannel({
            id: channelId,
            name: 'Default Channel', 
        });

        // Display a notification
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                // smallIcon,
                pressAction: {
                    id: 'default',
                },
            },
        });
    } catch (error) {
        console.error('Error displaying notification:', error);
    }
}

// Example usage:
// displayNotification('Custom Notification', 'This is a custom notification with different content.');
