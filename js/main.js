// splitting & scrolla

$(document).on('click','a[href="#"]',function(e){
    e.preventDefault();
})
$(function(){
    $('.menuOpen').on('click',function (){
        $('body').toggleClass('on');
        $(this).toggleClass('on');
        $('.gnb').toggleClass('on');
    })
})
$(function () {
    Splitting()
    $('.animate').scrolla({
        // default
        mobile: false, // disable animation on mobiles
        once: false, // only once animation play on scroll
        animateCssVersion: 4 // used animate.css version (3 or 4)
    });
    const animationElem= document.querySelector(".sphere");
    let radius = 200;
    if(window.innerWidth<1024) radius=100;
    let fragment= document.createDocumentFragment();
    function createTextAnimation(){

        for(let i=1;i<=100;i++){
            const phi = Math.acos(-1 + (2 * i) / 100);
            const theta = Math.sqrt(100 * Math.PI) * phi;
            let part = document.createElement('span');
            part.textContent = "*";
            const xPos = radius * Math.sin(phi) * Math.cos(theta);
            const yPos = radius * Math.sin(phi) * Math.sin(theta);
            const zPos = radius * Math.cos(phi);
            part.style.transform = `translate3d(${xPos}px, ${yPos}px, ${zPos}px)`;
            fragment.appendChild(part);
        }
        animationElem.appendChild(fragment);
    }
    createTextAnimation();
    const target= document.querySelector(".textSphere"),
        targetWidth= target.offsetWidth,
        rangeTarget= document.querySelector(".visual"),
        deviceWidth= window.innerWidth;
    function moveAnimation(event){
        const x=event.pageX, y= event.pageY;
        let newX= x- targetWidth/4,newY= y- targetWidth/4;
        if(newX<0){
            newX=0;
        } else if(newX+targetWidth>rangeTarget.offsetWidth){
            newX= rangeTarget.offsetWidth - targetWidth;
        }
        if(newY<0){
            newY=0;
        } else if(newX+targetWidth>rangeTarget.offsetWidth){
            newY= rangeTarget.offsetHeight - targetWidth;
        }
        target.style.left=`${newX}px`;
        target.style.top=`${newY}px`
    }
    window.addEventListener("mousemove",function(event) {
        // if(deviceWidth<1280)return;
        moveAnimation(event);
    })
    window.addEventListener("click",function(event){
        if(deviceWidth>1280)return;
        moveAnimation(event);
    })
})
// header animation
$(function () {
    let prevScroll = 0;
    const wrapCss = getComputedStyle(document.querySelector(".wrap"));

    document.addEventListener('scroll', function () {
        const currentScroll = window.scrollY,
            header = $('header');
        if (currentScroll > prevScroll) {
            header.css({transform: 'translateY(-100%)'})
        } else {
            header.css({transform: 'translateY(0%)'})
        }
        prevScroll = currentScroll;
    })
})

//con01 gsap

$(function () {
    gsap.fromTo(".textSphere",{
        alpha:0,

    },{
        alpha:1
    },1)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.con01',
            start: '0% 80%',
            end: '100% 100%',
            scrub: 1,

        }
    });

    tl.to('.wrap', {
        backgroundColor: '#ffffff',
        color: "#000000",
        ease: 'none',
        duration: 5
    }, 0)
        .to('.scroll', {
            opacity: 0,
            ease: 'none',
            duration: 2
        }, 0)
        .to('.con01 .title h2', {
            opacity: 1,
            ease: 'none',
            duration: 5,

        }, 5)
        .fromTo('.videoWarp video', {
            clipPath: 'inset(60% 60% 60% 60% round 30%)'
        }, {
            clipPath: 'inset(0% 0% 0% 0% round 0%)',
            ease: 'none',
            duration: 10
        }, 0)
    gsap.timeline({
        scrollTrigger: {
            trigger: ".con02 .title",
            start: "0% 80%",
            end: "100% 80%",
            scrub: 1,
        }
    })
        .fromTo(
            ".con02 .title .a", {
                x: "200%",
                opacity: 0
            }, {
                x: "0%",
                opacity: 1,
                ease: "none",
                duration: 5
            }, 0
        )
        .fromTo(
            ".con02 .title .b", {
                opacity: 0,
                x: "-200%"
            }, {
                opacity: 1,
                x: "0%",
                ease: "none",
                duration: 5
            }, 0
        )
        .to('.wrap', {
            background: "#000",
            color: "#fff",
            duration: 5,
        })
    gsap.timeline({
        scrollTrigger: {
            trigger: ".con02 .title",
            start: "center 50%",
            endTrigger: ".workList",
            end: "bottom 100%",
            pin: true,

            scrub: 1
        }
    })
    const elemCss = getComputedStyle(document.querySelector('.workList')),
        pdBottom = parseFloat(elemCss.paddingBottom),
        offsetHeight = document.querySelector('.workList').offsetHeight;

    // get vh function
    function vh(percent) {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return (percent * h) / 100;
    }

    gsap.timeline({
        scrollTrigger: {
            trigger: ".workList",
            start: `${(offsetHeight - pdBottom) + vh(10)} 50%`,
            end: "100% 50%",
            scrub: 1,
        }
    })
        .fromTo(
            ".con02 .title .a", {
                x: "0%",
                opacity: 1
            }, {
                x: "-200%",
                ease: "none",
                opacity: 0,
                duration: 5
            }, 0
        )
        .fromTo(
            ".con02 .title .b", {
                x: "0%",
                opacity: 1
            }, {
                x: "200%",
                opacity: 0,
                ease: "none",
                duration: 5
            }, 0
        )
    gsap.timeline({
        scrollTrigger: {
            trigger: ".con03 ",
            start: `-50% 30%`,
            end: "50% 30%",
            scrub: 1,
        }
    })
        .from(".con03 .textWrap ul p", {
            duration: 10,
            delay: -5,
            y: -200,
            skewY: 20,
            alpha: 0,
            stagger: {
                amount: 1
            }
        },)
    gsap.timeline({
        scrollTrigger: {
            trigger: ".swiper",
            start: `0% 50%`,
            end: "0% 50%",
            scrub: 1,
        }
    })
        .fromTo(
            ".swiper", {

                opacity: 0
            }, {

                ease: "none",
                opacity: 1,
                duration: 5
            }, 0
        )
        .from(".btnWrap", {
            alpha: 0,
            x: "200%"
        },)
    gsap.timeline({
        scrollTrigger: {
            trigger: "footer",
            start: `-10% 50%`,
            end: "-10% 50%",
            scrub: 1,
            onEnter:() => {
               $(".btnWrap a").addClass("reverse");
                $(".swiper img").css("filter","brightness(100%)")
            },
            onLeaveBack : () => {
                $(".btnWrap a").removeClass("reverse")
                $(".swiper img").css("filter","brightness(50%)")
            },
        }
    })
        .to("footer",{
            background: "#000",
            color: "#fff",
        })
        .to('.wrap', {
            background: "#fff",
            color: "#000",
            duration: 5,
        })

})

$(function () {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 5,
        speed: 3500,
        autoplay: {
            delay: 0,
            enabled: true,
        }
    })
})