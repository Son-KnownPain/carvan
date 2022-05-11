window.addEventListener('load', function() {
    document.onscroll = function() {
        if (window.scrollY >= 100) {
            $('.header').classList.add('header--bg-white')
        } else {
            $('.header').classList.remove('header--bg-white')
        }
    }
})