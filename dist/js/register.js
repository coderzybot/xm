"use strict";!function(o){var p=!0;o("form input").on("blur",function(){o.ajax({type:"post",url:"http://localhost/php/projectname/php/register.php",data:{name:o("#name").val()}}).done(function(s){p=s?(o(".uspan").html("用户名错误").css("color","red"),!1):""==o("#name").val()?(o(".uspan").html("用户名不能为空").css("color","red"),!1):(o(".uspan").html("√").css("color","green"),!0),p=""==o("#psw").val()&&""==o("#ps").val()?(o(".pspan").html("密码不能为空").css("color","red"),o(".psspan").html("密码不能为空").css("color","red"),!1):o("#psw").val()!==o("#ps").val()?(o(".pspan").html("两次密码不同").css("color","red"),o(".psspan").html("两次密码不同").css("color","red"),!1):o("#psw").val().length<6?(o(".pspan").html("密码长度最小为6位").css("color","red"),o(".psspan").html("密码长度最小为6位").css("color","red"),!1):(o(".pspan").html("√").css("color","green"),o(".psspan").html("√").css("color","green"),!0);""==o("#phone").val()?o(".phonespan").html("手机号不能为空").css("color","red"):/^1[3578]\d{9}$/.test(o("#phone").val())?o(".phonespan").html("√").css("color","green"):o(".phonespan").html("手机号格式不对").css("color","red"),o("form").on("submit",function(){if(!p)return!1})})})}(jQuery);