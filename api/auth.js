export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    // Redireciona para o GitHub para pedir permissão
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`);
  } else {
    // Troca o código pelo token de acesso
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
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
      const data = await response.json();

      if (data.access_token) {
        // Envia o token de volta para o Decap CMS via script HTML
        res.send(`
          <html>
            <body>
              <script>
                (function() {
                  function receiveMessage(e) {
                    window.opener.postMessage(
                      "authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}",
                      e.origin
                    );
                    window.close();
                  }
                  window.addEventListener("message", receiveMessage, false);
                  window.opener.postMessage("authorizing:github", "*");
                })()
              </script>
            </body>
          </html>
        `);
      } else {
        res.status(400).send("Erro na autenticação com o GitHub.");
      }
    } catch (error) {
      res.status(500).send("Erro interno no servidor.");
    }
  }
}