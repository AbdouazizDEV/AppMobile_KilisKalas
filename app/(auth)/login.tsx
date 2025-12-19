import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/presentation/stores/authStore';
import Svg, { Path } from 'react-native-svg';
import { Eye, EyeOff } from 'lucide-react-native';

const DESIGN_WIDTH = 375;

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleLogin = async () => {
    try {
      await login(emailOrPhone, password || undefined);
      router.replace('/(passenger)/(tabs)/home');
    } catch (err) {
      // L'erreur est gérée par le store
    }
  };

  const dynamicStyles = StyleSheet.create({
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 32 * scale,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'center',
      marginTop: 60 * scale,
      marginBottom: 8 * scale,
    },
    subtitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16 * scale,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'center',
      marginBottom: 40 * scale,
    },
    inputContainer: {
      position: 'absolute',
      top: 286 * scale,
      left: 22.02 * scale,
      width: 335 * scale,
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 20 * scale,
      justifyContent: 'center',
      marginBottom: 19 * scale,
    },
    passwordInputContainer: {
      position: 'absolute',
      top: (286 + 80) * scale, // 70px gap entre les inputs
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
    },
    inputLabel: {
      position: 'absolute',
      top: (286 - 25) * scale,
      left: 22.02 * scale,
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      color: '#000000',
      marginBottom: 8 * scale,
    },
    passwordLabel: {
      position: 'absolute',
      top: (286 + 55) * scale,
      left: 22.02 * scale,
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      color: '#000000',
      marginBottom: 18 * scale,
    },
    forgotPassword: {
      position: 'absolute',
      top: (286 + 130) * scale,
      right: 22.02 * scale,
      fontSize: 12 * scale,
      fontFamily: 'Poppins-Medium',
      color: '#000000',
      textDecorationLine: 'underline',
    },
    loginButton: {
      position: 'absolute',
      top: (286 + 180) * scale,
      left: 22.02 * scale,
      width: 335 * scale,
      height: 50 * scale,
      backgroundColor: '#10B981',
      borderRadius: 100 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginButtonText: {
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 15 * scale,
      lineHeight: 20.8 * scale,
      letterSpacing: 0,
      color: '#000000',
      textAlign: 'center',
    },
    registerText: {
      position: 'absolute',
      top: (286 + 250) * scale,
      left: (SCREEN_WIDTH - 286 * scale) / 2,
      width: 286 * scale,
      height: 18 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerTextNormal: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '500',
      fontSize: 12 * scale,
      lineHeight: 12 * scale, // 100%
      letterSpacing: 0.5 * scale / 100, // 0.5%
      color: '#000000',
    },
    registerTextLink: {
      fontFamily: 'Poppins-Bold',
      fontWeight: '700',
      fontSize: 12 * scale,
      lineHeight: 12 * scale, // 100%
      letterSpacing: 0.5 * scale / 100, // 0.5%
      color: '#10B981',
    },
    separator: {
      position: 'absolute',
      top: 632.52 * scale,
      left: 19 * scale,
      width: 337 * scale,
      height: 18 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20 * scale,
    },
    separatorLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
    },
    separatorText: {
      fontSize: 14 * scale,
      color: '#6B7280',
      fontFamily: 'Inter-Bold',
    },
    googleButton: {
      position: 'absolute',
      top: 671.52 * scale,
      left: 155 * scale,
      width: 65 * scale,
      height: 65 * scale,
      borderRadius: 32.5 * scale,
      borderWidth: 1,
      borderColor: '#10B981',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleIcon: {
      width: 44 * scale,
      height: 44 * scale,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Titre */}
        <Text style={dynamicStyles.title}>Connexion</Text>
        
        {/* Sous-titre */}
        <Text style={dynamicStyles.subtitle}>Salut! Bon retour parmi nous!</Text>

        {/* Label Email ou téléphone */}
        <Text style={dynamicStyles.inputLabel}>Email ou numéro de téléphone</Text>
        
        {/* Input Email ou téléphone */}
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

        {/* Label Mot de passe */}
        <Text style={dynamicStyles.passwordLabel}>Mot de passe</Text>
        
        {/* Input Mot de passe */}
        <View style={dynamicStyles.passwordInputContainer}>
          <TextInput
            style={[dynamicStyles.input, { paddingRight: 10 * scale }]}
            placeholder="Tapez ici"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20 * scale} color="#6B7280" />
            ) : (
              <Eye size={20 * scale} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>

        {/* Mot de passe oublié */}
        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={dynamicStyles.forgotPassword}>mot de passe oublié</Text>
        </TouchableOpacity>

        {/* Bouton Se connecter */}
        <TouchableOpacity
          style={dynamicStyles.loginButton}
          onPress={handleLogin}
          disabled={isLoading || !emailOrPhone}
          activeOpacity={0.8}
        >
          <Text style={dynamicStyles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        {/* Texte Créer un compte */}
        <View style={dynamicStyles.registerText}>
          <Text style={dynamicStyles.registerTextNormal}>
            Vous n'avez pas de compte?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={dynamicStyles.registerTextLink}>
              Créer un compte
            </Text>
          </TouchableOpacity>
        </View>

        {/* Barre de séparation */}
        <View style={dynamicStyles.separator}>
          <View style={dynamicStyles.separatorLine} />
          <Text style={dynamicStyles.separatorText}>ou</Text>
          <View style={dynamicStyles.separatorLine} />
        </View>

        {/* Bouton Google */}
        <TouchableOpacity
          style={dynamicStyles.googleButton}
          onPress={() => {
            // TODO: Implémenter la connexion Google
            console.log('Google login');
          }}
          activeOpacity={0.8}
        >
          <Svg
            width={44 * scale}
            height={44 * scale}
            viewBox="0 0 44 44"
            style={dynamicStyles.googleIcon}
          >
            <Path
              d="M21.9996 17.9999V26.52H33.8396C33.3197 29.26 31.7595 31.58 29.4195 33.14L36.5595 38.6801C40.7195 34.8402 43.1195 29.2001 43.1195 22.5002C43.1195 20.9402 42.9795 19.44 42.7195 18.0002L21.9996 17.9999Z"
              fill="#4285F4"
            />
            <Path
              d="M9.67029 26.1874L8.05996 27.4201L2.35986 31.86C5.97985 39.0399 13.3993 44 21.9992 44C27.9391 44 32.919 42.04 36.5591 38.6801L29.4191 33.14C27.4591 34.46 24.9591 35.2601 21.9992 35.2601C16.2793 35.2601 11.4194 31.4001 9.67928 26.2001L9.67029 26.1874Z"
              fill="#34A853"
            />
            <Path
              d="M2.35983 12.14C0.85991 15.0999 0 18.4399 0 21.9999C0 25.5598 0.85991 28.8999 2.35983 31.8598C2.35983 31.8796 9.67995 26.1797 9.67995 26.1797C9.23996 24.8598 8.97988 23.4598 8.97988 21.9997C8.97988 20.5395 9.23996 19.1395 9.67995 17.8196L2.35983 12.14Z"
              fill="#FBBC05"
            />
            <Path
              d="M21.9997 8.75999C25.2397 8.75999 28.1197 9.87996 30.4197 12.04L36.7196 5.74007C32.8996 2.18014 27.9398 0 21.9997 0C13.3998 0 5.97985 4.93999 2.35986 12.14L9.67976 17.82C11.4197 12.62 16.2797 8.75999 21.9997 8.75999Z"
              fill="#EA4335"
            />
          </Svg>
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
