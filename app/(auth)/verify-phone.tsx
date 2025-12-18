import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/presentation/components/common/Button';
import { Input } from '@/presentation/components/common/Input';
import { useAuthStore } from '@/presentation/stores/authStore';

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = (params.phone as string) || '';
  const { verifyPhone, sendOTP, isLoading, error, clearError } = useAuthStore();
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (phone) {
      sendOTP(phone);
    }
  }, [phone]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    clearError();
    try {
      const isValid = await verifyPhone(phone, code);
      if (isValid) {
        router.replace('/(passenger)/(tabs)/home');
      }
    } catch (err) {
      // L'erreur est gérée par le store
    }
  };

  const handleResend = async () => {
    setCountdown(60);
    await sendOTP(phone);
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
              Vérification
            </Text>
            <Text className="text-base text-dark-600">
              Entrez le code envoyé à {phone}
            </Text>
          </View>

          {error && (
            <View className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          )}

          <View className="mb-6">
            <Input
              label="Code de vérification"
              placeholder="123456"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <Button
            title="Vérifier"
            onPress={handleVerify}
            loading={isLoading}
            disabled={code.length !== 6}
            className="mb-4"
          />

          <View className="items-center">
            {countdown > 0 ? (
              <Text className="text-dark-600">
                Renvoyer le code dans {countdown}s
              </Text>
            ) : (
              <Button
                title="Renvoyer le code"
                onPress={handleResend}
                variant="ghost"
                size="sm"
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

