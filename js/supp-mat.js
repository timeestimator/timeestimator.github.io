const nb_pages_exp = 19;
var slideIndex = 1;

function init() {

	document.getElementById("title1").className += "unselected";

	var prev_button = document.getElementById("prev-button");
	for(var i = 1 ; i <= nb_pages_exp ; i++){
		var new_img = tmpl("exp_images_template", {id: i});
		$(new_img).insertBefore(prev_button);
		$('#dots-container').append(tmpl("dots_template", {id: i}));
	}


	var folder = "images/dotplots/";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", folder, true);
	xhr.responseType = 'document';
	xhr.onload = () => {
	   var i20 = 0;
	   var i50 = 0;
	  if (xhr.status === 200) {
	    var elements = xhr.response.getElementsByTagName("a");
	    for (x of elements) {
	      if ( x.href.match(/\.(svg)$/) ) {
	          let img = document.createElement("img");
	          img.src = x.href;
	          if (x.href.includes("20_")){
	          	if (i20%2 == 0) {
	          		document.getElementById('column1').append(img);
	          	} else {
	          		document.getElementById('column2').append(img);
	          	}
	          	i20++;
	          } else {
	          	if (i50%2 == 0) {
	          		document.getElementById('column2').append(img);
	          	} else {
	          		document.getElementById('column1').append(img);
	          	}
	          	i50++;
	          }
	      } 
	    };
	  } 
	  else {
	    alert('Request failed. Returned status of ' + xhr.status);
	  }
	}
	xhr.send()


	showSlides(slideIndex);

}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function toggleSlideShow() {
	var container = document.getElementById("exp-images-container");
	container.hidden = !container.hidden;
	if (container.hidden) {
		document.getElementById("arrow1").src = "images/arrow-down.png";
	} else {
		document.getElementById("arrow1").src = "images/arrow-up.png";
	}
}

function toggleGallery() {
	var container = document.getElementById("res-images-container");
	container.hidden = !container.hidden;
	if (container.hidden) {
		document.getElementById("arrow2").src = "images/arrow-down.png";
	} else {
		document.getElementById("arrow2").src = "images/arrow-up.png";
	}

}


function changePage() {
	window.location.href = "index.html";
}

function toScenario() {
	document.getElementById("exp-images-container").hidden=false;
	document.getElementById("arrow1").src = "images/arrow-up.png";
	document.getElementsByClassName("clickable-title")[0].scrollIntoView();
}

function toDotplots() {
	document.getElementById("res-images-container").hidden=false;
	document.getElementById("arrow2").src = "images/arrow-up.png";
	document.getElementsByClassName("clickable-title")[1].scrollIntoView();
}





































window.onload = init;