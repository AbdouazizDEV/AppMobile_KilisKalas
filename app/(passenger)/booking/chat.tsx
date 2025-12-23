import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';
import { Phone } from 'lucide-react-native';
import { Linking } from 'react-native';

const DESIGN_WIDTH = 375;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'driver';
  timestamp: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour Diop',
      sender: 'user',
      timestamp: '11:05',
    },
    {
      id: '2',
      text: 'kll,I,Idlmx,x mx nm dddddddddddddddddddddddddddd dddddddddddddddddddddddddddd',
      sender: 'user',
      timestamp: '11:05',
    },
    {
      id: '3',
      text: 'dddddddddddddddddddddd ddddddddddddddddddddddd ddddddddddd',
      sender: 'driver',
      timestamp: '11:05',
    },
    {
      id: '4',
      text: 'dddddddddddddddddddddddddddd dddddddddddddddddddd',
      sender: 'user',
      timestamp: '11:05',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const driverName = (params.driverName as string) || 'Chauffeur';
  const driverPhoto = params.driverPhoto as string;

  useEffect(() => {
    // Faire défiler vers le bas quand de nouveaux messages arrivent
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleCall = () => {
    const driverPhone = (params.driverPhone as string) || '+221771234567';
    Linking.openURL(`tel:${driverPhone}`);
  };

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={[styles.header, { height: 60 * scale, paddingHorizontal: 20 * scale }]}>
          <View style={styles.headerLeft}>
            <BackButton
              top={0}
              left={0}
              size={40}
              arrowRotation={0}
              arrowSize={20}
              onPress={() => router.back()}
            />
            {driverPhoto ? (
              <Image
                source={{ uri: driverPhoto }}
                style={[styles.headerPhoto, { width: 40 * scale, height: 40 * scale, borderRadius: 20 * scale, marginLeft: 15 * scale }]}
              />
            ) : (
              <View
                style={[
                  styles.headerPhotoPlaceholder,
                  { width: 40 * scale, height: 40 * scale, borderRadius: 20 * scale, marginLeft: 15 * scale },
                ]}
              >
                <Text style={[styles.headerPhotoText, { fontSize: 18 * scale }]}>
                  {driverName.charAt(0)}
                </Text>
              </View>
            )}
            <Text style={[styles.headerName, { fontSize: 16 * scale, marginLeft: 10 * scale }]}>
              {driverName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleCall}
            activeOpacity={0.8}
            style={[styles.callButton, { width: 40 * scale, height: 40 * scale, borderRadius: 20 * scale }]}
          >
            <Phone size={20 * scale} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'user' ? styles.userMessage : styles.driverMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.sender === 'user'
                    ? { backgroundColor: '#10B981', alignSelf: 'flex-end' }
                    : { backgroundColor: '#E5E7EB', alignSelf: 'flex-start' },
                  { maxWidth: SCREEN_WIDTH * 0.75, padding: 12 * scale, borderRadius: 18 * scale },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    {
                      fontSize: 14 * scale,
                      color: message.sender === 'user' ? '#FFFFFF' : '#000000',
                    },
                  ]}
                >
                  {message.text}
                </Text>
              </View>
              {message.timestamp && (
                <Text
                  style={[
                    styles.timestamp,
                    {
                      fontSize: 11 * scale,
                      alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      marginTop: 4 * scale,
                      marginHorizontal: 12 * scale,
                    },
                  ]}
                >
                  {message.timestamp}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={[styles.inputContainer, { paddingHorizontal: 20 * scale, paddingVertical: 15 * scale }]}>
          <TextInput
            style={[
              styles.input,
              {
                fontSize: 14 * scale,
                paddingHorizontal: 15 * scale,
                paddingVertical: 12 * scale,
                borderRadius: 25 * scale,
              },
            ]}
            placeholder="Tapez ici"
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            activeOpacity={0.8}
            style={[styles.sendButton, { width: 40 * scale, height: 40 * scale, borderRadius: 20 * scale }]}
          >
            <Text style={[styles.sendButtonText, { fontSize: 20 * scale }]}>😊</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerPhoto: {
    marginLeft: 15,
  },
  headerPhotoPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  headerPhotoText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#666666',
  },
  headerName: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
    marginLeft: 10,
  },
  callButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  driverMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
  },
});

