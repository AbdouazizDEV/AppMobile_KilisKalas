import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, Keyboard, Platform } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const DESIGN_WIDTH = 375;

interface BottomSheetProps {
  children: React.ReactNode;
  minHeight?: number;
  maxHeight?: number;
  initialHeight?: number;
  onHeightChange?: (height: number) => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  minHeight = 20,
  maxHeight = 500,
  initialHeight = 300,
  onHeightChange,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  
  const translateY = useRef(new Animated.Value(0)).current;
  const [currentHeight, setCurrentHeight] = useState(initialHeight);
  const panRef = useRef<any>(null);
  const keyboardHeight = useRef(0);

  useEffect(() => {
    // Écouter les événements du clavier
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        keyboardHeight.current = e.endCoordinates.height;
        // Remonter le bottom sheet quand le clavier apparaît
        const newHeight = Math.min(maxHeight, currentHeight + keyboardHeight.current * 0.3);
        animateToHeight(newHeight);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardHeight.current = 0;
        // Revenir à la hauteur précédente quand le clavier disparaît
        animateToHeight(currentHeight);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [maxHeight, currentHeight]);

  const animateToHeight = (height: number) => {
    const clampedHeight = Math.max(minHeight, Math.min(maxHeight, height));
    setCurrentHeight(clampedHeight);
    
    const targetTranslateY = maxHeight - clampedHeight;
    Animated.spring(translateY, {
      toValue: targetTranslateY * scale,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    onHeightChange?.(clampedHeight);
  };

  const onGestureEvent = (event: any) => {
    const { translationY } = event.nativeEvent;
    const newHeight = currentHeight - translationY / scale;
    const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
    const targetTranslateY = maxHeight - clampedHeight;
    
    translateY.setValue(targetTranslateY * scale);
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY, velocityY } = event.nativeEvent;
      const newHeight = currentHeight - translationY / scale;
      
      // Snap to nearest position based on velocity and position
      let targetHeight = newHeight;
      
      if (Math.abs(velocityY) > 500) {
        // Swipe rapide
        targetHeight = velocityY > 0 ? minHeight : maxHeight;
      } else {
        // Snap to nearest position
        const midPoint = (minHeight + maxHeight) / 2;
        if (newHeight < midPoint) {
          targetHeight = minHeight;
        } else {
          targetHeight = maxHeight;
        }
      }
      
      animateToHeight(targetHeight);
    }
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetY={[-10, 10]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            height: maxHeight * scale,
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}
      >
        {/* Drag Handle */}
        <View style={styles.dragHandle} />
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    overflow: 'hidden',
  },
  dragHandle: {
    width: 40,
    height: 2,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 1,
  },
});

