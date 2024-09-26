$(document).ready(function() {
    // 手機版 search btn switch
    $('.mobileSearchBtn').click(function() {
        if ($('.mobileShow').hasClass('act')) {
            $('.mobileShow').removeClass('act').fadeOut();
        } else {
            $('.mobileShow').addClass('act').fadeIn();
        }
    });
    // 寬度異動時，移除.act
    $(window).resize(function() {
        if ($(window).width() > 991) {
            $('.mobileShow').removeClass('act').hide();
        }
    });

    function checkHeight() {
        if ($('.mask p').height() < 400) {
            $('.mask button.btn').hide();
            $('.mask:after').hide();  // 請注意這裡 :after 需要特別處理
        } else {
            $('.mask button.btn').show();
            $('.mask:after').show();  // 同上
        }
    }
    // 初次檢查
    checkHeight();
    // 當窗口大小變化時重新檢查
    $(window).resize(function() {
        checkHeight();
    });

    // 內容摘要 閱讀全文 btn
    $('.mask .btn').click(function() {
        var $mask = $('.mask');
        var $btn = $(this);
        if ($mask.hasClass('_show')) {
            $mask.removeClass('_show');
            $btn.text('閱讀全文');
        } else {
            $mask.addClass('_show');
            $btn.text('顯示較少內容');
        }
    });

    // 社群icon 分享
    $('.function .share').on('click', function() {
        if (!$(this).hasClass('act')) {
            $(this).addClass('act');
            $(this).siblings('.socialMedia').addClass('Show');
        } else {
            $(this).removeClass('act');
            $(this).siblings('.socialMedia').removeClass('Show');
        }
    });

    /*-----------------------------------*/
    /////////// 無障礙快捷鍵盤組合  //////////
    /*-----------------------------------*/
    $(document).on('keydown', function (e) {
        // alt+S 查詢
        if (e.altKey && e.keyCode == 83) {
        $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
        $('.search').find('input[type="text"]').focus();
        }
        // alt+U header
        if (e.altKey && e.keyCode == 85) {
        $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
        $('header').find('.accesskey').focus();
        }
        // alt+C 主要內容區
        if (e.altKey && e.keyCode == 67) {
        $('html, body')
            .stop(true, true)
            .animate({ scrollTop: $('.main').find('.accesskey').offset().top - 70 }, 800, 'easeOutExpo');
        $('.main').find('.accesskey').focus();
        }
        // alt+Z footer
        if (e.altKey && e.keyCode == 90) {
        $('html, body')
            .stop(true, true)
            .animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
        $('footer').find('.accesskey').focus();
        }

        if (e.key == 'Escape') {
        $('.language ul').slideUp();
        $('.language > a').blur();
        $('.menu ul li ul').hide();
        $('.menuArrowDown, .menuArrowUp').remove();
        }
    });

    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn(200);
    } else {
        $('.scrollToTop').fadeOut(200);
    }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop')
        .off()
        .on('click', function (e) {
            $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
            // $('a.goCenter').focus(); //加入這行
            e.preventDefault();
        });
        $('.scrollToTop').keydown(function (e) {
        $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
        $('body').find('a.goCenter').focus();
        e.preventDefault();
    });
});
