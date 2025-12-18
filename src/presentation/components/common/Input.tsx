import React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { cn } from '@/shared/utils/cn';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  ...props
}) => {
  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-dark-700 mb-2">
          {label}
        </Text>
      )}
      <View className="relative">
        {leftIcon && (
          <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
            {leftIcon}
          </View>
        )}
        <TextInput
          className={cn(
            'w-full h-12 px-4 rounded-xl border border-dark-300 bg-white text-dark-900',
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            error && 'border-red-500',
            'focus:border-primary-500',
            className
          )}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {rightIcon && (
          <View className="absolute right-3 top-0 bottom-0 justify-center z-10">
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <Text className="text-sm text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

