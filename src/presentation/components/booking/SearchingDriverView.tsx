import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';

const DESIGN_WIDTH = 375;

interface SearchingDriverViewProps {
  vehicleIcon: any;
  onCancel: () => void;
}

export const SearchingDriverView: React.FC<SearchingDriverViewProps> = ({
  vehicleIcon,
  onCancel,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const translateXValue = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [20 * scale, SCREEN_WIDTH - 100 * scale],
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 16 * scale, marginBottom: 30 * scale }]}>
        Recherche d'un chauffeur en cours...
      </Text>
      <View style={[styles.animationContainer, { height: 200 * scale }]}>
        <Animated.View
          style={[
            styles.animatedIcon,
            {
              transform: [{ translateX: translateXValue }],
            },
          ]}
        >
          <Image
            source={vehicleIcon}
            style={[styles.icon, { width: 80 * scale, height: 50 * scale }]}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <TouchableOpacity
        style={[styles.cancelButton, { width: 335 * scale, height: 50 * scale, borderRadius: 17 * scale }]}
        onPress={onCancel}
        activeOpacity={0.8}
      >
        <Text style={[styles.cancelButtonText, { fontSize: 15 * scale }]}>Annuler la commande</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  animationContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  animatedIcon: {
    position: 'absolute',
  },
  icon: {
    width: 80,
    height: 50,
  },
  cancelButton: {
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

