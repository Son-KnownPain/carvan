const selectModel = {
    audi: [
        'A1',
        'A3',
        'A4',
        'A4 Allroad',
        'A5',
        'A6',
        'A7',
        'A8'
    ],
    bmw: [
        '114',
        '116',
        '118',
        '120',
        '123',
        '125'
    ],
    mercedes: [
        '200',
        '220',
        '250',
        '300',
        '350',
        '400',
        '450'
    ],
    ford: [
        'B-Max',
        'Bronco',
        'C-Max',
        'Courier',
        'EcoSport',
        'Edge',
        'Escape'
    ],
    mazda: [
        '2',
        '3',
        '5',
        '6',
        'CX-3',
        'CX-30',
        'CX-5'
    ],
    landRover: [
        'Defender',
        'Discovery',
        'Discovery Sport',
        'Freelander',
        'Range Rover',
        'Range Rover Evoque',
        'Range Rover Sport'
    ],
    mitsubishi: [
        'ASX',
        'Eclipse',
        'Eclipse Cross',
        'i-MiEV',
        'L200',
        'Lancer',
        'Outlander'
    ],
    nissan: [
        '370Z',
        'Altima',
        'Cabstar',
        'e-NV200',
        'Evalia',
        'Frontier',
        'GT-R'
    ],
    opel: [
        'Adam',
        'Agila',
        'Ampera',
        'Ampera-e',
        'Antara',
        'Astra',
        'Cascada'
    ],
    porsche: [
        '918',
        'Boxster',
        'Carrera GT',
        'Cayenne',
        'Cayman',
        'Macan',
        'Panamera'
    ],
    skoda: [
        'Citigo',
        'Enyaq',
        'Fabia',
        'Kamiq',
        'Karog',
        'Kodiaq',
        'Octavia'
    ],
    volkswagen: [
        'Amarok',
        'Arteon',
        'Beetle',
        'Caddy',
        'CC',
        'Crafter',
        'Eos'
    ],
}

const brandsName = [
    'AUDI',
    'BMW',
    'FORD',
    'MAZDA',
    'MERCEDES',
    'LAND ROVER',
    'MITSUBISHI',
    'NISSAN',
    'OPEL',
    'PORSCHE',
    'SKODA',
    'VOLKSWAGEN',
]

const DATA_SEARCH = 'APP_DATA_SEARCH'
const ID_VALID_ARRAY = 'IDS_VALID_ARRAY'


