# My App template

A quick way to start a new app using stack:

* React-native/Expo
* UI Component Library: React-native Elements UI
* Router: Expo's file based router
* State management: MobX ? maybe not needed if watermelondb serves that purpose
* Sync: WatermelonDB
    * https://www.themorrow.digital/blog/how-to-use-watermelondb-with-react-native-expo (finish setup later)
    * https://www.themorrow.digital/blog/building-an-offline-first-app-with-expo-supabase-and-watermelondb
    * vs RxDB: https://stackshare.io/stackups/rxdb-vs-watermelondb#:~:text=In%20summary%2C%20RxDB%20and%20WatermelonDB,platform%20support%2C%20and%20community%20ecosystems.
* Supabase

Provides proof-of-concept for:

* Responsive layout: tabs on mobile and side menu on desktop views
* SVG or Font-awesome vector icons
* a list view with swipeable items
* Apple or Google native signin when installed, 
    * OAuth signin alternative when installed
        * Apple OAuth on Android
        * Google OAuth on Apple
    * Both OAuth when in browser


## Steps to use this template

1. First, fork this repo to your new app repo.
2. git clone the repo
3. Delete "ios" and Android folders
4. Find in Folders "myapp" replace with the new app name
5. Run `npx expo run ios`
