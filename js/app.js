(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/scripts/app"],{

/***/ "./resources/assets/scripts/app.js":
/*!*****************************************!*\
  !*** ./resources/assets/scripts/app.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popover */ "./resources/assets/scripts/popover.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip */ "./resources/assets/scripts/tooltip.js");
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast */ "./resources/assets/scripts/toast.js");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tab */ "./resources/assets/scripts/tab.js");
/* harmony import */ var _lottie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lottie */ "./resources/assets/scripts/lottie.js");
/* harmony import */ var _navbar_secondary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navbar-secondary */ "./resources/assets/scripts/navbar-secondary.js");
/* harmony import */ var _promobar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./promobar */ "./resources/assets/scripts/promobar.js");
/* harmony import */ var _dropdown_on_hover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dropdown-on-hover */ "./resources/assets/scripts/dropdown-on-hover.js");









Object(_popover__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_tooltip__WEBPACK_IMPORTED_MODULE_2__["default"])();
Object(_toast__WEBPACK_IMPORTED_MODULE_3__["default"])();
Object(_lottie__WEBPACK_IMPORTED_MODULE_5__["default"])();
Object(_tab__WEBPACK_IMPORTED_MODULE_4__["default"])();
Object(_dropdown_on_hover__WEBPACK_IMPORTED_MODULE_8__["default"])();
document.addEventListener('DOMContentLoaded', function () {
  Object(_navbar_secondary__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
document.addEventListener('DOMContentLoaded', function () {
  Object(_promobar__WEBPACK_IMPORTED_MODULE_7__["default"])();
});
var priceVariation = document.querySelectorAll("[name='attribute_pa_license']");
var isLicenseSelected = document.querySelector("[name='attribute_pa_license']:checked");
var variationInput = document.querySelector('.variation_id');

if (isLicenseSelected) {
  variationInput.value = isLicenseSelected.dataset.variationId;
}

priceVariation && priceVariation.forEach(function (button) {
  button.addEventListener('change', function (e) {
    var el = e.currentTarget;
    var variationId = el.dataset.variationId;
    variationInput.value = variationId;
  });
});

var increaseDownloadCount = function increaseDownloadCount() {
  var downloadCont = jQuery('[data-download-count]');
  var count = downloadCont.text();
  downloadCont.text(parseInt(count) + 1);
};

jQuery('#email-link-form').submit(function (e) {
  e.preventDefault();
  var emailInput = e.target.email;
  var nameInput = e.target.name;
  var email = emailInput.value;
  var name = nameInput.value;
  var post_id = e.target.post_id.value;
  var btnSubmit = e.target.submit;
  var isSubscribed = e.target.isAgree.checked;
  jQuery.ajax({
    data: {
      action: 'form_submit',
      email: email,
      name: name,
      post_id: post_id,
      isSubscribed: isSubscribed
    },
    type: 'post',
    url: admin_url.ajax_url,
    beforeSend: function beforeSend() {
      btnSubmit.classList.add('disabled');
      jQuery('[data-form]').hide();
      jQuery('[data-preload]').show();
    },
    success: function success(data) {
      var _JSON$parse = JSON.parse(data),
          status = _JSON$parse.status,
          msg = _JSON$parse.msg;

      if (status === 1) {
        jQuery('[data-success]').show();
        jQuery('[data-preload]').hide();
        increaseDownloadCount();
        btnSubmit.classList.remove('disabled');
        jQuery('[data-email]').text(email);
        emailInput.value = '';
        nameInput.value = '';
        window.dataLayer.push({
          event: 'Download',
          eventAction: 'Completed'
        });
      }
    }
  });
});
jQuery(document).on('click', '[data-resend]', function () {
  jQuery('[data-success]').hide();
  jQuery('[data-form]').show();
});
jQuery(document).on('click', '[data-direct-download]', function (e) {
  e.preventDefault();
  var el = jQuery(e.currentTarget);
  var post_id = el.data('post-id');
  var buttonHtml = el.html();
  var download_link = el.data('url');
  el.text('Processing...');
  jQuery.ajax({
    data: {
      action: 'direct_download',
      post_id: post_id
    },
    type: 'post',
    url: admin_url.ajax_url,
    success: function success(data) {
      increaseDownloadCount();
      el.html(buttonHtml);
      window.location.href = download_link;
      window.dataLayer.push({
        event: 'download_click',
        eventAction: 'Direct'
      });
      var myModalEl = document.getElementById('exampleModal');
      var modal = new bootstrap__WEBPACK_IMPORTED_MODULE_0__["Modal"](myModalEl, {
        keyboard: false
      });
      modal.show();
    }
  });
});
var btnReviewTrigger = document.querySelector('[data-review-trigger]');
btnReviewTrigger && btnReviewTrigger.addEventListener('click', function (e) {
  document.querySelector("[href='#tab-reviews']").click();
});

(function ($) {
  $('[data-live-preview]').on('click', function (e) {
    var $this = $(e.currentTarget);
    var event = $this.data('live-preview').event;
    window.dataLayer.push({
      event: 'live_preview',
      themePrice: event
    });
  });
  $('.subscription-form').on('submit', function (e) {
    e.preventDefault();
    var email = e.target.elements.email;
    var button = e.target.elements.subscribe_button;

    if (!email.value) {
      $('.subscription-form-notification').show();
      email.style.borderColor = '#fb482b';
    } else {
      $('.subscription-form-notification').hide();
      email.removeAttribute('style');
      $.ajax({
        url: admin_url.ajax_url,
        type: 'post',
        data: {
          action: 'tw_email_subscribe',
          email: email.value
        },
        beforeSend: function beforeSend() {
          button.textContent = 'Sending...';
        },
        success: function success() {
          button.textContent = 'Subscribe';
          email.value = '';
          $('[data-confirmation-message]').show();
        }
      });
    }
  });
  $('[data-chat]').on('click', function (e) {
    e.preventDefault(); // window.Chatra('openChat', true);

    FreshworksWidget('open');
  });
  $('[data-tw-toggle="search-box"]').on('click', function () {
    var $searchBox = $('.tw-search-box');

    if (!$searchBox.hasClass('show')) {
      $searchBox.addClass('show');
      $searchBox.find('input').focus();
    } else {
      $searchBox.removeClass('show');
    }
  });
  $(document).on('woof_ajax_done', function () {
    $('html, body').scrollTop(0);
    showPremiumProducts('filter_output');
  });
  $(document).on('click', '[data-filter-key]', function (e) {
    var el = $(e.currentTarget);
    var key = el.data('filter-key');

    if (el.hasClass('active')) {
      key = 0;
      delete woof_current_values['pa_price'];
      el.removeClass('active');
    } else {
      $('[data-filter-key]').removeClass('active');
      el.addClass('active');
      woof_current_values['pa_price'] = key;
    }

    woof_radio_direct_search(29, 'pa_price', key);
  });
  var $review = $('[data-tab-target]');
  $review.click(function (e) {
    var $this = $(e.currentTarget);
    var $reviewTab = $($this.data('tab-target'));
    $reviewTab.trigger('click');
  });

  var showPremiumProducts = function showPremiumProducts(id) {
    var url = new URL(window.location.href);
    var price = url.searchParams.get('pa_price');
    var currTax = url.searchParams.get('really_curr_tax');

    if (!!$("[data-pro-products]").length && price !== 'pro' && currTax !== '39-pa_price') {
      $.ajax({
        data: {
          action: 'get_premium_products',
          category: $("[data-pro-products]").data('pro-products'),
          framework: $("[data-pro-products]").data('framework')
        },
        type: 'post',
        url: admin_url.ajax_url,
        success: function success(data) {
          var arr = [5, 29, 47];
          arr.forEach(function (item) {
            $("#".concat(id, " .col-6")).eq(item).after(data);
          });
        }
      });
    }
  }; // $(document).on('click', '[data-starfish-add]', () => {
  //   gtag('event', 'Starfish VPN', {
  //     'event_label' : 'Starfish add click count',
  //   });
  // })


  $(document).on('click', '[data-external-title]', function (e) {
    var el = $(e.currentTarget);
    var title = el.data('external-title');
    window.dataLayer.push({
      event: 'external_product_click',
      'external_product_title': title
    });
  });
  $(document).on('change', '.variations_form.cart [name="attribute_pa_license"]', function (e) {
    var el = $(e.currentTarget);
    var id = el.data('variation-id');
    var form = el.closest('.variations_form.cart');
    var variations = form.data('product_variations');
    var currentVariation = variations.find(function (v) {
      return v.variation_id === id;
    });
    var productData = JSON.parse(form.find('[name="gtm4wp_product_data"]').val());
    var input = form.find('[name="product_item_variation"]');
    productData.item_variant = currentVariation.attributes.attribute_pa_license;
    productData.price = currentVariation.display_price;
    input.val(JSON.stringify(productData)); // gtm4wp_push_ecommerce('add_to_cart', [productData]);
  });
  $('.single_add_to_cart_button').click(function () {
    var productData = JSON.parse($('[name="product_item_variation"]').val());
    gtm4wp_push_ecommerce('add_to_cart', [productData]);
  });
  showPremiumProducts('output_filter');
})(jQuery);

/***/ }),

/***/ "./resources/assets/scripts/dropdown-on-hover.js":
/*!*******************************************************!*\
  !*** ./resources/assets/scripts/dropdown-on-hover.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");


var dropdownOnHover = function dropdownOnHover() {
  var dropdowns = document.querySelectorAll('[data-top-nav-dropdowns] .dropdown');
  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;
    var dropdownItem = new bootstrap__WEBPACK_IMPORTED_MODULE_0__["Dropdown"](toggle);
    var instance = bootstrap__WEBPACK_IMPORTED_MODULE_0__["Dropdown"].getInstance(toggle);
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth <= 992) return;
      instance.show();
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth <= 992) return;
      instance.hide();
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (dropdownOnHover);

/***/ }),

