/*Navbar scrolling and changing opacity*/

jQuery(window).scroll(function(){

    var $sections = $('section');
    $sections.each(function(i,el){
        var top  = $(el).offset().top - 100;
        var bottom = top +$(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');
        if( scroll > top && scroll < bottom){

            $('a.active').removeClass('active');
            $('a[href*="#'+id+'"]').addClass('active');
        }
        var $second = $('section:eq(1)');
        var elTop = $second.offset().top;


        if( scroll > elTop) {
            $('.navbar').css({"background-color": "rgb(45, 44, 42)", "opacity": "1"});
        }

        else if( scroll < $(document).height()) {
            $('.navbar').css("background-color", "rgb(45, 44, 42)");
        }

    });




});


$("#menu").on("click",'a[href^="#"]', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;

    $('body,html').animate({scrollTop: top - 80}, 1000);

});
$("#menu-dark").on("click",'a[href^="index-dark.html"]', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href').replace("index-dark.html", ""),
        top = $(id).offset().top;
    console.log(id);
    $('body,html').animate({scrollTop: top - 80}, 1000);

});

$("#scroll").on("click",'a', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top - 80}, 1000);

});

/*Collapsing navbar on click on any space on the page*/
$(document).on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

/*Main page second carousel slider fix*/
$("#carousel-example-clients").on("click", 'li', function () {
    $('li.active').removeClass('active');
    $(this).addClass('active');

});


/*CALENDAR*/

// Скрипт календарика с возможностью выбора даты
calendar = {};

// Названия месяцев
calendar.monthName=[
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
    'MAY', 'JUNE', 'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

// Названия дней недели
calendar.dayName=[
    'M', 'T', 'W', 'T', 'F', 'S', 'S'
];

// Выбранная дата
calendar.selectedDate = {
    'Day' : null,
    'Month' : null,
    'Year' : null
};

// ID элемента для размещения календарика
calendar.element_id=null;

// Выбор даты
calendar.selectDate = function(day,month,year) {
    calendar.selectedDate={
        'Day' : day,
        'Month' : month,
        'Year' : year
    };
    calendar.drawCalendar(month,year);
};

// Отрисовка календарика на выбранный месяц и год
calendar.drawCalendar = function(month,year) {
    var tmp='';
    tmp+='<table class="table calendar table-responsive table-condensed" cellspacing="0" cellpadding="0">';

    // Месяц и навигация
    tmp+='<tr>';

    tmp+='<td colspan="7" class="navigation" '+
        'onclick="calendar.drawCalendar('+
        calendar.selectedDate.Month+','+
        calendar.selectedDate.Year+');">'+
        calendar.monthName[(month-1)]+'&nbsp;&nbsp;'+year+'<\/td>';

    tmp+='<\/tr>';

    // Шапка таблицы с днями недели

    tmp+='<td class="navigation" '+
        'onclick="calendar.drawCalendar('+(month>1?(month-1):12)+
        ','+(month>1?year:(year-1))+');"><a><i class="fa fa-angle-left" aria-hidden="true"></i></a><\/td>';
    tmp+='<td class="navigation" '+
        'onclick="calendar.drawCalendar('+(month<12?(month+1):1)+
        ','+(month<12?year:(year+1))+');"><a><i class="fa fa-angle-right" aria-hidden="true"></i></a><\/td>';

    tmp+='<tr>';
    tmp+='<th>'+calendar.dayName[0]+'<\/th>';
    tmp+='<th>'+calendar.dayName[1]+'<\/th>';
    tmp+='<th>'+calendar.dayName[2]+'<\/th>';
    tmp+='<th>'+calendar.dayName[3]+'<\/th>';
    tmp+='<th>'+calendar.dayName[4]+'<\/th>';
    tmp+='<th>'+calendar.dayName[5]+'<\/th>';
    tmp+='<th>'+calendar.dayName[6]+'<\/th>';
    tmp+='<\/tr>';

    // Количество дней в месяце
    var total_days = 32 - new Date(year, (month-1), 32).getDate();
    // Начальный день месяца
    var start_day = new Date(year, (month-1), 1).getDay();
    if (start_day==0) { start_day=7; }
    start_day--;
    // Количество ячеек в таблице
    var final_index=Math.ceil((total_days+start_day)/7)*7;

    var day=1;
    var index=0;
    do {
        // Начало строки таблицы
        if (index%7==0) {
            tmp+='<tr>';
        }
        // Пустые ячейки до начала месяца или после окончания
        if ((index<start_day) || (index>=(total_days+start_day))) {
            tmp+='<td class="grayed"><\/td>';
        }
        else {
            var class_name='';
            // Выбранный день
            if (calendar.selectedDate.Day==day &&
                calendar.selectedDate.Month==month &&
                calendar.selectedDate.Year==year) {
                class_name='selected';
            }
            // Ячейка с датой
            tmp+='<td class="'+class_name+'" '+
                'onclick="calendar.selectDate('+
                day+','+month+','+year+');">'+day+'<\/td>';
            day++;
        }
        // Конец строки таблицы
        if (index%7==6) {
            tmp+='<\/tr>';
        }
        index++;
    }
    while (index<final_index);

    tmp+='<\/table>';

    // Вставить таблицу календарика на страницу
    var el=document.getElementById(calendar.element_id);
    if (el) {
        el.innerHTML=tmp;
    }
};
// ID элемента для размещения календарика
calendar.element_id = 'calendar_table';

// По умолчанию используется текущая дата
calendar.selectedDate={
    'Day' : new Date().getDate(),
    'Month' : parseInt(new Date().getMonth())+1,
    'Year' : new Date().getFullYear()
};

// Нарисовать календарик
calendar.drawCalendar(
    calendar.selectedDate.Month,
    calendar.selectedDate.Year
);

/*Bootstrap Off-canvas*/

$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active')
    });

});



