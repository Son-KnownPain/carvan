

// Get element in here
const modifyWarrantyBtn = $('.car__warranty-modify-btn')
const closeWarrantyBtn = $('.warranty__close')
const warrantyModel = $('.warranty__model')

// Constant
const CAR_ID = 'CAR_ID'

const app = {
    carId: JSON.parse(localStorage.getItem(CAR_ID)),
    isShowWarrantyModel: false,
    warrantyPackage: {
        year: 1,
        mode: "basic"
    },
    warrantyPrice: 0,




    handleEvents: function() {
        const _this = this

        // Show/Hide warranty model
        modifyWarrantyBtn.onclick = function() {
            _this.isShowWarrantyModel = true
            _this.handleShowHideModel()
        }
        closeWarrantyBtn.onclick = function() {
            _this.isShowWarrantyModel = false
            _this.handleShowHideModel()
        }
        warrantyModel.onclick = function() {
            _this.isShowWarrantyModel = false
            _this.handleShowHideModel()
        }
        $('.warranty__contain').onclick = function(e) {
            e.stopPropagation()
        }



        // Set value of warranty year
        $$('input.choice-year-input').forEach(input => {
            input.onclick = function() {
                app.warrantyPackage.year = Number(input.value[0])
                app.renderWarrantyConfig()
            }
        })



        // Set warranty package
        $$('.wlc__choose-btn').forEach(chooseBtn => {
            chooseBtn.onclick = function() {
                app.warrantyPackage.mode = chooseBtn.dataset.value
                $('.wlc__section.active').classList.remove('active')
                chooseBtn.closest('.wlc__section').classList.add('active')
                app.renderWarrantyConfig()
            }
        })

    },




    renderCarDetails: function() {
        // Get 'this'
        const _this = this

        // Call api
        fetch(urlCarsApi)
            .then(res => res.json())
            .then(cars => {

                // Check id and render details content
                cars.forEach(car => {
                    if (car.id == _this.carId) {
                        const formatter = new Intl.NumberFormat('it-IT', {
                            style: 'currency',
                            currency: 'EUR'
                        })

                        $('.render-name').innerHTML = car.name
                        $('.render-net-price').innerHTML = formatter.format(Number(car.netPrice)*1000)
                        $('.render-total-net-price').innerHTML = formatter.format((Number(car.netPrice)*1000 + _this.warrantyPrice))
                        $('.render-total-gross-price').innerHTML = formatter.format( (Number(car.netPrice)*1000 + _this.warrantyPrice) * (100 + Number(car.vatPercent) ) / 100 )
                        $('.render-vat-percent').innerHTML = `${car.vatPercent}% VAT reclaimable`
                        if (car.availableState == 'available') {
                            $('.render-available-state').innerHTML = 'The car is available'
                        } else {
                            $('.render-available-state').innerHTML = 'The car is not available'
                        }

                        $('.car__img-box').innerHTML = `<div class="row fh">
                                                            <div class="col-xl-9 col-lg-9 fh">
                                                                <div class="car__img-displaying-box">
                                                                    <img src="../asset/img/car-api/${car.id}/car1.jpg" alt="" class="car__img-displaying">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 fh">
                                                                <div class="car__img-select-box">
                                                                    <img src="../asset/img/car-api/${car.id}/car1.jpg" alt="" class="car__img-select">
                                                                    <img src="../asset/img/car-api/${car.id}/car2.jpg" alt="" class="car__img-select">
                                                                    <img src="../asset/img/car-api/${car.id}/car3.jpg" alt="" class="car__img-select">
                                                                    <img src="../asset/img/car-api/${car.id}/car4.jpg" alt="" class="car__img-select">
                                                                    <img src="../asset/img/car-api/${car.id}/car5.jpg" alt="" class="car__img-select">
                                                                    <img src="../asset/img/car-api/${car.id}/car6.jpg" alt="" class="car__img-select">
                                                                </div>
                                                            </div>
                                                        </div>`

                        $('.render-id-no').innerHTML = car.carDetails.idNo
                        $('.render-condition').innerHTML = car.carDetails.condition
                        $('.render-body-style').innerHTML = car.carDetails.bodyStyle
                        $('.render-year').innerHTML = car.carDetails.year
                        $('.render-first-registration').innerHTML = car.carDetails.firstRegistration
                        $('.render-registered-in').innerHTML = car.carDetails.registeredIn
                        $('.render-mileage').innerHTML = car.carDetails.mileage
                        $('.render-fuel-type').innerHTML = car.carDetails.fuelType
                        $('.render-transmission').innerHTML = car.carDetails.Transmission
                        $('.render-general-inspection').innerHTML = car.carDetails.generalInspection

                        $('.render-power').innerHTML = car.carDetails.power
                        $('.render-cubic-capacity').innerHTML = car.carDetails.cubicCapacity
                        $('.render-exterior-color').innerHTML = car.carDetails.exteriorColor
                        $('.render-interior').innerHTML = car.carDetails.interior
                        $('.render-number-of-seats').innerHTML = car.carDetails.numberOfSeats
                        $('.render-number-of-doors').innerHTML = car.carDetails.numberOfDoors
                        $('.render-sliding-doors').innerHTML = car.carDetails.slidingDoors
                        $('.render-air-conditioning').innerHTML = car.carDetails.airConditioning
                        $('.render-emission-class').innerHTML = car.carDetails.emissionClass
                        $('.render-energy-efficiency').innerHTML = car.carDetails.eneryEfficiencyClass
                        $('.render-delivery-date').innerHTML = car.carDetails.deliveryDate

                        // Render feature
                        const htmlFeature = car.feature.map(item => {
                            return `<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                                        <div class="details__feature-item">
                                            <i class="fa-solid fa-check details__feature-check"></i>
                                            ${item}
                                        </div>
                                    </div>`
                        })

                        $('.render-feature').innerHTML = `<div class="row">${htmlFeature.join('')}</div>`

                        // Render other details
                        const htmlFuelConsumption = car.otherDetails.fuelConsumption.map((item, index) => {
                            if (index == 0) {
                                return `<tr>
                                            <td>Fuel consumption:</td>
                                            <td class="ml-12" style="display: block;"><span class="b_text-weight-700">${item}</span></td>
                                        </tr>`
                            } else {
                                return `<tr>
                                            <td></td>
                                            <td class="ml-12" style="display: block;"><span class="b_text-weight-700">${item}</span></td>
                                        </tr>`
                            }
                        })

                        const htmlCo2Emission = `<tr>
                                                    <td>CO₂ emissions:</td>
                                                    <td class="ml-12" style="display: block;"><span class="b_text-weight-700">${car.otherDetails.co2Emissions}</span></td>
                                                </tr>`

                        $('.render-other-details').innerHTML = htmlFuelConsumption.join('') + htmlCo2Emission

                        // Handle event click change image
                        _this.handleChangeImg()

                    }
                })
            })
    },




    renderWarrantyConfig: function() {
        if (this.warrantyPackage.year > 1) {
            $('.car__price-subtitle').textContent = `[${this.warrantyPackage.year} years, ${this.warrantyPackage.mode} package]`
        } else {
            $('.car__price-subtitle').textContent = `[${this.warrantyPackage.year} year, ${this.warrantyPackage.mode} package]`
        }
    },




    handleShowHideModel: function() {
        if (this.isShowWarrantyModel) {
            $('.warranty__model').classList.toggle('show', this.isShowWarrantyModel)
            setTimeout(() => {
                $('.warranty__contain').classList.toggle('show', this.isShowWarrantyModel)
            }, 1)
        } else {
            $('.warranty__contain').classList.toggle('show', this.isShowWarrantyModel)
            setTimeout(() => {
                $('.warranty__model').classList.toggle('show', this.isShowWarrantyModel)
            }, 300)
        }
    },




    handleChangeImg: function() {
        
        const carsImgSelect = $$('.car__img-select')
        const carImgDisplaying = $('.car__img-displaying')

        carsImgSelect.forEach((carImg) => {
            carImg.onclick = function() {
                carImgDisplaying.src = carImg.src
            }
        })
    },




    start: function() {
        this.renderCarDetails()
        this.renderWarrantyConfig()
        this.handleEvents()
    }
}

window.addEventListener('load', function() {
    app.start()
})