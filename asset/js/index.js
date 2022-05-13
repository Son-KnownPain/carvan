



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

        loadingUI: function() {
            // When calling API then display 'loading' in UI
            var loadNumber = 0

            const idInterval = setInterval(() => {
                if (loadNumber < 100) {
                    $$('.product--loading').forEach(loadEach => {
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
                        btn.style = 'display: none;'
                        btn.textContent = 'Hide'

                    } else {

                        _this.idLayoutDisplayed.push(indexBtn + 1)
                        _this.renderProducts(_this.idLayoutDisplayed, 4)
                        btn.textContent = 'View More'

                    }
                }
            })
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
                            
                            return `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                        <a href="#" class="product-item">
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
        this.loadingUI()
        this.handleEvents()
        this.renderProducts(this.idLayoutDisplayed, 4)
    }
}

app.start()