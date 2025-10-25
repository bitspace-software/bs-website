import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, url }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return new Response(`
      <html>
        <body>
          <h1>Authorization Error</h1>
          <p>Error: ${error}</p>
          <p>Description: ${url.searchParams.get('error_description') || 'Unknown error'}</p>
          <a href="/">Back to blog</a>
        </body>
      </html>
    `, {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  if (!code) {
    return new Response(`
      <html>
        <body>
          <h1>Missing Authorization Code</h1>
          <p>No authorization code received. Please try again.</p>
          <a href="/">Back to blog</a>
        </body>
      </html>
    `, {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = `${url.origin}/api/spotify/callback`;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const data = await response.json();

    return new Response(`
      <html>
        <body>
          <h1>Authorization Successful!</h1>
          <h2>Your Refresh Token:</h2>
          <code style="background: #f0f0f0; padding: 10px; display: block; word-break: break-all;">
            ${data.refresh_token}
          </code>
          <p>Copy this refresh token and add it to your .env file as:</p>
          <code style="background: #f0f0f0; padding: 5px;">
            SPOTIFY_REFRESH_TOKEN=${data.refresh_token}
          </code>
          <p>Then restart your development server.</p>
          <a href="/">Back to blog</a>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Spotify callback error:', error);
    return new Response(`
      <html>
        <body>
          <h1>Authorization Failed</h1>
          <p>Error: ${error.message}</p>
          <a href="/">Back to blog</a>
        </body>
      </html>
    `, {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
};
