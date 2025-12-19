import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';

const DESIGN_WIDTH = 375;

interface OTPInputProps {
  /**
   * Nombre de champs OTP
   * @default 4
   */
  length?: number;
  /**
   * Valeur du code OTP
   */
  value: string;
  /**
   * Callback appelé quand le code change
   */
  onChange: (code: string) => void;
  /**
   * Taille de chaque champ en pixels (basé sur le design de 375px)
   * @default 60
   */
  fieldSize?: number;
  /**
   * Espacement entre les champs en pixels (basé sur le design de 375px)
   * @default 12
   */
  spacing?: number;
  /**
   * Style personnalisé pour le conteneur
   */
  containerStyle?: ViewStyle;
  /**
   * Style personnalisé pour chaque champ
   */
  fieldStyle?: ViewStyle;
  /**
   * Style personnalisé pour le texte
   */
  textStyle?: TextStyle;
  /**
   * Couleur de la bordure
   * @default '#E5E7EB'
   */
  borderColor?: string;
  /**
   * Couleur de la bordure quand le champ est actif
   * @default '#10B981'
   */
  activeBorderColor?: string;
  /**
   * Couleur du texte
   * @default '#000000'
   */
  textColor?: string;
  /**
   * Couleur de fond
   * @default '#F3F4F6'
   */
  backgroundColor?: string;
  /**
   * Désactiver l'input
   * @default false
   */
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value,
  onChange,
  fieldSize = 60,
  spacing = 12,
  containerStyle,
  fieldStyle,
  textStyle,
  borderColor = '#E5E7EB',
  activeBorderColor = '#10B981',
  textColor = '#000000',
  backgroundColor = '#F3F4F6',
  disabled = false,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const fieldSizeScaled = fieldSize * scale;
  const spacingScaled = spacing * scale;

  // S'assurer que value a la bonne longueur
  const codeArray = value.split('').slice(0, length);
  while (codeArray.length < length) {
    codeArray.push('');
  }

  const handleChange = (text: string, index: number) => {
    // Ne garder que les chiffres
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length > 1) {
      // Si plusieurs caractères sont collés (ex: copier-coller)
      const newCode = numericText.slice(0, length);
      onChange(newCode);
      
      // Focus sur le dernier champ rempli
      const lastIndex = Math.min(newCode.length - 1, length - 1);
      inputRefs.current[lastIndex]?.focus();
    } else {
      // Un seul caractère
      const newCodeArray = [...codeArray];
      newCodeArray[index] = numericText;
      const newCode = newCodeArray.join('');
      onChange(newCode);

      // Passer au champ suivant si un caractère a été saisi
      if (numericText && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Si Backspace et le champ est vide, aller au champ précédent
    if (e.nativeEvent.key === 'Backspace' && !codeArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    field: {
      width: fieldSizeScaled,
      height: fieldSizeScaled,
      borderRadius: 12 * scale,
      borderWidth: 1,
      borderColor: focusedIndex === null ? borderColor : activeBorderColor,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacingScaled,
    },
    fieldLast: {
      marginRight: 0,
    },
    text: {
      fontSize: 24 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      color: textColor,
      textAlign: 'center',
    },
    placeholder: {
      fontSize: 24 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      color: '#9CA3AF',
      textAlign: 'center',
    },
  });

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {codeArray.map((digit, index) => (
        <View
          key={index}
          style={[
            dynamicStyles.field,
            index === length - 1 && dynamicStyles.fieldLast,
            fieldStyle,
          ]}
        >
          {digit ? (
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              editable={!disabled}
              style={[dynamicStyles.text, textStyle]}
            />
          ) : (
            <>
              <Text style={[dynamicStyles.placeholder, textStyle]}>-</Text>
              <TextInput
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value=""
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                editable={!disabled}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                }}
              />
            </>
          )}
        </View>
      ))}
    </View>
  );
};

