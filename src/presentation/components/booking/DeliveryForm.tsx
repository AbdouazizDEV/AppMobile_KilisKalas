import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const DESIGN_WIDTH = 375;

interface DeliveryFormProps {
  recipientPhone: string;
  recipientName: string;
  packageDescription: string;
  onRecipientPhoneChange: (text: string) => void;
  onRecipientNameChange: (text: string) => void;
  onPackageDescriptionChange: (text: string) => void;
  isValid: boolean;
  onSubmit: () => void;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  recipientPhone,
  recipientName,
  packageDescription,
  onRecipientPhoneChange,
  onRecipientNameChange,
  onPackageDescriptionChange,
  isValid,
  onSubmit,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={[styles.title, { fontSize: 16 * scale, marginBottom: 20 * scale }]}>
        Informations de livraison
      </Text>

      {/* Numéro du destinataire */}
      <View style={{ marginBottom: 20 * scale }}>
        <Text style={[styles.label, { fontSize: 14 * scale, marginBottom: 10 * scale }]}>
          Numéro du destinataire
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              fontSize: 14 * scale,
              padding: 15 * scale,
              borderRadius: 12 * scale,
            },
          ]}
          placeholder="Tapez ici"
          placeholderTextColor="#9CA3AF"
          value={recipientPhone}
          onChangeText={onRecipientPhoneChange}
          keyboardType="phone-pad"
        />
      </View>

      {/* Nom et prénom du destinataire */}
      <View style={{ marginBottom: 20 * scale }}>
        <Text style={[styles.label, { fontSize: 14 * scale, marginBottom: 10 * scale }]}>
          Nom et prénom du destinataire
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              fontSize: 14 * scale,
              padding: 15 * scale,
              borderRadius: 12 * scale,
            },
          ]}
          placeholder="Tapez ici"
          placeholderTextColor="#9CA3AF"
          value={recipientName}
          onChangeText={onRecipientNameChange}
        />
      </View>

      {/* Description du colis */}
      <View style={{ marginBottom: 20 * scale }}>
        <Text style={[styles.label, { fontSize: 14 * scale, marginBottom: 10 * scale }]}>
          Description du colis
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              fontSize: 14 * scale,
              padding: 15 * scale,
              borderRadius: 12 * scale,
              minHeight: 100 * scale,
              textAlignVertical: 'top',
            },
          ]}
          placeholder="Tapez ici"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          value={packageDescription}
          onChangeText={onPackageDescriptionChange}
        />
      </View>

      {/* Avertissement */}
      <Text style={[styles.warning, { fontSize: 12 * scale, marginBottom: 30 * scale }]}>
        Le poids du colis ne doit pas dépasser 10kg
      </Text>

      {/* Bouton commander */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            height: 50 * scale,
            borderRadius: 17 * scale,
            backgroundColor: isValid ? '#10B981' : '#9CA3AF',
            opacity: isValid ? 1 : 0.6,
          },
        ]}
        onPress={onSubmit}
        activeOpacity={0.8}
        disabled={!isValid}
      >
        <Text style={[styles.submitButtonText, { fontSize: 15 * scale }]}>Commander</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
  },
  input: {
    backgroundColor: '#F3F4F6',
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
  warning: {
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
    color: '#DC2626',
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 335,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

