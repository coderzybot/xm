!function($){
    const $sid =location.href.substring(1).split('=')[1];
    const $climg=$('#climg')//小图
    const $clxf =$('.clxf')//小放大镜
    const $cldf =$('.cldf')//大放大镜
    const $dfimg =$('#dfimg')//大图
    const $h2 =$(".cright h2")
    const $price = $(".crprice span")
    const $pricetimeC =$(".pricetimeC span")
    const $cul=$(".changeImg ul")
    let $cli =$(".changeImg li")
    $.ajax({
        url:`http://${location.hostname}/projectname/php/product.php`,
        //"http://localhost/php/projectname/php/product.php"
        data:{
            sid:$sid
        },
        dataType:"json"
    }).done(function (d) {
        
        $climg.attr("src",d.url)
        $climg.attr('sid',d.sid)
        $dfimg.attr("src",d.url)
        $h2.html(d.name)
        $price.html(d.price)
        $pricetimeC.html(d.price)   
        let img = d.other.split(",")
        $cli=""
        $.each(img,function(i,v){
            $cli+=
            `
            <li>
            <a href="jascrip:;">
                <img src="${v}"  alt="" class="cimg"">
            </a>
            </li>
            `
        })
        $cul.html($cli)
    });
    //放大效果
    const $cLb=$('.cLb') 
    $cLb.hover(function(){
        let xfw =$climg.width()/$dfimg.width()*$cldf.width();
        let xfh =$climg.height()/$dfimg.height()*$cldf.height()
        const $bili =$dfimg.width()/$climg.width();
        $cldf.css('visibility','visible')
        let xfl,xft
         $(this).on('mousemove',function(e){
            xfl =e.pageX-$cLb.offset().left-xfw/2;
            xft=e.pageY-$cLb.offset().top-xfh/2;
            if(xfl<0){
                xfl=0
            }
            if(xfl>=$cLb.width()-xfw){
                xfl=$cLb.width()-xfw
            }
            if(xft<0){
                xft=0
            }
            if(xft>=$cLb.height()-xfh){
                xft=$cLb.height()-xfh
            }
            $clxf.css({
                'visibility':'visible',
                 width:xfw+"px",
                 height:xfh+"px",
                "position": "absolute",
                "left":xfl+"px",
                "top":xft+"px"
            })
            $dfimg.css({
                "visibility":"visible",
                "left":-xfl*$bili+"px",
                "top":-xft*$bili+"px"
            });
         }) 
    },function(){
        $cldf.css('visibility','hidden')
        $clxf.css('visibility','hidden')
        $dfimg.css('visibility','hidden')
    })
    $cul.on("click",'li',function(){
        let $img =$(this).find('img').attr('src')
        $climg.attr('src',$img);
        $dfimg.attr('src',$img);
    })
     //用户名

    let num =4;
    let $aright=$('.aright')
    let $aleft=$('.aleft')
    $aright.on('click',function(){
        if($cul.children('li').length>num){
            num++
            $aright.css("color","#ccc")
            if($cul.children('li').length==num){
                $aright.css("color","#fff")      
            }
            $cul.animate({
                left:-(num - 4) * $(".changeImg ul li:first-child").width()
            });
            $(".changeD").css("overflow","hidden") 
        }
       
    })
    $aleft.on('click',function(){
        if(num>4){
            num--
            $aright.css("color","#ccc")
            if($cul.children('li').length==num){
                $aright.css("color","#fff")      
            }
            $cul.animate({
                left:-(num - 4) * $(".changeImg ul li:first-child").width()
            });
            $(".changeD").css("overflow","hidden") 
        }
    })

    //加入购物车
    let $numsid=[]
    let $num =[]
    function cookie(){
        if(jscookie.get("num")&&jscookie.get("numsid")){
            $numsid=jscookie.get("numsid").split(",")
            $num=jscookie.get("num").split(",")
        }else{
            $numsid=[]
            $num =[]
        }
    }
    // if(!$(".joinnum").val()==''){
        $(".joinA").on('click',function(){
           
           if(localStorage.getItem('name')){
            window.location =`http://${location.hostname}/projectname/src/html/gwc.html`
            console.log(localStorage.getItem('name'))
            let $sid= $climg.attr('sid')
            cookie()
            if($.inArray($sid,$numsid)!=-1){
                let num=$num[$.inArray($sid,$numsid)]*1+$(".joinnum").val()*1;
                $num[$.inArray($sid,$numsid)]=num;
                jscookie.add("num",$num,7);
            }else{
                 $numsid.push($sid);
                 jscookie.add("numsid",$numsid,7)
                 $num.push($(".joinnum").val())
                 jscookie.add("num",$num,7)
                
            }
           }else{
                alert("请登入账号")
                window.location =`http://${location.hostname}/projectname/src/html/enter.html`
           }
         })
    // }
    if(localStorage.getItem('name')){
        $(".nouser").hide()
        $('.user').show()
        $(".tzUser").html(localStorage.getItem('name'))
    }else{
        $(".nouser").show()
        $('.user').hide()
    }
}(jQuery)