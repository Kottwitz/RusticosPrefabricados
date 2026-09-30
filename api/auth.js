export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    // Redireciona para o GitHub para pedir permissão
    res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user` });
    res.end();
    return;
  }

  try {
    // Troca o código temporário pelo token de acesso do GitHub
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const data = await tokenResponse.json();

    if (data.access_token) {
      const content = `
        <html>
          <body>
            <script>
              (function() {
                function receiveMessage(e) {
                  window.opener.postMessage(
                    'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
                    e.origin
                  );
                  window.removeEventListener("message", receiveMessage, false);
                }
                window.addEventListener("message", receiveMessage, false);
                window.opener.postMessage("authorizing:github", "*");
                window.close();
              })();
            </script>
          </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(content);
    } else {
      res.status(400).send(`Erro na autenticação: ${data.error_description || 'Token não retornado pelo GitHub.'}`);
    }
  } catch (error) {
    res.status(500).send('Erro interno no servidor ao processar o OAuth.');
  }
}