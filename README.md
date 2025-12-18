# KilisKalas - Application de Transport à la Demande

Application mobile React Native avec Expo pour la ville de Bambey au Sénégal. Application de transport à la demande (type Uber/Yango) avec 3 interfaces : Passager, Chauffeur et Administrateur.

## 🚀 Technologies

- **React Native** avec **Expo**
- **TypeScript**
- **Expo Router** pour la navigation
- **NativeWind** (Tailwind CSS pour React Native)
- **Zustand** pour la gestion d'état
- **React Hook Form** + **Zod** pour les formulaires
- **React Native Maps** pour les cartes
- **Expo Location** pour la géolocalisation

## 📁 Architecture

Le projet suit les principes **SOLID** avec une architecture en couches :

```
src/
├── core/              # Domain Layer (Entités, Use Cases, Interfaces)
├── data/              # Data Layer (Repositories, Data Sources)
├── presentation/      # Presentation Layer (Composants, Hooks, Stores)
├── infrastructure/    # Infrastructure Layer (Config, Services)
└── shared/            # Code partagé (Utils, Constants, Types)
```

## 🏗️ Structure du Projet

- `app/` - Écrans Expo Router
  - `(auth)/` - Authentification
  - `(passenger)/` - Interface Passager
  - `(driver)/` - Interface Chauffeur (à implémenter)
  - `(admin)/` - Interface Admin (à implémenter)
- `src/` - Code source principal
- `assets/` - Images, icônes, polices

## 🚦 Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo CLI

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios
```

## 📱 Fonctionnalités Implémentées

### Interface Passager

- ✅ Authentification (Login, Register, OTP)
- ✅ Écran Home avec carte interactive
- ✅ Sélection de destination
- ✅ Confirmation de course
- ✅ Recherche de chauffeur
- ✅ Suivi de course en temps réel
- ✅ Historique des courses
- ✅ Portefeuille
- ✅ Profil utilisateur

### À Implémenter

- Interface Chauffeur
- Interface Administrateur
- Intégration API réelle
- Notifications push
- Paiements en ligne (Orange Money, Wave)

## 🎨 Design

Le design suit les maquettes Figma :
- Couleur principale : Orange (#F97316)
- Couleur secondaire : Vert (#22C55E)
- Design moderne et épuré

## 📝 Configuration

Les variables d'environnement sont configurées dans :
- `.env.development`
- `.env.production`

## 🔧 Scripts

- `npm start` - Démarrer Expo
- `npm run android` - Lancer sur Android
- `npm run ios` - Lancer sur iOS
- `npm run web` - Lancer sur Web

## 📄 Licence

Propriétaire - KilisKalas

