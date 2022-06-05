const CAR_ID = 'CAR_ID'


const app = {
    isShowSubMenu: false,

    handleClickCarProduct: function(carItem) {
        localStorage.setItem(CAR_ID, JSON.stringify(carItem.dataset.carid))
        $('#go-to-details').click()
    },

    // Render cars by type
    renderCarsByType: function() {
        // Get this
        const _this = this

        // Fake call api
        fetch(urlCarsApi)
            .then(res => res.json())
            .then(cars => {
                let quantityCarRender = 1
                // Render UI 
                $$('.list-car').forEach(item => {
                    quantityCarRender = 1
                    const htmlCars = cars.map(car => {
                        
                        if (car.carDetails.bodyStyle == item.dataset.roc && quantityCarRender <= 6) {
                            quantityCarRender++
                            return `<div class="mb-60 col-xl-4 col-lg-4 col-md-6 col-12">
                                        <a class="list-car__item a-handle pointer" data-carid="${car.id}">
                                            <div class="list-car__img-wrapper flex-center">
                                                <img src="../asset/img/car-detail/test/select1.jfif" alt="" class="list-car__img">
                                            </div>
                                            <div class="list-car__info">
                                                <h4 class="list-car__name">${car.name}</h4>
                                                <div class="flex-space-between mt-24">
                                                    <p class="list-car__first-registration fs-16">
                                                        <i class="fa-regular fa-calendar" style="color: #007fff;"></i>
                                                        ${car.carDetails.firstRegistration}
                                                    </p>
                                                    <h3 class="list-car__net-price b_text-weight-700">€ ${car.netPrice}</h3>
                                                </div>
                                                <div class="flex-space-between mt-24">
                                                    <p class="list-car__mileage fs-16">
                                                        <i class="fa-solid fa-gauge-high" style="color: #6e7f80;"></i>
                                                        ${car.carDetails.mileage}
                                                    </p>
                                                    <h3 class="list-car__total-price b_text-weight-400">€ ${(Number(car.netPrice) * 1.19).toFixed(3)}</h3>
                                                </div>
                                                <div class="flex-space-between mt-24">
                                                    <p class="list-car__fuel-type fs-16">
                                                        <i class="fa-solid fa-gas-pump" style="color: #ffbf00;"></i>
                                                        ${car.carDetails.fuelType}
                                                    </p>
                                                    <p class="list-car__vat fs-12 text-success">19% VAT reclaimable</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>`
                        }


                    })

                    item.innerHTML = `<div class="row">${htmlCars.join('')}</div>`
                })
                // Handle click car product
                $$('.list-car__item').forEach(item => {
                    item.onclick = () => {
                        _this.handleClickCarProduct(item)
                    }
                })
            })
    },

    // Handle events
    handleEvents: function() {
        const _this = this
        // Handle click show list range of cars
        $('.menu-roc-text').onclick = function() {
            _this.isShowSubMenu = !_this.isShowSubMenu
            $('.menu-roc').classList.toggle('active', _this.isShowSubMenu)
            if (_this.isShowSubMenu) {
                this.innerHTML = '<i class="fa-solid fa-xmark fs-16" style="margin-right: 8px;"></i>Close menu'
            } else {
                this.innerHTML = '<i class="fa-solid fa-ellipsis-vertical fs-16" style="margin-right: 8px;"></i>list range of cars'
            }
        }
        $$('.menu-roc__link').forEach(item => {
            item.onclick = function() {
                _this.isShowSubMenu = false
                $('.menu-roc').classList.toggle('active', _this.isShowSubMenu)
                $('.menu-roc-text').innerHTML = '<i class="fa-solid fa-ellipsis-vertical fs-16" style="margin-right: 8px;"></i>list range of cars'
            }
        })

    },
    start: function() {
        this.renderCarsByType()
       this.handleEvents()
    }
}

window.addEventListener('load', function() {
    app.start()
})