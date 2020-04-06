console.log('Oh, hi there :)');

const contents = {};
const contentsDiv = document.getElementById('contents');
contentsDiv.querySelectorAll('div').forEach(c => {
    contents[c.id.replace(/^!/, '')] = c;
    c.removeAttribute('id');
});
contentsDiv.parentElement.removeChild(contentsDiv);

const navigationTitleValueH3 = document.querySelector('.box-navigation .title-value');
const navigationList = document.querySelector('.box-navigation .box-list');
const previewTitleValueSpan = document.querySelector('.box-preview .title-value');
const previewPercentScrollValueSpan = document.querySelector('.box-preview .scroll-percent-value');

const previewOverflowContainer = document.querySelector('.box-preview .box-overflow-container');
previewOverflowContainer.onscroll = updatePercentScrollValue;
window.onresize = updatePercentScrollValue;

window.onhashchange = handleRouting;
setTimeout(handleRouting);

window.addEventListener('keydown', e => {
    if (e.keyCode === 38 || e.keyCode === 40) {
        // allow for scroling using arrow keys when a scrollable container has focus
        if (document.activeElement && document.activeElement != document.body && document.activeElement.scrollHeight > document.activeElement.offsetHeight) {
            return;
        }
    }

    let currentNavElement = navigationList.querySelector('.selected');
    if (currentNavElement) {
        switch (e.keyCode) {
            case 38: // up
                if (currentNavElement.previousElementSibling) {
                    currentNavElement.previousElementSibling.classList.add('selected');
                    currentNavElement.classList.remove('selected');

                    const newHash = currentNavElement.previousElementSibling.querySelector('a').href.replace(/\/$/, '');
                    if (currentNavElement.previousElementSibling.hasAttribute('data-back')) {
                        rewriteHash(newHash, false);
                        updatePreviewContent('..', true);
                    } else {
                        rewriteHash(newHash);
                    }
                }
                e.preventDefault();
                break;
            case 40: // down
                if (currentNavElement.nextElementSibling) {
                    currentNavElement.nextElementSibling.classList.add('selected');
                    currentNavElement.classList.remove('selected');

                    const newHash = currentNavElement.nextElementSibling.querySelector('a').href.replace(/\/$/, '');
                    rewriteHash(newHash);
                }
                e.preventDefault();
                break;
            case 13: // enter
                if (currentNavElement.hasAttribute('data-directory')) {
                    currentNavElement.querySelector('a').click();
                }
                break;
        }
    }
}, false);

// function definitions below

function updatePercentScrollValue() {
    previewPercentScrollValueSpan.innerText = Math.round((previewOverflowContainer.scrollTop + previewOverflowContainer.offsetHeight) / previewOverflowContainer.scrollHeight * 100);
}

function handleRouting() {
    const path = window.location.hash.replace(/^\#\!/, '');
    const pathParts = path.replace(/^\//, '').split('/');

    // logic below is ugly, but seems to work
    // TODO rewrite it later

    let [label, routing] = [, routingTree];
    let routingsOnPath = [routing];
    for (const p of pathParts) {
        if (!label && p === '') {
            rewriteHash(`#!/${routing[0][0].replace(/ /g, '_')}`);
            return;
        }
        if (p === '') {
            break;
        }
        const innerRouting = routing && routing.find(([l]) => l.replace(/ /g, '_') === p);
        if (!innerRouting) {
            // 404
            rewriteHash('#!/');
            return;
        }
        [label, routing] = innerRouting;
        routingsOnPath.push(routing);
    }

    if (routing && path[path.length - 1] === '/') {
        const prefix = pathParts.filter(p => p).join('/');
        rewriteHash(`#!${prefix.length ? '/' : ''}${prefix}/${routing[0][0].replace(/ /g, '_')}`);
        return;
    }

    gtag('config', 'UA-162891460-1', {
        'page_path': location.pathname + location.hash
    });

    const pathPrefix = path.replace(/\/[^/]+$/, '/').replace(/\/$/, '');

    updateNavigation(pathPrefix, routingsOnPath[routingsOnPath.length - 2], label)
    updatePreviewContent(path, !!routingsOnPath[routingsOnPath.length - 1]);
}

function updateNavigation(pathPrefix, navigationLevelRouting, activeLabel) {
    let newInnerHTML = '';

    if (pathPrefix !== '') {
        newInnerHTML += `<li data-directory data-back><a href="#!${pathPrefix.replace(/\/[^/]+$/, '/')}">/.. <span class="box-list-hint">(go up)</span></a></li>`;
    }

    for (const [label, innerRouting] of navigationLevelRouting) {
        const active = activeLabel === label;
        newInnerHTML += `\n<li${active ? ' class="selected"' : ''}${innerRouting ? ' data-directory' : ''}><a href="#!${pathPrefix}/${label.replace(/ /g, '_')}${innerRouting ? '/' : ''}">/${label}</a></li>`;
    }

    navigationTitleValueH3.innerText = '~' + pathPrefix;
    navigationList.innerHTML = newInnerHTML;
}

function updatePreviewContent(path, emptyTitle = false) {
    if (contents[path]) {
        const prevContent = previewOverflowContainer.querySelector('.box-content');
        if (prevContent === contents[path]) {
            return;
        }
        if (prevContent) {
            previewOverflowContainer.replaceChild(contents[path], prevContent);
        } else {
            previewOverflowContainer.appendChild(contents[path]);
        }

        previewTitleValueSpan.innerText = emptyTitle ? '' : '/home/hckr' + path.replace(/_/g, ' ');
        setTimeout(updatePercentScrollValue);
    }
}

function rewriteHash(newHash, triggerRouter = true) {
    history.replaceState('', '', newHash);
    if (triggerRouter) {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
}
