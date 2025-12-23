# Guide de Configuration de l'API Google Maps

Ce guide vous explique comment obtenir une clé API Google Maps et la configurer dans l'application KilisKalas.

## 📋 Prérequis

- Un compte Google
- Un projet Google Cloud Platform (gratuit avec crédits offerts)

## 🔑 Étape 1 : Créer un Projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Connectez-vous avec votre compte Google
3. Cliquez sur le sélecteur de projet en haut de la page
4. Cliquez sur **"Nouveau projet"**
5. Donnez un nom à votre projet (ex: "KilisKalas Maps")
6. Cliquez sur **"Créer"**

## 🔑 Étape 2 : Activer l'API Google Maps Directions

1. Dans votre projet Google Cloud, allez dans **"APIs & Services"** > **"Library"** (Bibliothèque)
2. Recherchez **"Directions API"**
3. Cliquez sur **"Directions API"**
4. Cliquez sur **"Enable"** (Activer)

## 🔑 Étape 3 : Créer une Clé API

1. Allez dans **"APIs & Services"** > **"Credentials"** (Identifiants)
2. Cliquez sur **"+ CREATE CREDENTIALS"** (Créer des identifiants)
3. Sélectionnez **"API key"** (Clé API)
4. Une clé API sera générée automatiquement
5. **Important** : Cliquez sur **"Restrict key"** (Restreindre la clé) pour la sécurité :
   - **Application restrictions** : Sélectionnez **"Android apps"** ou **"iOS apps"** selon votre plateforme
   - **API restrictions** : Sélectionnez **"Restrict key"** et choisissez **"Directions API"**
6. Cliquez sur **"Save"** (Enregistrer)
7. **Copiez votre clé API** (vous ne pourrez plus la voir complète après)

## 🔑 Étape 4 : Configurer la Clé API dans l'Application

1. Ouvrez le fichier `.env` à la racine du projet
2. Collez votre clé API après `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=`

```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCvotre_cle_api_ici
```

3. Sauvegardez le fichier

## 🔑 Étape 5 : Redémarrer l'Application

Après avoir ajouté la clé API, vous devez redémarrer votre serveur Expo :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm start
```

## ⚠️ Important : Sécurité

- **Ne commitez JAMAIS** le fichier `.env` dans Git (il est déjà dans `.gitignore`)
- Utilisez des clés API différentes pour le développement et la production
- Restreignez toujours vos clés API dans Google Cloud Console
- Surveillez l'utilisation de votre clé API pour éviter les abus

## 💰 Coûts

Google Maps offre **$200 de crédits gratuits par mois**, ce qui couvre généralement :
- 28 000 requêtes Directions API par mois
- Suffisant pour la plupart des applications de développement et petites applications

Au-delà, les tarifs sont :
- $5.00 par 1 000 requêtes supplémentaires

## 🧪 Tester la Configuration

Une fois la clé API configurée, testez l'application :
1. Lancez l'application
2. Allez sur la page de sélection de destination
3. Choisissez un point de départ et une destination
4. La carte devrait afficher l'itinéraire réel au lieu d'une ligne droite

## 🆘 Dépannage

### L'itinéraire ne s'affiche pas
- Vérifiez que la clé API est correctement copiée dans `.env`
- Vérifiez que l'API Directions est activée dans Google Cloud Console
- Vérifiez les restrictions de la clé API
- Redémarrez le serveur Expo

### Erreur "API key not valid"
- Vérifiez que la clé API est correcte
- Vérifiez que l'API Directions est activée
- Vérifiez les restrictions de la clé API

### L'application utilise toujours une ligne droite
- Vérifiez que le fichier `.env` existe et contient la clé API
- Vérifiez que la variable commence par `EXPO_PUBLIC_`
- Redémarrez le serveur Expo

## 📚 Ressources

- [Documentation Google Maps Directions API](https://developers.google.com/maps/documentation/directions)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Tarification Google Maps](https://developers.google.com/maps/billing-and-pricing/pricing)


