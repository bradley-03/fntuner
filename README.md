
![Logo](https://raw.githubusercontent.com/bradley-03/fntuner/f9a373d69a465805a6015ba2052dfd8fe22f70c6/src/img/banner.png)


# FNTuner

FNTuner is a small program for Windows that provides a simple way to customize your Fortnite config and resolution without being in game.

![App Screenshot](https://github.com/bradley-03/fntuner/blob/main/src/img/screenshot.png?raw=true)

## Installation

There are multiple options for installation that you can choose from.

### Installer
[Download](https://github.com/bradley-03/fntuner/releases/latest) the setup file from the release and run it. To uninstall, use Windows settings or run the uninstaller found in "C:/Users/USER/AppData/Local/Programs/fntuner".

### Zip Package 
[Download](https://github.com/bradley-03/fntuner/releases/latest) the .zip file from the release and extract the files to any location you wish. To uninstall, just delete these files.

### Portable
[Download](https://github.com/bradley-03/fntuner/releases/latest) the portable file from the release and place anywhere. This is the same as the other versions, but doesn't require and installation or extra files to use it, the downside to this is the load time is a lot slower.

## Usage

When you launch FNTuner your current config options should be loaded into the boxes. Configure those values however you wish and press "Confirm", you should see a success message.

Checking the "read-only" box will set your config file to read only. This will prevent Fortnite from changing it, and if changed they will revert when you restart your game. If this is unchecked and your resolution changes in the settings, you will have to re-set your values.

The "undo changes" button will set your values back to the current config. This will not revert changes you confirmed.

## Troubleshooting

### Windows protected your PC popup
Windows may give you a popup telling you that running the app could put your PC at risk. This is because the app is unsigned and getting it signed can be expensive. The software is safe, and you can still install it by clicking 'More Info' then 'Run anyway'.

### Error updating config
If you get an error when trying to confirm your changes, this is usually because the config file couldn't be found. Make sure to check your Fortnite config location (C:\Users\USER\AppData\Local\FortniteGame\Saved\Config\WindowsClient) for a "GameUserSettings.ini" file.

## About
I made this software after Fortnite added multiple gamemodes to the game and wanting to play some gamemodes with different settings to others. I found it can be a tedious process changing these settings manually each time, and I couldn't do it without first opening the game. My vision was an app that could swap between configs easily, with presets that you can customise. It uses [Electron](https://www.electronjs.org/) and is my first real application in it, so code may be unoptimized.