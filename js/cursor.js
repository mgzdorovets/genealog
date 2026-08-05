const cursor=document.querySelector(".cursor");

if(cursor){

let mouseX=0;
let mouseY=0;

let cursorX=0;
let cursorY=0;


document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;
mouseY=e.clientY;

});


function animateCursor(){

cursorX+=(mouseX-cursorX)*0.15;
cursorY+=(mouseY-cursorY)*0.15;

cursor.style.left=cursorX+"px";
cursor.style.top=cursorY+"px";

requestAnimationFrame(animateCursor);

}

animateCursor();



const hoverElements=document.querySelectorAll(
"a,button,.card,.hero__card,.timeline__item"
);


hoverElements.forEach(element=>{


element.addEventListener("mouseenter",()=>{

gsap.to(cursor,{
scale:3,
duration:.3,
backgroundColor:"#b8945e"
});

});


element.addEventListener("mouseleave",()=>{

gsap.to(cursor,{
scale:1,
duration:.3,
backgroundColor:"#b8945e"
});

});


});


}