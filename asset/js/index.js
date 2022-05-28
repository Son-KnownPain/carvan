// Defint array prototype noIncludes >< includes
Array.prototype.noIncludes = function(data) {
    if (this.includes(data)) {
        return false
    } else {
        return true
    }
}



// Get element
const viewMoreBtns = $$('.product__view-more-btn')
const allProductLayout = $$('.product__layout')


// Object app home page
const app = {
    // -----------------|
    // Variables config |
    // -----------------|
    idLayoutDisplayed: [1, 2, 3, 4],


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

        // --Handle events
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

            // Handle click view more btn to show all cars product
            viewMoreBtns.forEach((btn, indexBtn) => {
                
                btn.onclick = function() {
                    if (_this.idLayoutDisplayed.includes(indexBtn + 1)) {

                        _this.idLayoutDisplayed = _this.idLayoutDisplayed.filter(id => id != indexBtn + 1)
                        _this.renderProducts(_this.idLayoutDisplayed, 4)
                        
                        // Loading UI
                        btn.innerHTML = '<i class="fa-solid fa-fan loading-spiner"></i>'
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
        this.handleEvents()
        this.renderProducts(this.idLayoutDisplayed, 4)
        this.clientOpinionsSlider()
    }
}

app.start()