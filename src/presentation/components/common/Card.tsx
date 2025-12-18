import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/shared/utils/cn';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-dark-200',
  };

  return (
    <View
      className={cn('rounded-xl p-4', variants[variant], className)}
      {...props}
    >
      {children}
    </View>
  );
};

