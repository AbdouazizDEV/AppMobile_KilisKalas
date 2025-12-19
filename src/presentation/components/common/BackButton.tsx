import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const DESIGN_WIDTH = 375;

interface BackButtonProps {
  /**
   * Position top en pixels (basé sur le design de 375px)
   * @default 79
   */
  top?: number;
  /**
   * Position left en pixels (basé sur le design de 375px)
   * @default 20
   */
  left?: number;
  /**
   * Taille du bouton en pixels (basé sur le design de 375px)
   * @default 50
   */
  size?: number;
  /**
   * Couleur de la bordure
   * @default '#000000'
   */
  borderColor?: string;
  /**
   * Couleur de fond
   * @default '#FFFFFF'
   */
  backgroundColor?: string;
  /**
   * Rotation de la flèche en degrés (0 = droite, 90 = bas, 180 = gauche, 270 = haut)
   * @default 0
   */
  arrowRotation?: number;
  /**
   * Taille de la flèche en pixels (basé sur le design de 375px)
   * @default 20
   */
  arrowSize?: number;
  /**
   * Couleur de la flèche
   * @default '#000000'
   */
  arrowColor?: string;
  /**
   * Fonction appelée lors du clic (par défaut: router.back())
   */
  onPress?: () => void;
  /**
   * Style personnalisé pour le conteneur
   */
  style?: ViewStyle;
  /**
   * Désactiver le bouton
   * @default false
   */
  disabled?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  top = 79,
  left = 20,
  size = 50,
  borderColor = '#000000',
  backgroundColor = '#FFFFFF',
  arrowRotation = 0,
  arrowSize = 20,
  arrowColor = '#000000',
  onPress,
  style,
  disabled = false,
}) => {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  const buttonSize = size * scale;
  const arrowSizeScaled = arrowSize * scale;

  const dynamicStyles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: top * scale,
      left: left * scale,
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      borderWidth: 1,
      borderColor,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrow: {
      width: arrowSizeScaled,
      height: arrowSizeScaled,
      transform: [{ rotate: `${arrowRotation}deg` }],
    },
  });

  return (
    <TouchableOpacity
      style={[dynamicStyles.button, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Svg
        width={arrowSizeScaled}
        height={arrowSizeScaled}
        viewBox="0 0 20 20"
        style={dynamicStyles.arrow}
      >
        <Path
          d="M19.1667 10H0.833374M0.833374 10L7.70837 17.5M0.833374 10L7.70837 2.5"
          stroke={arrowColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

