gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
duration:1.2,
smoothWheel:true
});
function raf(time){
lenis.raf(time);
requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
window.addEventListener("load",()=>{
gsap.to(".loader",{
opacity:0,
duration:1,
delay:.5,
onComplete:()=>{
document.querySelector(".loader").style.display="none";
}
});
});
const header=document.querySelector(".header");
window.addEventListener("scroll",()=>{
if(window.scrollY>100){
header.style.background="rgba(10,10,10,.85)";
header.style.padding="15px 0";
}else{
header.style.background="rgba(10,10,10,.35)";
header.style.padding="25px 0";
}
});
gsap.from(".hero__content > *",{
opacity:0,
y:80,
duration:1.2,
stagger:.15,
ease:"power4.out",
delay:.8
});
gsap.from(".hero__card",{
opacity:0,
x:80,
duration:1.3,
delay:1,
ease:"power3.out"
});
gsap.to(".hero__image",{
yPercent:10,
force3D:true,
ease:"none",
scrollTrigger:{
trigger:".hero",
start:"top top",
end:"bottom top",
scrub:.5,
invalidateOnRefresh:true
}
});
gsap.utils.toArray("section").forEach(section=>{
let selector="h2,p,.timeline__item,.stats div";

if(section.matches(".family-tree,#research")){
selector=":scope > .container > h2,:scope > .container > .subtitle";
}

const elements=section.querySelectorAll(selector);

if(!elements.length){
return;
}

gsap.from(elements,{
opacity:0,
y:60,
duration:1,
stagger:.12,
ease:"power3.out",
scrollTrigger:{
trigger:section,
start:"top 75%"
}
});
});
gsap.from(".timeline",{
opacity:0,
scrollTrigger:{
trigger:".timeline",
start:"top 80%",
end:"bottom center",
scrub:true
}
});
gsap.to(".hero__card",{
y:-20,
duration:2,
repeat:-1,
yoyo:true,
ease:"sine.inOut"
});
const buttons=document.querySelectorAll(".button");
buttons.forEach(button=>{
button.addEventListener("mouseenter",()=>{
gsap.to(button,{
scale:1.05,
duration:.3
});
});
button.addEventListener("mouseleave",()=>{
gsap.to(button,{
scale:1,
duration:.3
});
});
});
document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener("click",e=>{
const target=document.querySelector(
link.getAttribute("href")
);
if(target){
e.preventDefault();
lenis.scrollTo(target);
}
});
});
const contactForm=document.querySelector(".contact-form");
if(contactForm){
contactForm.addEventListener("submit",event=>{
event.preventDefault();
const submitButton=contactForm.querySelector('button[type="submit"]');
const originalText=submitButton.textContent;
submitButton.disabled=true;
submitButton.textContent="Заявка отправлена";
setTimeout(()=>{
contactForm.reset();
submitButton.disabled=false;
submitButton.textContent=originalText;
},1800);
});
}
window.addEventListener("error",(e)=>{
console.warn("Site error:",e.message);
});
document.querySelectorAll("img").forEach(img=>{
if(img.complete && img.naturalWidth>0){
img.classList.add("loaded");
return;
}

img.addEventListener("load",()=>{
img.classList.add("loaded");
},{once:true});
});
