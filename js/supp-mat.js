const nb_pages_exp = 19;
var slideIndex = 1;

dotplots = ["dotplot_50_visualization_600b20816045db14f99b7ad9.svg","dotplot_50_visualization_5ffcc820426b8c19e80f397a.svg","dotplot_50_visualization_5fe61440bbdf7f42912e384d.svg","dotplot_50_visualization_5fc9fc26d4b95a50fbc707e2.svg","dotplot_50_visualization_5fb022b44ab51d394d94ff89.svg","dotplot_50_visualization_5f9a11a62b9359095b01dc44.svg","dotplot_50_visualization_5f984a1468d96a0e4f60cd36.svg","dotplot_50_visualization_5f89f86fb21646082bb5de4c.svg","dotplot_50_visualization_5f6b7ace9e048f081fc39b54.svg","dotplot_50_visualization_5f6736b2bbb75e32460eb8c5.svg","dotplot_50_visualization_5f63a2bc08a0080c790f8eb6.svg","dotplot_50_visualization_5f5bbc6e72522513dedb9b45.svg","dotplot_50_visualization_5f4e8bff46fdba08bb5dba95.svg","dotplot_50_visualization_5f3fa50ad4ad3d025f3bca8e.svg","dotplot_50_visualization_5f3db47b999c3a1cad47ddc6.svg","dotplot_50_visualization_5f2ca199795464000965740d.svg","dotplot_50_visualization_5f22bc5b0886160248eb5f9c.svg","dotplot_50_visualization_5efe47f7842bef14fbd862e4.svg","dotplot_50_visualization_5ee8c311b90cb31db14a10b4.svg","dotplot_50_visualization_5ee0f59b395f86467bb14568.svg","dotplot_50_visualization_5edfa481682c5928318fe96c.svg","dotplot_50_visualization_5edd1cfb9a2ae09ff1250c9c.svg","dotplot_50_visualization_5e8cb61867aece067e7dc59a.svg","dotplot_50_visualization_5e823e98787e610c268f289a.svg","dotplot_50_visualization_5e7b57561d6961144ea5c6ca.svg","dotplot_50_visualization_5e35a3e69fa74954d2f843d6.svg","dotplot_50_visualization_5e29d9e4e5e9b4000c4c30b1.svg","dotplot_50_visualization_5df5143f58a5c738d0e197af.svg","dotplot_50_visualization_5deeb3dd8bf3da55c2f6a507.svg","dotplot_50_visualization_5dd730a4a71de86e4ea35a87.svg","dotplot_50_visualization_5db0c396ff30f700136bc805.svg","dotplot_50_visualization_5d8a98c6f62b5600194549a8.svg","dotplot_50_visualization_5d6906bf2aedf5001509d5f4.svg","dotplot_50_visualization_5ba429d68b201600012f6d27.svg","dotplot_50_slider_6031a01022a1fb133e295290.svg","dotplot_50_slider_602fb33786b077cdbad2d5bb.svg","dotplot_50_slider_602ed31ccd3854b2f1500569.svg","dotplot_50_slider_602a41d2705706481b26d86e.svg","dotplot_50_slider_602691763444df34d0917731.svg","dotplot_50_slider_601aa5ad4bb8ca3105c57b47.svg","dotplot_50_slider_60195402b054bd01782473ee.svg","dotplot_50_slider_601449dda0361e414cccbbdc.svg","dotplot_50_slider_60142d79e4c5e23b4730a69e.svg","dotplot_50_slider_601298353991ee2db43e6f62.svg","dotplot_50_slider_5fea57f62b11a458f7aad996.svg","dotplot_50_slider_5fdab0e02dc9175671e22e13.svg","dotplot_50_slider_5fd47ff7f5f2091f95e31dec.svg","dotplot_50_slider_5fcf6c861cedc8034bbbe6bb.svg","dotplot_50_slider_5fb3a8e0bb651604a052d591.svg","dotplot_50_slider_5faf011a66843311e985e4c3.svg","dotplot_50_slider_5fa54bf6397c77247a502be2.svg","dotplot_50_slider_5f9daa7e3ec0713096cd9d36.svg","dotplot_50_slider_5f92d09bcc4d0b000834b058.svg","dotplot_50_slider_5f7858276a432c035a0eab75.svg","dotplot_50_slider_5f6e268f4dfd8f315a2e52ac.svg","dotplot_50_slider_5f365b94c5947d6acce2881c.svg","dotplot_50_slider_5f216d9c604e3551992807f4.svg","dotplot_50_slider_5f1b4ff78c8f930f94e590de.svg","dotplot_50_slider_5f1a169f67f753013790f9a3.svg","dotplot_50_slider_5ee7b310953b4d0699f7812c.svg","dotplot_50_slider_5ed572a76e3f870fc76c6334.svg","dotplot_50_slider_5eb55873fafd943e4f55e5b7.svg","dotplot_50_slider_5eb3d115f625d51bb122a0d4.svg","dotplot_50_slider_5ea9dc79b77cac134ca2138a.svg","dotplot_50_slider_5e568f0a2951f60222a100ce.svg","dotplot_50_slider_5dded0938ca8ab000b56f326.svg","dotplot_50_slider_5dcfceca9dac7c0cfcacd801.svg","dotplot_50_slider_5d77ee935bdfd20015f3b307.svg","dotplot_50_slider_5d670a59aa02520017b1a61e.svg","dotplot_50_slider_5d497a8f2b64de00011b9c6f.svg","dotplot_50_slider_5d4573a4b2da940017184d16.svg","dotplot_50_slider_5c8bafb53b6f3d00013d7c30.svg","dotplot_50_slider_5a9aa66a35237b000112937b.svg","dotplot_20_visualization_602eb187d06c0f0009b7a02b.svg","dotplot_20_visualization_6025a3f8a01dee178c164e52.svg","dotplot_20_visualization_601d2aa3cf8c480009fc0719.svg","dotplot_20_visualization_60195de5abe00c026804d726.svg","dotplot_20_visualization_6017d6a23bdebea5e9062e9d.svg","dotplot_20_visualization_600b11ce4a2602127d49b9d7.svg","dotplot_20_visualization_5fff5c8e9b09c9082efb9fac.svg","dotplot_20_visualization_5ff38faf6079e19675de2541.svg","dotplot_20_visualization_5fcabe0ff0c1a51edb73dfad.svg","dotplot_20_visualization_5fa94b52048edb08472549fe.svg","dotplot_20_visualization_5f8dc6f660f84711f1712897.svg","dotplot_20_visualization_5f78f9ddcb63b34f243d2239.svg","dotplot_20_visualization_5f37fb23389f372a103ec5a8.svg","dotplot_20_visualization_5f31b6f5f9808b0cd30a8822.svg","dotplot_20_visualization_5f3184d84006fb05547a071e.svg","dotplot_20_visualization_5f2e468c382da41a78d6789e.svg","dotplot_20_visualization_5f2c1f30ea187a07509579f2.svg","dotplot_20_visualization_5f295badf59f8703309dd0a9.svg","dotplot_20_visualization_5f243becb7bc1f00080bc2a9.svg","dotplot_20_visualization_5f022bbeaaa45a0d1377a965.svg","dotplot_20_visualization_5eee84306ee549334e76086b.svg","dotplot_20_visualization_5ee93a8aa43b042d2529faec.svg","dotplot_20_visualization_5ed16edc37d2700ad3fd74a6.svg","dotplot_20_visualization_5ed013f88fce6e0d858b732e.svg","dotplot_20_visualization_5ea9549ea50bc3028efb7442.svg","dotplot_20_visualization_5e906201217f5100096868d9.svg","dotplot_20_visualization_5e85c19128aacd1bfa357fb3.svg","dotplot_20_visualization_5e5efa5dec939d23c77a4dbc.svg","dotplot_20_visualization_5e2d847b6fcec73645cd20f0.svg","dotplot_20_visualization_5e2756fb233c6c98ac7eb934.svg","dotplot_20_visualization_5e24d49952f901000a52bc89.svg","dotplot_20_visualization_5d921a2e34fc500016df8e5f.svg","dotplot_20_visualization_5d4dabe81025380019dc558c.svg","dotplot_20_visualization_5d415382037fb000013a2dcb.svg","dotplot_20_visualization_5ca56e888ef8c300164edb74.svg","dotplot_20_visualization_5bc743cb492cb300018400a4.svg","dotplot_20_visualization_5b94d723839c0a00010f88d9.svg","dotplot_20_visualization_5b39e7a11d4b6800016944d7.svg","dotplot_20_visualization_5a75b131eea3d300016ddc70.svg","dotplot_20_visualization_5a64a97663394a0001556331.svg","dotplot_20_visualization_5a0faf7a120fb3000194961d.svg","dotplot_20_slider_60268622acfd7c327a461189.svg","dotplot_20_slider_601b15a943f34247d7fef14b.svg","dotplot_20_slider_600deda4e2de3f3dfca80e58.svg","dotplot_20_slider_5ff10803539a38546e72def9.svg","dotplot_20_slider_5fd60b369aa1a548ed311af6.svg","dotplot_20_slider_5fd532e9d9f56d3569f7a128.svg","dotplot_20_slider_5fb9af2d31099057d4f5501c.svg","dotplot_20_slider_5fb6bff579dc330f53e02553.svg","dotplot_20_slider_5fb680f7e13f87000aa59a9a.svg","dotplot_20_slider_5fb125b6421ce1554a4cbb7f.svg","dotplot_20_slider_5faf3f92efe38a1cdbd3afe4.svg","dotplot_20_slider_5fad416622f55141012b3998.svg","dotplot_20_slider_5fabcdd6a5caa50491afce19.svg","dotplot_20_slider_5fa9720d5d1791115d3f76c6.svg","dotplot_20_slider_5fa0753faed02e0c083a4002.svg","dotplot_20_slider_5fa01b49226a1a0207ae0600.svg","dotplot_20_slider_5f999f780a5b3302594204c8.svg","dotplot_20_slider_5f8e0a1c4465f01c6eb7c145.svg","dotplot_20_slider_5f44a14dc9c379248aa705a9.svg","dotplot_20_slider_5f39653865d6044d868f1bd1.svg","dotplot_20_slider_5f348ee2296dad3b684ca884.svg","dotplot_20_slider_5f2ad656a610b43d68875ec7.svg","dotplot_20_slider_5f26c5b61425fa437b541d13.svg","dotplot_20_slider_5f15bfe4f4df836bb4c38cdf.svg","dotplot_20_slider_5ef48d9e540ce904ddba1f4d.svg","dotplot_20_slider_5eefd6f33fe1d00dd32739d9.svg","dotplot_20_slider_5ee81653dcb1fd1126c7a4e3.svg","dotplot_20_slider_5ee1eca821c28b5e2e65b2e1.svg","dotplot_20_slider_5ee001ead9eb7134ccc2560a.svg","dotplot_20_slider_5ed4e007cb34a10121e14bf1.svg","dotplot_20_slider_5ec2f68ee472061370f89528.svg","dotplot_20_slider_5ebfd493e953a3011bc1a2df.svg","dotplot_20_slider_5e987ccfee054208e93b9f94.svg","dotplot_20_slider_5e6cafa6850d5124b19c526b.svg","dotplot_20_slider_5e56b4a64a405106502621d5.svg","dotplot_20_slider_5dd43527794e1041e44fde8e.svg","dotplot_20_slider_5dbacc2c4ea3b20e251ff647.svg","dotplot_20_slider_5d55d30631022a0016428e41.svg","dotplot_20_slider_5d1e4a3ed4b9d60001ec8f1c.svg","dotplot_20_slider_5ce2f89e76ba8e0018aac912.svg","dotplot_20_slider_5cd74735c78b7d0001f9b364.svg","dotplot_20_slider_5ba9f3562fb607000144bacc.svg","dotplot_20_slider_5b95305ed14070000131ceed.svg","dotplot_20_slider_5b7319010da966000147f712.svg","dotplot_20_slider_5995ed90d1732a00013425c5.svg"];

