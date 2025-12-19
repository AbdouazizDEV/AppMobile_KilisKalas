import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';
import Svg, { Path, Circle } from 'react-native-svg';

const DESIGN_WIDTH = 375;

interface PaymentMethod {
  id: string;
  name: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Espèces',
  },
  {
    id: 'wave',
    name: 'Wave',
  },
  {
    id: 'orange_money',
    name: 'Orange money',
  },
];

export default function PaymentMethodScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string>(
    (params.selectedMethod as string) || 'cash'
  );

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    // Mettre à jour les paramètres et retourner
    router.setParams({
      ...params,
      selectedMethod: methodId,
    });
    // Attendre un peu pour que les paramètres soient mis à jour
    setTimeout(() => {
      router.back();
    }, 100);
  };

  const dynamicStyles = StyleSheet.create({
    title: {
      position: 'absolute',
      top: 79 * scale,
      left: (SCREEN_WIDTH - 200 * scale) / 2, // Centré
      width: 200 * scale,
      fontFamily: 'Inter-Bold',
      fontSize: 20 * scale,
      fontWeight: '700',
      color: '#000000',
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
          onPress={() => {
            router.setParams({
              ...params,
              selectedMethod: selectedMethod,
            });
            router.back();
          }}
        />

        {/* Titre */}
        <Text style={dynamicStyles.title}>Méthode de paiement</Text>

        {/* Options de paiement */}
        {PAYMENT_METHODS.map((method, index) => (
          <TouchableOpacity
            key={method.id}
            style={[
              {
                position: 'absolute',
                top: 159 * scale + index * 70 * scale,
                left: 20 * scale,
                width: 335 * scale,
                height: 50 * scale,
                borderRadius: 12 * scale,
                borderWidth: 1,
                borderColor: selectedMethod === method.id ? '#10B981' : '#E5E7EB',
                backgroundColor: selectedMethod === method.id ? '#F0FDF4' : '#FFFFFF',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20 * scale,
                justifyContent: 'space-between',
              },
            ]}
            onPress={() => handleSelect(method.id)}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 24 * scale,
                  height: 24 * scale,
                  borderRadius: 12 * scale,
                  borderWidth: 2,
                  borderColor: selectedMethod === method.id ? '#10B981' : '#9CA3AF',
                  backgroundColor: selectedMethod === method.id ? '#10B981' : '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12 * scale,
                }}
              >
                {selectedMethod === method.id && (
                  <View
                    style={{
                      width: 12 * scale,
                      height: 12 * scale,
                      borderRadius: 6 * scale,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16 * scale,
                  fontFamily: 'Inter-Bold',
                  fontWeight: '600',
                  color: '#000000',
                }}
              >
                {method.name}
              </Text>
            </View>
            {method.id === 'cash' && (
              <Svg width={40 * scale} height={40 * scale} viewBox="0 0 30 30">
                <Path
                  d="M13.2375 8.41881C13.3782 7.78834 13.2704 8.08834 12.3633 6.76177C11.5477 5.57115 11.7164 3.87896 10.7508 3.03756C10.1579 2.52193 9.41489 1.94302 6.64692 3.33521C5.68598 3.81802 3.76645 5.40943 1.59145 6.13834C-0.159331 6.72427 0.810982 7.43209 1.18364 7.56334C2.5102 8.02974 4.26567 7.02193 4.26567 7.02193C4.26567 7.02193 1.74848 8.66724 3.22739 9.05631C4.42739 9.37271 5.93911 7.93131 5.93911 7.93131C5.93911 7.93131 4.45786 9.50162 5.66958 9.90474C6.50161 10.1813 8.15395 8.60162 8.15395 8.60162C8.15395 8.60162 6.99848 10.2071 7.55629 10.5469C8.40473 11.0626 9.79457 9.73365 9.79457 9.73365C9.79457 9.73365 8.69067 11.3461 9.26723 11.6086C10.1297 12.0024 11.4094 10.8961 11.4094 10.8961C11.4094 10.8961 12.9844 9.54615 13.2375 8.41881Z"
                  fill="#E0E0E0"
                />
                <Path
                  d="M20.421 16.6007C18.0655 20.1304 16.085 24.0187 11.5804 25.2093C11.5335 25.2211 11.4843 25.207 11.4515 25.1718L4.09208 17.0507C3.87411 16.8093 3.98192 16.4273 4.2913 16.3265C7.31708 15.3328 9.20614 12.9656 10.889 10.4414C13.2093 6.96559 15.1968 3.14059 19.5585 1.88668C19.7249 1.8234 19.9194 1.86324 20.046 2.00153C21.0233 3.07965 28.3944 10.0968 28.4061 10.1109C28.4108 10.1132 22.228 13.8914 20.421 16.6007Z"
                  fill="#66BB6A"
                />
              </Svg>
            )}
            {method.id === 'wave' && (
              <Svg width={40 * scale} height={40 * scale} viewBox="0 0 62 62">
                <Circle cx="31" cy="30" r="15" fill="#10B981" />
                <Circle cx="31" cy="30" r="15.5" stroke="#10B981" strokeWidth="1" fill="none" />
              </Svg>
            )}
            {method.id === 'orange_money' && (
              <Svg width={40 * scale} height={40 * scale} viewBox="0 0 62 62">
                <Circle cx="31" cy="30" r="15" fill="#0078FA" />
                <Circle cx="31" cy="30" r="15.5" stroke="#0078FA" strokeWidth="1" fill="none" />
              </Svg>
            )}
          </TouchableOpacity>
        ))}
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

