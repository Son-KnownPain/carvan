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
        'Altima',
        'Agila',
        'Ampera',
        'Ampera-e',
        'Antara',
        'Astra'
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



const app = {
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
                return `<option value="" selected>Any</option><option value="${changeValue(brand)}">${brand}</option>`
            } else {
                return `<option value="${changeValue(brand)}">${brand}</option>`
            }

        })

        

        $('#search-select-brands').innerHTML = brandRenderHtml.join('')
    },
    renderModelsSelect: function(brandInputValue) {
        const modelRenderHtml = selectModel[brandInputValue].map((model, index) => {
            if (index == 0) {
                return `<option value="" selected>Any</option><option value="${model}">${model}</option>`
            } else {
                return `<option value="${model}">${model}</option>`
            }
        })

        $('#search-select-models').innerHTML = modelRenderHtml.join('')
    },
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
        // console.log(searchValue);
    },
    resetSearch: function() {

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
            [
                '#search-select-brands',
                '#search-select-models',
                '#search-num-of-seats',
                '#search-num-of-doors',
                '#search-sliding-doors'
            ].forEach(idSelecter => {
                $(idSelecter).value = ''
            })
            // Checkbox -> uncheck
            // I don't understand array no work so i declare 1 variable contain that array
            const arr = [
                '.search__body-style',
                '.search__fuel-type'
            ]
            arr.forEach((classSelecter) => {
                $$(classSelecter).forEach(element => {
                    if (element.checked) {
                        element.checked = false
                    }
                })
            })
        }
    },
    start: function() {
        this.handleEvents()
        this.renderBrandsSelect()
    }
}

app.start()