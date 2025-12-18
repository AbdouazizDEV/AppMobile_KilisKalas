import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { useAuthStore } from '@/presentation/stores/authStore';
import { User, Settings, HelpCircle, LogOut, Phone, Mail } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-dark-900 mb-6">
            Profil
          </Text>

          {/* User Info Card */}
          <Card className="mb-6 items-center py-6">
            {user?.photo ? (
              <Image
                source={{ uri: user.photo }}
                className="w-24 h-24 rounded-full mb-4"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-4">
                <User size={48} color="#F97316" />
              </View>
            )}
            <Text className="text-xl font-bold text-dark-900 mb-1">
              {user?.name || 'Utilisateur'}
            </Text>
            <View className="flex-row items-center mb-1">
              <Phone size={16} color="#6B7280" />
              <Text className="ml-2 text-dark-600">
                {user?.phone}
              </Text>
            </View>
            {user?.email && (
              <View className="flex-row items-center">
                <Mail size={16} color="#6B7280" />
                <Text className="ml-2 text-dark-600">
                  {user.email}
                </Text>
              </View>
            )}
          </Card>

          {/* Menu Items */}
          <View className="mb-6">
            <TouchableOpacity>
              <Card className="mb-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Settings size={24} color="#6B7280" />
                    <Text className="ml-3 text-dark-700 font-medium">
                      Paramètres
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card className="mb-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <HelpCircle size={24} color="#6B7280" />
                    <Text className="ml-3 text-dark-700 font-medium">
                      Aide & Support
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <Button
            title="Déconnexion"
            onPress={handleLogout}
            variant="outline"
            icon={<LogOut size={20} color="#F97316" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

