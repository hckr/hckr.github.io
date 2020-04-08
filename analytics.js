if (!document.cookie.split(';').map(c => c.trim()).includes('cookieAlertDismissed=1')) {
    document.body.insertAdjacentHTML('beforeend', `
        <div style="position: sticky; bottom: 0; left: 0; right: 0; z-index: 1000; padding: 5px 10px; background: #25262b; color: #ccc; text-align: left; font-size: 16px;">
            This site uses cookies for statistical purposes.
            You can deny cookies from any domain in your browser settings.
            <span
                style="padding: 3px; cursor:pointer; text-decoration: underline; border: none;"
                title="Accept and close this message"
                onclick="document.cookie='cookieAlertDismissed=1; expires=Tue, 19 Jan 2038';this.parentNode.parentNode.removeChild(this.parentNode);"
            >
                close ✖
            </span>
        </div>
    `);
}

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-162891460-1', {
    'page_path': location.pathname
});

(function (d) {
    var gt = d.createElement('script'), s = d.scripts[0];
    gt.src = 'https://www.googletagmanager.com/gtag/js?id=UA-162891460-1';
    gt.async = true;
    s.parentNode.insertBefore(gt, s);
})(document);
