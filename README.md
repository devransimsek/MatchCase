# MatchCase

It is a case for Match company.

## --- To run the project ---

### General

```sh
git clone https://github.com/devransimsek/MatchCase.git
cd MatchCase
npm i
```

### Android

```sh
yarn android
```

You can take local.properties error, you should create local.properties file in your android folder.
Copy and paste this code, and change your android SDK path.

```sh
sdk.dir= your android sdk path
```

### iOS

```sh
cd ios
pod install
cd ..
yarn ios
```

I suggest to you use Xcode to run the iOS app.
