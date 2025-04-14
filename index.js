const express = require('express');
const { create, ev } = require('venom-bot');

const app = express();
const port = process.env.PORT || 3000;

let qrCodeImage = '';

create({
  session: 'myzap-full',
  multidevice: true,
  headless: true
})
  .then((client) => start(client))
  .catch((error) => {
    console.error('Erro ao iniciar o WhatsApp:', error);
  });

function start(client) {
  console.log('Cliente conectado!');
}

ev.on('qr', (base64Qr) => {
  qrCodeImage = base64Qr;
});

app.get('/', (req, res) => {
  if (qrCodeImage) {
    res.send(\`
      <h1>Escaneie o QR Code para conectar no WhatsApp</h1>
      <img src="\${qrCodeImage}" />
    \`);
  } else {
    res.send('<h2>Aguardando geração do QR Code...</h2>');
  }
});

app.listen(port, () => {
  console.log(\`Servidor rodando na porta \${port}\`);
});