const app = {
    // get data from local storage and function set data search
    dataSearch: JSON.parse(localStorage.getItem(DATA_SEARCH)) || 
        {
            bodyStyle: [],
            brand: "ANY",
            fuelType: [],
            idNo: "",
            model: "ANY",
            numberOfDoors: "",
            numberOfSeats: "",
            slidingDoors: ""
        },
    uploadIdValid: function(idValid) {
        localStorage.setItem(ID_VALID_ARRAY, JSON.stringify(idValid))
    },
    setDataSearch: function() {
        localStorage.setItem(DATA_SEARCH, JSON.stringify(this.dataSearch))
    },
    renderBrandsSelect: function() {
        // The function changes the name to a valid value with the object's key
        function changeValue(brand) {

            let value = ''
            for (let i = 0; i < brand.length; i++) {
                if ( i == 0 && brand[i] != ' ' ) {
                    value = value + brand[i].toLowerCase()
                } else if ( brand[i-1] == ' ' ) {
                    value = value + brand[i]
                } else if ( brand[i] != ' ' ) {
                    value = value + brand[i].toLowerCase()
                }
            }
            return value
        }
        // HTML
        const brandRenderHtml = brandsName.map((brand, index) => {

            if (index == 0) {
                return `<option class="search__options-brand" value="any" selected>Any</option><option class="search__options-brand" value="${changeValue(brand)}">${brand}</option>`
            } else {
                return `<option class="search__options-brand" value="${changeValue(brand)}">${brand}</option>`
            }

        })

        

        $('#search-select-brands').innerHTML = brandRenderHtml.join('')
    },
    // When i choose a brand then model select will rendered
    renderModelsSelect: function(brandInputValue) {
        let modelRenderHtml
        if (selectModel[brandInputValue]) {
            modelRenderHtml = selectModel[brandInputValue].map((model, index) => {
                if (index == 0) {
                    return `<option class="search__options-model" value="ANY" selected>Any</option><option class="search__options-model" value="${model}">${model}</option>`
                } else {
                    return `<option class="search__options-model" value="${model}">${model}</option>`
                }
            })
        } else {
            modelRenderHtml = []
        }

        if (brandInputValue == 'any') {
            $('#search-select-models').innerHTML = ''
        } else {
            $('#search-select-models').innerHTML = modelRenderHtml.join('')
        }
    },
    // Function set value for form input from localStorage
    loadDataFormSearch: function(dataSearch) {
        $('#search-id').value = this.dataSearch.idNo
        // So sánh value của option với dataSearch.brand, giống nhau thì set selected = true
        $$('.search__options-brand').forEach(option => {
            if (option.value.toUpperCase() == this.dataSearch.brand) {
                option.selected = true
            } else {
                option.selected = false
            }
        })
        // Render lại select model với brand vừa render ra UI
        this.renderModelsSelect(this.dataSearch.brand.toLowerCase())
        // Xong kiểm tra value của option giống với trong dataSearch.model thì selected = true
        $$('.search__options-model').forEach(option => {
            if (option.value == this.dataSearch.model) {
                option.selected = true
            } else {
                option.selected = false
            }
        })
        // gắn value cho các form
        $('#search-num-of-seats').value = this.dataSearch.numberOfSeats
        $('#search-num-of-doors').value = this.dataSearch.numberOfDoors
        $('#search-sliding-doors').value = this.dataSearch.slidingDoors
        $$('.search__body-style').forEach(element => {
            if (dataSearch.bodyStyle.includes(element.value)) {
                element.checked = true
            }
        })
        $$('.search__fuel-type').forEach(element => {
            if (dataSearch.fuelType.includes(element.value)) {
                element.checked = true
            }
        })
    },
    loadResultSearch: function(dataSearch) {
        $('.result-text').innerHTML = `<i class="fa-solid fa-gear result-loading-icon" style="margin-right: 4px;"></i>Loading`
        const _this = this // Get 'this' keyword
        fetch('https://62205fd0ce99a7de19577611.mockapi.io/user/cars')
            .then(response => response.json())
            .then(cars => {
                let resultNumber = 0
                let idValid = [] // Array of valid vehicle ids
                const checkCar = function(car, dataSearch) {
                    let result = true
                    // Kiểm tra coi các mảng bodyStyle và fuelType có phần tử nào hay không
                    let numOfElementBodyStyle = 0
                    let numOfElementFuelType = 0
                    dataSearch.bodyStyle.forEach(element => {
                        numOfElementBodyStyle++
                    })
                    dataSearch.fuelType.forEach(element => {
                        numOfElementFuelType++
                    })

                    // // Filter search: HELL WASN'T FIXED
                    if (dataSearch.brand != 'ANY' && dataSearch.brand != '') {
                        result = car.brand == dataSearch.brand ? true : false
                    }
                    // Kiểm tra xem đã đúng brand chưa
                    if (result) {
                        if (dataSearch.model != 'ANY' && dataSearch.model != '') {
                            result = car.model == dataSearch.model ? true : false
                        }
                        // Kiểm tra xem đã đúng model chưa
                        if (result) {
                            if (dataSearch.numberOfSeats != 'ANY' && dataSearch.numberOfSeats != '') {
                                result = car.carDetails.numberOfSeats == dataSearch.numberOfSeats ? true : false
                            }
                            // Đúng số ghế
                            if (result) {
                                if (dataSearch.numberOfDoors != 'ANY' && dataSearch.numberOfDoors != '') {
                                    result = car.carDetails.numberOfDoors == dataSearch.numberOfDoors ? true : false
                                }
                                // Đúng số cửa
                                if (result) {
                                    if (dataSearch.slidingDoors != 'ANY' && dataSearch.slidingDoors != '') {
                                        result = car.carDetails.slidingDoors == dataSearch.slidingDoors ? true : false
                                    }
                                    // Đúng cửa kéo
                                    if (result) {
                                        // Chưa xử lí được khi chọn other
                                        if (!dataSearch.bodyStyle.includes(car.carDetails.bodyStyle) && numOfElementBodyStyle > 0) {
                                            result = false
                                        }
                                        // Đúng body style
                                        if (result) {
                                            // Chưa xử lí được khi chọn other
                                            if (!dataSearch.fuelType.includes(car.carDetails.fuelType) && numOfElementFuelType > 0) {
                                                result = false
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return result
                        
                }
                // set it up, check and push which ids are valid for the search request into the idValid array
                // Also, if it is valid, it will increase the Result Number by 1 to render the UI
                cars.forEach(car => {
                    if ( car.carDetails.idNo == dataSearch.idNo && _this.dataSearch.idNo != '' ) {
                        resultNumber++
                        idValid.push(car.id)
                    } else if (car.carDetails.idNo != dataSearch.idNo && _this.dataSearch.idNo != '') {
                        // If the check is not valid then stop doing nothing
                    } else if (checkCar(car, dataSearch)) {
                        resultNumber++
                        idValid.push(car.id)
                    }
                })
                // Submit array of Ids accepted by the search filter
                _this.uploadIdValid(idValid)
                // Inner html UI numbers of result
                $('.result-text').innerHTML = `<i class="fa-solid fa-list" style="margin-right: 4px;"></i>show ${resultNumber} result`
            });
    },
    // Function get value for search when i change form input
    getValueSearch: function() {
        const searchValue = {
            idNo: $('#search-id').value,
            brand: $('#search-select-brands').value.toUpperCase(),
            model: $('#search-select-models').value,
            bodyStyle: [],
            numberOfSeats: $('#search-num-of-seats').value,
            numberOfDoors: $('#search-num-of-doors').value,
            slidingDoors: $('#search-sliding-doors').value,
            fuelType: []
        }
        $$('.search__body-style:checked').forEach(elementChecked => {
            searchValue.bodyStyle.push(elementChecked.value)
        })
        $$('.search__fuel-type:checked').forEach(elementChecked => {
            searchValue.fuelType.push(elementChecked.value)
        })
        // Assign searchValue to dataSearch and call function set data to localStorage
        this.dataSearch = searchValue
        this.setDataSearch()
        this.loadResultSearch(this.dataSearch)
    },
    resetSearch: function() {
        this.getValueSearch()
    },
    handleEvents: function() {
        const _this = this

        // Handle get value and select brand, model
        // ---------------------------------------------------------------------------
        // Event is fired when i change select brand
        $('#search-select-brands').oninput = function(e) {
            _this.renderModelsSelect(e.target.value)
            _this.getValueSearch()
        }
        // Event is fired when i check on checkbox
        $$('.search__body-style').forEach(element => {
            element.oninput = function() {
                _this.getValueSearch()
            }
        })
        $$('.search__fuel-type').forEach(element => {
            element.oninput = function() {
                _this.getValueSearch()
            }
        })
        // Get value when input change
        $('#search-select-models').oninput = () => {
            _this.getValueSearch()
        }
        $('#search-num-of-seats').oninput = () => {
            _this.getValueSearch()
        }
        $('#search-num-of-doors').oninput = () => {
            _this.getValueSearch()
        }
        $('#search-sliding-doors').oninput = () => {
            _this.getValueSearch()
        }
        $('#search-id').oninput = () => {
            _this.getValueSearch()
        }
        // ---------------------------------------------------------------------------

        // Reset form search
        $('.search__reset-btn').onclick = function() {
            // Input, select -> set value empty
            _this.renderBrandsSelect()
            _this.renderModelsSelect()
            const arrId = [
                '#search-num-of-seats',
                '#search-num-of-doors',
                '#search-sliding-doors',
                '#search-id'
            ]
            arrId.forEach(idSelecter => {
                $(idSelecter).value = ''
            })
            // Checkbox -> uncheck
            // I don't understand array no work so i declare 1 variable contain that array
            const arrClassCheckbox = [
                '.search__body-style',
                '.search__fuel-type'
            ]
            arrClassCheckbox.forEach((classSelecter) => {
                $$(classSelecter).forEach(element => {
                    if (element.checked) {
                        element.checked = false
                    }
                })
            })
            _this.resetSearch()
        }
    },
    start: function() {
        this.renderBrandsSelect()
        this.loadDataFormSearch(this.dataSearch)
        this.loadResultSearch(this.dataSearch)
        this.handleEvents()
    }
}

window.addEventListener('load', function() {
    app.start()
})