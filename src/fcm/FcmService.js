import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'

class FcmService {

    getDeviceToken = async () => {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
            await messaging().registerDeviceForRemoteMessages()
        }
        this.getToken()
    }

    getToken = async () => {
        let authStatus = await messaging().hasPermission()
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            authStatus = await messaging().requestPermission({
                alert: true,
                announcement: false,
                badge: true,
                carPlay: false,
                provisional: false,
                sound: true
            });
        }

        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('@fcmToken', fcmToken)
            } else {
            }
        }
    }

    subscribeMessage = () => {
        this.subscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
    }

    unsubscribe = () => {
        return this.subscribe
    }
    // register = async (onRegister, onNotification, onOpenNotificaiton) => {
    //     if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
    //         await firebase.messaging().registerDeviceForRemoteMessages();
    //         // await firebase.messaging().setAutoInitEnabled(true)
    //     }
    //     this.checkPermission(onRegister)
    //     this.createNotificationListener(onNotification, onOpenNotificaiton)
    // }


    // createNotificationListener = (onNotification, onOpenNotificaiton) => {
    //     // Application in background
    //     firebase.messaging().onNotificationOpenedApp((message) => {
    //         if (message) {
    //             const notification = message.notification
    //             onOpenNotificaiton(notification)
    //         }
    //     });

    //     // Application is closed
    //     firebase.messaging().getInitialNotification().then(message => {
    //         if (message) {
    //             const notification = message.data
    //             onOpenNotificaiton(notification)
    //         }
    //     })

    //     // Application is in foreground
    //     this.messageListener = firebase.messaging().onMessage(async message => {
    //         if (message) {
    //             let notification = null
    //             if (Platform.OS === 'ios') {
    //                 notification = message.data
    //             } else {
    //                 notification = message
    //             }
    //             onNotification(notification)
    //         }
    //     })
    // }

    // unRegister = () => {
    //     return this.messageListener
    // }
}

export const fcmService = new FcmService()