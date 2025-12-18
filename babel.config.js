module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Note: nativewind/babel est désactivé car il inclut react-native-worklets/plugin
      // qui cause des erreurs. NativeWind v4 fonctionne sans le plugin Babel dans certains cas.
      // 'nativewind/babel',
      // 'react-native-reanimated/plugin', // Désactivé temporairement - réactiver quand vous utiliserez des animations
    ],
  };
};

