// 亂數數字
function randomFloor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 亂數英文字
function randomLetter(max) {
  let text = '';
  let letter = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < max; i++) text += letter.charAt(Math.floor(Math.random() * letter.length));
  return text;
}
//
$(function () {
  document.createElement('picture');
  /*-----------------------------------*/
  ///////////////// 變數 ////////////////
  /*-----------------------------------*/
  var _window = $(window),
    ww = _window.outerWidth(),
    wh = _window.height(),
    _body = $('body'),
    wwNormal = 1400,
    wwMedium = 992,
    wwSmall = 768,
    wwxs = 576;
  /*-----------------------------------*/
  //////////// nojs 先移除////////////////
  /*-----------------------------------*/
  $('html').removeClass('no-js');
  /*-----------------------------------*/
  /////// header選單 判斷是否有下一層////////
  /*-----------------------------------*/
  let _menu = $('.menu');
  let _megamenu = $('.megamenu');

  _menu.find('li').has('ul').addClass('hasChild');
  _megamenu.find('li').has('ul').addClass('hasChild');

  let liHasChild = _menu.find('li.hasChild');
  let liHasChild2 = _megamenu.children('ul').children('li.hasChild');
  /*-----------------------------------*/
  ////////////// 行動版選單切換////////////
  /*-----------------------------------*/
  _body.prepend('<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>');

  $('header .container').prepend('<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>');

  let menu_status = false;
  let _sidebar = $('.sidebar');
  let _search = $('.search');
  let _nav = $('.navigation');
  let _sidebarClose = $('.sidebarClose');
  let _sidebarCtrl = $('.sidebarCtrl');
  let _overlay = $('.menu_overlay');
  let _mArea = $('.m_area');

  _sidebarCtrl.append('<span></span><span></span><span></span>');
  // -------------------------------------------- 打開選單 function
  function showSidebar() {
    _sidebar.show();
    _mArea.show().addClass('open');
    _mArea.animate({ 'margin-left': 0 }, 400, 'easeOutQuint');
    _body.addClass('noscroll');
    _overlay.fadeIn();
    $('.m_search').hide();
    search_mode = false;
  }
  // -------------------------------------------- 縮合選單 function
  function hideSidebar() {
    _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function () {
      _sidebar.fadeOut(200);
      _mArea.removeClass('open');
      _mArea.hide();
    });
    _body.removeClass('noscroll');
    _overlay.fadeOut(200);
    liHasChild.children('ul').hide();
  }
  // -------------------------------------------- 打開選單動作
  _sidebarCtrl.off().on('click', function (e) {
    e.preventDefault();
    showSidebar();
  });
  // -------------------------------------------- overlay關閉選單
  _overlay.off().on('click', function () {
    hideSidebar();
  });
  _sidebarClose.off().on('click', function () {
    hideSidebar();
  });

  // -------------------------------------------- 無障礙tab設定
  // -------------------------------------------- menu
  liHasChild.children('a').keyup(function (e) {
    if (e.which === 9 && !e.shiftKey) {
      $(this).siblings('ul').fadeIn();

      // let hasChildLi = $(this).parents('.hasChild');
      let hasChildLi = $(this).parents('.hasChild').last();
      let allUl = $(this).parent('li').find('ul').last().parents('ul');
      let checkUlWidth = allUl.eq(allUl.length - 2).width() * $(this).parent('li').find('ul').last().parents('ul').length;
      if (_window.width() < allUl.eq(allUl.length - 2).offset().left + checkUlWidth) {
        hasChildLi?.last().addClass('leftSlider');
      } else {
        hasChildLi?.last().removeClass('leftSlider');
      }
    }
  });

  liHasChild.each(function (i, s) {
    $(s)
      .find('a')
      .last()
      .keydown(function (e) {
        if (e.which === 9 && !e.shiftKey) {
          $(s).children('ul').hide().removeAttr('style');
        }
      });
    $(s)
      .children('ul')
      .find('a')
      .focus(function () {
        if (!isObjectFullyVisible(this)) {
          let ele = parseFloat($(this).parents('ul').eq(0).css('top')) || 0;
          $(this)
            .parents('ul')
            .eq(0)
            .css('top', `${ele - 40}px`);
        }
      });
  });

  liHasChild.each(function (i, s) {
    $(s)
      .children('ul')
      .find('a')
      .eq(0)
      .keydown(function (e) {
        if (e.which === 9 && e.shiftKey) {
          $(s).children('ul').removeAttr('style').hide();
        }
      });
  });
  // _menu.find('ul li:fist>a').focusout(function () {
  // console.log('a');
  // if (e.which === 9 && e.shiftKey) {
  //   _menu.find('li ul').hide();
  // }
  // });

  // megamenu
  liHasChild2.children('a').keyup(function () {
    $(this).siblings('ul').fadeIn();
    $(this).siblings('ul').find('ul').fadeIn();
    $(this)
      .parent('li')
      .siblings()
      .focus(function () {
        $(this).hide();
      });
  });
  _megamenu
    .children('ul')
    .children('li')
    .keyup(function () {
      $(this).siblings().children('ul').hide();
    });
  _megamenu.find('li:last>a').focusout(function () {
    _menu.find('li ul').hide();
  });

  // 先複製過去
  _nav.clone().prependTo(_mArea);
  _menu.clone().prependTo(_mArea);
  _megamenu.clone().prependTo(_mArea);
  _search.clone().prependTo(_body).removeClass('search').addClass('m_search');

  // 切換PC/Mobile 選單
  function checkMenuMode() {
    if (ww < wwSmall) {
      /*-----------------------------------*/
      /////////////// 手機版設定 /////////////
      /*-----------------------------------*/
      menu_status = false;
      _sidebar.hide();
      _overlay.hide();
      _mArea.css({
        'margin-left': _mArea.width() * -1 + 'px',
      });
    } else {
      hideSidebar();
      _body.removeClass('noscroll');
      $('.m_search').hide();
      search_mode = false;
      $('.language').find('ul').hide();
    }
  }
  function mobileMenu() {
    //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
    $('.sidebar .menu li a')
      .off()
      .on('click', function (e) {
        if (ww < wwSmall) {
          if ($(this).parent().hasClass('hasChild')) {
            e.preventDefault();
          }
          $(this).siblings('ul').slideToggle('fast');
          $(this).parent().siblings('li').find('ul').slideUp('fast');
        } else {
          $('.sidebar .menu li a').off('click');
        }
      });

    liHasChild.off().on({
      mouseenter: function (e) {
        if (ww > wwSmall) {
          let _this = $(this);
          let ulHeight = $(this).children('ul').height();
          let ulWidth = $(this).children('ul').width();

          $(this).children('ul').stop(true, false).fadeIn();
          $(this).addClass('active');
          let hasChildLi = $(this).parents('.hasChild').last();
          let allUl = $(this).find('ul').last().parents('ul');
          let checkUlWidth = allUl.eq(allUl.length - 2).width() * $(this).find('ul').last().parents('ul').length;
          if (_window.width() < allUl.eq(allUl.length - 2).offset().left + checkUlWidth) {
            hasChildLi?.last().addClass('leftSlider');
          } else {
            hasChildLi?.last().removeClass('leftSlider');
          }

          setTimeout(function () {
            let objectRect = _this.find('ul')[0].getBoundingClientRect();
            if (ulHeight + objectRect.top > _window.height() && !isObjectFullyVisible(_this.children('ul'))) {
              _this.append(`<button class="menuArrowDown" style="left:${objectRect.left + ulWidth - 50}px"></button>`);
              _this.append(`<button class="menuArrowUp" style="left:${objectRect.left + ulWidth - 75}px;opacity:0"></button>`);
              let sliderHeight = 40;

              $('.menuArrowDown')
                .off()
                .on('click', function () {
                  const siblingsUl = $(this).siblings('ul');
                  let UlRect = siblingsUl.offset();
                  const topValue = parseInt(siblingsUl.css('top'));
                  const number = topValue || 0;
                  const lastItem = siblingsUl.children('li').last();
                  $(this).siblings('.menuArrowUp').css('opacity', '1');
                  if ($(this).parent().parent().parent().is('.menu')) {
                    let firstHasChildHeight = $(this).parents('.hasChild').offset().top + $(this).parents('.hasChild').height();
                    if (!isObjectVisibleT(lastItem)[0]) {
                      siblingsUl.css('top', `${number - sliderHeight}px`);
                    } else {
                      siblingsUl.css('top', `${$(this).parent('li').height() - (siblingsUl.height() - (_window.height() - firstHasChildHeight))}px`);
                    }
                  } else {
                    if (!isObjectVisibleT(lastItem)[0] && isObjectVisibleB(lastItem)[0]) {
                      siblingsUl.css('top', `${number - sliderHeight}px`);
                    } else {
                      siblingsUl.css('top', `${parseInt(siblingsUl.css('top')) + isObjectVisibleB(lastItem)[1]}px`);
                    }
                  }
                  // siblingsUl.css('top', `${Math.max(leftHeight, number - sliderHeight)}px`);
                });

              $('.menuArrowUp')
                .off()
                .on('click', function () {
                  const siblingsUl = $(this).siblings('ul');
                  const topValue = parseInt(siblingsUl.css('top'));
                  const maxHeight = $('.header .menu > ul').height();
                  if ($(this).parent().parent().parent().is('.menu')) {
                    if (topValue <= -maxHeight) {
                      siblingsUl.css('top', `${topValue + sliderHeight}px`);
                    } else {
                      siblingsUl.css('top', `${maxHeight}px`);
                      upCheck = false;
                    }
                  } else {
                    if (topValue > siblingsUl.height()) {
                      siblingsUl.css('top', `${topValue + sliderHeight}px`);
                    } else {
                      siblingsUl.css('top', '0px');
                      upCheck = false;
                    }
                  }
                });
            }
          }, 200);
        }
      },
      mouseleave: function (e) {
        if (ww > wwSmall) {
          let _this = $(this);
          setTimeout(function () {
            _this.find('.menuArrowDown').remove();
            _this.find('.menuArrowUp').remove();
            // _this.children('ul').removeAttr('style');
            _this.removeClass('active');

            _this.parent().siblings('ul').hide();
            _this.children('ul').stop(true, false).fadeOut(500);
            _this.children('ul').css('top', '');
          }, 200);
        }
      },
    });
    $(window).on('scroll', function () {
      if (ww > wwSmall) {
        $('.header .menu .hasChild.active')
          .find('ul')
          .each(function (i, s) {
            if (isObjectFullyVisible(s)) {
              $(s).siblings('.menuArrowDown').remove();
              $(s).siblings('.menuArrowUp').remove();
            }
          });
      }
    });

    // megamenu
    if (_megamenu.length > 0) {
      $('.megamenu > ul > li > ul').hide();
      liHasChild2.off().on({
        mouseenter: function () {
          if (ww > wwSmall) {
            $(this).children('ul').stop(true, false).fadeIn();
          }
        },
        mouseleave: function () {
          if (ww > wwSmall) {
            $(this).parent().siblings('ul').hide();
            $(this).children('ul').stop(true, false).fadeOut();
          }
        },
      });
    }
    // 如果點在外面
    // $(document).on('touchend click', function(e) {
    //     var target = e.target;
    //     if (!$(target).is('.menu li a')) {
    //         $('.menu').find('li ul').hide();
    //     }
    // });
    // 文字大小
    $('.fontsize_btn').on('click', function () {
      if (ww > wwSmall) {
        if ($('.font_size').is(':visible')) {
          $('.font_size').stop().slideUp();
        } else {
          $('.font_size').stop().slideDown();
        }
      }
    });

    // 會員登入
    $('.memberblock .membername a').on('click', function () {
      if (ww > wwSmall) {
        if ($('.memberlink').is(':visible')) {
          $('.memberlink').stop().slideUp();
        } else {
          $('.memberlink').stop().slideDown();
        }
      }
    });

    $(document).on('touchend click', function (e) {
      if (ww > wwSmall) {
        var container = $('.memberblock .membername, .memberblock .memberlink'); //點這些以外的區塊
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $('.header .memberblock .memberlink').slideUp(); //要被收起來的區塊
        }
        // search
        var container2 = $('.searchblock .search, .searchblock .searchbtn'); //點這些以外的區塊
        if (!container2.is(e.target) && container2.has(e.target).length === 0) {
          $('.searchblock .search').slideUp(); //要被收起來的區塊
        }
        // 文字大小
        var container3 = $('.header .fontsize_btn, .header .font_size'); //點這些以外的區塊
        if (!container3.is(e.target) && container3.has(e.target).length === 0) {
          $('.header .navlist .font_size').slideUp(); //要被收起來的區塊
        }
      }
    });

    $('.searchblock .searchbtn').on('click', function () {
      // $('.searchblock .search').stop().slideToggle();
      if (ww > wwSmall) {
        if ($('.search').is(':visible')) {
          $('.search').stop().slideUp();
        } else {
          $('.search').stop().slideDown();
        }
      }
    });
  }
  //行動版/電腦版切換
  var resizeTimer;
  _window.on('resize', function (event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // search_mode = true;
      $('.m_search').hide();
      checkMenuMode();
    }, 50);
  });
  checkMenuMode();
  mobileMenu();
  function isObjectFullyVisible(object) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let objectRect = $(object)[0]?.getBoundingClientRect();
    let objectLeft = objectRect?.left;
    let objectRight = objectRect?.right;
    let objectTop = objectRect?.top;
    let objectBottom = objectRect?.bottom;
    let isFullyVisible = objectLeft >= 0 && objectRight <= windowWidth && objectTop >= 0 && objectBottom <= windowHeight;
    return isFullyVisible;
  }
  function isObjectVisibleT(object) {
    let windowHeight = window.innerHeight;
    let objectPosition = $(object)[0]?.getBoundingClientRect();
    let objectTop = objectPosition?.top;
    let isFullyVisible = objectTop < windowHeight;
    return [isFullyVisible, objectTop];
  }
  function isObjectVisibleB(object) {
    let windowHeight = window.innerHeight;
    let objectPosition = $(object)[0]?.getBoundingClientRect();
    let objectTop = objectPosition?.top;
    let thisHeight = objectPosition?.height;
    let isFullyVisible = objectTop + thisHeight >= windowHeight;

    return [isFullyVisible, windowHeight - objectTop - thisHeight];
  }

  // search設定
  var search_mode = false;
  var _searchCtrl = $('.searchCtrl');
  $('.m_search').hide();

  function searchToggle() {
    if (!search_mode) {
      $('.m_search').stop(true, false).slideDown('400', 'easeOutQuint');
      // $('.m_search').find('input[type="text"]').focus();
      search_mode = true;
      // prevent Android sofr Keyboard
      var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
      if (isAndroid) {
        _window.off('resize');
      }
    } else {
      $('.m_search').slideUp('400', 'easeOutQuint');
      search_mode = false;
    }
  }
  _searchCtrl.off().on('click', function (e) {
    searchToggle();
  });
  // 如果點在外面
  $(document.body).on('click', function (e) {
    if (search_mode) {
      searchToggle();
      search_mode = false;
    }
  });
  $('.m_search ,.searchCtrl').on('click', function (e) {
    e.stopPropagation();
  });
  // fixed navbar
  var resizeNavTimer;
  if ($('header .menu').length > 0) {
    var stickyMenuTop = Math.floor($('header .menu').offset().top),
      menuH = Math.floor(_menu.outerHeight());

    function stickynavBar() {
      if (ww >= wwSmall && $(this).scrollTop() > stickyMenuTop) {
        $('header .menu').addClass('sticky');
        $('header .megamenu').addClass('sticky');
        $('.main').css('padding-top', menuH);
      } else {
        $('header .menu').removeClass('sticky');
        $('header .megamenu').removeClass('sticky');
        $('.main').removeAttr('style');
      }
    }
    _window.on('scroll', function (event) {
      stickynavBar();
    });
    _window.on('resize', function (event) {
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(function () {
        stickyMenuTop = Math.floor($('header .menu').offset().top);
        $('.main').removeAttr('style');
        stickynavBar();
      }, 200);
    });
    stickynavBar();
  }
  if ($('header .megamenu').length > 0) {
    var stickyMegamenuTop = Math.floor($('header .megamenu').offset().top),
      megamenuH = Math.floor($('header .megamenu').outerHeight());

    function stickyMegaNavBar() {
      windowW = _window.outerWidth();
      if (windowW >= wwSmall && $(this).scrollTop() > stickyMegamenuTop) {
        $('header .megamenu').addClass('sticky');
        $('.main').css('padding-top', megamenuH);
      } else {
        $('header .megamenu').removeClass('sticky');
        $('.main').removeAttr('style');
      }
    }
    _window.on('scroll', function (event) {
      stickyMegaNavBar();
    });
    _window.on('resize', function (event) {
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(function () {
        stickyMenuTop = Math.floor($('header .megamenu').offset().top);
        $('.main').removeAttr('style');
        stickyMegaNavBar();
      }, 200);
    });
    stickyMegaNavBar();
  }

  /*-----------------------------------*/
  //////////// notice訊息區塊 ////////////
  /*-----------------------------------*/
  $('[class*="notice"] a.close').on('click', function (e) {
    $(this).parent('[class*="notice"]').hide();
    e.preventDefault();
  });
  /*-----------------------------------*/
  //////////// Accordion設定 ////////////
  /*-----------------------------------*/
  $('.accordion').each(function () {
    $(this).find('.accordion-content').hide();
    var _accordionItem = $(this).children('ul').children('li').children('a');
    _accordionItem.each(function () {
      function accordion(e) {
        $(this).parent('li').siblings().children('a').removeClass('active');
        $(this).toggleClass('active');
        $(this).parent('li').siblings().children('.accordion-content').slideUp();
        $(this).next('.accordion-content').slideToggle();
        e.preventDefault();
      }
      $(this).click(accordion);
      $(this).keyup(accordion);
    });
  });
  /*-----------------------------------*/
  /////////////fatfooter開關/////////////
  /*-----------------------------------*/
  $('.btn-fatfooter').on('click', function (e) {
    $(this)
      .parent('.container')
      .find('nav>ul>li>ul')
      .stop(true, true)
      .slideToggle(function () {
        if ($(this).is(':visible')) {
          $('.btn-fatfooter').html('收合/CLOSE');
          $('.btn-fatfooter').attr('name', '收合選單/CLOSE');
        } else {
          $('.btn-fatfooter').html('展開/OPEN');
          $('.btn-fatfooter').attr('name', '展開選單/OPEN');
        }
      });
    $(this).stop(true, true).toggleClass('close');
  });
  /*-----------------------------------*/
  ////////////////多組Tab////////////////
  /*-----------------------------------*/
  // var tab_headerHeight = Math.floor($('.header').outerHeight(true));
  // var resizeTimer1;
  // _window.resize(function () {
  //   clearTimeout(resizeTimer1);
  //   resizeTimer1 = setTimeout(function () {
  //     ww = _window.outerWidth();
  //     tabSet();
  //   }, 50);
  // });

  // function tabSet() {
  //   $('.tabs').each(function () {
  //     var _tab = $(this),
  //       _tabItem = _tab.find('.tabItem'),
  //       _tabContent = _tab.find('.tabContent'),
  //       tabwidth = _tab.width(),
  //       tabItemHeight = _tabItem.outerHeight(),
  //       tabContentHeight = _tab.find('.active').next().innerHeight(),
  //       tabGutter = parseInt('4px'), // 可設定 Gutter 寬度
  //       tabItemLength = _tabItem.length,
  //       tabItemWidth,
  //       marginLeft;
  //     _tab.find('.active').next('.tabContent').show();
  //     if (ww >= wwSmall) {
  //       _tabContent.css('top', tabItemHeight);
  //       _tab.height(tabContentHeight + tabItemHeight);

  //       tabItemWidth = tabwidth / tabItemLength - tabGutter;
  //       marginLeft = (tabwidth - tabItemWidth * tabItemLength) / (tabItemLength - 1);

  //       _tabItem.outerWidth(tabItemWidth).css('margin-left', marginLeft);
  //       _tabItem.first().css('margin-left', 0);
  //       _tabItem.last().css({ position: 'absolute', top: 0, right: 0 }).outerWidth(tabItemWidth);
  //     } else {
  //       _tab.css('height', 'auto');
  //       _tabItem.width(tabwidth);
  //       _tabItem.css('margin-left', 0).last().css('position', 'relative');
  //     }
  //     _tabItem.focus(tabs); //改button後，前面改_tabItem
  //     _tabItem.click(tabs); //改button後，前面改_tabItem
  //     function tabs(e) {
  //       var _tabItemNow = $(this), //改button後，原來$(this).parent(),改$(this)
  //         tvp = _tab.offset().top,
  //         tabIndex = _tabItemNow.index() / 2,
  //         scollDistance = tvp + tabItemHeight * tabIndex - tab_headerHeight;
  //       _tabItem.removeClass('active');
  //       _tabItemNow.addClass('active');
  //       if (ww <= wwSmall) {
  //         _tabItem.not('.active').next().slideUp();
  //         _tabItemNow.next().slideDown();
  //         $('html,body').stop(true, false).animate({ scrollTop: scollDistance });
  //       } else {
  //         _tabItem.not('.active').next().hide();
  //         _tabItemNow.next().show();
  //         tabContentHeight = _tabItemNow.next().innerHeight();
  //         _tab.height(tabContentHeight + tabItemHeight);
  //       }
  //       e.preventDefault();
  //     }
  //   });
  // }
  // $('.tabs>.tabItem:first-child>a').trigger('click');
  // tabSet();

  /*-----------------------------------*/
  ///////////////置頂go to top////////////
  /*-----------------------------------*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
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
    _body.find('a.goCenter').focus();
    e.preventDefault();
  });
  /*--------------------------------------------------------*/
  /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
  /*--------------------------------------------------------*/
  var userAgent, ieReg, ie;
  userAgent = window.navigator.userAgent;
  ieReg = /msie|Trident.*rv[ :]*11\./gi;
  ie = ieReg.test(userAgent);
  if (ie) {
    $('.img-container').each(function () {
      var imgUrl = $(this).find('img').attr('data-src');
      var $container = $(this);
      $container.has('.none').addClass('ie-object-none');
      $container.has('.none').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.cover').addClass('ie-object-cover');
      $container.has('.cover').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.fill').addClass('ie-object-fill');
      $container.has('.fill').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.contain').addClass('ie-object-contain');
      $container.has('.contain').css('backgroundImage', 'url(' + imgUrl + ')');
    });
  }
  /*-----------------------------*/
  /////form表單 placeholder隱藏/////
  /*-----------------------------*/
  // $('input,textarea').focus(function() {
  //     $(this).removeAttr('placeholder');
  // });
  $('input[type="checkbox"]')
    .off()
    .on('click', function (e) {
      $(this).blur();
    });
  /*------------------------------------*/
  /////form表單 單個檔案上傳+多個檔案上傳/////
  /*------------------------------------*/
  $(document).on('change', '.check_file', function () {
    var names = [];
    var length = $(this).get(0).files.length;
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      names.push($(this).get(0).files[i].name);
    }
    // $('input[name=file]').val(names);
    if (length > 2) {
      var fileName = names.join(', ');
      $(this)
        .closest('.upload_grp')
        .find('.upload_file')
        .attr('value', length + ' files selected');
    } else {
      $(this).closest('.upload_grp').find('.upload_file').attr('value', names);
    }
  });
  /*------------------------------------*/
  //////////分享按鈕 share dropdwon////////
  /*------------------------------------*/
  $('.function_panel .share').children('ul').hide();
  $('.function_panel .share').prepend('<a href="#" class="shareButton">share分享按鈕</a>');
  var _shareButton = $('.shareButton');
  _shareButton.off().on('click', function (e) {
    $(this).siblings('ul').stop(true, true).slideToggle();
    e.preventDefault();
  });
  _shareButton.keyup(function (event) {
    $(this).siblings('ul').stop(true, true).slideDown();
  });
  $('.function_panel .share')
    .find('li:last>a')
    .focusout(function (event) {
      $(this).parent().parent('ul').hide();
    });
  // 點外面關閉share
  $(document).on('touchend click', function (e) {
    var container = $('.function_panel .share');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.function_panel .share ul').hide();
    }
  });
  /*------------------------------------*/
  /////////////字型大小 font-size//////////
  /*------------------------------------*/
  $('.font_size')
    .find('.small')
    .on('click', function (e) {
      $(this).parent('li').siblings('li').find('a').removeClass('active');
      $('.innerpage').removeClass('large_size').addClass('small_size');
      $(this).blur().addClass('active');
      e.preventDefault();
      createCookie('FontSize', 'small', 356);
    });
  $('.font_size')
    .find('.medium')
    .on('click', function (e) {
      $(this).parent('li').siblings('li').find('a').removeClass('active');
      $('.innerpage').removeClass('large_size small_size');
      $(this).blur().addClass('active');
      e.preventDefault();
      createCookie('FontSize', 'medium', 356);
    });
  $('.font_size')
    .find('.large')
    .on('click', function (e) {
      $(this).parent('li').siblings('li').find('a').removeClass('active');
      $('.innerpage').removeClass('small_size').addClass('large_size');
      $(this).blur().addClass('active');
      e.preventDefault();
      createCookie('FontSize', 'large', 356);
    });

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else expires = '';
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  window.onload = function (e) {
    var cookie = readCookie('FontSize');
    //alert('cookie='+cookie);
    if (cookie == 'small') {
      //$('.font_size').find('.small').click();
      $('.font_size').find('.small').parent('li').siblings('li').find('a').removeClass('active');
      $('.innerpage').removeClass('large_size medium_size').addClass('small_size');
      $('.font_size').find('.small').addClass('active');
      e.preventDefault();
    } else {
      if (cookie == 'large') {
        //$('.font_size').find('.large').click();
        $('.font_size').find('.large').parent('li').siblings('li').find('a').removeClass('active');
        $('.innerpage').removeClass('small_size medium_size').addClass('large_size');
        $('.font_size').find('.large').addClass('active');
        e.preventDefault();
      } else {
        //這裡是預設宣告
        //$('.font_size').find('.medium').click();
        $('.font_size').find('.medium').parent('li').siblings('li').find('a').removeClass('active');
        $('.innerpage').removeClass('large_size small_size');
        $('.font_size').find('.medium').addClass('active');
        e.preventDefault();
      }
    }
  };
  /*-----------------------------------*/
  /////////// category active  //////////
  /*-----------------------------------*/
  $('.category')
    .find('a')
    .off()
    .on('click', function (event) {
      $(this).parent('li').siblings().find('a').removeClass('active');
      $(this).addClass('active').blur();
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

  //無障礙切換slick箭頭語系
  if ($('html')[0].hasAttribute('lang')) {
    var weblang = $('html').attr('lang');
    if (weblang.substring(0, 2) == 'zh') {
      $('.slick-prev').attr('title', '上一筆');
      $('.slick-next').attr('title', '下一筆');
    } else if (weblang.substring(0, 2) !== 'zh') {
      $('.slick-prev').attr('title', 'previous');
      $('.slick-next').attr('title', 'next');
    }
  }
  // 無障礙錨點切換語系，更改accesskey的title名稱
  var weblang = $('html').attr('lang');
  if (weblang.substring(0, 2) == 'zh') {
    $('header').find('.accesskey').attr('title', '上方功能區塊');
    $('.main').find('.accesskey').attr('title', '中央內容區塊');
    $('footer').find('.accesskey').attr('title', '下方功能區塊');
    $('.search').find('.accesskey').attr('title', '關鍵字搜尋：文章關鍵字搜尋');
  } else if (weblang.substring(0, 2) !== 'zh') {
    $('header').find('.accesskey').attr('title', 'header');
    $('.main').find('.accesskey').attr('title', 'content');
    $('footer').find('.accesskey').attr('title', 'footer');
    $('.search').find('.accesskey').attr('title', 'search');
  }
  /*------------------------------------*/
  /////gotoCenter on focus跳到 content/////
  /*------------------------------------*/
  $('a.goCenter').keydown(function (e) {
    if (e.which == 13) {
      $('#aC').focus();
      $('html, body')
        .stop(true, true)
        .animate({ scrollTop: $('.main').find('.accesskey').offset().top }, 800, 'easeOutExpo');
    }
  });
  /*-----------------------------------*/
  //////// 語言模組 無障礙遊走設定  ////////
  /*-----------------------------------*/
  $('.language').find('ul').hide();
  var openLang = $('.language').children('a');
  openLang.off().on('click', function (e) {
    $(this).next('ul').stop(true, true).slideToggle();
    e.preventDefault();
  });
  openLang.keyup(function () {
    $(this).next('ul').stop(true, true).slideDown();
  });
  $('.language')
    .find('ul li:last>a')
    .focusout(function () {
      $('.language').find('ul').hide();
    });
  $(document).on('touchend click', function (e) {
    var target = e.target;
    if (!$(target).is('.language a')) {
      $('.language').find('ul').hide();
    }
  });
  // /*------------------------------------*/
  // ///////table 加上響應式 scroltable-wrapper/////
  // /*------------------------------------*/
  $('table').each(function (index, el) {
    //判斷沒有table_list
    if ($(this).parents('.table_list').length == 0 && $(this).parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
      $(this).scroltable();
    }
  });
  // tablearrow arrow，為了設定箭頭
  $('.scroltable-nav-left').append('<div class="tablearrow_left" style="display:none;"></div>');
  $('.scroltable-nav-right').append('<div class="tablearrow_right"  style="display:none;"></div>');
  // 固定版頭
  function table_Arrow() {
    if ($('table').parents('.table_list').length == 0 && $('table').parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
      if ($('.scroltable-wrapper').length > 0) {
        var stickyArrowTop = Math.floor($('.scroltable-wrapper').offset().top),
          thisScroll = Math.floor($(this).scrollTop());
        if (thisScroll > stickyArrowTop - 230) {
          $('.scroltable-wrapper .tablearrow_left').css('display', 'block');
          $('.scroltable-wrapper .tablearrow_left').css({ top: thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
          $('.scroltable-wrapper .tablearrow_right').css('display', 'block');
          $('.scroltable-wrapper .tablearrow_right').css({ top: thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
        } else {
          $('.scroltable-wrapper .tablearrow_left').css({
            top: '10px',
            display: 'none',
          });
          $('.scroltable-wrapper .tablearrow_right').css({
            top: '10px',
            display: 'none',
          });
        }
      }
    }
  }
  $(window).scroll(function (event) {
    table_Arrow();
  });
  var scrollTimer;
  _window.scroll(function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      table_Arrow();
    }, 50);
  });
  // /*------------------------------------*/
  // //////////table 加上 data-title//////////
  // /*------------------------------------*/
  function rwdTable() {
    $('.table_list')
      .find('table')
      .each(function () {
        var $row = $(this).find('tr');
        rowCount = $row.length;
        for (var n = 1; n <= rowCount; n++) {
          $(this)
            .find('th')
            .each(function (index) {
              var thText = $(this).text();
              $row.eq(n).find('td').eq(index).attr('data-title', thText);
            });
        }
      });
  }
  rwdTable();
  /*-----------------------------------*/
  ////////////// lazy load //////////////
  /*-----------------------------------*/
  var lazyLoadInstance = new LazyLoad({
    elements_selector: 'img.lazy',
    placeholder: '/images/basic/placeholder.gif',
    effect: 'fadeIn',
    fadeTime: 600,
    threshold: 0,
  });
});

// 亂數數字
function randomFloor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 亂數英文字
function randomLetter(max) {
  let text = '';
  let letter = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < max; i++) text += letter.charAt(Math.floor(Math.random() * letter.length));
  return text;
}
function tabFunction(obj) {
  'use strict';
  // const tabSet = document.querySelector(obj.target) || null;
  const tabSet = document.querySelectorAll(obj.target) || null;
  const autoClose = obj.autoClose;
  const openSwitch = obj.openSwitch;
  const openFirst = obj.openFirst;
  const modeSwitch = obj.modeSwitch;
  const widthCheck = obj.width;

  if (tabSet) {
    tabSet.forEach((tab) => {
      let id = [];
      let mode = '';
      let modeBBtn;
      const modeABtn = tab.querySelectorAll('.tabItems button');
      const modeAContent = tab.querySelectorAll('.tabContent');
      const modeBContent = tab.querySelectorAll('.content');
      const count = modeABtn.length;
      let nowIndex = obj.index === null ? null : obj.index <= count ? obj.index : count;
      const lastTab = modeABtn[modeABtn.length - 1];

      for (let i = 0; i < modeABtn.length; i++) {
        id.push(`tab_${randomLetter(3)}${randomFloor(0, 999)}`);
      }

      // 內容增加標題給模式B使用
      modeABtn.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.classList.add('modeBBtn');
        btn.innerText = item.innerText;
        modeAContent.forEach((content, i) => (i === index ? content.prepend(btn) : null));
      });

      modeBBtn = tab.querySelectorAll('.modeBBtn');

      // 判斷寬度
      const init = () => {
        if (window.innerWidth <= widthCheck && modeSwitch) {
          // 模式B
          mode = 'B';
          if (modeSwitch) {
            modeABtn.forEach((content) => content.classList.remove('active'));
            modeAContent.forEach((content) => content.classList.remove('active'));
            // 移除模式A無障礙設置
            modeABtn.forEach((item, index) => {
              item.removeAttribute('aria-controls');
              item.removeAttribute('role');
              modeAContent[index].removeAttribute('aria-labelledby');
              modeAContent[index].removeAttribute('role');
              modeAContent[index].removeAttribute('aria-label');
            });
            // 增加模式B無障礙設置
            modeBBtn.forEach((item, index) => {
              item.setAttribute('aria-controls', id[index]);
              modeBContent[index].setAttribute('aria-labelledby', id[index]);
              modeBContent[index].setAttribute('id', id[index]);
              // item.setAttribute('role', 'tab');
              // modeBContent[index].setAttribute('role', 'tabpanel');
              modeBContent[index].setAttribute('aria-label', item.innerText);
            });

            tab.classList.add('modeB');

            if (nowIndex !== null) {
              modeBBtn[nowIndex].classList.add('active');
              modeBBtn[nowIndex].setAttribute('aria-selected', 'true');
              modeBContent[nowIndex].classList.add('active');
            }
          }
          // 模式B
        } else if (window.innerWidth > widthCheck || !modeSwitch) {
          // 模式A
          mode = 'A';

          if (modeSwitch) {
            modeBContent.forEach((item) => item.style.removeProperty('display'));
            modeBBtn.forEach((content) => content.classList.remove('active'));
            modeBContent.forEach((content) => content.classList.remove('active'));

            // 移除模式B無障礙設置
            modeBBtn.forEach((item, index) => {
              item.removeAttribute('aria-controls');
              item.removeAttribute('role');
              modeBContent[index].removeAttribute('aria-labelledby');
              modeBContent[index].removeAttribute('role');
              modeBContent[index].removeAttribute('aria-label');
              modeBContent[index].removeAttribute('id');
            });
          }
          // 增加模式A無障礙設置
          modeABtn.forEach((item, index) => {
            item.setAttribute('aria-controls', id[index]);
            item.setAttribute('role', 'tab');
            item.setAttribute('aria-selected', 'false');
            modeAContent[index].setAttribute('aria-labelledby', id[index]);
            modeAContent[index].setAttribute('role', 'tabpanel');
            modeAContent[index].setAttribute('aria-label', item.innerText);
          });

          tab.classList.remove('modeB');

          nowIndex === null ? (nowIndex = 0) : nowIndex;
          modeABtn[nowIndex].classList.add('active');
          modeAContent[nowIndex].classList.add('active');
          modeABtn[nowIndex].setAttribute('aria-selected', 'true');
          // 模式A
        }
      };
      init();

      // 預先展開模式
      function openCheck() {
        // 預先展開模式
        if (!openFirst && mode === 'B' && nowIndex !== null) {
          const siblings = Array.prototype.filter.call(modeBContent[nowIndex].parentElement.parentElement.children, (child) => {
            return child !== modeBContent[nowIndex].parentElement;
          });
          siblings.forEach((item) => $(item).find('.content').slideUp('fast'));
        } else if (mode === 'B' && nowIndex === null) {
          modeBContent.forEach((item) => $(item).slideUp('fast'));
        } else {
          modeBContent.forEach((item) => $(item).slideDown('fast'));
        }
      }
      openCheck();

      // 模式A共用
      function modeAFn(item, index) {
        modeABtn.forEach((content) => content.classList.remove('active'));
        modeAContent.forEach((content) => content.classList.remove('active'));
        modeAContent[index].classList.add('active');
        item.classList.add('active');
        modeABtn.forEach((content) => content.setAttribute('aria-selected', 'false'));
        item.setAttribute('aria-selected', 'true');
        nowIndex = index;
      }

      modeAContent.forEach((item, index) => {
        const itemAllTarget = modeAContent[index].querySelectorAll('a,button,input,textarea,select');
        const firstItem = itemAllTarget[1];
        const lastItem = itemAllTarget[itemAllTarget.length - 1];
        const prevItemAllTarget = modeAContent[index - 1]?.querySelectorAll('a,button,input,textarea,select');
        const siblings = Array.prototype.filter.call(modeBBtn[index].parentElement.parentElement.children, (child) => {
          return child !== modeBBtn[index].parentElement;
        });

        // 模式A
        if (modeSwitch || mode === 'A') {
          // 模式A點擊
          if (openSwitch) {
            modeABtn[index].addEventListener('click', (e) => {
              e.preventDefault();
              modeAFn(e.target, index);
            });

            // 模式A鍵盤
            modeABtn[index].addEventListener('keydown', (e) => {
              if (e.which === 9 && !e.shiftKey) {
                modeAFn(e.target, index);
                if (itemAllTarget.length > 1 && e.target !== lastTab) {
                  e.preventDefault();
                  firstItem.focus();
                } else if (itemAllTarget.length === 1 && e.target !== lastTab) {
                  e.preventDefault();
                  modeABtn[index + 1]?.focus();
                } else if (itemAllTarget.length > 1 && e.target === lastTab) {
                  modeABtn[index + 1]?.focus();
                } else if (itemAllTarget.length === 1 && e.target === lastTab) {
                  setTimeout(() => {
                    lastTab.focus();
                    lastTab.blur();
                  }, 10);
                }
              } else if (e.which === 9 && e.shiftKey) {
                e.preventDefault();
                modeAFn(modeABtn[index], index);
                lastItem?.focus();
                if (itemAllTarget.length === 1) {
                  modeABtn[index - 1]?.focus();
                }
              }
            });
          }
        }

        // 模式B
        if (modeSwitch || mode === 'B') {
          // 模式B點擊
          if (openSwitch) {
            modeBBtn[index].addEventListener('click', (e) => {
              e.preventDefault();
              siblings.forEach((content) => content.querySelector('.modeBBtn').classList.remove('active'));
              e.target.classList.toggle('active');
              $(modeBContent[index]).slideToggle('fast');
              nowIndex = index;

              if (autoClose) {
                siblings.forEach((con) => {
                  $(con.querySelector('.content')).slideUp('fast');
                  con.classList.remove('active');
                  con.querySelector('.modeBBtn').setAttribute('aria-selected', 'false');
                });
              }
            });

            // 模式B鍵盤
            modeBBtn[index].addEventListener('keydown', (e) => {
              e.target.classList.add('active');
              let firstTabStyle = window.getComputedStyle(modeBContent[index]);
              nowIndex = index;

              if (autoClose & !openFirst) {
                siblings.forEach((content) => {
                  $(content.querySelector('.content')).slideUp('fast');
                  content.querySelector('.modeBBtn').classList.remove('active');
                  content.querySelector('.modeBBtn').setAttribute('aria-expanded', 'false');
                });
              }

              if (e.which === 9 && !e.shiftKey) {
                $(modeBContent[index]).slideDown('fast');
                if (index === 0) {
                  e.target.classList.add('active');
                }

                if (itemAllTarget.length > 1) {
                  e.preventDefault();
                  firstItem?.focus();
                } else if (itemAllTarget.length === 1) {
                  modeBBtn[index]?.focus();
                }
              } else if (e.which === 9 && e.shiftKey) {
                e.preventDefault();
                $(modeBContent[index]).slideDown('fast');
                if (itemAllTarget.length > 1) {
                  lastItem?.focus();
                } else if (itemAllTarget.length === 1) {
                  modeBBtn[index - 1]?.focus();
                }
              }
            });
          }
        }

        // 內容鍵盤遊走
        itemAllTarget.forEach((n, i) => {
          if (i > 0) {
            n.addEventListener('keydown', (e) => {
              if (mode === 'A') {
                if ((e.which === 9 && !e.shiftKey && e.target === lastItem && modeABtn[index] !== lastTab) || (e.which === 9 && e.shiftKey && e.target === firstItem)) {
                  modeABtn[index]?.focus();
                }
              } else if (mode === 'B') {
                if (e.which === 9 && e.shiftKey) {
                  if (e.target === firstItem) {
                    modeBBtn[index]?.focus();
                  } else if (itemAllTarget.length === 1) {
                    modeBBtn[index - 1]?.focus();
                  }
                }
              }
            });
          }
        });
      });

      window.addEventListener('resize', init);
    });
  }
}

// tabFunction({
//   target: '.tabSet',
//   openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
//   openSwitch: true, // 是否可開合/切換
//   autoClose: true, // 自動關閉其他開啟內容
//   modeSwitch: true, // 預設模式自動切換，尺寸以上tab功能，尺寸以下手風琴功能
//   width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
//   index: 0, // 預設開啟第幾個
// });

// -----   fancyBox新增需要綁定才有效果
if ($('[data-fancybox="gallery"]').length > 0) {
  Fancybox.bind('[data-fancybox="gallery"]', {
    l10n: Fancybox.l10n.zh_TW,
  });
}
