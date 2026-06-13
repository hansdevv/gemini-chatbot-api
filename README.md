# Implementing Gemini AI - Part 2: 🤖 AI Chatbot dengan Vanilla JavaScript & Google Gemini

![Hacktiv8 Logo](https://www.hacktiv8.com/logo.png)

## 📝 Deskripsi Proyek

royek ini merupakan contoh implementasi **chatbot berbasis AI** yang sederhana namun powerful, menggunakan **Vanilla JavaScript** di sisi frontend dan **Node.js + Express** di sisi backend. Chatbot ini terintegrasi dengan **Google Gemini AI API** untuk menghasilkan respons yang cerdas dan dinamis secara real-time.

## 🚀 Fitur Utama

- Antarmuka chatbot sederhana berbasis HTML, CSS, dan JavaScript
- Backend REST API menggunakan Express.js
- Integrasi Google Gemini AI melalui API
- Komunikasi frontend–backend menggunakan `fetch()`
- Respons AI secara real-time
- Arsitektur full-stack yang mudah dipahami untuk pembelajaran

## 📂 Struktur Folder

```text
gemini-chatbot-api/
│
├── public/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── uploads/
│ └── Screenshot From 2026-06-13 14-07-11.png
├── index.js
├── package.json
├── .env
└── README.md
```

## 🛠️ Stack Teknologi

- **Framework**: ExpressJS (Node.js)
- **AI Model**: Google Gemini 2.5 Flash
- **Client Testing**: Postman
- **Integrasi**: Google Generative AI SDK

## ⚙️ Persiapan dan Instalasi

### 1. Prasyarat

Pastikan Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (versi 18 atau yang lebih baru)
- NPM (biasanya otomatis terinstal dengan Node.js)
- API Key dari [Google AI Studio](https://aistudio.google.com/)
- Web browser (Chrome, Mozila Firefox, Brave, dll)

### 2. Instalasi

Clone repositori dan instal dependensi yang diperlukan:

```bash
git clone [https://github.com/hansdevv/gemini-chatbot-api.git](https://github.com/hansdevv/gemini-chatbot-api.git)
cd gemini-chatbot-api
npm install
```

### 3. Konfigurasi Environment

Buat file **.env** di direktori utama dan masukkan API KEY anda

```Code
GEMINI_API_KEY=API_KEY_Google_AI_Studio_Mu
PORT=3000
```

4. Menjalankan Aplikasi

```bash
node index.js
```

🧪 Pengujian Endpoint
Gunakan Postman untuk menguji integrasi:

| Method | Endpoint                       | Deskripsi                           |
| :----- | :----------------------------- | :---------------------------------- |
| POST   | http://localhost:3000/api/chat | generate teks sesuai prompt masukan |

🧪 Pengujian Front-end (di browser)

```text
http://localhost:3000
```

## Screnshot Contoh

![ss-generateText](<uploads/Screenshot From 2026-06-13 14-07-11.png>)
