# MusicApp

Role-based music management API with JWT authentication, ImageKit file storage and MongoDB persistence.

## Features
- User registration, login and logout (JWT in cookie)
- Role-based access: `user` and `artist`
- Artists can upload music files and create albums
- Users can browse music and albums

## Tech stack
- Node.js, Express
- MongoDB (Mongoose)
- JWT, bcryptjs
- Multer (multipart/form-data)
- ImageKit (file storage)
- dotenv, cookie-parser

## Prerequisites
- Node 18+ / npm
- A running MongoDB instance and `MONGO_URI`
- An ImageKit account with a private key for `IMAGEKIT_PVT_KEY`

## Installation

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
IMAGEKIT_PVT_KEY=<your-imagekit-private-key>
PORT=3000
```

3. Run the app in development

```bash
npm run dev
```

The server listens on port `3000` by default.

## API

Base path: `/api`

Auth
- POST `/api/auth/register` — register a new user
	- Body: `{ "username": "...", "email": "...", "password": "...", "role": "user|artist" }` (role defaults to `user`)
	- Sets a cookie named `token` with the JWT on success.

- POST `/api/auth/login` — login with `username` or `email` and `password`
	- Body: `{ "username": "..." }` or `{ "email": "..." }, "password": "..."`
	- Sets `token` cookie on success.

- POST `/api/auth/logout` — clears the `token` cookie

Music
- POST `/api/music/upload` — upload a music file (artist only)
	- Auth: cookie `token` (artist role)
	- Content-Type: `multipart/form-data`
	- Form field: `music` (file), other fields: `title` (string)
	- Uses in-memory Multer storage and uploads to ImageKit; stores resulting URL in DB.

- POST `/api/music/album` — create an album (artist only)
	- Body: `{ "album": "Album Title", "musics": ["musicId1", "musicId2"] }`

- GET `/api/music/` — list musics (user only)
- GET `/api/music/album` — list albums (user only)
- GET `/api/music/album/:id` — get album details by id (user only)

Authentication & Roles
- JWT is issued at login/register and stored in a cookie named `token`.
- Middleware in `middlewares/auth.middleware.js` provides `authArtist` (requires `artist` role) and `authUser` (requires `user` role).

Database
- MongoDB connection is in `db/db.js`. Models live in the `models/` folder: `user.model.js`, `music.model.js`, `album model.js`.

File storage
- `services/storage.service.js` uses ImageKit to upload files. Provide `IMAGEKIT_PVT_KEY` in `.env`.

Examples

Register:
```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"username":"artist1","email":"a@b.com","password":"secret","role":"artist"}' \
	-c cookies.txt
```

Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"username":"artist1","password":"secret"}' \
	-c cookies.txt
```

Upload music (use cookie from login):
```bash
curl -X POST http://localhost:3000/api/music/upload \
	-b cookies.txt \
	-F "music=@/path/to/file.mp3" \
	-F "title=My Song"
```

Notes
- The project expects the JWT secret and MongoDB URI in environment variables. The app sets the JWT cookie without additional cookie options — consider setting `httpOnly`, `secure`, and `sameSite` in production.
- Multer uses memory storage and the file is converted to base64 before being passed to ImageKit.

Contributing
- Open issues and PRs in the repository. Run tests (none provided) and keep code style consistent.

License
- ISC
