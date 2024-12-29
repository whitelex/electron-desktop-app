const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const configPath = path.join(__dirname, 'config.json');
    fs.readFile(configPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            return;
        }

        const config = JSON.parse(data);
        const iframe = document.createElement('iframe');
        iframe.src = config.websiteUrl; // Use the URL from the config file
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        document.body.appendChild(iframe);

        // Check if the iframe has loaded successfully
        setTimeout(() => {
            if (!iframe.contentDocument || iframe.contentDocument.body.innerHTML === '') {
                document.body.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;">
                        <h1>Error Loading Site</h1>
                        <p>Unable to load the site. Please check your internet connection and try again.</p>
                        <p>You can also try to open the site manually in your browser:</p>
                        <a href="${config.websiteUrl}" target="_blank">${config.websiteUrl}</a>
                    </div>
                `;
            }
        }, 5000); // Adjust the timeout duration as needed
    });
});