document.body.onload = function(){
	/*var c = document.querySelector("#decor");
	var canvas = new fabric.Canvas('decor', {
		width: c.offsetWidth,
		height: c.offsetHeight
	});

	var rectangles = [];

	setInterval(function(){
		for(let key in rectangles){
			rectangles[key].update();
		}
	}, 100);

	setInterval(function(){
		if(rectangles.length <= 20){
			var newRectangle = new Rectangle(canvas);
			rectangles.push(newRectangle);
			//console.log(rectangles.length);
		}
	}, 3000);

	var Rectangle = function(canvas){
		this.canvas = canvas;

		this.Width =  50 + Math.random() * 20;
		this.Height = 10 + Math.random() * 5;
		this.X = canvas.width + this.Width;
		this.Y = Math.random() * (canvas.height - this.Height);
		this.Speed = 50 + (Math.random() * 10);

		// create a rectangle with angle=45
		this.rect = new fabric.Rect({
		  left: this.X,
		  top: this.Y,
		  fill: 'rgb(153,165,200)',
		  width: this.Width,
		  height: this.Height,
		  angle: 0,
		  opacity: 0
		});

		this.canvas.add(this.rect);
	};

	Rectangle.prototype.update = function() {
		//this.rect.set('left', this.X + 10);
		this.rect.animate('left', "-="+this.Speed, { onChange: canvas.renderAll.bind(canvas) });
		this.X = parseFloat(this.rect.get('left'));
		var opacityResult = 0;
		if(this.X > canvas.width / 2){
			opacityResult = 1/((this.X/((canvas.width)/2)));
		}
		else if(this.X > 0){
			opacityResult = this.X/(canvas.width/2);
		}
		this.rect.set('opacity', opacityResult);

		if(this.X < -this.Width){
			this.canvas.remove(this.rect);

			var index = rectangles.indexOf(this);
			if (index > -1) {
			  rectangles.splice(index, 1);
			}
		}
	};*/

	var now = moment(new Date()); //todays date
	var end = moment("2018-03-1"); // another date
	var duration = moment.duration(now.diff(end));
	let diffYears = Math.floor(duration.asYears())+"";
	let diffMonths = Math.floor(duration.asMonths() - (diffYears * 12))+" months";
	if(diffYears != "0"){		
		diffYears += " years ";
	}
	else{
		diffYears = "";
	}
	document.querySelector("#currentJobDuration").innerHTML = diffYears+diffMonths;

	var projects = document.querySelectorAll("#projects article");
	for(let index in projects){
		projects[index].onclick = function(){
			let descr = projects[index].querySelector(".descr");
			if(descr.className == "descr collapsed"){
				descr.className = "descr";
			}
			else{
				descr.className += " collapsed";
			}
		}
	};

	var otherProjectsSection = document.querySelector("#other-projects");
	var showOtherProjectsButton = document.querySelector("#show-other-projects");
	showOtherProjectsButton.onclick = function(e){
		e.preventDefault();

		if(otherProjectsSection.className == "collapsed"){
			otherProjectsSection.className = "";
		}
		else{
			otherProjectsSection.className += "collapsed";
		}
	};

	var otherProjects = document.querySelectorAll("#other-projects article");
	for(let index in otherProjects){
		otherProjects[index].onclick = function(){
			let descr = otherProjects[index].querySelector(".descr");
			if(descr.className == "descr collapsed"){
				descr.className = "descr";
			}
			else{
				descr.className += " collapsed";
			}
		}
	};
}