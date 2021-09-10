import PushNotification from "react-native-push-notification"
import { Platform } from "react-native"

class LocalNotificaiton {

    configure = ( onNotification, onOpenNotification) => {
        PushNotification.configure({
            onNotification: function (notification) {
                if (Platform.OS === 'ios') {
                    if (notification.data.openedInForeground) {
                        notification.userInteraction = true
                    }
                } else {
                    notification.userInteraction = true
                }

                if (notification.userInteraction) {
                    onOpenNotification(notification)
                } else {
                    onNotification(notification)
                }

                if (Platform.OS === 'ios') {
                    if (!notification.data.openedInForeground) {
                        // onOpenNotification(notification)
                        notification.finish('backgroundFetchResultNoData')
                    }
                } else {
                    notification.finish('backgroundFetchResultNoData')
                }
            },
            
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
        })
    }

    _buildIosNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            ...this._buildIosNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            playSound: options.playSound || true,
            soundName: options.soundName || "default",
            userInteraction: true,
            actions: "clicked"
        })
    }

    unregister = () => {
        PushNotification.unregister()
    }
}

export const localNotification = new LocalNotificaiton()