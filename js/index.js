
$(function(){
//    鼠标移上天气，显示天气盒子
/*$('.weather').hover(function(){
    $('.weather-box').stop().slideToggle(500);
})*/
    $('.header').on('click','.weather',function(){
        $(this).children('.weather-box').slideToggle(500);
    })

//    鼠标移上更多，显示更多盒子
    $('.more').hover(function(){
        $('.more-layer').stop().toggle();
    })

//    d当页面滚动的时候，给推荐部分固定定位
    $(window).scroll(function(){
       if($(document).scrollTop()>$('.header').height()){
           $('.logo-command').css({
               'position':'fixed',
           });
       }else{
           $('.logo-command').css({
               'position':'absolute',
           });
       }
    })

//    当页面滚动到许可证区域结束后的时候，给热门新闻部分固定定位
    $(window).scroll(function(){
        if($(document).scrollTop()>2916){
            $('.hot-news').css({
                'position':'fixed',
                'top':10
            });
            $('.templet').css({
                'position':'fixed',
                'top':372
            });
        }else{
            $('.hot-news').css({
                'position':'static',
            });
            $('.templet').css({
                'position':'static',
            });
        }
    })


//    呼吸灯
function carousel(){
    //    选中的按钮颜色和样式发生改变

    var $tabLis=$('.tab-list li');
    var $selLis=$('#carousel-list li');

    var arrText=['泥石流','房价','王思聪前女友','蔡依林','军人','阴阳师']
    $tabLis.click(function(){

        $(this).css('backgroundColor','#C43A3A').siblings().css('backgroundColor','#222');
        $(this).siblings().find('i').hide();
        $(this).find('i').show();
        //让当前的图片显示，其它的隐藏
        num=square=$(this).index();
        $selLis.eq($(this).index()).animate({'opacity':1},2000)
            .siblings().animate({'opacity':0},2000);

        $('#detail').text(arrText[$(this).index()]);

    })

    var timer=null;
    //鼠标移上大盒子，自动播放停止，移开继续
    $('.carousel').mouseover(function(){
        clearInterval(timer);
    });
    $('.carousel').mouseout(function(){
        timer=setInterval(autoPlay,2000);
    })
    //每两秒动一次
    timer=setInterval(autoPlay,2000);
    var num=0;
    var square=0;
    function autoPlay(){
        if(num<$selLis.length-1){
            num++;
        }else{
            num=0;
        }
        $selLis.eq(num-1).stop().animate({'opacity':0},500);
        $selLis.eq(num).stop().animate({'opacity':1},500);
        $('#detail').text(arrText[num]);

        if(square<$tabLis.length-1){
            square++;
        }else{
            square=0;
        }
        $tabLis.eq(square).css('backgroundColor','#C43A3A').siblings().css('backgroundColor','#222');
        $tabLis.eq(square).siblings().find('i').hide();
        $tabLis.eq(square).find('i').show();
        $('#detail').text(arrText[square]);
    }
}

carousel();





//    输入信息的时候，搜索框的变化
    var arr=['黑马七期第一次项目','栀子花组获取第一名','栀子花开电影','黑马前端培训','栀子花开的季节','栀子花开，so beautiful so white','栀子花的养殖方法和注意事项','栀子花蔫了怎么办'];
    $('input.search-txt').keyup(function(){
        var $value=$(this).val();
        var filter=[];
        for(var i=0;i<arr.length;i++){
            if(arr[i].indexOf($value)==0){
                filter.push(arr[i]);
            }
        }
        var $layer=$('#layer');
        if($layer[0]){
            $('.form-bd')[0].removeChild($layer[0]);
        }
        if(!$value){
            return;
        }
        if(!filter.length){
            return;
        }
        $layer[0]=document.createElement('div');
        $layer[0].setAttribute('id','layer');
        $layer[0].setAttribute('class','layer');
        var ul=document.createElement('ul');
        ul.setAttribute('class','mh-search');
        $layer[0].appendChild(ul);
        $('.form-bd')[0].appendChild($layer[0]);

        var str='';
        for(var j=0;j<filter.length;j++){
            str+='<li class="search-item">'+
                '<a href="javascript:">'+
                '<i class="search-no" style="color: #F85959;">'+(j+1)+'</i>'+
                '<span class="search-msg">'+filter[j]+'</span>'+
                '</a>'+
                '</li>';
            ul.innerHTML=str;


            $('.form-bd').on('click',function(e){
                var t= e.target;
                if(t.tagName=='SPAN'){
                    $('input.search-txt').val($(t).text());
                }
                $(t).parents('#layer').hide() ;
            })
        }


    })
//遮罩层
   $('.bg').height($(document).height());
    $('.bg').width($(document).width());

    $('.checkNews').click(function(){
        $('.bg').show();
        $('.create-news').show();
    })


    $('#sure').on('click',function(){
        var url = window.URL.createObjectURL(document.getElementById('create-img').files.item(0))
        $("#img01").attr("src", url);
    })
    $('#sure02').on('click',function(){
        var url = window.URL.createObjectURL(document.getElementById('create-icon').files.item(0))
        $("#img02").attr("src", url)
    })


//    动态添加新闻

var content=''
    $('#send').on('click',function(){
        var timer=getDate(new Date());
        var comment=Math.floor(Math.random()*50+100);
        var obj={
            title:$('.create-title').val(),
            img:$("#img01").attr("src"),
            icon:$("#img02").attr("src"),
            food:$('#select').val(),
            web:$('#web').val(),
            time:timer,
            comment:comment
        }

        if(obj.title=="" || obj.img=="" || obj.icon=="" || obj.food=="" || obj.web==""){
            alert('请填写完整好么？亲');
            return;
        }
       content= '<li class="News_list">'+
            '<i class="iconfont" title="不感兴趣">&#xe634;</i>'+
        '<div class="News">'+
            '<div class="news-img fl">'+
            '<a href="javascript:" class="big-img">'+
            '<img src='+obj.img+' alt=""/>'+
            '</a>'+
            '</div>'+
            '<h3 class="fl"><a href="javascript:">'+obj.title+'</a></h3>'+
        '<p>'+
        '<a href="javascript:" class="sign">'+obj.food+'</a>'+
            '<a href="javascript:" class="mask">'+
            '<img src='+obj.icon+' alt=""/>'+
            '</a>'+
            '<a href="javascript:">'+obj.web+'·</a>'+
        '<a href="javascript:" id="comment">&nbsp;'+obj.comment+'条评论&nbsp;·</a>'+
        '<span class="time">'+obj.time+' 前发布</span>'+
        '</p>'+
        '</div>'+
        '</li>';

        $('#ulList').append(content);
        $('.bg').hide();
        $('.create-news').hide();

        $('.News_list').on('click','.iconfont',function(e){
           /* var t= e.target;
            if(t.tagName=='I'){*/
                $(e.target).parent('.News_list').animate({
                    'width':0,
                    'height':0,
                    'opacity':0
                },500).hide(500);
            //}

        })

    })
//关闭弹出创建框
    $('.create-news i').on('click',function(){
       $(this).parent('.create-news').hide();
        $('.bg').hide();
    })


//点击交叉按钮关闭删除新闻
    $('.News_list').on('click','.iconfont',function(e){
      /*  var t= e.target;
      if(t.tagName=='I'){*/
            $(e.target).parent('.News_list').animate({
                'width':0,
                'height':0,
                'opacity':0
            },500).hide(500);
        //}

    })



//    回到顶部
    $('.go-top').click(function () {
        $('body').animate({'scrollTop': '0'}, 500);
    })


//    反馈弹出框
    $('#fback').on('click',function(){
        $('.feedback_dialog').show();
    })
//    关闭反馈弹出框
    $('.feedback_panel .close').on('click',function(){
        $('.feedback_dialog').hide();
    })


//    反馈信息
    $('#email').blur(function(){
       var $value= $('#email').val();
        if(!isEmail($value)){
            shake($('#email')[0]);
            $('#email').val("");
        }

    })

    //检测是否符合标准
        function isEmail(str){
            var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            return reg.test(str);
        }

//    提交反馈检测
    $('.submit').on('click',function(){
        if(!$('#email').val() || !$('.content-msg').val()){
            alert('提交不能为空');
            return false;
        }else{
            alert('提交成功，谢谢您的建议')
        }
    })


//抖动函数
    function shake(obj){
        var pos=obj.offsetLeft;
        clearInterval(obj.timer);

        var arr=[];
        var num=0;
        for(var i=15;i>0;i-=2){
            arr.push(i,-i);
        }
        arr.push(0);

        obj.timer=setInterval(function(){
            obj.style.left=pos+arr[num]+'px';
            num++;
            if(num===arr.length-1){
                clearInterval(obj.timer);
            }
        },30);
    }

//    获取时间函数
    function getDate(obj) {
        var year = obj.getFullYear();
        var month = obj.getMonth() + 1;
        var day = obj.getDate();
        var hour = obj.getHours();
        var minute = obj.getMinutes();
        var second = obj.getSeconds();

        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
    }
})



/*Ajax获取天气*/




$.ajax({
    type:'get',
    url:'http://api.map.baidu.com/telematics/v3/weather',
    data:{ak:'zVo5SStav7IUiVON0kuCogecm87lonOj',location:'江门',output:'json'},
    dataType:'jsonp',
    success:function(info){
        var data=info.results[0].weather_data;
        console.log(data);
        var info={
            list:data
        }
        //console.log(data);
        var str=template('tmp',info);
        $('.header').append(str);
    }


})