var product = document.querySelector('.product'),
    lup = null,
    zoom = null;

var createLoupe = function () {
	var lupEl = document.createElement('div');
	lupEl.classList.add('loupe');
	lup = lupEl;
	product.appendChild(lupEl);
};

var removeLoupe = function () {
  if (lup) {
    product.removeChild(lup);
    lup = null;
  }
};

var createZoomedProduct = function () {
  zoom = document.createElement('div');
  zoom.classList.add('zoom');
  document.body.appendChild(zoom);
};

var removeZoomedProduct = function () {
  if (zoom) {
    document.body.removeChild(zoom);
    zoom = null;
  }
};


var onMouseMove = function (ev) {
	var productBounding = product.getBoundingClientRect(),
      x = ev.clientX - productBounding.left,
      y = ev.clientY - productBounding.top,
      productSize = parseInt(window.getComputedStyle(product).height),
      lupSize = parseInt(window.getComputedStyle(lup).height),
      max_position = productSize - lupSize;

      x -= lupSize / 2;
      y -= lupSize / 2;

       if (x + lupSize > productSize) {
    	  x = max_position;
  		}
  
  		if (y + lupSize > productSize) {
    	   y = max_position;
  		}

  		if (x < 0) {
    		x = 0;
  		}
  
  		if (y < 0) {
    		y = 0;
  		}

    var transformCSSValues = "translateX(" + x + "px) translateY(" + y +"px)";
  	lup.style.transform = transformCSSValues;

  	zoom.style.backgroundPosition = - x * 2 +"px " + - y * 2 + "px";
};


var onMouseEnter = function () {
  createLoupe();
  createZoomedProduct();
};

var onMouseLeave = function () {
	removeLoupe();
	removeZoomedProduct();
};



product.addEventListener('mouseenter', onMouseEnter);
product.addEventListener('mouseleave', onMouseLeave);
product.addEventListener('mousemove', onMouseMove);