!function ($) {
    let $xqm = $('.xqm')

    $.ajax({
        url: `http://${location.hostname}/projectname/php/get.php`,
        //"http://localhost/php/projectname/php/get.php"
        dataType: 'json'
    }).done(function (d) {
        let $li = ""
        $.each(d, function (i, v) {
            // name: "小米MIX Alpha"
            // price: "19999.00"
            // sid: "1"
            // url: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1569297737.97669352.jpg"

            $li += `<li>
            <a href="product.html?sid=${v.sid}">
            <img src="${v.url}"
                alt="">
            <p>${v.name}</p>
            <span>${v.price}元</span>
            </a>`
            $li += '</li>'
        });
        $xqm.html($li)
        //将页面的li元素加载到两个数组中
        new dmm({
            // index: 1,//当前页面                   默认1
            cssStyle: 3, //控件样式                   默认1
            // size: [10, 20, 30],//每页显示条数           默认[10,20]
            size: [3],
            // skip: true,//是否显示跳转功能               默认不显示
            skip: true,
            // setSize: true,//是否显示下拉框              默认不显示
            container: "pageParent", //控件容器id
            //回掉函数，一般就是post请求后台方法得到分页数据加载到页面上
            callback: function (e) {
                e.index; //当前页
                e.pageSize1; //页面显示条数
                //以上两个属性可以当作请求后台时传入的参数
                //以下三行在加载完页面后必须填写
                $.ajax({
                    url: `http://${location.hostname}/projectname/php/xq.php`,
                    //"http://localhost/php/projectname/php/xq.php"
                    data: {
                        page: e.index
                    },
                    dataType: "json"
                }).done(function (d) {
                    let $li = ""
                    let liarray = [];
                    let array = [];
                    let p, n;
                    $.each(d, function (i, v) {
                        $li += `<li>
                        <a href="product.html?sid=${v.sid}">
                        <img src="${v.url}"
                            alt="">
                        <p>${v.name}</p>
                        <span>${v.price}元</span>
                        </a>`
                        $li += '</li>'
                    })
                    $xqm.html($li)

                    //将页面的li元素加载到两个数组中
                    $('.xqm li').each(function (i, v) {
                        array[i] = $(this);
                        liarray[i] = $(this);
                    });

                    $(".xqt1").on('click', function () {

                    })
                    $(".xqtpriceS").on('click', function () {

                        for (let i = 0; i < liarray.length - 1; i++) {
                            for (let j = 0; j < liarray.length - i - 1; j++) {
                                p = parseFloat(liarray[j].find("a").find("span").html())
                                console.log(p)
                                n = parseFloat(liarray[j + 1].find("a").find("span").html())
                                if (p > n) {
                                    let tem
                                    tem = liarray[j];
                                    liarray[j] = liarray[j + 1];
                                    liarray[j + 1] = tem;
                                }
                            }
                        }
                        console.log()
                        $xqm.empty("li")
                        for (let i = 0; i < liarray.length; i++) {
                            $xqm.append("<li>" + liarray[i].html() + "</li>")
                        }
                        // $(".xqm li").empty();
                        // $.each(liarray, function (index, value) {
                        //     console.log(liarray[index])
                        //     $xqm.append()
                        // });
                    });
                    e.countpage = Math.ceil(9 / e.pageSize1); //注意必写（数据总页数??通过后台方法获取）
                    e.infocount = 3; //注意必写（数据总条数??通过后台方法获取）
                    xian(e); //注意必写（加载控件）
                    //
                    //可将以下代码用于查询使用--联合dian()方法
                    runCallback1 = e; //将分页条件赋值变量
                });
            }
        });

    })
    if(localStorage.getItem('name')){
        $(".nouser").hide()
        $('.user').show()
        $(".tzUser").html(localStorage.getItem('name'))
    }else{
        $(".nouser").show()
        $('.user').hide()
    }

}(jQuery)