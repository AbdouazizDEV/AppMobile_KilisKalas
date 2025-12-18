import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/presentation/components/common/Button';
import { useAuthStore } from '@/presentation/stores/authStore';
import { Phone, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    clearError();
    try {
      await login(phone);
      router.replace('/(passenger)/(tabs)/home');
    } catch (err) {
      // L'erreur est gérée par le store
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-10">
            <Text className="text-4xl font-bold text-dark-900 mb-3">
              Bienvenue
            </Text>
            <Text className="text-lg text-dark-600">
              Connectez-vous pour continuer
            </Text>
          </View>

          {error && (
            <View className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          )}

          <View className="mb-5">
            <Text className="text-sm font-medium text-dark-700 mb-3">
              Numéro de téléphone
            </Text>
            <View className="flex-row items-center bg-white rounded-xl border border-dark-200 px-4 h-14">
              <Phone size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-base text-dark-900"
                placeholder="+221 77 123 45 67"
                placeholderTextColor="#9CA3AF"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-dark-700 mb-3">
              Mot de passe (optionnel)
            </Text>
            <View className="flex-row items-center bg-white rounded-xl border border-dark-200 px-4 h-14">
              <Lock size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-base text-dark-900"
                placeholder="........"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!phone}
            className="mb-5"
            size="lg"
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/forgot-password')}
            className="mb-8"
          >
            <Text className="text-center text-primary-500 font-medium text-base">
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center">
            <Text className="text-dark-600 text-base">Pas encore de compte ? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-primary-500 font-semibold text-base">
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

