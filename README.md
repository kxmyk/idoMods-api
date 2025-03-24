# IdoMods API

IdoMods API to aplikacja backendowa do pobierania i przechowywania zamówień z API IdoSell. Obsługuje autoryzację, filtrowanie zamówień oraz eksport do pliku CSV.

## 🛠 Technologie

- **Node.js** + **Express** – serwer API
- **TypeScript** – typowanie kodu
- **MongoDB** + **Mongoose** – baza danych
- **Axios** – komunikacja z API IdoSell
- **dotenv** – zarządzanie zmiennymi środowiskowymi
- **node-cron** – automatyczne pobieranie zamówień

## 🚀 Uruchomienie aplikacji

### 1️⃣ Klonowanie repozytorium
```sh
git clone https://github.com/kxmyk/idoMods-api.git
cd idoMods-api
```

### 2️⃣ Instalacja zależności
```sh
npm install
```

### 3️⃣ Konfiguracja pliku .env
Skopiuj plik `.env.example` do `.env` i uzupełnij go odpowiednimi danymi.

### 4️⃣ Uruchomienie aplikacji

W trybie developerskim:
```sh
npm run dev
```
W trybie produkcyjnym:
```sh
npm run build
npm start
```
Aplikacja będzie dostępna na `http://localhost:3000`.

## 📌 Funkcjonalności

### 1️⃣ Pobieranie zamówień z API IdoSell
- Zamówienia są pobierane raz przy uruchomieniu serwera
- Automatyczne pobieranie zamówień co godzinę

### 2️⃣ Przechowywanie zamówień w MongoDB
- Jeśli zamówienie już istnieje, jest aktualizowane
- Nowe zamówienia są dodawane

### 3️⃣ Dostęp do zamówień poprzez REST API
- Autoryzacja za pomocą Basic Auth
- Możliwość filtrowania zamówień po wartości

### 4️⃣ Eksport zamówień do CSV

## 🛥️ API – Endpointy

| Metoda | Endpoint | Opis |
|--------|---------|------|
| GET | `/api/orders` | Pobiera wszystkie zamówienia |
| GET | `/api/orders?minWorth=50&maxWorth=500` | Filtrowanie zamówień po wartości |
| GET | `/api/orders/:id` | Pobiera konkretne zamówienie |
| GET | `/api/orders/export/csv` | Pobiera wszystkie zamówienia jako plik CSV |

## 🔒 Autoryzacja

Każdy request musi zawierać nagłówek Basic Auth:
```sh
Authorization: Basic base64(username:password)
```

## 🛠 Struktura projektu

```
/src
├── models/              # Modele MongoDB
├── routes/              # Endpointy API
├── services/            # Logika biznesowa
├── middlewares/         # Middleware
├── server.ts            # Główny plik serwera
└── config.ts             # Punkt wejściowy aplikacji
```

## ✨ Przykłady użycia API

### 1️⃣ Pobranie wszystkich zamówień
**Request:**
```sh
curl -u username:password http://localhost:3000/api/orders
```

### 2️⃣ Pobranie zamówienia po ID
**Request:**
```sh
curl -u username:password http://localhost:3000/api/orders/12345
```

### 3️⃣ Pobranie zamówień z filtrem wartości
**Request:**
```sh
curl -u username:password "http://localhost:3000/api/orders?minWorth=100&maxWorth=500"
```

### 4️⃣ Pobranie zamówień jako CSV
**Request:**
```sh
curl -u username:password -o orders.csv http://localhost:3000/api/orders/export/csv
```

## ✅ Testowanie API

Możesz użyć **Postmana**, **cURL**, lub skryptu Node.js.

## 🛠 Możliwe rozszerzenia

- Obsługa paginacji dla dużych zbiorów zamówień
- Wsparcie dla webhooków z IdoSell
- Panel administracyjny do zarządzania zamówieniami  

## 📌 Zmiany w wersji 2.0

### ✅ Poprawki i ulepszenia:
- 🔄 Pobieranie zamówień:
Usunięto limit 100 zamówień – teraz pobierane są wszystkie.
Optymalizacja pobierania zamówień z API IdoSell.

- ⏳ Automatyzacja pobierania zamówień:
Zamiast raz dziennie o północy, zamówienia są teraz pobierane co godzinę.