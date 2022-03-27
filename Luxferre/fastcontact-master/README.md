# FastContact: a faster and lighter alternative to KaiOS stock phonebook

## Why?

Because during these years, lots of people have noticed that stock KaiOS phonebook is too slow on large amount of contacts (over 300 etc.) and is bloated with features that not everyone needs for the basic phone usage.

## What can it do right now?

- View your contacts (obviously);
- Search your contacts (both by first or last name or by any whitespace-separated part) with single T9-like digit press (start typing with digit keys, push End or Back key repeatedly to return to normal mode) - as of now, extended Latin and extended Cyrillic, as well as Greek, Georgian and Armenian alphabets are supported (contributions to `js/shared/alphaindex.js` are more than welcome);
- Call your contacts from the list (choose from multiple numbers if they're assigned to the contact), including USSD queries as well;
- Dial an arbitrary number directly from the search mode (also able to enter `+` by holding `0` key and ~2s pause/wait `,` by holding `*` key);
- Use multiple SIM cards for dialing from any place if you have more than one in your device;
- Create new contacts on both device and active SIM memory, also you can directly save the number from the search dialer from the Options menu;
- Reindex contacts created from outside (press and hold the left softkey);
- Show storage information - whether the contact is stored on the SIM1, SIM2 or the device (with corresponding icons against the contact name);
- Edit existing contacts on both device and SIM memory or save them to a different memory;
- Delete contacts from any memory;
- Serve as an external contact provider/picker for other KaiOS apps (via MozActivities and only providing phone number information);
- Open an external SMS composer for a number from the contacts or the directly dialed one (press Left arrow);
- ...and even activate/deactivate the flashlight by long-pressing the `#` key!

Currently supported fields for contact creation/editing are: name and up to 4 phone numbers (for SIM storage, only the first number will be saved). Any unsupported fields are unaffected in the existing on-device contacts.

## What can't it do? (as of now)

- Edit all other contact information in the on-device contacts;
- Set individual photo or ringtone;
- Set voicemail number or other speed dial numbers or speed launch apps;
- Edit incoming call block list (to be implemented in a separate app);
- Edit contact groups or show the groups the contact belongs to;
- Perform emergency calls without SIM cards.

## How to install it?

Via WebIDE or `gdeploy`, as usual.

## What's the project status?

Public-domain alpha. Until the version 1.0, it's a fully rolling release, so please don't pay attention to the version stated in the manifest - it's for internal tracking convenience only. 

## Who's behind it?

Someone who cares.
