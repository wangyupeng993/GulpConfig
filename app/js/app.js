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
    Pace.on('hide', function (){
        // canvasLoading()
    })
    canvasLoading()
    bossKai()
    SchoolLeaderKai()
    PlayVideoKai()
}
// 加载页
function canvasLoading() {
    const myCanvas = document.querySelector('#myCanvas');
    const c = document.querySelector('#myCanvas canvas');
    const ctx = c.getContext('2d');
    const mW = c.width = $('#myCanvas').innerWidth() + 4;
    const mH = c.height = $('#myCanvas').innerHeight() + 4;
    const lineWidth = 4;
    const r = mW / 2; //中间位置
    const cR = r - 0.5 * lineWidth; //圆半径
    const startAngle = -(1 / 2 * Math.PI); //开始角度

    const endAngle = startAngle + 2 * Math.PI; //结束角度
    const xAngle = 1 * (Math.PI / 180); //偏移角度量
    const fontSize = 35; //字号大小
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
    let backImg = null;// 获取背景图
    var isIndex = null;
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
            init: function(){},
            //上一页
            slideChangeTransitionStart: function(){},
            // 下一页结束
            slideNextTransitionEnd:function (){
                console.log(this.activeIndex + '下一页结束')
            },
            // 上一页结束
            slidePrevTransitionEnd:function (){
                console.log(this.activeIndex + '上一页结束')
                // Choice($('.boss-kai-container').find('.scene-slide'),this.activeIndex)
            },
            slideNextTransitionEnd:function (){
                console.log(this.activeIndex + '运动结束')
                handleTouchstart($(".choice-button button"),function (){
                    console.log($('.boss-kai-container .swiper-wrapper .swiper-slide'))
                })
            }
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
            slidePrevTransitionEnd:function (){}
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
            nextEl: '.schoo-glasses1-next',
            prevEl: '.schoo-glasses1-prev',
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
    let [u,app] = [navigator.userAgent,navigator.appVersion]
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    handleTouchstart($('#guide .bosss-button > div'),function (){
        const BossKiaVideo = document.querySelector('#BossKai-video')
        $('#guide').hide()
        $('.video-list').show()
        $("#BossKai-video").show()
        BossKiaVideo.play()

        BossKiaVideo.addEventListener('ended',function (){
            $('.video-list').hide()
            $("#BossKai-video").hide()
            $("#BossKai").show()
            $('.choice-button').show()
        })
    })
    handleTouchstart($('#guide .School-button > div'),function (){
        const SchoolKaiVideo = document.querySelector('#SchoolKai-video')
        $('#guide').hide()
        $('.video-list').show()
        $("#SchoolKai-video").show()
        SchoolKaiVideo.play()

        SchoolKaiVideo.addEventListener('ended',function (){
            $('.video-list').hide()
            $("#SchoolKai-video").hide()
            $("#SchoolLeaderKai").show()
            $('.choice-button').show()
        })
    })
}
// 选择好了
function Choice(obj,index,imgUrl){
    const isIndex = index
    const backImage = obj.eq(isIndex).css('backgroundImage')
    handleTouchstart($(".choice-button button"),function (){
        console.log(isIndex)
        if (isIndex !== index){
            console.log(backImage)
        }
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
            callback&&callback();
        }

    });
};