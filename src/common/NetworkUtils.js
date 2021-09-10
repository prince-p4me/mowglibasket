
import NetInfo from '@react-native-community/netinfo' 

export default class NetworkUtils {
    static async isNetConnected() {
        const response  = await NetInfo.fetch()
        return response.isConnected
    }
}