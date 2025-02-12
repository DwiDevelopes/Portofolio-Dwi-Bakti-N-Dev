window.addEventListener("load", function() {
    // Menyembunyikan preload setelah halaman selesai dimuat
    document.getElementById("preloader").style.display = "none";
    
    // Menampilkan konten halaman
    document.querySelector(".content").style.display = "block";
});
var sound = new Audio ("sound_click/click.mp3") 
function clickEffect(e){
    sound.play();
      var d=document.createElement("div");
      d.className="clickEffect";
      d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
      document.body.appendChild(d);
      d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
    }
    document.addEventListener('click',clickEffect);