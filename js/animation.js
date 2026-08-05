gsap.set(
"h1,h2,.about__photo,.card,.timeline__item,.contacts__box",
{
opacity:1
}
);
gsap.registerPlugin(ScrollTrigger);
const revealItems=document.querySelectorAll(
".about__photo,.card,.timeline__item,.contacts__box"
);
revealItems.forEach(item=>{
gsap.from(item,{
opacity:0,
y:80,
duration:1,
ease:"power3.out",
scrollTrigger:{
trigger:item,
start:"top 85%",
toggleActions:"play none none reverse"
}
});
});
const titles=document.querySelectorAll(
"h1,h2"
);
titles.forEach(title=>{
gsap.from(title,{
opacity:1,
y:0,
duration:1.4,
ease:"power4.out",
scrollTrigger:{
trigger:title,
start:"top 80%"
}
});
});
gsap.utils.toArray(".photo-placeholder").forEach(photo=>{
gsap.from(photo,{
clipPath:"inset(0 100% 0 0)",
duration:1.5,
ease:"power4.inOut",
scrollTrigger:{
trigger:photo,
start:"top 80%"
}
});
});
gsap.utils.toArray(".card").forEach(card=>{
card.addEventListener("mousemove",(e)=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
const rotateY=(x/rect.width-.5)*12;
const rotateX=(y/rect.height-.5)*-12;
gsap.to(card,{
rotateY,
rotateX,
duration:.3,
ease:"power2.out",
transformPerspective:800
});
});
card.addEventListener("mouseleave",()=>{
gsap.to(card,{
rotateX:0,
rotateY:0,
duration:.5
});
});
});
gsap.utils.toArray(".stats strong").forEach(counter=>{
let value=counter.innerText;
if(value.includes("+")){
let number=parseInt(value);
let obj={count:0};
gsap.to(obj,{
count:number,
duration:2,
ease:"power2.out",
scrollTrigger:{
trigger:counter,
start:"top 80%"
},
onUpdate:()=>{
counter.innerHTML=
Math.floor(obj.count)+"+";
}
});
}
});
gsap.to(".hero__scroll",{
opacity:0,
scrollTrigger:{
trigger:".hero",
start:"top top",
end:"300px",
scrub:true
}
});
gsap.from(".tree__line",{
scaleY:0,
transformOrigin:"top",
duration:1,
stagger:.3,
scrollTrigger:{
trigger:".family-tree",
start:"top 70%"
}
});
gsap.from(".person",{
opacity:0,
scale:.7,
y:50,
duration:1,
stagger:.2,
scrollTrigger:{
trigger:".tree",
start:"top 75%"
}
});
gsap.from(".map__route",{
scaleX:0,
duration:1.5,
stagger:.4,
scrollTrigger:{
trigger:".migration",
start:"top 70%"
}
});
gsap.from(".map__point",{
opacity:0,
scale:0,
duration:.8,
stagger:.3,
scrollTrigger:{
trigger:".migration",
start:"top 70%"
}
});