window.WebFontConfig = {
    google: {
        families: ['Open Sans']
    }
};

(function (d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


document.body.insertAdjacentHTML('afterbegin', `
<style>
@keyframes blink {
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.linkbackhckrpl > * {
    font-family: 'Open Sans', sans-serif;
}

.linkbackhckrpl:hover .url::after, .linkbackhckrpl:focus .url::after {
    content: '_';
    color: #f98ccf;
    transition: color ease-in 0.3s;
    animation: 3s infinite blink;
}

.linkbackhckrplfiller {
    height: 30px;
}

@media screen and (max-width: 600px) {
    .url {
        display: block;
        position: relative;
        top: -5px;
    }

    .linkbackhckrplfiller {
        height: 50px;
    }
}
</style>
<div class="linkbackhckrplfiller"></div>
<div style="position: absolute; top: 0; left: 0; right: 0; padding-left: 10px; background: #25262b; text-align: left;">
<a class="linkbackhckrpl" href="https://hckr.pl" style="font-weight: bold; text-transform: lowercase; color: #8cc4f9; display: inline-block; height: 30px; text-decoration: none;">
<span style="font-size: 18px">See my other projects</span> <span class="url" style="font-size: 16px; color: #ccc;">// go to hckr.pl</span>
</a>
</div>`);
