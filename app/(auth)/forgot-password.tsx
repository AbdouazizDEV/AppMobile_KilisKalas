import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/presentation/components/common/Button';
import { Input } from '@/presentation/components/common/Input';
import { Phone } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    // TODO: Implémenter la réinitialisation du mot de passe
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-8">
            <Text className="text-3xl font-bold text-dark-900 mb-2">
              Mot de passe oublié ?
            </Text>
            <Text className="text-base text-dark-600">
              Entrez votre numéro de téléphone pour recevoir un code de réinitialisation
            </Text>
          </View>

          <View className="mb-6">
            <Input
              label="Numéro de téléphone"
              placeholder="+221 77 123 45 67"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
              leftIcon={<Phone size={20} color="#6B7280" />}
            />
          </View>

          <Button
            title="Envoyer le code"
            onPress={handleReset}
            loading={isLoading}
            disabled={!phone}
            className="mb-6"
          />

          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-center text-primary-500 font-medium">
              Retour à la connexion
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

