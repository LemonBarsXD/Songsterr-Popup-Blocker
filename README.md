![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) 
![](https://img.shields.io/github/downloads/LemonBarsXD/Songsterr-Popup-Blocker/total?style=flat&label=Downloads&color=green)



# Songsterr Popup Blocker

**Songsterr Popup Blocker** is a Tampermonkey script designed to enhance your experience on Songsterr by removing intrusive popups and blur effects, ensuring smooth, uninterrupted playback and visible controls.

## 🚀 Features

- **Popup Removal**: Automatically removes the annoying "Upgrade to Plus" popup that interrupts your practice sessions.
- **Blur Removal**: Clears out unwanted blur overlays that affect the visibility of controls and footer.
- **Dynamic Blur Detection**: Monitors and removes any new blur-like elements dynamically as the page loads or updates.
- **Modular and Scalable**: Easily extendable, with the ability to modify or add more elements to remove.

## 🛠️ Installation

### Prerequisites

- **Tampermonkey** (or another userscript manager) installed on your browser.

### Steps to Install:

1. **Install Tampermonkey**:
   - Download and install the [Tampermonkey extension](https://www.tampermonkey.net/) for your browser (Chrome, Firefox, Safari, etc.).
   
2. **Add the Userscript**:
   - Download or clone the [Songsterr Popup Blocker](https://github.com/yourusername/Songsterr-Popup-Blocker) repository.
   - Open **Tampermonkey**, click the **"Add a new script"** button, and paste the contents of the `AnnoyingFuckingPopupBlocker.js` script into the editor.
   - Save the script, and you're ready to go!

3. **Enjoy Uninterrupted Play**:
   - Visit [Songsterr](https://www.songsterr.com/) and experience a smoother, cleaner interface free of popups and blur effects!

## ⚙️ How It Works

The script works by:

- **Removing popup elements** (like the "Upgrade to Plus" banner).
- **Clearing blur styles** (using `backdrop-filter` and `filter`) from elements that obscure important controls or visual areas.
- **Watching for new blur elements** using MutationObservers, ensuring that any dynamically-loaded content also gets cleaned.

---

## 📝 Customization

You can easily modify the script to remove other elements or adjust the behavior for your needs. Simply edit the class names or add new ones to the `cleanupAll()` function.

## 🎯 Future Updates

This script is constantly evolving to support more features and handle new changes to the Songsterr site (as im constantly using it). If you find any issues or want to request new features, feel free to create an issue on GitHub!

---

## 🤝 Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Any improvements or fixes are always appreciated!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
