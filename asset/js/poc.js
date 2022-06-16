$(function () {
	var products = [],
		filters = {};
	var checkboxes = $('.all-products input[type=checkbox]');

	checkboxes.click(function () {

		var that = $(this),
			specName = that.attr('name');
		if(that.is(":checked")) {
			if(!(filters[specName] && filters[specName].length)){
				filters[specName] = [];
			}
			filters[specName].push(that.val());
			createQueryHash(filters);
		}
		if(!that.is(":checked")) {
			if(filters[specName] && filters[specName].length && (filters[specName].indexOf(that.val()) != -1)){
				var index = filters[specName].indexOf(that.val());
				filters[specName].splice(index, 1);
				if(!filters[specName].length){
					delete filters[specName];
				}
			}
			createQueryHash(filters);
		}
	});
	$('.filters button').click(function (e) {
		e.preventDefault();
		window.location.hash = '#';
	});

	var singleProductPage = $('.single-product');
	singleProductPage.on('click', function (e) {
		if (singleProductPage.hasClass('visible')) {
			var clicked = $(e.target);
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				createQueryHash(filters);
			}
		}
	});
	
	var file = "https://62aab6bba62365888bcb89b7.mockapi.io/poc";
	$.getJSON(file, function( data ) {
		products = data;
		generateAllProductsHTML(products);
		$(window).trigger('hashchange');
	});
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

	/* template */
	function render(url) {
		var temp = url.split('/')[0];
		$('.main-content .page').removeClass('visible');
		var	map = {
			'': function() {
				filters = {};
				checkboxes.prop('checked',false);
				renderProductsPage(products);
			},
			'#product': function() {
				var index = url.split('#product/')[1].trim();
				renderSingleProductPage(index, products);
			},
			'#filter': function() {
				url = url.split('#filter/')[1].trim();
				try {
					filters = JSON.parse(url);
				}
				catch(err) {
					window.location.hash = '#';
					return;
				}
				renderFilterResults(filters, products);
			}
		};
		if(map[temp]){
			map[temp]();
		}
		else {
			renderErrorPage();
		}
	}
	/* all product */
	function generateAllProductsHTML(data){
		var list = $('.all-products .products-list');
		var theTemplateScript = $("#products-template").html();
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));
		list.find('li').on('click', function (e) {
			e.preventDefault();
			var productIndex = $(this).data('index');
			window.location.hash = 'product/' + productIndex;
		})
	}
	
	function renderProductsPage(data){
		var page = $('.all-products'), p = $('.nonP'),
			allProducts = $('.all-products .products-list > li');
		allProducts.addClass('hidden');
		allProducts.each(function () {
			var that = $(this);
			data.forEach(function (item) {
				if(that.data('index') == item.id) {
					that.removeClass('hidden');
				}
			});
		});
		/* no product */
		if (data == "") p.addClass('show')
		else p.removeClass('show'); 
		page.addClass('visible');
	}
	
	/* SPA */
	function renderSingleProductPage(index, data){
		var page = $('.single-product'),
			img1 = '../asset/img/car-api/' + index + '/car1.jpg',
			img2 = '../asset/img/car-api/' + index + '/car2.jpg',
			img3 = '../asset/img/car-api/' + index + '/car3.jpg',
			img4 = '../asset/img/car-api/' + index + '/car4.jpg',
			img5 = '../asset/img/car-api/' + index + '/car5.jpg',
			container = $('.preview-large');
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					container.find('h3').text(item.name);
					$('.img1').find('img').attr('src', img1);
					$('.img2').find('img').attr('src', img2);
					$('.img3').find('img').attr('src', img3);
					$('.img4').find('img').attr('src', img4);
					$('.img5').find('img').attr('src', img5);
				}
			});
		}
		page.addClass('visible');
	}

	function renderFilterResults(filters, products){
		var criteria = ['brand', 'fuelType'],
			results = [],
			isFiltered = false;
		checkboxes.prop('checked', false);
		criteria.forEach(function (c) {
			if(filters[c] && filters[c].length){
				if(isFiltered){
					products = results;
					results = [];
				}
				filters[c].forEach(function (filter) {
					products.forEach(function (item){
						/*  item-details  */
						if(typeof item.carDetails[c] == 'number'){
							if(item.carDetails[c] == filter){
								results.push(item);
								isFiltered = true;
							}
						}
						if(typeof item.carDetails[c] == 'string'){
							if(item.carDetails[c].indexOf(filter) != -1){
								results.push(item);
								isFiltered = true;
							}
						}
						/* item */
						if(typeof item[c] == 'number'){
							if(item[c] == filter){
								results.push(item);
								isFiltered = true;
							}
						}
						if(typeof item[c] == 'string'){
							if(item[c].indexOf(filter) != -1){
								results.push(item);
								isFiltered = true;
							}
						}
					});
					if(c && filter){
						$('input[name='+c+'][value='+filter+']').prop('checked',true);
					}
				});
			}

		});
		renderProductsPage(results);
	}

	function renderErrorPage(){
		var page = $('.error'), footer = $('footer'),
			headers = $('header'),
			main = $('.main-content');
		page.addClass('visible');
		main.addClass('hidden');
		headers.addClass('hidden');
		footer.addClass('hidden');
	}

	function createQueryHash(filters){
		if(!$.isEmptyObject(filters)){
			window.location.hash = '#filter/' + JSON.stringify(filters);
		}
		else{
			window.location.hash = '#';
		}
	}
});
