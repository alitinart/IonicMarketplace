# IonicMarketplace

## Dependecy Install

Install all needed dependecies using `npm install` inside of the termial, which needs to be in the root folder of your project.

## Angular CLI

This project was made using [Angular CLI](https://github.com/angular/angular-cli)

## Ionic

Frontend managed by Ionic

## Backend

Backend Database managed with `FIREBASE` make sure to make your own [Firebase Database](https://firebase.google.com/) and connect it to this app. Go to src/app/services/data-storage.service.ts and change the firebase links to match your own `REALTIME DATABASE LINK`

## Running the app on your phone

Use `ionic cordova build ios` for IPhone or `ionic cordova build android` for Android. After building the app go to `platforms` folder, select the platform where you will run the app. Open up the folder in file explorer or finder if you are on MacOS. Open up the project file. After that connect the phone to your computer and finally click the run button on xCode or Android Studio Code to install your app on your phone and test it.
