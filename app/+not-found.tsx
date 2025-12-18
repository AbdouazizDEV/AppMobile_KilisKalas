import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/presentation/components/common/Button';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'Oops! Cette page n\'existe pas.' }} />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-dark-900 mb-4">
          Page non trouvée
        </Text>
        <Text className="text-dark-600 text-center mb-6">
          Désolé, la page que vous recherchez n'existe pas.
        </Text>
        <Link href="/(passenger)/(tabs)/home" asChild>
          <Button title="Retour à l'accueil" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

