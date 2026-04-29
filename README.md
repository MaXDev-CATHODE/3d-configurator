# Multi-Model 3D Configurator 🏎️⌚🚲

Zaawansowany system konfiguracji produktów 3D w czasie rzeczywistym, łączący fotorealistyczne renderowanie WebGL z nowoczesnym interfejsem e-commerce.

![Project Status](https://img.shields.io/badge/Status-Premium_Portfolio-gold)
![React](https://img.shields.io/badge/React-19-blue)
![ThreeJS](https://img.shields.io/badge/Three.js-R184-black)

## 🌟 Wizja Projektu

Projekt powstał jako demonstracja możliwości nowoczesnych technologii webowych w kontekście personalizacji produktów premium. Zamiast statycznych zdjęć, użytkownik otrzymuje pełną kontrolę nad trójwymiarowym modelem, mogąc w ułamku sekundy zmienić materiały, kolory czy warianty wykończenia, widząc natychmiastowy wpływ swoich decyzji na estetykę i cenę produktu.

## 🛠️ Architektura i Technologie

Aplikacja oparta jest na nowoczesnym stosie technologicznym, zoptymalizowanym pod kątem wydajności renderowania:

*   **Silnik 3D:** [React Three Fiber](https://r3f.docs.pmnd.rs/) (R3F) – deklaratywne podejście do Three.js, zapewniające wysoką wydajność i czystość kodu.
*   **Zarządzanie Stanem:** [Zustand](https://zustand-demo.pmnd.rs/) – lekki i szybki store, obsługujący synchronizację konfiguracji modelu z panelem wyceny.
*   **UI/UX:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) – interfejs w stylu **Glassmorphism**, z płynnymi przejściami i responsywnym layoutem.
*   **Asset Pipeline:** Wykorzystanie formatu `.gltf` / `.glb` z obsługą mapowania tekstur w czasie rzeczywistym.

## ✨ Kluczowe Funkcjonalności

*   **Multi-Model Switcher** – Płynne przełączanie między różnymi kategoriami produktów (Luksusowy Zegarek, Samochód Sportowy, Rower Klasyczny).
*   **Dynamic Material Injection** – System rekurencyjnego przeszukiwania grafu sceny 3D i dynamicznej podmiany materiałów PBR (Physically Based Rendering).
*   **Fotorealistyczne Środowisko** – Zastosowanie oświetlenia opartego na obrazie (HDR Environment Mapping), cieni kontaktowych i post-processingu dla uzyskania efektu "High-End".
*   **Live Pricing Engine** – Każda zmiana komponentu (np. skórzana tapicerka vs materiałowa) jest natychmiast przeliczana i prezentowana w podsumowaniu zamówienia.
*   **Orbit Controls** – Pełna swoboda eksploracji modelu z płynną interpolacją ruchu kamery.

## 🧠 Wyzwania Techniczne (Case Study)

1.  **Optymalizacja Assetów:** Modele 3D wysokiej jakości potrafią ważyć dziesiątki megabajtów. Zastosowałem techniki kompresji Draco oraz asynchroniczne ładowanie z Suspense, aby zapewnić błyskawiczny start aplikacji.
2.  **Spójność Stanu:** Największym wyzwaniem była synchronizacja głęboko zagnieżdżonych struktur modeli GLTF ze stanem UI. Rozwiązałem to poprzez system unikalnych identyfikatorów części modelu, które są mapowane na konfigurowalne sloty w store Zustand.
3.  **Responsive Design 3D:** Zapewnienie, aby konfigurator wyglądał równie dobrze na smartfonie, co na monitorze 4K, wymagało dynamicznego skalowania pola widzenia (FOV) kamery i adaptacyjnego layoutu paneli bocznych.

## 🚀 Instalacja i Uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/MaXDev-CATHODE/3d-configurator.git
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

---
*Projekt zrealizowany jako dowód biegłości w tworzeniu interaktywnych doświadczeń 3D na potrzeby nowoczesnej sieci.*
