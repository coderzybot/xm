!function($){
 $(".butt").on('click',function(){
    $.ajax({
        type:'post',
        url:`http://${location.hostname}/projectname/php/enter.php` ,//'http://localhost/php/projectname/php/enter.php',
        data:{
            name:$(".input1").val(),
            psw:hex_sha1($(".input2").val())
        }
    }).done(function(d){
       if(d){
        location.href = "index.html";
        localStorage.setItem('name', $('.input1').val());
       }else{
            $('.err').css("display","block")
            $(".input1").val('')
            $(".input2").val('')
       }
    })
 })
}(jQuery)