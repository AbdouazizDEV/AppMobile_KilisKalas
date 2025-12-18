import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/presentation/components/common/Button';
import { Input } from '@/presentation/components/common/Input';
import { useAuthStore } from '@/presentation/stores/authStore';
import { User, Phone, Mail } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    clearError();
    try {
      await register(name, phone, email || undefined);
      router.replace('/(passenger)/(tabs)/home');
    } catch (err) {
      // L'erreur est gérée par le store
    }
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
              Créer un compte
            </Text>
            <Text className="text-base text-dark-600">
              Inscrivez-vous pour commencer
            </Text>
          </View>

          {error && (
            <View className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          )}

          <View className="mb-4">
            <Input
              label="Nom complet"
              placeholder="Votre nom"
              value={name}
              onChangeText={setName}
              autoComplete="name"
              leftIcon={<User size={20} color="#6B7280" />}
            />
          </View>

          <View className="mb-4">
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

          <View className="mb-6">
            <Input
              label="Email (optionnel)"
              placeholder="votre@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoComplete="email"
              leftIcon={<Mail size={20} color="#6B7280" />}
            />
          </View>

          <Button
            title="S'inscrire"
            onPress={handleRegister}
            loading={isLoading}
            disabled={!name || !phone}
            className="mb-6"
          />

          <View className="flex-row justify-center items-center">
            <Text className="text-dark-600">Déjà un compte ? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary-500 font-semibold">
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

