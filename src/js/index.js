!function ($) {
    let $li = $(".liactive li")
    let $navXlist = $('.navXlist')
    let $navxl_li = $('.navxl li')
    $li.on('mouseover', function () {
        $navXlist.show()
    });
    $li.on('mouseout', function () {
        $navXlist.hide()
    });
    $navXlist.on('mouseover', function () {
        $(this).show()
    });
    $navXlist.on('mouseout', function () {
        $(this).hide()
    });
    $navxl_li.on('mouseover', function () {
        $(this).children('ul').show()
    });
    $navxl_li.on('mouseout', function () {
        $(this).children('ul').hide()
    });
    if (localStorage.getItem('name')) {
        $(".nouser").hide()
        $('.user').show()
        $(".tzUser").html(localStorage.getItem('name'))
    } else {
        $(".nouser").show()
        $('.user').hide()
    };
    //轮播图
    let index = 0
    $(".contenL").on('mouseover', function () {
        $(this).css({
            'background': '#333',
            'color': '#fff'
        })
    });
    $(".contenL").on('mouseout', function () {
        $(this).css({
            'background': 'none',
            'color': 'none'
        })
    });
    $(".contenR").on('mouseover', function () {
        $(this).css({
            'background': '#333',
            'color': '#fff'
        })
    });
    $(".contenR").on('mouseout', function () {
        $(this).css({
            'background': 'none',
            'color': 'none'
        })
    });
    function change(index) {
        $.each($('.contenLB li'), function (i, v) {
            i = index
            $($('.contenLB li')[i]).css('opacity', '1').siblings('li').css('opacity', '0')
            $($('ol a')[i]).css({
                'background': 'hsla(0,0%,100%,.4)',
                'border-color': 'rgba(0,0,0,.4)',
            }).siblings('a').css({
                'background': 'rgba(0,0,0,.4)',
                'border-color': 'none'
            })
        })
    };
    $(".contenL").on('click', function () {
        index--
        if (index < 0) {
            index = $('.contenLB li').length - 1
        }
        change(index)
    });
    $(".contenR").on('click', function () {
        index++
        if (index > $('.contenLB li').length - 1) {
            index = 0
        }
        change(index)
    });
    change(0)
    let time = setInterval(function () {
        index++
        if (index > $('.contenLB li').length - 1) {
            index = 0
        }
        change(index)
    }, 3000)
    $('.contentop').on('mouseover', function () {
        clearInterval(time)
    });
    $('.contentop').on('mouseout', function () {
        time = setInterval(function () {
            index++
            if (index > $('.contenLB li').length - 1) {
                index = 0
            }
            change(index)
        }, 3000)
    });
    $('ol').on('click','a',function(){
        index=$(this).index()
        change(index)
    })

    //滚轮
    let $Top = $(window).scrollTop()
    $Top >= 800 ? $('.hdtop').show() : $('.hdtop').hide()
    $(window).scroll(function () {
        let $Top = $(window).scrollTop();
        $Top >= 800 ? $('.hdtop').show() : $('.hdtop').hide()
    });
    $('.hdtop a').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        })
    });
    //获取时间
    function fill(time) {//添加0
        if (time >= 0 && time < 10) {
            return '0' + time
        } else {
            return time
        }
    }
    function Time() {
        let day = new Date();
        let countdown = 16;//设置倒计时时间
        $('.time p').html(countdown + ':00')
        //console.log(day.getTime());//当前时间
        let ds = new Date()
        ds.setHours(countdown)
        ds.setMinutes(0)
        ds.setSeconds(0)
        // console.log(ds.getTime())
        let settime = Math.abs((day.getTime() - ds.getTime()) / 1000);
        $('.timeH').html(fill(parseInt(settime / 3600 % 60)));
        $('.timeM').html(fill(parseInt(settime / 60 % 60)));
        $('.timeS').html(fill(parseInt(settime % 60)));
    };

    setInterval(function () {
        Time()
    }, 1000);
}(jQuery)