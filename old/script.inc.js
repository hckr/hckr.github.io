let tech_elems = document.getElementsByClassName('technology');
for (let elem of tech_elems) {
    elem.title = 'Click to highlight all occurences of this technology';
    elem.addEventListener('click', function (e) {
        let tech = this.innerHTML;
        console.log(tech);
        for (let el of tech_elems) {
            if (el.innerHTML == tech) {
                el.classList.toggle('highlight');
            }
        }
    }, false);
}
