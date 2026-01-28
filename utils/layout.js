export function getLayout(title, content) {
  return `
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Vanilla Node Web Server</title>
      <link rel="stylesheet" href="/styles.css" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </head>
    <body>
      <main>${content}</main>
    </body>
    </html>
  `.trim();
}
