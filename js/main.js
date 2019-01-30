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
	function navOptionHide(){
		$('.background-option').hide();
		$('.nav-option').removeClass('active');
	};
	function navOption(){
		$('.wrapper').append("<div class='background-option'></div>");
		var bgOption = $(".background-option");
		$('.nav-option').addClass('active');
		bgOption.click(function(event){
			if (event.target) {
				navOptionHide()
			}
		});

		$('.nav-option .hide').click(function(){
			navOptionHide()
		});
	}

	$('.nav-service li .btn, .btn-menu').click(function(){
		navOption();
	});
	
	//
	//key search
	//
	//
	var loaderSelect = [
		'<div class="loader-select"><div class="item"></div><div class="item"></div><div class="item"></div><div class="item"></div></div>'
	];

	$('.key-search').focus(function(){
		$('.nav-select').addClass("active");
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
		$(".nav-select").removeClass("active");
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
	// $(".btn-product").click(function(){
	// 	$(this).addClass("active");
	// 	$(".nav-select").addClass("active");
	// 	navOptionHide();
	// });

	$("[data-out]").click(function(){
		$("[data-out]").removeClass("active");
		$(this).addClass("active");

		let out = $(this).attr("data-out");
		$("[data-option='"+ out +"']").addClass("active");
		navOptionHide();
	})
});
