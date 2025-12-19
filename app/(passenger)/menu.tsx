import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';
import { useAuthStore } from '@/presentation/stores/authStore';
import { User, History, Wallet, Car, HelpCircle, LogOut } from 'lucide-react-native';

const DESIGN_WIDTH = 375;

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default function MenuScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const menuItems: MenuItem[] = [
    {
      icon: <User size={24 * scale} color="#10B981" />,
      label: 'Mon Profil',
      onPress: () => router.push('/(passenger)/(tabs)/profile'),
    },
    {
      icon: <History size={24 * scale} color="#10B981" />,
      label: 'Historique',
      onPress: () => router.push('/(passenger)/(tabs)/activity'),
    },
    {
      icon: <Wallet size={24 * scale} color="#10B981" />,
      label: 'Paiement',
      onPress: () => router.push('/(passenger)/(tabs)/wallet'),
    },
    {
      icon: <Car size={24 * scale} color="#10B981" />,
      label: 'Mode chauffeur',
      onPress: () => {
        // TODO: Implémenter le mode chauffeur
        console.log('Mode chauffeur');
      },
    },
    {
      icon: <HelpCircle size={24 * scale} color="#10B981" />,
      label: 'Aide et assistance',
      onPress: () => {
        // TODO: Implémenter l'aide
        console.log('Aide et assistance');
      },
    },
  ];

  const dynamicStyles = StyleSheet.create({
    greenHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: 209 * scale,
      backgroundColor: '#10B981',
      borderBottomLeftRadius: 23 * scale,
      borderBottomRightRadius: 23 * scale,
    },
    backButtonContainer: {
      position: 'absolute',
      top: 50 * scale,
      left: 20 * scale,
      zIndex: 10,
    },
    profileContainer: {
      position: 'absolute',
      top: 114 * scale,
      left: (SCREEN_WIDTH - 155 * scale) / 2, // Centré
      width: 155 * scale,
      height: 155 * scale,
      borderRadius: 1000 * scale, // Très grand pour un cercle parfait
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    profileImage: {
      width: 147 * scale,
      height: 147 * scale,
      borderRadius: 100 * scale,
    },
    userName: {
      position: 'absolute',
      top: (114 + 155 + 20) * scale, // Après la photo
      left: (SCREEN_WIDTH - 200 * scale) / 2, // Centré
      width: 200 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 18 * scale,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'center',
    },
    menuContainer: {
      position: 'absolute',
      top: 340 * scale,
      left: 19 * scale,
      width: 338 * scale,
      height: 270 * scale,
      borderRadius: 17 * scale,
      backgroundColor: '#FFFFFF',
      paddingTop: 15 * scale,
      paddingRight: 18 * scale,
      paddingBottom: 15 * scale,
      paddingLeft: 18 * scale,
      gap: 10 * scale,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuItem: {
      width: 302 * scale,
      height: 40 * scale,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10 * scale,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuItemLabel: {
      fontFamily: 'Inter-Bold',
      fontSize: 16 * scale,
      fontWeight: '600',
      color: '#000000',
      marginLeft: 12 * scale,
      flex: 1,
    },
    logoutButton: {
      position: 'absolute',
      top: 684 * scale,
      left: 19 * scale,
      width: 338 * scale,
      height: 50 * scale,
      backgroundColor: '#DC2626',
      borderRadius: 17 * scale,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10 * scale,
      paddingTop: 10 * scale,
      paddingRight: 18 * scale,
      paddingBottom: 10 * scale,
      paddingLeft: 18 * scale,
    },
    logoutButtonText: {
      fontFamily: 'Inter-Bold',
      fontSize: 16 * scale,
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: 8 * scale,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Rectangle vert supérieur */}
        <View style={dynamicStyles.greenHeader} />

        {/* Bouton retour */}
        <View style={dynamicStyles.backButtonContainer}>
          <BackButton
            top={0}
            left={0}
            size={50}
            arrowRotation={0}
            arrowSize={20}
            borderColor="#FFFFFF"
            backgroundColor="rgba(255, 255, 255, 0.2)"
            arrowColor="#FFFFFF"
          />
        </View>

        {/* Conteneur photo de profil */}
        <View style={dynamicStyles.profileContainer}>
          <Image
            source={require('../../assets/images/Rectangle 7.png')}
            style={dynamicStyles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Nom utilisateur */}
        <Text style={dynamicStyles.userName}>
          {user?.name || 'Babacar Nguirane'}
        </Text>

        {/* Conteneur des éléments du menu */}
        <View style={dynamicStyles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                dynamicStyles.menuItem,
                index === menuItems.length - 1 && dynamicStyles.menuItemLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              {item.icon}
              <Text style={dynamicStyles.menuItemLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bouton Se déconnecter */}
        <TouchableOpacity
          style={dynamicStyles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={24 * scale} color="#FFFFFF" />
          <Text style={dynamicStyles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
});

