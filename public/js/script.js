var myWidth = window.innerWidth;

if(myWidth >= 960){

	//Size the top section of Home Page, above the fold
	function topSize(){
		var myHeight = window.innerHeight;
		var topHeight = myHeight - 145;
		document.getElementById("top").style.height = parseInt(topHeight) + "px";
	}
	topSize();
	window.onresize = topSize;

	//Show correct header on site
	document.getElementById('mobile-header').style.display=  "none";
	document.getElementById('d-logo').style.display="block";

	 //Desktop drop down menu behavior
	 document.getElementById('mainPanel').addEventListener('click', function(event){
	 	var allOpen = document.getElementsByClassName('primary active');
		for (var prop in allOpen){
			allOpen[prop].className="primary";
			document.getElementById('mainPanel').style.backgroundColor = "rgba(0,0,0, 0)";
		}
	});

	document.getElementById('items').addEventListener('click', function(event){
	 	console.log(event);
	 	var myNav = event.target;
	 	if (myNav.className !== "parentItem") {
	 		alert('No sub menu - Go to url: ' + event.target.href );
	 		return;
	 	 } else{
	 	 	// remove all active classes so only one menu is open at a time
	 	 	var allOpen = document.getElementsByClassName('primary active');
	 	 	for (var prop in allOpen){
	 	 		allOpen[prop].className="primary";
	 	 	}
	 	 	event.path[1].className = "primary active";
	    	document.getElementById('mainPanel').style.backgroundColor = "rgba(0,0,0, 0.5)";
	    	return false;
		 	}
		});

} else {
		document.getElementById('items-mobile').addEventListener('click', function(event){
		console.log(event);
			var myItem = event.target;
		 	if(myItem.className === "parentItem opened"){
		 		myItem.className = "parentItem closed";
		 		event.path[1].firstChild.children[0].style.transform = "rotate(-45deg)";
		 		event.path[1].children[1].style.display = "none";
		 		return false;
		 	} else if(!myItem.className){
		 		alert('Go to url: ' + event.target.href )
		 	}else{
		 		myItem.className ="parentItem opened";
		 		event.path[1].firstChild.children[0].style.transform = "rotate(135deg)";
		 		event.path[1].children[1].style.display = "block";
		 		return false;
		 	}
		});		
}

// Pull in Nav with AJAX & JSON object
var request;
if (window.XMLHttpRequest) {
	request=new XMLHttpRequest();
} else {
	request=new ActiveXObject("Microsoft.XMLHTTP");
}
request.open("GET", "/api/nav.json");
request.onreadystatechange = function() {
	if ((request.status===200) && (request.readyState===4)) {
		var info = JSON.parse(request.responseText);
		var output='';
		var navLength = info.items.length - 1;
		for (var i = 0; i <= navLength; i++) {
				output += "<li id='primary" + [i] + "' class='primary'>" + "<a href= '" + info.items[i].url;
				 if (info.items[i].items.length >= 1){
				 	output += "' class='parentItem'>" + info.items[i].label + "<span class='down-arrow'></span></a> <ul id='secondary" + [i] + "' class='secondary'>";
				 	var subMenuLength = info.items[i].items.length - 1;
					for (j = 0; j <= subMenuLength ; j++) {
						output += "<li> <a href='" + info.items[i].items[j].url + "'>" + info.items[i].items[j].label + "</a></li>";
					} 
					output += "</ul></li>";
				} else{
					output+= "'>" + info.items[i].label + "</a></li>";
				}
		}
		if (myWidth >= 960){
		var update = document.getElementById('items');
		} else{
		var update = document.getElementById('items-mobile');	
		}
		update.innerHTML = output;
	}
}
request.send();

document.getElementById('m-nav-opened').style.width = myWidth + "px";
document.getElementById('slide-window').style.width = myWidth* 2 + "px";

//mobile menu behavior
function navToggle() {
	var trigger = document.getElementById('panelsWrapper');
	if (trigger.className === "active-nav"){
		trigger.className = "";
		document.getElementById('mainPanel').style.boxShadow = "none";
		document.getElementById('slide-window').style.left = "0px";
		document.getElementById('mainPanel').style.backgroundColor = "";
	} else{
    	document.getElementById('panelsWrapper').className = "active-nav";	
    	document.getElementById('slide-window').style.left = "-" + window.innerWidth + "px";
    	document.getElementById('mainPanel').style.backgroundColor = "rgba(0,0,0, .5)";		
	}
}

