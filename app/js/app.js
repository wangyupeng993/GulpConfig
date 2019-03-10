window.onload = function (){
    //分享朋友
    function shareFriend(){
        var url = encodeURIComponent(window.location.href);
        var shareImg = "http://h5.hking.top/KS2019/images/share.jpg";
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
                    let Duration = null
                    Video.play()
                    $("#container video").on("durationchange",function (){
                        $(".duration p").text("durationchange事件")
                        Video.pause()
                    })
                    $("#container video").on("canplaythrough",function (){
                        $(".duration p").text("canplaythrough事件")
                        Video.play()
                        Duration = Video.duration
                    })

                    $("#container video").on("timeupdate",function (){
                        $(".duration p").text("timeupdate")
                        if (Video.currentTime >= Duration){
                            $(".duration p").text("播放完毕")
                            Video.pause()
                        }
                        Duration = Video.duration
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
    function tabClick(obj,callback) {
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
    const sceneOneSwiper = new Swiper('.scene-one-container', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    // 场景一滑屏
    const sceneTwoSwiper = new Swiper('.scene-two-container', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    // 场景二滑屏
    const sceneOneSlideOne = new Swiper('.scene-one-slide1', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    const sceneOneSlideTwo = new Swiper('.scene-one-slide2', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    const sceneOneSlideThree = new Swiper('.scene-one-slide3', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    const sceneTwoSlideOne = new Swiper('.scene-two-slide1', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    const sceneTwoSlideTwo = new Swiper('.scene-two-slide2', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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

    const sceneTwoSlideThree = new Swiper('.scene-two-slide3', {
        // direction : 'vertical',
        height: window.innerHeight,
        autoplay: false,//可选选项，自动滑动
        allowTouchMove: true,
        updateOnImagesReady:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on:{
            //初始化
            init: function(){
                shareFriend()
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