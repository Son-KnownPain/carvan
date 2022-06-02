const DATA_SEARCH = 'APP_DATA_SEARCH'
const ID_VALID_ARRAY = 'IDS_VALID_ARRAY'

const app = {
    // Query localStorage to get data
    dataSearch: JSON.parse(localStorage.getItem(DATA_SEARCH)),
    // Query localStorage to get ids valid
    idsValid: JSON.parse(localStorage.getItem(ID_VALID_ARRAY)),

    // Create global filterArr
    filterArr: [],

    // Initialize the number of vehicles initially displayed in the product list
    carQuantity: 6,

    // Create an external indexCheck variable that can be used in functions other than renderCars, default = 0
    indexCheck: 0,

    // Create a variable that holds the value of the number of valid ids
    idsValidLength: JSON.parse(localStorage.getItem(ID_VALID_ARRAY)).length,

    // handle 'dataSearch' into 'filterArr' array
    handleFilterArr: function(dataSearch) {
        let filterArr = []
        // Brand
        if ( dataSearch.brand != 'ANY' && dataSearch.brand != '' ) {
            filterArr.push(dataSearch.brand)
        }
        // Model of brand
        if ( dataSearch.model != 'ANY' && dataSearch.model != '' ) {
            filterArr.push(dataSearch.model)
        }
        // Body style
        dataSearch.bodyStyle.forEach(element => {
            filterArr.push(element)
        })
        // Number of seats
        if ( dataSearch.numberOfSeats != '' ) {
            if (dataSearch.numberOfSeats > 1) {
                filterArr.push(dataSearch.numberOfSeats + ' seats')
            } else {
                filterArr.push(dataSearch.numberOfSeats + ' seat')
            }
        }
        // Number of doors
        if ( dataSearch.numberOfDoors != 'ANY' && dataSearch.numberOfDoors != '' ) {
            if (dataSearch.numberOfDoors > 1) {
                filterArr.push(dataSearch.numberOfDoors + ' seats')
            } else {
                filterArr.push(dataSearch.numberOfDoors + ' seat')
            }
        }
        // Sliding doors
        if ( dataSearch.slidingDoors != 'ANY' && dataSearch.slidingDoors != '' ) {
            filterArr.push(dataSearch.slidingDoors)
        }
        // Fuel type
        dataSearch.fuelType.forEach(element => {
            filterArr.push(element)
        })

        app.filterArr = filterArr
        return filterArr
    },

    // Render filter HTML
    renderFilters: function(dataSearch) {
        // Create an array containing the filter parts
        let filterArr = []
        // Get element contain filters
        const filterElement = $('.filter')
        
        // Call function handle Filter Array to render UI
        filterArr = this.handleFilterArr(dataSearch)
        const htmlFilter = filterArr.map((filter, index) => {
            return `<div class="filter-section">
                        <h3 class="filter__name">${filter}</h3>
                    </div>`
        })
        filterElement.innerHTML = htmlFilter.join('')
    },

    // Render cars
    renderCars: function() {
        const _this = this
        fetch(urlCarsApi)
            .then(res => res.json())
            .then(cars => {
                // variable 'indexCheck' is for checking valid elements not exceeding 'carQuantity'
                let indexCheck = 0
                const htmlCars = cars.map(car => {
                    if ( _this.idsValid.includes(car.id) && indexCheck < _this.carQuantity ) {
                        _this.indexCheck = indexCheck
                        indexCheck++
                        return `<div class="mb-60 col-xl-4 col-lg-4 col-md-6 col-12">
                                    <a href="" class="list-car__item a-handle">
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
                                                <h3 class="list-car__net-price b_text-weight-700">${car.currencyIcon} ${car.netPrice}</h3>
                                            </div>
                                            <div class="flex-space-between mt-24">
                                                <p class="list-car__mileage fs-16">
                                                    <i class="fa-solid fa-gauge-high" style="color: #6e7f80;"></i>
                                                    ${car.carDetails.mileage}
                                                </p>
                                                <h3 class="list-car__total-price b_text-weight-400">${car.currencyIcon} ${ (Number(car.netPrice)*Number(car.vatPercent)/100 + Number(car.netPrice)).toFixed(3) }</h3>
                                            </div>
                                            <div class="flex-space-between mt-24">
                                                <p class="list-car__fuel-type fs-16">
                                                    <i class="fa-solid fa-gas-pump" style="color: #ffbf00;"></i>
                                                    ${car.carDetails.fuelType}
                                                </p>
                                                <p class="list-car__vat fs-12 text-success">${car.vatPercent}% VAT reclaimable</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>`
                    }
                })
                $('.list-car').innerHTML = `<div class="row gx-5">${htmlCars.join('')}</div>`
            })
    },

    checkDisplayShowMoreBtn: function() {
        if (this.carQuantity > this.idsValidLength) {
            $('.show-more-btn').style = 'display: none;'
        } else {
            $('.show-more-btn').style = 'display: flex;'
        }
    },

    // Handle events
    handleEvents: function() {
        // Get 'this'
        const _this = this

        // Handle remove filter section
        // Get element remove button
        $$('.filter__remove-btn').forEach(btn => {
            
        })

        // Handle click show more
        $('.show-more-btn').addEventListener('click', function() {
            _this.carQuantity += 6
            _this.renderCars()
            _this.checkDisplayShowMoreBtn()
        })
    },

    // Start function called when application run
    start: function() {
        this.checkDisplayShowMoreBtn()
        this.renderFilters(this.dataSearch)
        this.renderCars()
        this.handleEvents()
    }
}

window.addEventListener('load', function() {
    app.start()
})