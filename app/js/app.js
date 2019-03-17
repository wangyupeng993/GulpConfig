window.onload = function (){
    /*const container = document.querySelector('#container')
    container.addEventListener('touchstart',function (e){e.preventDefault()},false)*/
    paceOptions = {
        ajax: false, // disabled
        document: false, // disabled
        eventLag: false, // disabled
        elements: {
            selectors: ['.my-page']
        }
    }
    Pace.on('start', function (){
        console.log('pace 开始加载！')
    })
    Pace.on('stop', function (){
        console.log('pace 停止加载！')
    })
    Pace.on('restart', function (){
        console.log('pace 重新加载！')
    })
    Pace.on('done', function (){
        console.log('pace 加载完成！')
    })
    Pace.on('hide', function (){})
    canvasLoading()
    getGlasses()
    PlayVideoKai()
    tailpage()
}
// 加载页
function canvasLoading() {
    const myCanvas = document.querySelector('#myCanvas');
    const c = document.querySelector('#myCanvas canvas');
    const ctx = c.getContext('2d');
    const borderWidth = $('#myCanvas').css('border-width')
    const fontWidth = $('#myCanvas').css('font-size')
    const lineWidth = borderWidth.substring(0,borderWidth.length - 2);
    const mW = c.width = $('#myCanvas').innerWidth() + 4;
    const mH = c.height = $('#myCanvas').innerHeight() + 4;
    const r = mW / 2; //中间位置
    const cR = r - 0.5 * lineWidth; //圆半径
    const startAngle = -(1 / 2 * Math.PI); //开始角度
    const endAngle = startAngle + 2 * Math.PI; //结束角度
    const xAngle = 1 * (Math.PI / 180); //偏移角度量
    const fontSize = fontWidth.substring(0,fontWidth.length - 2); //字号大小
    let tmpAngle = startAngle; //临时角度变量

    const rander = function(){
        if(tmpAngle >= endAngle){
            return;
        }else if(tmpAngle + xAngle > endAngle){
            tmpAngle = endAngle;
        }else{
            tmpAngle += xAngle;
        }
        ctx.clearRect(0, 0, mW, mH);

        //画圈
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#ffffff';
        ctx.arc(r, r, cR, startAngle, tmpAngle);
        ctx.stroke();
        ctx.closePath();

        //写字
        ctx.fillStyle = '#ffffff';
        ctx.font= fontSize + 'px Microsoft Yahei';
        ctx.textAlign='center';

        let loadtext = Math.round((tmpAngle -  startAngle) / (endAngle - startAngle) * 100)
        if (loadtext >= 99){
            loadtext = 99
            BootPageShow();
        }
        ctx.fillText( loadtext + '%', r, r + fontSize / 2);

        requestAnimationFrame(rander);
    }
    rander()
}
// 引导页显示
function BootPageShow(){
    $('.loading').hide()
    $('#guide').show(0,function (){
        $('#guide .bosss-kai').addClass('animated fadeInLeftBig')
        $('#guide .School-leader').addClass('animated fadeInRightBig')

        $('#guide .bosss-kai').on('animationEnd webkitAnimationEnd',function (){
            $('#guide .bosss-button').css({display:'flex'}).addClass('pulse')
            $('#guide .School-button').css({display:'flex'}).addClass('pulse')
        })
    })
}
// boss凯
function bossKai(){
    let backImg = ['./images/scene_four/44.jpg','./images/scene_five/55.jpg','./images/scene_six/66.jpg'];// 获取背景图
    let templateImage = ['./images/scene_four/d2.jpg','./images/scene_five/e2.jpg','./images/scene_six/f2.jpg'];// 模板图片背景
    let BossKai = ['./images/scene_four/d2.png','./images/scene_five/e2.png','./images/scene_six/f2.png']
    // boss凯滑屏
    const BossKaiSwiper = new Swiper('.boss-kai-container', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.boss-button-next',
            prevEl: '.boss-button-prev',
        },
        on:{
            //初始化
            init: function(){
                this.emit('transitionEnd')
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){},
            slideChangeTransitionEnd:function (){
                const ImageTemplateBg = backImg[this.activeIndex]
                const SyntheticImage = templateImage[this.activeIndex]
                const kai = BossKai[this.activeIndex]
                handleTouchstart($(".choice-button button"),function (){
                    $("#tailpage").css({
                        'background':'url("'+ImageTemplateBg+'") no-repeat center center',
                        'background-size':'cover'
                    }).show()
                    $('#canvas-image').css({
                        'background':'url("'+ImageTemplateBg+'") no-repeat center center',
                        'background-size':'cover'
                    }).show(0,function (){
                        setTimeout(function (){
                            html2canvas(document.querySelector('#canvas-image'))
                                .then(function(canvas) {
                                    $('#tailpage .save-image').attr('src',canvas.toDataURL())
                                    document.body.appendChild(canvas)
                                })
                        },1000)
                    })
                    $("#tailpage .template-image").css({
                        'background':'url("'+SyntheticImage+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $("#canvas-image .template-image").css({
                        'background':'url("'+SyntheticImage+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $("#tailpage .template-image > div").eq(0).css({
                        'background':'url("'+kai+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $("#canvas-image .template-image > div").eq(0).css({
                        'background':'url("'+kai+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $('#BossKai').hide()
                    $('.choice-button').hide()
                    $('.GetShare-button').show()
                })
            },
            slideNextTransitionEnd:function (){}
        }
    });
    const BossKaiSlideOne = new Swiper('.boss-scene-slide1', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.boss-glasses1-next',
            prevEl: '.boss-glasses1-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){}
        }
    });
    const BossKaiSlideTwo = new Swiper('.boss-scene-slide2', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.boss-glasses2-next',
            prevEl: '.boss-glasses2-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){}
        }
    });
    const BossKaiSlideThree = new Swiper('.boss-scene-slide3', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.boss-glasses3-next',
            prevEl: '.boss-glasses3-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){}
        }
    });
}
// 学生凯
function SchoolLeaderKai(){
    let backImg = ['./images/scene_one/11.jpg','./images/scene_two/22.jpg','./images/scene_three/33.jpg'];// 获取背景图
    let templateImage = ['./images/scene_one/a2.jpg','./images/scene_two/b2.jpg','./images/scene_three/c3.jpg'];// 模板图片背景
    let BossKai = ['./images/scene_one/a2.png','./images/scene_two/b2.png','./images/scene_three/c2.png']
    // 学长凯滑屏
    const SchoolKaiSwiper = new Swiper('.school-kai-container', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.School-button-next',
            prevEl: '.School-button-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                // this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){},
            slideChangeTransitionEnd:function (){
                const isIndex = this.activeIndex
                const ImageTemplateBg = backImg[this.activeIndex]
                const SyntheticImage = templateImage[this.activeIndex]
                const kai = BossKai[this.activeIndex]
                handleTouchstart($(".choice-button button"),function (){
                    const GetUrl = $('#SchoolLeaderKai .swiper-wrapper .glasses-choice').attr('src')
                    const Suffixname = GetUrl.substring(0,GetUrl.length - 4)
                    const AddClass = 'optics-glasses optics-glasses'+isIndex
                    console.log(isIndex,AddClass.toString())
                    $("#tailpage").css({
                        'background':'url("'+ImageTemplateBg+'") no-repeat center center',
                        'background-size':'cover'
                    }).show()

                    $('#canvas-image .sun-optics-glasses').addClass(AddClass)
                        .css({
                        'background':'url("'+Suffixname+'-2.png") no-repeat center center',
                        'background-size':'100% 100%'
                    })
                    $('#tailpage .sun-optics-glasses').addClass(AddClass)
                        .css({
                            'background':'url("'+Suffixname+'-2.png") no-repeat center center',
                            'background-size':'100% 100%'
                        })

                    $('#canvas-image').css({
                        'background':'url("'+ImageTemplateBg+'") no-repeat center center',
                        'background-size':'cover'
                    }).show(0,function (){
                        setTimeout(function (){
                            html2canvas(document.querySelector('#canvas-image'))
                                .then(function(canvas) {
                                    $('#tailpage .save-image').attr('src',canvas.toDataURL())
                                    document.body.appendChild(canvas)
                                })
                        },1000)
                    })
                    $("#tailpage .template-image").css({
                        'background':'url("'+SyntheticImage+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $("#canvas-image .template-image").css({
                        'background':'url("'+SyntheticImage+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $("#tailpage .template-image > div").eq(0).css({
                        'background':'url("'+kai+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $("#canvas-image .template-image > div").eq(0).css({
                        'background':'url("'+kai+'") no-repeat center center',
                        'background-size':'cover'
                    })
                    $('#SchoolLeaderKai').hide()
                    $('.choice-button').hide()
                    $('.GetShare-button').show()
                })
            }
        }
    });

    const SchoolKaiSlideOne = new Swiper('.school-scene-slide1', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.Schoo-glasses1-next',
            prevEl: '.Schoo-glasses1-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){}
        }
    });

    const SchoolKaiSlideTwo = new Swiper('.school-scene-slide2', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.Schoo-glasses2-next',
            prevEl: '.Schoo-glasses2-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){}
        }
    });

    const SchoolKaiSlideThree = new Swiper('.school-scene-slide3', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        observer:true,
        observeParents:true,
        navigation: {
            nextEl: '.Schoo-glasses3-next',
            prevEl: '.Schoo-glasses3-prev',
        },
        on:{
            //初始化
            init: function(){
                // shareFriend()
                this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
            },
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){},
            // 上一页结束
            slidePrevTransitionEnd:function (){}
        }
    });
}
// 播放视频
function PlayVideoKai(){
    var Audio = document.querySelector('#audio')
    let MusicOn = true
    let [u,app] = [navigator.userAgent,navigator.appVersion]
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    $('#music-on').on('touchstart',function (){
        if (MusicOn){
            Audio.play()
            $('#music-on').addClass('music-rotate')
        }else{
            Audio.pause()
            $('#music-on').removeClass('music-rotate')
        }
        MusicOn = !MusicOn
    })

    handleTouchstart($('#guide .bosss-button > div'),function (){
        const BossKiaVideo = document.querySelector('#BossKai-video')
        $('#guide').hide()
        $('.video-list').show()
        $("#BossKai-video").show()
        BossKiaVideo.play()
        Audio.pause()
        MusicOn = true
        $('#music-on').removeClass('music-rotate')

        BossKiaVideo.addEventListener('ended',function (){
            bossKai()
            $('.video-list').hide()
            $("#BossKai-video").hide()
            $("#BossKai").show()
            $('.choice-button').show()
            $(".bosskai-tips").show()
            setTimeout(function (){
                $(".bosskai-tips").hide()
            },2000)

        })
    })
    handleTouchstart($('#guide .School-button > div'),function (){
        const SchoolKaiVideo = document.querySelector('#SchoolKai-video')
        $('#guide').hide()
        $('.video-list').show()
        $("#SchoolKai-video").show()
        SchoolKaiVideo.play()
        Audio.pause()
        MusicOn = true
        $('#music-on').removeClass('music-rotate')

        SchoolKaiVideo.addEventListener('ended',function (){
            SchoolLeaderKai()
            $('.video-list').hide()
            $("#SchoolKai-video").hide()
            $("#SchoolLeaderKai").show(0,function (){})
            $('.choice-button').show()
            $(".Schoolkai-tips").show()
            setTimeout(function (){
                $(".Schoolkai-tips").hide()
            },2000)
        })
    })
}
// 获取用户点击的眼镜
function getGlasses(){
    handleTouchstart($('.Glasses-url'),function (self){
        const GetUrl = $(self).attr('src')
        const Suffixname = GetUrl.substring(0,GetUrl.length - 4)
        $('.Glasses-url').removeClass('glasses-choice')
        $(self).addClass('glasses-choice')
        $('#BossKai .boss-photo-frame .sun-glasses').css({
            'background':'url("'+Suffixname+'-2.png") no-repeat center center',
            'background-size':'cover'
        })
        $('#SchoolLeaderKai .school-photo-frame .optics-glasses').css({
            'background':'url("'+Suffixname+'-2.png") no-repeat center center',
            'background-size':'100% 100%'
        })
    })
}
// 尾页
function tailpage(){

    handleTouchstart($('.GetShare-button button').eq(1),function (){
        $('#tailpage .share').show()
    })

    handleTouchstart($('.GetShare-button button').eq(0),function (){
        window.location.reload()
    })

    handleTouchstart($('#tailpage .share'),function (){
        $('#tailpage .share').hide()
    })
}
//分享朋友
function shareFriend(){
    var url = encodeURIComponent(window.location.href);
    var shareImg = "http://h5.hking.top/CSVideo/images/share.png";
    var link = 'http://h5.hking.top/jssdk.php?url='+url;
    $.ajax({
        //api路劲
        url: link,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var appId = data.appId;
            var timestamp = data.timestamp;
            var nonceStr = data.nonceStr;
            var signature = data.signature;
            wx.config({
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'onMenuShareTimeline', 'onMenuShareAppMessage'
                ]
            });
            window.share_config = {
                "share": {
                    "imgUrl": shareImg,//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
                    "title": "宽三2019团年宴-期待与您共享这喜悦晚宴",//分享卡片标题
                    "desc": "宽三2019团年宴-期待与您共享这喜悦晚宴",//摘要,如果分享到朋友圈的话，不显示摘要。
                    "link": window.location.href,//分享出去后的链接，这里可以将链接设置为另一个页面。
                    "success": function () {},//分享成功后的回调函数
                    'cancel': function () {}
                }
            };
            wx.ready(function () {
                wx.onMenuShareAppMessage(share_config.share);//分享给好友
                wx.onMenuShareTimeline(share_config.share);//分享到朋友圈
                wx.onMenuShareQQ(share_config.share);//分享给手机QQ
                const Video = document.querySelector("#container video")
                const Audio = document.querySelector("#audio")
                Video.play()
                Audio.play()

                // 监听视频是否还在加载
                $("#container video").on("durationchange",function (){
                    $(".loading div").text("视频还在加载中........")
                    Video.pause()
                })

                $(document).on('touchstart',function (){
                    Video.play()
                    alert(123456789)
                    $('.loading').hide()
                    $('.video-list').show()
                })

                // 监听视频是否可以连续播放
                $("#container video").on("canplaythrough",function (){
                    $(".loading").hide()
                    $(".loading div").text("视频可以连续播放了！")
                    $(".video-list").show()
                    Video.play()
                    Audio.pause()
                })

                Video.addEventListener("ended",function(){
                    Audio.play()
                    $(".video-list").hide()
                    $(".loading").show()
                    $(".loading div").text('视频播放完毕！切换播放音乐')
                })
            });
            wx.error(function (res) {
                console.info(res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
        }
    });
}
//移动端点击事件封装
function handleTouchstart(obj,callback) {
    var startY = null;
    var endY = null;
    obj.on("touchstart",function (e){
        startY = e.changedTouches[0].pageY;
    });
    obj.on("touchend",function (e){
        endY = e.changedTouches[0].pageY;
        if (startY == endY){
            callback&&callback($(this));
        }

    });
};