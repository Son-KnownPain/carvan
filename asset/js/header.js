// Handle click mobile menu button

// Set state for model
let isShowMenu = false
let isShowBrands = false

// Get element
const showMenuBtn = document.querySelector('.header__mbm-btn')
const closeMenuBtn = document.querySelector('.mbm__close-btn')
const menuModel = document.querySelector('.mbm__model')

// Handle event
showMenuBtn.onclick = function() {
    isShowMenu = true
    checkShowMenu(isShowMenu)
    this.style = 'display: none;'
}

closeMenuBtn.onclick = function() {
    isShowMenu = false
    checkShowMenu(isShowMenu)
    showMenuBtn.style = ''
}


function checkShowMenu(state) {
    menuModel.classList.toggle('active', state)
}


// Handle click show brands on mobile menu
$('.mbm__brands-arrow').onclick = function() {
    if (!isShowBrands) {
        isShowBrands = true
        $('.mbm__subnav-list').style = 'padding: 0 16px 16px; height: 105px;'
        $('.mbm__brands-arrow').classList.remove('fa-chevron-down')
        $('.mbm__brands-arrow').classList.add('fa-chevron-up')
    } else {
        isShowBrands = false
        $('.mbm__subnav-list').style = ''
        $('.mbm__brands-arrow').classList.add('fa-chevron-down')
        $('.mbm__brands-arrow').classList.remove('fa-chevron-up')
    }
}