# FastLog: a better call log app for KaiOS

## Why?

Because during these years, lots of people have noticed that stock KaiOS call log is too slow and unreliable on large amount of records (over 100 etc.) and is bloated with features that not everyone needs for the basic phone usage.

## What can it do right now?

- Log all outgoing/incoming calls and add them to the search index;
- Search the records in T9-like fashion (can be done by number or any part of the contact name);
- Import and index the call log records existing before FastLog installation (from the menu) **if** the stock app exports them;
- Show the type (outgoing/incoming/missed), number, contact name (if any), SIM, time (respects the system 12/24-hour setting), date and duration of the call in each record;
- Allow to delete records, add them to new or existing contacts (from the menu);
- Allow to call or text the number from the record (from the menu or via Call and SoftLeft keys respectively);
- Allow to block/unblock the calls from the number in a particular record (from the menu) **if** the KaiOS version exposes the API to do that;
- Understand some Bluetooth HFP commands from wireless headsets, like "last number redial" or "Dial a number directly" or "Dial a number from the outgoing memory";
- ...and even activate/deactivate the flashlight by long-pressing the `#` key!

## How to install it?

Via WebIDE or `gdeploy`, as usual.

Important: if you want to import the existing call logs, it's recommended to reboot the phone after the first installation.

## What's the project status?

Public-domain alpha. Until the version 1.0, it's a fully rolling release, so please don't pay attention to the version stated in the manifest - it's for internal tracking convenience only. 

## Who's behind it?

Someone who cares.
