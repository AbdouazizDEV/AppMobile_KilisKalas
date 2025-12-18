import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensions basées sur un design de 375px de largeur (iPhone standard)
const DESIGN_WIDTH = 375;

export default function OnboardingScreen() {
  const router = useRouter();
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleStart = () => {
    // Navigation vers la page de login
    router.push('/(auth)/login');
  };

  // Créer les styles avec le scale calculé
  const dynamicStyles = StyleSheet.create({
    motoContainer: {
      position: 'absolute',
      top: 64.51 * scale,
      left: -1 * scale,
      width: 352.54 * scale,
      height: 93.99 * scale,
      zIndex: 10,
    },
    motoIcon: {
      position: 'absolute',
      top: 8.95 * scale,
      left: 321.46 * scale,
    },
    imageContainer: {
      position: 'absolute',
      top: 119.55 * scale,
      left: 10.47 * scale,
      width: 365.18 * scale,
      height: 421.95 * scale,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#10B981', // Bordure verte
      // chaque angle doit avoir son propre border-radius
      borderTopLeftRadius: 240 * scale,
      borderTopRightRadius: 200 * scale,
      borderBottomLeftRadius: 490 * scale,
      borderBottomRightRadius: 0 * scale, // bordure droite en haut
      transform: [{ rotate: '-5deg' }], // Inclinaison comme dans la maquette
    },
    textContainer: {
      position: 'absolute',
      top: 552 * scale,
      left: 24 * scale,
      width: 335 * scale,
      height: 137 * scale,
    },
    headline: {
      fontSize: 24 * scale,
      fontWeight: '600',
      color: '#111827',
      lineHeight: 32 * scale,
      marginBottom: 18 * scale,
    },
    bodyText: {
      fontSize: 14 * scale,
      color: '#6B7280',
      lineHeight: 20 * scale,
    },
    buttonContainer: {
      position: 'absolute',
      top: 713 * scale,
      left: 20 * scale,
      width: 335 * scale,
      height: 50 * scale,
    },
    button: {
      width: '100%',
      height: '100%',
      backgroundColor: '#10B981',
      borderRadius: 100, // border-radius: 100px
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#000000',
      fontSize: 16 * scale,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Moto avec ligne pointillée en haut */}
        <View style={dynamicStyles.motoContainer}>
          {/* Ligne pointillée courbe */}
          <Svg
            width={321.5 * scale}
            height={93.99 * scale}
            style={styles.dashedLine}
          >
            <Path
              d={`M 0 ${46.99 * scale} Q ${80 * scale} ${20 * scale}, ${160 * scale} ${46.99 * scale} T ${321.5 * scale} ${46.99 * scale}`}
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          </Svg>
          
          {/* Icône moto */}
          <View style={dynamicStyles.motoIcon}>
            <Svg width={24 * scale} height={24 * scale} viewBox="0 0 32 32" style={{ transform: [{ rotate: '-21.33deg' }] }}>
              <Path
                d="M23.882 13.4313C24.0749 12.9372 24.0636 12.3867 23.8507 11.9009C23.6377 11.4151 23.2405 11.0338 22.7464 10.8409L19.9519 9.74969L19.2244 11.6127L22.0189 12.7039L21.0551 15.1724L16.2126 17.9514L12.9523 16.6783L14.7709 12.0208L11.0449 10.5659C8.9863 9.76207 6.66783 10.7784 5.864 12.837L4.77282 15.6315L6.63583 16.359C6.03205 17.9053 6.79287 19.6409 8.33917 20.2447C9.88547 20.8485 11.6211 20.0877 12.2249 18.5414L16.4166 20.1781L22.6635 16.5519L23.882 13.4313ZM9.06662 18.3817C8.55429 18.1816 8.29879 17.5988 8.49884 17.0864L10.3619 17.8139C10.1618 18.3262 9.57895 18.5817 9.06662 18.3817ZM11.0893 15.9509L7.36328 14.496L7.72701 13.5645C8.12711 12.5398 9.29282 12.0288 10.3175 12.4289L12.1805 13.1564L11.0893 15.9509ZM21.6996 19.0204C20.1533 18.4166 18.4177 19.1774 17.8139 20.7237C17.2101 22.27 17.9709 24.0056 19.5172 24.6094C21.0635 25.2132 22.7992 24.4524 23.4029 22.9061C24.0067 21.3598 23.2459 19.6242 21.6996 19.0204ZM20.2447 22.7464C19.7324 22.5463 19.4769 21.9635 19.6769 21.4512C19.877 20.9388 20.4598 20.6833 20.9721 20.8834C21.4845 21.0834 21.74 21.6663 21.5399 22.1786C21.3399 22.6909 20.757 22.9464 20.2447 22.7464ZM15.1347 11.0893L10.4771 9.27068L11.2046 7.40766L15.8621 9.22629L15.1347 11.0893Z"
                fill="#10B981"
              />
            </Svg>
          </View>
        </View>

        {/* Image principale */}
        <View style={dynamicStyles.imageContainer}>
          <Image
            source={require('../assets/images/Image1.png')}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Container du texte */}
        <View style={dynamicStyles.textContainer}>
          <Text style={dynamicStyles.headline}>
            Votre trajet <Text style={styles.highlight}>idéal</Text>, au bout des <Text style={styles.highlight}>doigts</Text>.
          </Text>
          <Text style={dynamicStyles.bodyText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          </Text>
        </View>

        {/* Bouton Commençons */}
        <View style={dynamicStyles.buttonContainer}>
          <TouchableOpacity
            style={dynamicStyles.button}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Text style={dynamicStyles.buttonText}>Commençons</Text>
          </TouchableOpacity>
        </View>
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
  dashedLine: {
    position: 'absolute',
    top: -20,
    left: 0,
  },
  mainImage: {
    width: '126%',
    height: '109%',
  },
  highlight: {
    color: '#10B981',
  },
});

