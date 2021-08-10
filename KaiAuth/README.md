# KaiAuth
Simple One Time Password Manager for KaiOS
![KaiAuth icon](img/icons/app_112.png)

## What changes from original KaiAuth:
- Support for codes with non-6 digit length
- Support for codes with non-30 second duration
- Bugfixing
- Now grabs Issuer, Duration, Digits from QR Code
- Future updates: Possibly grab logo and color from database like Authy does

# Test it
## Non-6 Digit and Non-30 Seconds Test
> This code should have 7 digits and should change every 10 seconds. Scan it with KaiAuth:  
>![](https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/KaiAuthTestIssuer:7DIGIT_10SEC_TEST%3Fsecret%3DDEADBEEFDEADBEEF%26digits%3D7%26period%3D10)
## 6 Digit and 30 Seconds Test
>This code should have 6 digits and should change every 30 seconds. Scan it with KaiAuth:  
>![](https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/KaiAuthTestIssuer:6DIGIT_30SEC_TEST%3Fsecret%3DGEADBEEFJEADBEEF%26digits%3D6%26period%3D30)

## Screenshots

![app_in_launcher](https://kaiauth.zjyl1994.com/img/app_in_launcher.png)
![main_interface](https://kaiauth.zjyl1994.com/img/main_interface.png)
![scan_qrcode](https://kaiauth.zjyl1994.com/img/scan_qrcode.png)
![option_menu](https://kaiauth.zjyl1994.com/img/option_menu.png)

## Install

## Omni SD
- Download [kaiauth-omnisd](https://github.com/zjyl1994/KaiAuth/releases/download/v1.1.1/kaiauth-v1.1.1-omnisd.zip).
- Copy this zip file to the apps directory of the memory card.
- Open "OmniSD" and install this zip.

## Web IDE
- Download [kaiauth-webide](https://github.com/zjyl1994/KaiAuth/releases/download/v1.1.1/kaiauth-v1.1.1-webide.zip).
- Extract this zip to a folder.
- Click "Open Packaged App" and select the folder from the previous step.
- Click "Install and Run" button.

## More information
For more information please visit https://kaiauth.zjyl1994.com/ .

I have submitted it to KaiStore, but need to wait for KaiStore review. It may be available for download in KaiStore in the near future.

(Available in 🇺🇸 American English, 🇨🇳 Simplified Chinese, 🇹🇼 Traditional Chinese, 🇭🇰 Cantonese, 🇮🇹 Italian, and 🇵🇭 Tagalog (if Cyan helps me)
