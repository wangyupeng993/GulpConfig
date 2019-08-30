window.onload = function (){
    const scroll = new BScroll('.wrapper', {
        probeType: 3,
        scrollY: true
    })
    const mySwiper = new Swiper('.swiper-container', {
        autoplay: false,//可选选项，自动滑动
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
        }
    })
}

function abc(ev) {
    console.log(this)
    return false
}
