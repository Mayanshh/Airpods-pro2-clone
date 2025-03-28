document.querySelector("#vid").pause();


function loco() {
   gsap.registerPlugin(ScrollTrigger);

   // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

   const locoScroll = new LocomotiveScroll({
     el: document.querySelector(".main-wrapper"),
     smooth: true
   });
   // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
   locoScroll.on("scroll", ScrollTrigger.update);

   // tell ScrollTrigger to use these proxy methods for the ".main-wrapper" element since Locomotive Scroll is hijacking things
   ScrollTrigger.scrollerProxy(".main-wrapper", {
     scrollTop(value) {
       return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
     getBoundingClientRect() {
       return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
     },
     // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
     pinType: document.querySelector(".main-wrapper").style.transform ? "transform" : "fixed"
   });


   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

   // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
   ScrollTrigger.refresh();
};
loco();



gsap.to(".page-1 > video",{
  scrollTrigger:{
    trigger:'.page-1 > video',
    start:'2% top',
    end:'bottom 25%',
    markers:false,
    scroller:'.main-wrapper',
    scrub:2
  },
  onStart:()=>{
    document.querySelector("#vid").play();
  }
});

gsap.to(".page1",{
  scrollTrigger:{
  trigger:'.page1',
    start:'top top',
    end:'bottom top',
    scroller:'.main-wrapper',
    pin:true
  }
});

var tl = gsap.timeline({
  scrollTrigger:{
    trigger:'.page4',
    start:'top top',
    end:'bottom top',
    scroller:'.main-wrapper',
    scrub:2,
    markers:false,
    pin:true
  }
});

tl.to(".page4 img",{
  left:'10%',
});

tl.to(".page7 img",{
  boxShadow: '0px 0px 105px 2px rgba(45,255,196,0.9)'
});


document.getElementById("openNav").addEventListener('click',()=>{
  document.querySelector(".navopen").style.right = '0';
});


document.getElementById("closeNav").addEventListener('click',()=>{
  document.querySelector(".navopen").style.right = '-50%';
});


document.querySelector(".stickyNav button").addEventListener('click',()=>{
  window.location.href = "https://www.apple.com/in/shop/product/MTJV3HN/A/airpods-pro"
});

let signupLink = "https://secure5.store.apple.com/in/shop/signIn?ssi=1AAABkCbpPGgg83I7i_n7XicaW6LRlWb7a_S8kvkg0fti8vnpw9qQvnIAAAAnaHR0cHM6Ly93d3cuYXBwbGUuY29tL2luL2FpcnBvZHMtcHJvL3x8AAIB9oYaqz1aHKfe2JEvwq_yMQTuvBKaxWUeyspt5S1eX8I";

document.getElementById('shop').addEventListener('click',()=>{
  window.location.href = signupLink;
});