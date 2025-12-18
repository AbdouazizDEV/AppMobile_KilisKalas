import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { cn } from '@/shared/utils/cn';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = '#F97316',
  text,
  className,
}) => {
  return (
    <View className={cn('items-center justify-center', className)}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-dark-600 mt-4 text-base">
          {text}
        </Text>
      )}
    </View>
  );
};

