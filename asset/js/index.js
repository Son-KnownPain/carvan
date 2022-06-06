// Defint array prototype noIncludes >< includes
Array.prototype.noIncludes = function(data) {
    if (this.includes(data)) {
        return false
    } else {
        return true
    }
}


// Create class of cars layout
class CarsLayout {
    constructor(id, name, quantity = 4) {
        this.id = id
        this.name = name
        this.quantity = quantity
    }
    renderIntoUI(htmlRender) {
        $$('.product__layout').forEach(layout => {
            
            if ( Number(layout.dataset.idlayout) == this.id ) {
                layout.innerHTML = `<div class="row">${htmlRender}</div>`
            }

        })
    }
    increaseQuantity() {
        this.quantity += 4
    }
}

// Constant
const CAR_ID = 'CAR_ID'


// Get element
const viewMoreBtns = $$('.product__view-more-btn')
const allProductLayout = $$('.product__layout')


// Object app home page
const app = {
    // -----------------|
    // Variables config |
    // -----------------|
        // The ids in this array have not been pressed the "show more" button
        idLayoutDisplayed: [1, 2, 3, 4],

        // Create an array containing the layout and its properties
        carsLayoutConfig: [
            new CarsLayout(1, 'cars recommended'),
            new CarsLayout(2, 'cars listed in last 24 hours'),
            new CarsLayout(3, 'most searched cars'),
            new CarsLayout(4, 'cars viewed by clients')
        ],


    // ---------------|
    // Method in here |
    // ---------------|
        // Display loading text
        loadingUI: function(className) {
            // When calling API then display 'loading' in UI
            var loadNumber = 0

            const idInterval = setInterval(() => {
                if (loadNumber < 100) {
                    $$('.' + className).forEach(loadEach => {
                        loadEach.innerHTML = `Loading...${loadNumber}%`
                    })
                } 
                loadNumber++
                clearLoading(loadNumber)
            }, 5)

            function clearLoading(num) {
                if (num == 100) {
                    clearInterval(idInterval)
                }
            }

        },

        // Slider client opinions
        clientOpinionsSlider: function() {
            // Get elements
            const slider = $('.co-slider')
            const sliderMain = $('.co-slider__main')
            const sliderItem = $$('.co-slider__item')

            const sliderPrevBtn = $('.co-slider__prev-btn')
            const sliderNextBtn = $('.co-slider__next-btn')

            let sliderDotsItem = $$('.co-slider__dot-item')

            // Create default value of slide
            let indexItem = 0 //as Item 0
            let xItem = `${indexItem}00%`
            const slideItemLength = sliderItem.length

            // -----------------------------------------------------------

            // Create function handling click prev, next slide or dot item
            const handleClickToggleSlide = (direction) => {
                // Next
                if (direction === 1) {

                    indexItem--
                    if (indexItem === -slideItemLength) {
                        indexItem = -0
                    }
                    xItem = `${indexItem}00%`

                    sliderMain.style = `transform: translateX(${xItem})`
                // Prev
                } else if (direction === -1)  {

                    indexItem++
                    if (indexItem === 1) {
                        indexItem = -slideItemLength + 1
                    }
                    xItem = `${indexItem}00%`

                    sliderMain.style = `transform: translateX(${xItem})`
                // Dot item
                } else if (typeof direction == 'object') {
                    
                    indexItem = -direction.indexDotItem

                    xItem = '-' + direction.xDotItem

                    sliderMain.style = `transform: translateX(${xItem})`
                }

                // Handle dot item in UI
                Array(sliderDotsItem)[0].forEach((dotItem) => {
                    if (dotItem.matches('.active') && -dotItem.dataset.index != indexItem) {
                        dotItem.classList.remove('active')
                    } else if (-dotItem.dataset.index == indexItem) {
                        dotItem.classList.add('active')
                    }
                })
            }

            // -----------------------------------------------------------
            // Handle click prev btn
            sliderPrevBtn.addEventListener('click', function() {
                handleClickToggleSlide(-1)
            })

            // Handle click next btn
            sliderNextBtn.addEventListener('click', function() {
                handleClickToggleSlide(1)
            })

            // Handle click dot item
            Array(sliderDotsItem)[0].forEach((dotItem) => {
                dotItem.addEventListener('click', function() {

                    handleClickToggleSlide({
                        xDotItem: `${dotItem.dataset.index}00%`,
                        indexDotItem: Number.parseInt(dotItem.dataset.index)
                    })

                })
            })
            
        },

        // Function reveal
        reveal: function() {
            var reveals = document.querySelectorAll(".reveal");

            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
                } else {
                reveals[i].classList.remove("active");
                }
            }
        },

        // Handle events
        handleEvents: function() {
            var _this = this;
            // Handle mouse enter / mouse out product item
            (function() {
                const imgCarsProduct = $$('.product__img')
                imgCarsProduct.forEach((img) => {
                    // Tính sau
                })
            })();
            //----------------------------------------------

            // Handle click show more btn to show all cars product
            viewMoreBtns.forEach((btn, indexBtn) => {
                
                btn.onclick = function() {
                    if (_this.idLayoutDisplayed.includes(indexBtn + 1)) {

                        _this.idLayoutDisplayed = _this.idLayoutDisplayed.filter(id => id != indexBtn + 1)
                        _this.carsLayoutConfig.forEach(item => {
                            if ( btn.dataset.idbtn == item.id ) {
                                item.increaseQuantity()
                                _this.renderCarsProduct()
                            }
                        })
                        
                        // Loading UI
                        btn.innerHTML = '<i class="fa-solid fa-gear loading-spiner"></i>'
                        var loadNumber = 0

                        const idInterval = setInterval(() => {
                            
                            loadNumber++
                            clearLoading(loadNumber)
                        }, 5)

                        function clearLoading(num) {
                            if (num == 100) {
                                clearInterval(idInterval)
                                btn.style = 'display: none;'
                            }
                        }
                        // End loading UI

                    } else {

                        _this.idLayoutDisplayed.push(indexBtn + 1)
                        _this.renderProducts(_this.idLayoutDisplayed, 4)
                        btn.textContent = 'View More'

                    }
                }
            })
            // Handle scroll to display sections
            window.onscroll = function() {
                _this.reveal()
            }

            //----------------------------------------------
        },

        // Render cars in layouts
        renderCarsProduct: function() {
            // Get this
            const _this = this


            _this.carsLayoutConfig.forEach(item => {
                fetch(urlCarsApi)
                    .then(res => res.json())
                    .then(cars => {
                        let quantityRendered = 0
                        let htmlRender = cars.map(car => {
                            if ( car.homeMode == item.name && quantityRendered < item.quantity ) {
                                quantityRendered++
                                return `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                            <a class="product-item" data-carId="${car.id}">
                                                <div class="flex-center" style="height: 160px; overflow: hidden;">
                                                    <img src="./asset/img/car-api/${car.id}/car1.jpg" alt="" class="product__img">
                                                </div>
                                                <div class="product-info">
                                                    <h5 class="product-name">
                                                        ${car.name}
                                                    </h5>
                                                    <p class="product-price">${car.netPrice}</p>
                                                </div>
                                            </a>
                                        </div>`
                            } else {
                                return ``
                            }

                        })
                        htmlRender = htmlRender.join('')
                        item.renderIntoUI(htmlRender)

                        // Handle click car product
                        $$('.product-item').forEach(carItem => {
                            carItem.onclick = () => {
                                console.log(carItem.dataset.carid)
                                localStorage.setItem(CAR_ID, JSON.stringify(carItem.dataset.carid))
                                window.location.href = './other-html/car-detail.html'
                            }
                        })

                    })
            })
        },

        // No longer in use this function, you can remove it
        renderProducts: function(idLayout, quantity = 4) {
            const apiUrl = 'https://62205fd0ce99a7de19577611.mockapi.io/user/categoryCars'
            fetch(apiUrl)
                .then(res => res.json())
                .then(datas => {

                    const htmlArr = [] //Render for product section if index + 1 == id layout of product section
                    let html // String html
                    datas.forEach((data, indexData) => {

                        html = data.cars.map((car, index) => {
                            if (index + 1 > quantity && idLayout.includes(indexData + 1)) {
                                return ''
                            } 
                            
                            return `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <a href="./other-html/car-detail.html" class="product-item">
                                            <img src="${car.pathImg}" alt="" class="product__img">
                                            <div class="product-info">
                                                <h5 class="product-name">
                                                    ${car.name}
                                                </h5>
                                                <p class="product-price">${car.price}</p>
                                            </div>
                                        </a>
                                    </div>`
                        })
                        htmlArr.push(html.join(''))

                    })
                    
                    allProductLayout.forEach((productLayout) => {
                        htmlArr.forEach((htmlSection, index) => {
                            if (productLayout.dataset.idlayout == index + 1) {
                                productLayout.innerHTML = `<div class="row">${htmlSection}</div>`
                            }
                        })
                    })
                })
        },


    // Function 'start' is always called first
    start: function() {
        // Will call other function
        this.loadingUI('product--loading')
        // this.renderProducts(this.idLayoutDisplayed, 4)
        this.clientOpinionsSlider()
        this.renderCarsProduct()
        this.handleEvents()
    }
}

app.start()