import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootLayout from "./_layout";

export default function  App () {
    return(
        <SafeAreaProvider>
          <RootLayout/>
        </SafeAreaProvider>
    )
}