// Handle click mobile menu button

// Set state for model
let isShowMenu = false

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