function init() {

	var prev_button = document.getElementById("prev-button");
	for(var i = 1 ; i <= nb_pages_exp ; i++){
		var new_img = tmpl("exp_images_template", {id: i});
		$(new_img).insertBefore(prev_button);
		$('#dots-container').append(tmpl("dots_template", {id: i}));
	}
	var folder = "images/dotplots/";
	/*var test = [];
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
	          test.push(x.href);
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
	          		//console.log(test);
	          	} else {
	          		document.getElementById('column1').append(img);
	          	}
	          	i50++;
	          }
	          console.log(test);
	          aff(test);
	      } 
	    };
	  } 
	  else {
	    alert('Request failed. Returned status of ' + xhr.status);
	  }
	}
	xhr.send()
	console.log("est");
	console.log(test);
	//aff(test);*/

	var sl = 0;
	var vi = 0;
	for (var i = dotplots.length - 1; i >= 0; i--) {
		let img = document.createElement("img");
		img.src = folder+dotplots[i];
		img.href = img.src;
		if (dotplots[i].includes("slider")) {
			if (sl%2 == 0) {
				document.getElementById('column2').append(img);
			} else {
				document.getElementById('column3').append(img);
			}
			sl++;
		} else {
			if (vi%2 == 0) {
				document.getElementById('column1').append(img);
			} else {
				document.getElementById('column4').append(img);
			}
			vi++;
		}
	}

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


function aff(Things) {
	console.log(Things);
	var S = "[";
	for (var i = Things.length - 1; i > 0; i--) {
		S += "\""+Things[i].replace("http://localhost:8888/images/dotplots/","")+"\",";
	} if(Things.length > 0)
		S += "\""+Things[0].replace("http://localhost:8888/images/dotplots/","")+"\"]";
	console.log(S);
}

































window.onload = init;