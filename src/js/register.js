!function ($) {
    let trmp = true;
    $("form input").on("blur", function () {
        $.ajax({
            type: "post",
            url: `http://${location.hostname}/projectname/php/register.php`,
            //"http://localhost/php/projectname/php/register.php"
            data: {
                name: $("#name").val(),
            }
        }).done(function (d) {
            if (d) {
                $(".uspan").html('用户名错误').css('color', "red")
                trmp = false;
            }else if ($('#name').val() == '') {
                $(".uspan").html('用户名不能为空').css('color', "red")
                trmp = false;
            }
            else{
                $(".uspan").html('√').css('color', "green")
                trmp = true;
               
            }
            if ($('#psw').val() == '' && $('#ps').val() == '') {
                $(".pspan").html('密码不能为空').css('color', "red")
                $(".psspan").html('密码不能为空').css('color', "red")
                trmp = false;
            } else if ($('#psw').val() !== $('#ps').val()) {
                $(".pspan").html('两次密码不同').css('color', "red")
                $(".psspan").html('两次密码不同').css('color', "red")
                trmp = false;
            } else if ($('#psw').val().length < 6) {
                $(".pspan").html('密码长度最小为6位').css('color', "red")
                $(".psspan").html('密码长度最小为6位').css('color', "red")
                trmp = false;
            } else {
                $(".pspan").html('√').css('color', "green")
                $(".psspan").html('√').css('color', "green")
                trmp = true;
            }
            let reg = /^1[3578]\d{9}$/;
            if ($('#phone').val() == ''){
                $(".phonespan").html('手机号不能为空').css('color', "red")
            }else if(!(reg.test($('#phone').val()))){
                $(".phonespan").html('手机号格式不对').css('color', "red")
            }else{
                $(".phonespan").html('√').css('color', "green")
            }
            $('form').on('submit', function () {
                if (!trmp) {
                    return false
                }
            })
        })


    });
}(jQuery)