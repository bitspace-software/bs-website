# Spotify Integration Setup

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token_here
```

## How to Get Spotify Credentials

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - App name: Your blog name
   - App description: Personal blog Spotify integration
   - Website: Your blog URL
   - Redirect URI: `http://localhost:4321/api/spotify/callback` (for development)
5. Click "Save"

### 2. Get Client ID and Secret

1. In your app dashboard, you'll see:
   - **Client ID**: Copy this to `SPOTIFY_CLIENT_ID`
   - **Client Secret**: Click "Show Client Secret" and copy to `SPOTIFY_CLIENT_SECRET`

### 3. Get Refresh Token

You need to run the authorization flow to get a refresh token. Here's a simple Node.js script:

```javascript
// get-refresh-token.js
const axios = require('axios');

const CLIENT_ID = 'your_client_id_here';
const CLIENT_SECRET = 'your_client_secret_here';
const REDIRECT_URI = 'http://localhost:4321/api/spotify/callback';

// Step 1: Get authorization URL
const authUrl = `https://accounts.spotify.com/authorize?` +
  `client_id=${CLIENT_ID}&` +
  `response_type=code&` +
  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
  `scope=user-read-currently-playing user-read-recently-played`;

console.log('Visit this URL to authorize:');
console.log(authUrl);
console.log('\nAfter authorization, you\'ll be redirected to a URL with a code parameter.');
console.log('Copy the code and run: node get-refresh-token.js YOUR_CODE_HERE');

const code = process.argv[2];
if (code) {
  // Step 2: Exchange code for tokens
  axios.post('https://accounts.spotify.com/api/token', 
    new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  ).then(response => {
    console.log('Refresh Token:', response.data.refresh_token);
    console.log('Copy this to SPOTIFY_REFRESH_TOKEN in your .env file');
  }).catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });
}
```

Run this script:
```bash
node get-refresh-token.js
# Follow the URL, authorize, then run:
node get-refresh-token.js YOUR_CODE_HERE
```

## Using the Spotify Component

Add the Spotify component to any page:

```astro
---
import SpotifyNowPlaying from '../components/SpotifyNowPlaying.astro';
---

<SpotifyNowPlaying />
```

## Features

- Shows currently playing track
- Shows recently played if nothing is currently playing
- Updates every 30 seconds
- Responsive design
- Dark mode support
- Error handling

## Troubleshooting

- Make sure all environment variables are set correctly
- Check that your Spotify app has the correct scopes
- Ensure the refresh token is valid (they don't expire)
- Check browser console for any API errors
