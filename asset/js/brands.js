const DATA_SEARCH = 'APP_DATA_SEARCH'
const IDS_VALID_ARRAY = 'IDS_VALID_ARRAY'


const app = {
    changeDatasetToMyData: function(data) {
        let brand = ''
        let model = ''
        let firstComma
        let firstColonBrand
        let secondColonModel
        
        for ( var i = 0; i < data.length; i++ ) {
            if ( data[i] == ':' && data[i-1] == 'l' && data[i-2] == 'e' && data[i-3] == 'd' && data[i-4] == 'o' && data[i-5] == 'm' ) {
                secondColonModel = i
            }
            if ( data[i] == ':' && data[i-1] == 'd' && data[i-2] == 'n' && data[i-3] == 'a' && data[i-4] == 'r' && data[i-5] == 'b' ) {
                firstColonBrand = i
            }
            if ( data[i] == ',' ) {
                firstComma = i
            }
        }
        for ( var i = 0; i < data.length; i++ ) {
            if ( i > firstColonBrand && i < firstComma ) {
                brand = brand + data[i]
            }
            if ( i > secondColonModel ) {
                model = model + data[i]
            }
        }

        // remove whitespace
        brand = brand.trim()
        model = model.trim()

        return [brand, model]
    },
    uploadDataSearchAndShowListCar: function(dataSearch) {
        const _this = this
        
        // Upload dataSearch
        localStorage.setItem(DATA_SEARCH, JSON.stringify(dataSearch))

        // Upload ids valid
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
                    if (dataSearch.brand != 'ANY' && dataSearch.brand != '') {
                        result = car.brand == dataSearch.brand ? true : false
                    } else {
                        result = true
                    }
                    if (dataSearch.model != 'ANY' && dataSearch.model != '') {
                        result = car.model == dataSearch.model ? true : false
                    }
                    // Kiểm tra xem đã đúng brand hoặc model r mới kiểm tra tiếp
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
                    
                    
                    return result
                }
                // set it up, check and push which ids are valid for the search request into the idValid array
                // Also, if it is valid, it will increase the Result Number by 1 to render the UI
                cars.forEach(car => {
                    if ( car.carDetails.idNo == dataSearch.idNo && dataSearch.idNo != '' ) {
                        resultNumber++
                        idValid.push(car.id)
                    } else if (car.carDetails.idNo != dataSearch.idNo && dataSearch.idNo != '') {
                        // If the check is not valid then stop doing nothing
                    } else if (checkCar(car, dataSearch)) {
                        resultNumber++
                        idValid.push(car.id)
                    }
                })
                // Submit array of Ids accepted by the search filter
                localStorage.setItem(IDS_VALID_ARRAY, JSON.stringify(idValid))
                // Click show list car
                $('#go-to-list-car').click()
            });

    },
    handleEvents: function() {
        // Get this
        const _this = this

        // Handle click model of a brand 
        $$('.bi__submenu-btn').forEach(btn => {
            btn.onclick = () => {
                const [BRAND, MODEL] = _this.changeDatasetToMyData(btn.dataset.dsbam)

                const dataSearch = {
                    bodyStyle: [],
                    brand: BRAND,
                    fuelType: [],
                    idNo: "",
                    model: MODEL,
                    numberOfDoors: "",
                    numberOfSeats: "",
                    slidingDoors: ""
                }

                _this.uploadDataSearchAndShowListCar(dataSearch)
            }
        })
    },
    start: function() {
        this.handleEvents()
    }
}

window.addEventListener('load', function() {
    app.start()
})