/***/ "./resources/assets/scripts/lottie.js":
/*!********************************************!*\
  !*** ./resources/assets/scripts/lottie.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var lottieInit = function lottieInit() {
  var lotties = document.querySelectorAll('.lottie');

  if (lotties.length) {
    lotties.forEach(function (item) {
      var finalOptions = {
        container: item,
        path: JSON.parse(item.dataset.options).path,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: 'Hello World'
      };
      window.bodymovin.loadAnimation(finalOptions);
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (lottieInit);

/***/ }),

/***/ "./resources/assets/scripts/navbar-secondary.js":
/*!******************************************************!*\
  !*** ./resources/assets/scripts/navbar-secondary.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var navbarSecondaryInit = function navbarSecondaryInit() {
  var Selector = {
    NAV_ITEM: '[data-nav-item]',
    NAVBAR: '[data-navbar]',
    DROPDOWN: '[data-more-item]',
    CATEGORY_LIST: '[data-category-list]'
  };
  var navbarEl = document.querySelector(Selector.NAVBAR);

  var getDropdownWidth = function getDropdownWidth(dropdown) {
    dropdown.style.display = 'block';
    var width = dropdown.clientWidth;
    dropdown.style.display = 'none';
    return width;
  };

  var navbar = function navbar() {
    var navbarWidth = navbarEl.clientWidth;
    var dropdown = navbarEl.querySelector(Selector.DROPDOWN);
    var dropdownWidth = getDropdownWidth(dropdown);
    var navbarContainerWidth = navbarWidth;
    var elements = navbarEl.querySelectorAll(Selector.NAV_ITEM);
    var totalItemsWidth = 0;
    dropdown.style.display = 'none';
    elements.forEach(function (item) {
      var itemWidth = item.clientWidth + 4;
      totalItemsWidth = totalItemsWidth + itemWidth;

      if (!item.classList.contains('dropdown')) {
        item.classList.remove('invisible');
      }

      if (totalItemsWidth + dropdownWidth > navbarContainerWidth && !item.classList.contains('dropdown')) {
        dropdown.style.display = 'block';
        item.style.display = 'none';
        var link = item.firstElementChild;
        var linkItem = link.cloneNode(true);
        navbarEl.querySelector('.category-list').appendChild(linkItem);
      }
    });
    var dropdownMenu = navbarEl.querySelectorAll('.dropdown-menu .nav-link');
    dropdownMenu.forEach(function (item) {
      item.classList.remove('nav-link');
      item.classList.add('dropdown-item');
    });
  };

  var hideDropdown = function hideDropdown() {
    var dropdownItems = navbarEl.querySelectorAll('.dropdown-item');
    var navbarEle = navbarEl.querySelector('.dropdown');

    if (dropdownItems.length <= 0) {// navbarEle.style.display = 'none';
    }
  };

  if (navbarEl) {
    window.addEventListener('load', function () {
      document.querySelector('.nav-wrapper .skeleton').remove(); // document.querySelector('.navbar-secondary .nav-last-item').classList.remove('invisible');

      navbar(); // hideDropdown();
    });
    window.addEventListener('resize', function () {
      var navElements = navbarEl.querySelectorAll(Selector.NAV_ITEM);
      var dropElements = navbarEl.querySelectorAll(Selector.CATEGORY_LIST);
      navElements.forEach(function (item) {
        return item.removeAttribute('style');
      });
      dropElements.forEach(function (item) {
        return item.innerHTML = '';
      });
      navbar(); // hideDropdown();
    });
    var navbarLinks = navbarEl.querySelectorAll('.nav-link');
    navbarEl.addEventListener('click', function (e) {
      for (var x = 0; x < navbarLinks.length; x++) {
        navbarLinks[x].classList.remove('active');
      }

      if (e.target.closest('li')) {
        e.target.closest('li').classList.add('active');
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (navbarSecondaryInit);

/***/ }),

/***/ "./resources/assets/scripts/popover.js":
/*!*********************************************!*\
  !*** ./resources/assets/scripts/popover.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* -------------------------------------------------------------------------- */

/*                                   Popover                                  */

/* -------------------------------------------------------------------------- */


var popoverInit = function popoverInit() {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap__WEBPACK_IMPORTED_MODULE_0__["Popover"](popoverTriggerEl);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (popoverInit);

/***/ }),

/***/ "./resources/assets/scripts/promobar.js":
/*!**********************************************!*\
  !*** ./resources/assets/scripts/promobar.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var promobarInit = function promobarInit() {
  var promobar = document.querySelector("[data-promobar-group]");
  if (!promobar) return;

  var getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getPromobarContent = function getPromobarContent(_ref) {
    var product = _ref.product,
        favicon = _ref.favicon,
        text = _ref.text,
        cta = _ref.cta;
    var imageSize = (product === null || product === void 0 ? void 0 : product.toLowerCase()) === "hummingbird" ? 23 : 20;
    return "\n        <div class=\"container px-0\">\n            <p class=\"mb-0\">\n                \n                <img src=".concat(favicon, " alt='").concat(product, "' width=\"").concat(imageSize, "\" height=\"").concat(imageSize, "\" class=\"me-1\">\n                <span class=\"align-middle\">").concat(text, "</span>\n                \n                <span class=\"btn btn-outline-success rounded-pill btn-sm ms-3 d-flex align-items-center d-inline-flex\">\n                    ").concat(cta, "\n                    <span class=\"fas fa-arrow-right ms-1\"></span>\n                </span>\n\n            </p>\n        </div>\n    ");
  };

  var messages = [{
    group: "A",
    product: "Hummingbird",
    favicon: "/wp-content/themes/themewagon/dist/images/favicon-hummingbird.png",
    text: "Don't start working with Tailwind without this framework.",
    cta: "Explore Hummingbird",
    url: "https://hbui.dev/?utm_source=themewagon&utm_medium=referral&utm_campaign=tw_promobar&utm_content=hummingbird"
  }, {
    group: "B",
    product: "OneSuite",
    favicon: "/wp-content/themes/themewagon/dist/images/favicon-onesuite.png",
    text: "OneSuite - Manage clients, projects, and billing in one portal",
    cta: "Explore Now",
    url: "https://onesuite.io/?utm_source=themewagon&utm_medium=referral&utm_campaign=tw_promobar&utm_content=onesuite"
  }, {
    group: "C",
    product: "MailBluster",
    favicon: "/wp-content/themes/themewagon/dist/images/favicon-mailbluster.png",
    text: "Take control of your email marketing with Mailbluster.",
    cta: "Explore Now",
    url: "https://mailbluster.com/?utm_source=themewagon&utm_medium=referral&utm_campaign=tw_promobar&utm_content=mailbluster"
  }];
  window.addEventListener('load', function () {
    var randomIndex = getRandomInt(0, messages.length - 1);
    var currentPromo = messages[randomIndex];
    var promobarContent = getPromobarContent(currentPromo);
    promobar.innerHTML = promobarContent;
    promobar.href = currentPromo.url;
    promobar.dataset.promobarGroup = currentPromo.group;
  });
};

/* harmony default export */ __webpack_exports__["default"] = (promobarInit);

/***/ }),

/***/ "./resources/assets/scripts/tab.js":
/*!*****************************************!*\
  !*** ./resources/assets/scripts/tab.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* -------------------------------------------------------------------------- */

/*                                   Popover                                  */

/* -------------------------------------------------------------------------- */


var tabInit = function tabInit() {
  var btnReview = document.querySelector('[data-review-trigger]');

  if (btnReview) {
    btnReview.addEventListener('click', function () {
      var triggerEl = document.querySelector('.review-tab a[href="#tab-reviews"]');
      var tab = new bootstrap__WEBPACK_IMPORTED_MODULE_0__["Tab"](triggerEl);
      tab.show();
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (tabInit);

/***/ }),

/***/ "./resources/assets/scripts/toast.js":
/*!*******************************************!*\
  !*** ./resources/assets/scripts/toast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");


var toastInit = function toastInit() {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'));
  toastElList.map(function (toastEl) {
    return new bootstrap__WEBPACK_IMPORTED_MODULE_0__["Toast"](toastEl);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (toastInit);

/***/ }),

/***/ "./resources/assets/scripts/tooltip.js":
/*!*********************************************!*\
  !*** ./resources/assets/scripts/tooltip.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");


var tooltipInit = function tooltipInit() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap__WEBPACK_IMPORTED_MODULE_0__["Tooltip"](tooltipTriggerEl);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (tooltipInit);

/***/ }),

/***/ "./resources/assets/styles/app.scss":
/*!******************************************!*\
  !*** ./resources/assets/styles/app.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/styles/editor.scss":
/*!*********************************************!*\
  !*** ./resources/assets/styles/editor.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!************************************************************************************************************************!*\
  !*** multi ./resources/assets/scripts/app.js ./resources/assets/styles/app.scss ./resources/assets/styles/editor.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/XAMPP/xamppfiles/htdocs/themewagon/wp-content/themes/themewagon/resources/assets/scripts/app.js */"./resources/assets/scripts/app.js");
__webpack_require__(/*! /Applications/XAMPP/xamppfiles/htdocs/themewagon/wp-content/themes/themewagon/resources/assets/styles/app.scss */"./resources/assets/styles/app.scss");
module.exports = __webpack_require__(/*! /Applications/XAMPP/xamppfiles/htdocs/themewagon/wp-content/themes/themewagon/resources/assets/styles/editor.scss */"./resources/assets/styles/editor.scss");


/***/ })

},[[0,"/scripts/manifest","/scripts/vendor"]]]);
//# sourceMappingURL=app.js.map