var WUG=function(m,p){function g(a,c){a.className.match(RegExp("(\\s|^)"+c+"(\\s|$)"))||(a.className+=" "+c)}function n(a,c){if(a.className.match(RegExp("(\\s|^)"+c+"(\\s|$)")))a.className=a.className.replace(RegExp("(\\s|^)"+c+"(\\s|$)")," ").replace(/^[ ]+|[ ]+$/,"")}function f(){function a(){clearTimeout(e);c()}function c(){b.removeEventListener("mouseout",a,!1)}var b=this,d=f.current||b,e;b.addEventListener("mouseout",a,!1);e=setTimeout(function(){n(d,"active");g(b,"active");c();f.current=b;updateDisplacement(b.getAttribute("data-date"))},
200)}function h(){}function i(){container.removeEventListener("mousemove",h,!1);container.removeEventListener("mouseup",i,!1);container.removeEventListener("mouseout",j,!1);container.style.cursor="auto"}function j(){container.removeEventListener("mousemove",h,!1);container.removeEventListener("mouseup",i,!1);container.removeEventListener("mouseout",j,!1)}function d(){var a=d.open;a?o.className="":g(o,"show");d.open=!a;a?container.removeEventListener("mousedown",d,!1):container.addEventListener("mousedown",
d,!1)}if(!p.validateWebGL())return!1;document.getElementById("gui-container");document.getElementById("date-display");var o=document.getElementById("about");document.getElementById("about-toggle").addEventListener("click",d,!1);document.addEventListener("keydown",function(a){function c(){if(!b)return!1;d=b.getAttribute("data-date");if(!d)return!1;updateDisplacement(d);n(e,"active");g(b,"active");f.current=b}var b,d,e=f.current||k[0];switch(a.keyCode){case 39:b=e.previousSibling;c();break;case 37:b=
e.nextSibling,c()}},!1);document.addEventListener("keyup",function(){},!1);container.addEventListener("mousedown",function(a){a.preventDefault();container.addEventListener("mousemove",h,!1);container.addEventListener("mouseup",i,!1);container.addEventListener("mouseout",j,!1);container.style.cursor="move"},!1);container.addEventListener("mousewheel",function(a){a.preventDefault();l&&zoom(0.3*a.wheelDeltaY);return!1},!1);var l=!1;container.addEventListener("mouseover",function(){l=!0},!1);container.addEventListener("mouseout",
function(){l=!1},!1);window.addEventListener("resize",function(){console.log("resize");camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);for(var a=Math.floor(window.innerWidth/b),c=0,b=k.length;c<b;c++)k[c].style.width=a+"px"},!1);m.getData();var k=[];d.open=!1;return m}(WUG||{},THREE);