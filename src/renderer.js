const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const configPath = path.join(__dirname, 'config.json');
    fs.readFile(configPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            alert('Error reading config file. Please check the console for more details.');
            return;
        }

        try {
            const config = JSON.parse(data);
            console.log('Config file read successfully:', config);

            // Set the title from the config file
            document.title = config.title;

            pingSite(config.websiteUrl)
                .then(() => {
                    loadIframe(config.websiteUrl);
                })
                .catch(() => {
                    showError(config.websiteUrl);
                });
        } catch (parseErr) {
            console.error('Error parsing config file:', parseErr);
            alert('Error parsing config file. Please check the console for more details.');
        }
    });
});

function pingSite(url) {
    return new Promise((resolve, reject) => {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

function loadIframe(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    document.body.appendChild(iframe);

    iframe.onload = () => {
        console.log('Iframe loaded successfully');
    };

    iframe.onerror = () => {
        console.error('Error loading iframe');
        showError(url);
    };
}

function showError(url) {
    document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;">
            <h1>Error Loading Site</h1>
            <p>Unable to load the site. Please check your internet connection and try again.</p>
            <p>You can also try to open the site manually in your browser:</p>
            <a href="${url}" target="_blank">${url}</a>
        </div>
    `;
}