$(document).ready(function($) {
    $('audio').mediaelementplayer({audioWidth: 770, audioHeight: 50, success: function(me) {  $('#audio-type').html( me.pluginType); }});

});

/*Media query fixes*/

var current_width = $(window).width();

if(current_width <= 480){
    $('.about-didi img').addClass('img-responsive');
    $('.blog-left').removeClass('col-xs-2').css('float', 'left');
    $('.blog-standart').removeClass('col-xs-7');
    $('.blog-right').removeClass('col-xs-7');
}
else {
    $('.about-didi img').removeClass('img-responsive');
    $('.blog-left').addClass('col-xs-2');
    $('.blog-standart').addClass('col-xs-7');
    $('.blog-right').addClass('col-xs-7');
}


$(window).resize(function() {
    var current_width = $(window).width();

    if (current_width <= 480) {
        $('.about-didi img').addClass('img-responsive');
        $('.blog-left').removeClass('col-xs-2').css('float', 'left');
        $('.blog-standart').removeClass('col-xs-7');
        $('.blog-right').removeClass('col-xs-7');
    }
    else {
        $('.about-didi img').removeClass('img-responsive');
        $('.blog-left').addClass('col-xs-2');
        $('.blog-standart').addClass('col-xs-7');
        $('.blog-right').addClass('col-xs-7');
    }
});



/*button toggling off-canvas panel*/
$('.arrow-btn').click(function() {
    $("i", this).toggleClass("fa-angle-right fa-angle-left");
});

/*SWIPER*/

$(function() {
    var swiper1 = new Swiper('.s1', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        slidesPerGroup: 3,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true,

        // Responsive breakpoints
        breakpoints: {
            // when window width is <= 320px
            320: {
                slidesPerView: 1,
                spaceBetweenSlides: 10
            },
            // when window width is <= 480px
            480: {
                slidesPerView: 1,
                spaceBetweenSlides: 20
            },
            // when window width is <= 640px
            640: {
                slidesPerView: 1,
                spaceBetweenSlides: 30
            }
        }
    });

    var swiper2 = new Swiper('.s2', {
        pagination: '.modal .swiper-pagination',
        nextButton: '.modal .swiper-button-next',
        prevButton: '.modal .swiper-button-prev',
        direction: 'horizontal',
        slidesPerView: 1,
        slidesPerGroup: 1,
        paginationClickable: true,
        // spaceBetween: 30,
        loop: true

    });

    var swiper3 = new Swiper('.s3', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        direction: 'horizontal',
        slidesPerView: 1,
        slidesPerGroup: 1,
        paginationClickable: true,
        // spaceBetween: 30,
        loop: true

    });
});

$(document).on('hidden.bs.modal', function (event) {
    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
});





       
