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


// Handle click subnav brands


$$('.header__subnav-item-link').forEach(element => {
    element.removeAttribute('href')
    element.classList.add('pointer')
})


const handleClickBrand = (element) => {
    const dataSearch = {
        bodyStyle: [],
        brand: element.textContent,
        fuelType: [],
        idNo: "",
        model: "ANY",
        numberOfDoors: "",
        numberOfSeats: "",
        slidingDoors: ""
    }
    localStorage.setItem('APP_DATA_SEARCH', JSON.stringify(dataSearch))
    fetch(urlCarsApi)
        .then(res => res.json())
        .then(cars => {
            let idsValid = []
            cars.forEach(car => {
                if (car.brand == dataSearch.brand) {
                    idsValid.push(car.id)
                }
            })
            localStorage.setItem('IDS_VALID_ARRAY', JSON.stringify(idsValid))
            window.location.href = 'http://127.0.0.1:5500/other-html/list-car.html'
        })

}


$$('.header__subnav-item-link').forEach(element => {
    element.onclick = () => {
        handleClickBrand(element)
    }
})