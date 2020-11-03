var slideIndex = 0;
var pageIndex ;
// showSlides cagyarya dushundim, boldumy onda?onda 2 durli js file gerekmj name?
// hawa yone menki yaly smooth gecis etmek ucin 1 html ulanmaly bolyan, yogsa page transition smooth bolmaz
showWelcome();
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("myslide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

$("#box").click(function () {
  alert("Handler for .click() called.");
});

function showPage( ){

  var i;
  var pages = document.getElementsByClassName("page");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  pageIndex++;
  if (pageIndex > pages.length) {
    pageIndex = 1;
  }
  pages[pageIndex - 1].style.display = "block";
   // Change image every 2 seconds
}

function showImgPick()
{
  alert("Button clicked");
  pageIndex = 1;
  showPage();
}

function showWelcome()
{
  pageIndex = 0;
  showPage();
}