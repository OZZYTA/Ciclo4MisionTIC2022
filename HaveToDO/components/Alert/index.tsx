import { Alert, Platform } from 'react-native'

const alertPolyfill = (title: string) => {
    const result = window.confirm([title].filter(Boolean).join('\n'))

    if (result) {
        return result  
    } else {
        return result
    }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert