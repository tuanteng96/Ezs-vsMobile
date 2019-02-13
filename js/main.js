$(document).ready(function(){
	$('.menu-icon-toggle').on('click', function(e) {
		$('.menu-nav-full').toggleClass('active');
		e.preventDefault();
		e.stopPropagation();
	});

	// menu sidebar 
	
	$('.navTrigger').click(function() {
		$('.main').toggleClass('scaled');
		$('body').toggleClass('opacity-active');
	}); 

	// Select cate
	
	$('.SelectCate').mobileSelect({
		buttonSave: 'Tìm kiếm',
		buttonCancel: 'Đóng',
		animation: 'scale',
		animationSpeed: 400
	});

	$('.listCate').mobileSelect({
		buttonSave: 'Chọn',
		buttonCancel: 'Đóng',
		buttonClear: 'Chọn lại',
		animation: 'scale',
		animationSpeed: 400,
		onOpen: function(){
			$('.mobileSelect-gen .text').text("0 Danh mục");
		}
	});

	// Upload file image
	
	$('.fileImage').change(function(){
		$('.fileUp-image label').text($(this).val());
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				selectedImage = e.target.result;
				$('.showUpload').css('display','block').find('img').attr('src', selectedImage);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});

	// datetime
	// 
	$('#datetimebegin, #datetimefinish').datetimepicker({
		datepicker: { showOtherMonths: true },
		modal: true,
		footer: true
	});

	//
	//
	$('.nav-service').children().each(function(){
		var ulSub = $(this).find("ul").length;
		if(!ulSub == 0) {
			$(this).addClass("active");
		}
		$(this).find('.service-all').click(function(){
			$(this).parents().toggleClass('show');
		});
	});

	// nav option
	// 
	// function navOptionHide(){
	// 	$('.background-option').hide();
	// 	$('.nav-option').removeClass('active');
	// };
	// function navOption(){
	// 	$('.wrapper').append("<div class='background-option'></div>");
	// 	var bgOption = $(".background-option");
	// 	$('.nav-option').addClass('active');
	// 	bgOption.click(function(event){
	// 		if (event.target) {
	// 			navOptionHide()
	// 		}
	// 	});

	// 	$('.nav-option .hide').click(function(){
	// 		navOptionHide()
	// 	});
	// }

	// $('.btn-menu').click(function(){
	// 	navOption();
	// });
	
	//
	//key search
	//
	//
	var loaderSelect = [
		'<div class="loader-select"><div class="item"></div><div class="item"></div><div class="item"></div><div class="item"></div></div>'
	];

	$('.key-search').focus(function(){
		$('.nav-select').addClass("active-is");
		$('.input-filter').focus();
	});

	$('.input-filter').keyup(function(){
		$(".nav-select .nav-product").hide();
		$(".loader-select").remove();
		$(".nav-select").append(loaderSelect);
		setTimeout(function(){
			$(".loader-select").remove();
			$(".nav-select .nav-product").show().removeClass("d-none");
		}, 1000);
	});
	$(".nav-select .hide").click(function(){
		$(".nav-select").removeClass("active-is");
	});
	
	// pos search
	// 
	
	$(".pos-app .nav-product").hide();

	$('.key-pos').keyup(function(){
		$(".pos-app .nav-product").hide();
		$(".loader-select").remove();
		$(".pos-app").append(loaderSelect);
		setTimeout(function(){
			$(".loader-select").remove();
			$(".pos-app .nav-product").show();
		}, 1000);
	});

	$('.pos-app .nav-product').click(function(){
		navOption();
	});

	// List select Post
	// 
	// Create Background Option
	$('.wrapper').append("<div class='background-option'></div>");
	var bgOption = $(".background-option");
	bgOption.hide();

	// Data-out click
	$("[data-out]").click(function(){
		// This addClass Active
		$("[data-out]").removeClass("active");
		$(this).addClass("active");

		// Check active to ID
		// 
		let out = $(this).attr("data-out");
		$('.nav-option').removeClass('active-is');
		$("#"+out).addClass("active-is");

		// Check active to ID
		// 
		if($("#"+out).hasClass("active-is")){
			bgOption.show();
		}
		else {
			bgOption.hide();
		}
	});

	// bgOption Target hide
	bgOption.click(function(event){
		if (event.target) {
			$(".modalTabs").removeClass("active-is");
			bgOption.hide();
		}
	});

	// hide modalTabs
	//
	$(".modalTabs > .hide").click(function(){
		$(this).parents().removeClass("active-is");
		bgOption.hide();
	})

});


// button active 
// 
(function (window, $) {
  
  $(function() {
    
    
    $('.btn').on('click', function (event) {
      event.preventDefault();
      
      var $div = $('<div/>'),
          btnOffset = $(this).offset(),
      		xPos = event.pageX - btnOffset.left,
      		yPos = event.pageY - btnOffset.top;
      

      
      $div.addClass('ripple-effect');
      var $ripple = $(".ripple-effect");
      
      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
        .css({
          top: yPos - ($ripple.height()/2),
          left: xPos - ($ripple.width()/2),
          background: $(this).data("ripple-color")
        }) 
        .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 2000);
    });
    
  });
  
})(window, jQuery);