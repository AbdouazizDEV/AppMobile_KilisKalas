import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { Wallet, Plus, History, CreditCard } from 'lucide-react-native';

export default function WalletScreen() {
  const balance = 25000; // Mock balance

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-dark-900 mb-6">
            Portefeuille
          </Text>

          {/* Balance Card */}
          <Card className="mb-6 bg-primary-500">
            <View className="items-center py-6">
              <Wallet size={32} color="white" />
              <Text className="text-white text-sm mt-2 mb-1">Solde disponible</Text>
              <Text className="text-white text-4xl font-bold">
                {balance.toLocaleString()} FCFA
              </Text>
            </View>
          </Card>

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-dark-900 mb-4">
              Actions rapides
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity className="flex-1 mr-2">
                <Card className="items-center py-4">
                  <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-2">
                    <Plus size={24} color="#F97316" />
                  </View>
                  <Text className="text-dark-700 font-medium text-sm">
                    Ajouter des fonds
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 ml-2">
                <Card className="items-center py-4">
                  <View className="w-12 h-12 bg-secondary-100 rounded-full items-center justify-center mb-2">
                    <History size={24} color="#22C55E" />
                  </View>
                  <Text className="text-dark-700 font-medium text-sm">
                    Historique
                  </Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Methods */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-dark-900 mb-4">
              Méthodes de paiement
            </Text>
            <Card className="mb-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <CreditCard size={24} color="#6B7280" />
                  <Text className="ml-3 text-dark-700 font-medium">
                    Orange Money
                  </Text>
                </View>
                <Text className="text-dark-500 text-sm">+221 77 123 45 67</Text>
              </View>
            </Card>
            <Card>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <CreditCard size={24} color="#6B7280" />
                  <Text className="ml-3 text-dark-700 font-medium">
                    Wave
                  </Text>
                </View>
                <Text className="text-dark-500 text-sm">Non configuré</Text>
              </View>
            </Card>
          </View>

          {/* Recent Transactions */}
          <View>
            <Text className="text-lg font-semibold text-dark-900 mb-4">
              Transactions récentes
            </Text>
            <Card>
              <Text className="text-dark-500 text-center py-4">
                Aucune transaction récente
              </Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

