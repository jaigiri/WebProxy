const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (url.startsWith(__uv$config.password + "_")) {
            url = url.substring(__uv$config.password.length + 1);
            if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
            else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        }
    });
});

function isUrl(val = ''){
    return /^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ';
}
