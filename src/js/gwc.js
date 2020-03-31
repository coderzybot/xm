!function ($) {
    if(localStorage.getItem('name')){
       $(".name").html(localStorage.getItem('name'))
   }
    //渲染
    function show(sid, num) {
        $.ajax({
            url: `http://${location.hostname}/projectname/php/gwc.php`,
            //"http://localhost/php/projectname/php/gwc.php"
            dataType: 'json'
        }).done(function (d) {
            $.each(d, function (i, v) {
                if (sid == v.sid) {
                    let $clonebox = $(".gwul .gwl:hidden").clone(true, true);
                    $clonebox.find('.colimg img').attr("src", v.url)
                    $clonebox.find('.colimg img').attr("sid", v.sid)
                    $clonebox.find('.colname a').html(v.name)
                    $clonebox.find('.colprice span').html(v.price)
                    $clonebox.find('.colnumjs input').val(num)
                    $clonebox.find('.coltotal span').html((v.price * num).toFixed(2))
                    $clonebox.css("display", "block")
                    $(".gwul").append($clonebox)
                    $(".gwlist").find("input").prop("checked", true)
                    totalprice()
                }
            })

        });
    }
    //cookie判断数量商品
    if (jscookie.get("num") && jscookie.get("numsid")) {
        let $numsid = jscookie.get("numsid").split(",")
        let $num = jscookie.get("num").split(",")
        $.each($numsid, function (i, v) {
            show($numsid[i], $num[i])
        });
    };
    //计算总价
    function totalprice() {
        let num = 0
        let price = 0
        $.each($(".gwl:visible"), function (i, v) {
            if ($(v).find(".qxcheck input").prop('checked')) {
                num += parseInt($(v).find(".colnumjs input").val())
                price += parseFloat($(v).find(".coltotal span").html())
            }
        });
        $(".spnum").html(num)
        $(".sp-price em").html(price)
    }
    //全选
    $(".qx").on("change", function () {
        $(".gwul").find(".gwl:visible").find(".qxcheck input ").prop('checked', $(this).prop('checked'))
        totalprice()
    });
    $(".gwul").on('click', function () {
        let $input = $(".gwl:visible").find(":checkbox");
        if ($input.size() === $(".gwl:visible").find(".qxcheck input:checked").size()) {
            $(".qx").prop('checked', true)
        } else {
            $(".qx").prop('checked', false)
        }
        totalprice()
    })
    //计算单价
    function coltotal(obj) {
        let price = obj.parents(".gwl").find(".colprice span").html()
        let num = obj.parents(".gwl").find(".colnumjs input").val()
        return (price * num).toFixed(2)
    }
    //改变数量
    $(".Jadd").on("click", function () {
        let $num = $(this).parents(".colnumjs").find("input").val()
        $num++;
        $(this).parents(".colnumjs").find("input").val($num++)
        $(this).parents(".gwl").find(".coltotal span").html(coltotal($(this)));
        totalprice()
        setcookie($(this))
    })
    $(".Jj").on("click", function () {
        let $num = $(this).parents(".colnumjs").find("input").val()
        $num--;
        if ($num < 1) {
            $num = 1
        }
        $(this).parents(".colnumjs").find("input").val($num++)
        $(this).parents(".gwl").find(".coltotal span").html(coltotal($(this)));
        totalprice()
        setcookie($(this))
    })
    //改变cookie
    let $numsid = []
    let $num = []
    function cookie() {
        if (jscookie.get("num") && jscookie.get("numsid")) {
            $numsid = jscookie.get("numsid").split(",")
            $num = jscookie.get("num").split(",")
        } else {
            $numsid = []
            $num = []
        }
    }
    function setcookie(obj) {
        cookie()
        let sid = obj.parents(".gwl").find(".colimg img").attr("sid")
        $num[$.inArray(sid, $numsid)] = obj.parents(".gwl").find(".colnumjs input").val()
        jscookie.add("num", $num, 7)
    }
    //删除
    //删除cookie
    function delcookie(sid, numsid) {
        let $i
        $.each(numsid, function (i, v) {
            if (sid == v) {
                $i = i
            }
        });
        $num.splice($i, 1)
        $numsid.splice($i, 1)
        jscookie.add("num", $num, 7)
        jscookie.add("numsid", $numsid, 7)
        if(!($numsid.length&&$num.length)){
            
            jscookie.del("num")
            jscookie.del("numsid")
        }
    }
    $(".colaction a").on('click', function () {
        cookie()
        if (window.confirm("你确定删除吗？")) {
            $(this).parents(".gwl").remove()
            delcookie($(this).parents(".gwl").find(".colimg img").attr("sid"), $numsid);
            totalprice()
        }
    })
   
}(jQuery)