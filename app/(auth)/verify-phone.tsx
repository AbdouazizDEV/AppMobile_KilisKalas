import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';
import { OTPInput } from '@/presentation/components/common/OTPInput';
import { useAuthStore } from '@/presentation/stores/authStore';

const DESIGN_WIDTH = 375;

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = (params.phone as string) || '';
  const { verifyPhone, sendOTP, isLoading, error, clearError } = useAuthStore();
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  useEffect(() => {
    if (phone) {
      sendOTP(phone);
    }
  }, [phone]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    clearError();
    if (code.length === 4) {
      try {
        const isValid = await verifyPhone(phone, code);
        if (isValid) {
          router.replace({
            pathname: '/(auth)/new-password',
            params: { phone },
          });
        }
      } catch (err) {
        // L'erreur est gérée par le store
      }
    }
  };

  const handleResend = async () => {
    setCountdown(60);
    setCanResend(false);
    setCode('');
    await sendOTP(phone);
  };

  const dynamicStyles = StyleSheet.create({
    title: {
      position: 'absolute',
      top: 159 * scale,
      left: (SCREEN_WIDTH - 300 * scale) / 2, // Centré
      width: 300 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 32 * scale,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'center',
    },
    description: {
      position: 'absolute',
      top: (169 + 50) * scale, // Après le titre
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      fontFamily: 'Normal',
      fontSize: 16 * scale,
      fontWeight: '400',
      color: '#000000',
      textAlign: 'center',
      lineHeight: 24 * scale,
    },
    otpContainer: {
      position: 'absolute',
      top: (179 + 50 + 50) * scale, // Après la description
      left: (SCREEN_WIDTH - (60 * 4 + 12 * 3) * scale) / 2, // Centré (4 champs de 60px + 3 espacements de 12px)
    },
    codeNotReceived: {
      position: 'absolute',
      top: (159 + 50 + 50 + 100) * scale, // Après les champs OTP
      left: (SCREEN_WIDTH - 200 * scale) / 2, // Centré
      width: 200 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 14 * scale,
      fontWeight: '400',
      color: '#000000',
      textAlign: 'center',
    },
    resendLink: {
      position: 'absolute',
      top: (159 + 50 + 50 + 100 + 30) * scale, // Après "Code non reçu?"
      left: (SCREEN_WIDTH - 150 * scale) / 2, // Centré
      width: 150 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 14 * scale,
      fontWeight: '700',
      color: '#10B981',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    resendCountdown: {
      position: 'absolute',
      top: (159 + 50 + 50 + 100 + 30) * scale, // Après "Code non reçu?"
      left: (SCREEN_WIDTH - 200 * scale) / 2, // Centré
      width: 200 * scale,
      fontFamily: 'Normal',
      fontSize: 14 * scale,
      fontWeight: '400',
      color: '#6B7280',
      textAlign: 'center',
    },
    verifyButton: {
      position: 'absolute',
      top: (159 + 50 + 50 + 100 + 30 + 50 + 40) * scale, // Après le lien renvoyer
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      height: 50 * scale,
      backgroundColor: '#10B981',
      borderRadius: 100 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verifyButtonText: {
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 15 * scale,
      lineHeight: 20.8 * scale,
      letterSpacing: 0,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    errorContainer: {
      position: 'absolute',
      top: (139 + 50 + 50 + 100 + 30 + 50) * scale, // Avant le bouton vérifier
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      padding: 12 * scale,
      backgroundColor: '#FEE2E2',
      borderRadius: 12 * scale,
      borderWidth: 1,
      borderColor: '#FECACA',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    errorText: {
      fontFamily: 'Normal',
      fontSize: 12 * scale,
      color: '#DC2626',
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Bouton retour */}
        <BackButton
          top={79}
          left={20}
          size={50}
          arrowRotation={0}
          arrowSize={20}
        />

        {/* Titre */}
        <Text style={dynamicStyles.title}>Code de verification</Text>

        {/* Description */}
        <Text style={dynamicStyles.description}>
          Entrez le code que nous avons envoyez sur votre email
        </Text>

        {/* Champs OTP */}
        <View style={dynamicStyles.otpContainer}>
          <OTPInput
            length={4}
            value={code}
            onChange={setCode}
            fieldSize={60}
            spacing={12}
          />
        </View>

        {/* Code non reçu */}
        <Text style={dynamicStyles.codeNotReceived}>Code non reçu?</Text>

        {/* Lien Renvoyer le code */}
        {canResend ? (
          <TouchableOpacity onPress={handleResend}>
            <Text style={dynamicStyles.resendLink}>Renvoyer le code</Text>
          </TouchableOpacity>
        ) : (
          <Text style={dynamicStyles.resendCountdown}>
            Renvoyer le code dans {countdown}s
          </Text>
        )}

        {/* Message d'erreur */}
        {error && (
          <View style={dynamicStyles.errorContainer}>
            <Text style={dynamicStyles.errorText}>{error}</Text>
          </View>
        )}

        {/* Bouton Vérifier */}
        <TouchableOpacity
          style={[
            dynamicStyles.verifyButton,
            (code.length !== 4 || isLoading) && { opacity: 0.5 },
          ]}
          onPress={handleVerify}
          disabled={code.length !== 4 || isLoading}
          activeOpacity={0.8}
        >
          <Text style={dynamicStyles.verifyButtonText}>Vérifier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
});
