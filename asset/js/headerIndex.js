window.addEventListener('load', function() {
    if (window.scrollY >= 100) {
        $('.header').classList.add('header--bg-white')
    }
    document.onscroll = function() {
        if (window.scrollY >= 100) {
            $('.header').classList.add('header--bg-white')
        } else {
            $('.header').classList.remove('header--bg-white')
        }
    }
})