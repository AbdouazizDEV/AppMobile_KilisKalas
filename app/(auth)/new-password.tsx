import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';
import { Eye, EyeOff } from 'lucide-react-native';

const DESIGN_WIDTH = 375;

export default function NewPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleCreatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      // TODO: Afficher une erreur - les mots de passe ne correspondent pas
      return;
    }

    setIsLoading(true);
    // TODO: Implémenter la réinitialisation du mot de passe
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Rediriger vers la page de connexion après succès
    router.replace('/(auth)/login');
  };

  const dynamicStyles = StyleSheet.create({
    title: {
      position: 'absolute',
      top: 159 * scale,
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 32 * scale,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'center',
      marginBottom: 12 * scale,
    },
    subtitle: {
      position: 'absolute',
      top: (159 + 50) * scale, // Après le titre
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 16 * scale,
      fontWeight: '400',
      color: '#000000',
      textAlign: 'center',
      lineHeight: 24 * scale,
    },
    newPasswordLabel: {
      position: 'absolute',
      top: (159 + 50 + 60) * scale, // Après le sous-titre + espacement
      left: 22.02 * scale,
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      color: '#000000',
      marginBottom: 8 * scale,
    },
    newPasswordInputContainer: {
      position: 'absolute',
      top: (159 + 50 + 60 + 30) * scale, // Après le label
      left: 22.02 * scale,
      width: 335 * scale,
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 20 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    confirmPasswordLabel: {
      position: 'absolute',
      top: (159 + 50 + 60 + 30 + 70) * scale, // Après le premier input + espacement
      left: 22.02 * scale,
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      color: '#000000',
      marginBottom: 8 * scale,
    },
    confirmPasswordInputContainer: {
      position: 'absolute',
      top: (159 + 50 + 60 + 30 + 70 + 30) * scale, // Après le label
      left: 22.02 * scale,
      width: 335 * scale,
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 20 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      flex: 1,
      fontSize: 14 * scale,
      color: '#000000',
      fontFamily: 'Inter-Bold',
      paddingRight: 10 * scale,
    },
    createButton: {
      position: 'absolute',
      top: (159 + 50 + 60 + 30 + 70 + 30 + 80) * scale, // Après le deuxième input + espacement
      left: 22.02 * scale,
      width: 335 * scale,
      height: 50 * scale,
      backgroundColor: '#10B981',
      borderRadius: 100 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButtonText: {
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 15 * scale,
      lineHeight: 20.8 * scale,
      letterSpacing: 0,
      color: '#FFFFFF',
      textAlign: 'center',
    },
  });

  const isFormValid = newPassword.length > 0 && confirmPassword.length > 0 && newPassword === confirmPassword;

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
        <Text style={dynamicStyles.title}>Nouveau mot de passe</Text>

        {/* Sous-titre */}
        <Text style={dynamicStyles.subtitle}>
          Votre mot de passe doit être différent de votre ancien mot de passe
        </Text>

        {/* Label Nouveau mot de passe */}
        <Text style={dynamicStyles.newPasswordLabel}>Nouveau mot de passe</Text>

        {/* Input Nouveau mot de passe */}
        <View style={dynamicStyles.newPasswordInputContainer}>
          <TextInput
            style={dynamicStyles.input}
            placeholder="Tapez ici"
            placeholderTextColor="#9CA3AF"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? (
              <EyeOff size={20 * scale} color="#6B7280" />
            ) : (
              <Eye size={20 * scale} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>

        {/* Label Confirmer le mot de passe */}
        <Text style={dynamicStyles.confirmPasswordLabel}>Confirmer le mot de passe</Text>

        {/* Input Confirmer le mot de passe */}
        <View style={dynamicStyles.confirmPasswordInputContainer}>
          <TextInput
            style={dynamicStyles.input}
            placeholder="Tapez ici"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <EyeOff size={20 * scale} color="#6B7280" />
            ) : (
              <Eye size={20 * scale} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>

        {/* Bouton Créer un nouveau mot de passe */}
        <TouchableOpacity
          style={[
            dynamicStyles.createButton,
            (!isFormValid || isLoading) && { opacity: 0.5 },
          ]}
          onPress={handleCreatePassword}
          disabled={!isFormValid || isLoading}
          activeOpacity={0.8}
        >
          <Text style={dynamicStyles.createButtonText}>Créer un nouveau mot de passe</Text>
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



