import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';

const DESIGN_WIDTH = 375;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleContinue = () => {
    // TODO: Implémenter l'envoi du code
    if (emailOrPhone) {
      router.push({
        pathname: '/(auth)/verify-phone',
        params: { phone: emailOrPhone },
      });
    }
  };

  const dynamicStyles = StyleSheet.create({
    textContainer: {
      position: 'absolute',
      top: 159 * scale,
      left: 20 * scale,
      width: 340 * scale,
      height: 76 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 32 * scale,
      fontWeight: '700',
      color: '#000000',
      marginBottom: 12 * scale,
    },
    instructions: {
      fontFamily: 'Normal',
      fontSize: 16 * scale,
      fontWeight: '400',
      color: '#000000',
      lineHeight: 24 * scale,
      textAlign: 'center',
    },
    inputLabel: {
      position: 'absolute',
      top: (159 + 76 + 30) * scale, // Après le conteneur de texte + espacement
      left: 20 * scale,
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      color: '#000000',
      marginBottom: 8 * scale,
    },
    inputContainer: {
      position: 'absolute',
      top: (159 + 76 + 60) * scale, // Après le label
      left: 20 * scale,
      width: 335 * scale,
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 20 * scale,
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      fontSize: 14 * scale,
      color: '#000000',
      fontFamily: 'Inter-Bold',
    },
    continueButton: {
      position: 'absolute',
      top: (149 + 76 + 60 + 80) * scale, // Après l'input + espacement
      left: 20 * scale,
      width: 335 * scale,
      height: 50 * scale,
      backgroundColor: '#10B981',
      borderRadius: 100 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    continueButtonText: {
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 15 * scale,
      lineHeight: 20.8 * scale,
      letterSpacing: 0,
      color: '#FFFFFF',
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

        {/* Conteneur du texte */}
        <View style={dynamicStyles.textContainer}>
          <Text style={dynamicStyles.title}>Trouver mon compte</Text>
          <Text style={dynamicStyles.instructions}>
            Entrez votre email ou ou votre numéro de téléphone pour recevoir le code
          </Text>
        </View>

        {/* Label */}
        <Text style={dynamicStyles.inputLabel}>Email ou numéro de téléphone</Text>

        {/* Input */}
        <View style={dynamicStyles.inputContainer}>
          <TextInput
            style={dynamicStyles.input}
            placeholder="Tapez ici"
            placeholderTextColor="#9CA3AF"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Bouton Continuer */}
        <TouchableOpacity
          style={dynamicStyles.continueButton}
          onPress={handleContinue}
          disabled={!emailOrPhone}
          activeOpacity={0.8}
        >
          <Text style={dynamicStyles.continueButtonText}>Continuer</Text>
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
