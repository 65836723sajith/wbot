const venom = require('venom');
const qrcode = require('qrcode-terminal');

venom.create().then((client) => {
  console.log('WhatsApp bot is running!');

  client.onMessage(async (message) => {
    try {
      const sender = message.from;
      const receivedMessage = message.body.toLowerCase();

      // Check for a specific trigger message
      if (receivedMessage === 'hello') {
        // Reply with a custom message
        await client.sendText(sender, 'Hello! This is a WhatsApp bot.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });

  // Display QR code in terminal
  client.onStateChange((state) => {
    if (state === 'QR_RECEIVED') {
      console.log('Scan the QR code to link your WhatsApp account:');
      qrcode.generate(client.qrCode, { small: true });
    }
  });
}).catch((error) => {
  console.error('Error creating WhatsApp bot:', error);
});
