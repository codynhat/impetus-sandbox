var sunRadius = window.innerHeight/695500/2;
var scaleFactor = 1.0;
var earthMass = 0.00059721;

var earthScaleFactor = 150.0/(6367*sunRadius);
var marsScaleFactor = 150.0/(3386*sunRadius);
var jupiterScaleFactor = 150.0/(69173*sunRadius);
var saturnScaleFactor = 150.0/(57316*sunRadius);
var venusScaleFactor = 150.0/(6052*sunRadius);
var mercuryScaleFactor = 150.0/(2440*sunRadius);
var uranusScaleFactor = 150.0/(25266*sunRadius);
var neptuneScaleFactor = 150.0/(24533*sunRadius);

var startPoint = -(sunRadius*695500/10.0) + (sunRadius*695500) + (sunRadius*695500*0.1);
var maxPlanetAU = 29.97;
var minPlanetAU = 0.3076;
var orbitScale = ((window.innerWidth-(window.innerWidth/25))-startPoint)/(maxPlanetAU-minPlanetAU);

var asteroidStartX = startPoint + (orbitScale * (2.0-minPlanetAU));
var asteroids = [];

var currentPrompt = 0;
var prompts = [
	"Grab a planet and see what happens.",
	"Tip: Jupiter has a highest mass so it will pull smaller planets into it’s gravitational field.",
	"A planet with a higher mass will have a higher gravitational pull.",
	"99.86% of the solar system’s mass is found in the Sun",
	"The temperature at the sun's core is about  27 million degrees Fahrenheit",
	"Daytime temperatures on Mercury can reach 800 degrees Fahrenheit and drop to -290 degrees Fahrenheit at night.",
	"Mercury makes a complete orbit around the sun in just 88 Earth days.",
	"Venus' thick and toxic atmosphere is made up mostly of carbon dioxide (CO2) and nitrogen (N2), with clouds of sulfuric acid (H2SO4) droplets.",
	"Mars has a thin atmosphere made up mostly of carbon dioxide (CO2), nitrogen (N2) and argon (Ar).",
	"It is predicted that Jupiter has an inner, solid core about the size of the Earth.",
	"Unlike any of the other planets, Uranus rotates on its side, which means it spins horizontally.",
	"Uranus has an atmosphere which is mostly made up of hydrogen (H2) and helium (He), with a small amount of methane (CH4).",
	"Neptune has six rings.",
	"Neptune has 13 confirmed moon."
];

document.ontouchmove = function(event){
    event.preventDefault();
}

$(document).ready(function(){



	Physics(function (world) {
	    // bounds of the window
	    var viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight)
	        ,edgeBounce
	        ,renderer
	        ;



	    // create a renderer
	    renderer = Physics.renderer('canvas', {
	        el: 'viewport',
	        autoResize: false
	    });

	    // add the renderer
	    world.add(renderer);
	    // render on each step
	    world.on('step', function () {
	        world.render();
	    });



	    // Sun
	    var sun = Physics.body('circle', {
	        x: -(sunRadius*695500/10.0)
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: sunRadius*695500
	        ,mass:332949*earthMass
	        ,restitution : 0.2
	        ,styles: {
	            fillStyle: 'rgb(250,200,0)'
	        }
	    });


	    // Earth
	    var earth = Physics.body('circle', {
	        x: startPoint + (orbitScale * (1.0-minPlanetAU))
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 6367*sunRadius*scaleFactor
	        ,mass:earthMass
	        ,styles: {
	            fillStyle: 'rgb(80,180,250)'
	        }
	    });

	    // Jupiter
	    var jupiter = Physics.body('circle', {
	        x: startPoint + (orbitScale * (5.354-minPlanetAU))
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 69173*sunRadius*scaleFactor
	        ,mass:317.83*earthMass
	        ,restitution : 0.1
	        ,styles: {
	            fillStyle: 'rgb(238,210,94)'
	        }
	    });

	    // Saturn
	    var saturn = Physics.body('circle', {
	        x: startPoint + (orbitScale * (9.973-minPlanetAU))
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 57316*sunRadius*scaleFactor
	        ,mass:95.1608*earthMass
	        ,restitution: 0.1
	        ,styles: {
	            fillStyle: 'rgb(180,95,48)'
	        }
	    });

	    // Uranus
	    var uranus = Physics.body('circle', {
	        x: startPoint + (orbitScale * (20.0-minPlanetAU))
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 25266*sunRadius*scaleFactor
	        ,mass:14.5357*earthMass
	        ,restitution : 0.1
	        ,styles: {
	            fillStyle: 'rgb(32,178,170)'
	        }
	    });

	    // Neptune
	    var neptune = Physics.body('circle', {
	        x: startPoint + (orbitScale * 29.6624)
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 24533*sunRadius*scaleFactor
	        ,mass:17.1478*earthMass
	        ,restitution : 0.1
	        ,styles: {
	            fillStyle: 'rgb(20,20,255)'
	        }
	    });

	    // Venus
	    var venus = Physics.body('circle', {
	        x: startPoint + (orbitScale * (0.7184-minPlanetAU))
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 6052*sunRadius*scaleFactor
	        ,mass:0.8149*earthMass
	        ,styles: {
	            fillStyle: 'rgb(240,120,20)'
	        }
	    });

	    // Mars
	    var mars = Physics.body('circle', {
	        x: startPoint + (orbitScale * (1.48-minPlanetAU))
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 3386*sunRadius*scaleFactor
	        ,mass:0.1074*earthMass
	        ,styles: {
	            fillStyle: 'rgb(200,40,40)'
	        }
	    });

	    // Mercury
	   	var mercury = Physics.body('circle', {
	        x: startPoint
	        ,y: window.innerHeight/2
	        ,vx: 0.0
	        ,radius: 2440*sunRadius*scaleFactor
	        ,mass:0.0552*earthMass
	        ,styles: {
	            fillStyle: 'rgb(159,78,11)'
	        }
	    });

	   	addAsteroids();

	    world.add(mars);
	    world.add(mercury);
	    world.add(venus);
	    world.add(earth);
	    world.add(jupiter);
	    world.add(saturn);
	    world.add(uranus);
	    world.add(neptune);
	    world.add(sun);

	    updateScale(1.0);






	    // constrain objects to these bounds
	    edgeBounce = Physics.behavior('edge-collision-detection', {
	        aabb: viewportBounds
	        ,restitution: 0.5
	        ,cof: 0.8
	    });

	    updateBounds();



	    // resize events
	    window.addEventListener('resize', function () {

	        updateBounds();

	    }, true);



	    world.on({
	        'interact:grab': function( pos ){
	           	$(".intro").fadeOut(1000);
	           	$('#prompt').fadeOut(1000);
	        }	
	    });


	    var gravity = Physics.behavior('newtonian');


	    // add things to the world
	    world.add([
	        Physics.behavior('interactive', { el: renderer.container})
	        ,Physics.behavior('body-impulse-response')
	        ,gravity
	        ,edgeBounce
	    ]);


	    world.add( Physics.behavior('body-collision-detection') );
		world.add( Physics.behavior('sweep-prune') );

	    // subscribe to ticker to advance the simulation
	    Physics.util.ticker.on(function( time ) {
	        world.step( time );
	    });




	    function updateBounds(){
			if (world.has(sun)) {
				viewportBounds = Physics.aabb(-(sunRadius*695500*1.8), 0, window.innerWidth, window.innerHeight);
			}
			else{
				viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight);
			}

			document.getElementById("viewport").width = window.innerWidth;
	        document.getElementById("viewport").height = window.innerHeight;

	        edgeBounce.setAABB(viewportBounds);
		    
		}

		function updateScale(newScaleFactor, object){

			var minT = 50;
			var maxT = 0;

			if (world.has(neptune)) {
				if(29.97 < minT){
					minT = 29.97;
				}
				if(29.97 > maxT){
					maxT = 29.97;
				}
			}

			if (world.has(uranus)) {
				if(20 < minT){
					minT = 20;
				}
				if(20 > maxT){
					maxT = 20;
				}
			}

			if (world.has(saturn)) {
				if(9.973 < minT){
					minT = 9.973;
				}
				if(9.973 > maxT){
					maxT = 9.973;
				}
			}

			if (world.has(jupiter)) {
				if(5.354 < minT){
					minT = 5.354;
				}
				if(5.354 > maxT){
					maxT = 5.354;
				}
			}

			if (world.has(mars)) {
				if(1.48 < minT){
					minT = 1.48;
				}
				if(1.48 > maxT){
					maxT = 1.48;
				}
			}

			if (world.has(earth)) {
				if(1.0 < minT){
					minT = 1.0;
				}
				if(1.0 > maxT){
					maxT = 1.0;
				}
			}

			if (world.has(venus)) {
				if(0.7184 < minT){
					minT = 0.7184;
				}
				if(0.7184 > maxT){
					maxT = 0.7184;
				}
			}

			if (world.has(mercury)) {
				if(0.3067 < minT){
					minT = 0.3067;
				}
				if(0.3067 > maxT){
					maxT = 0.3067;
				}
			}

			maxPlanetAU = maxT;
			minPlanetAU = minT;



	        if (newScaleFactor == 1.0) {
	        	earthMass = 0.00059721;
	        	startPoint = -(sunRadius*695500/10.0) + (sunRadius*695500) + (sunRadius*695500*0.1); 
	        }
	        else{
	        	earthMass = 0.0059721*4;
	        	startPoint = 10;
	        }

	        orbitScale = ((window.innerWidth-(window.innerWidth/25))-startPoint)/(maxPlanetAU-minPlanetAU);
	        asteroidStartX = startPoint + (orbitScale * (2.0-minPlanetAU));

	        if (asteroidStartX > window.innerWidth-30) {
	        	asteroidStartX = window.innerWidth-30;
	        }


	        var rescale = true;

	        if (scaleFactor == newScaleFactor) {
	        	// rescale = false;
	        }
	        scaleFactor = newScaleFactor;

	        if (world.has(asteroids[0])) {
	        	removeAsteroids();
	        	addAsteroids();
	        }

    	    // Sun
    	    if ((world.has(sun) && rescale == true) || (world.has(sun) && sun == object)) {
    	    	world.remove(sun);
    	    	sun = Physics.body('circle', {
			        x: -(sunRadius*695500/10.0)
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: sunRadius*695500
			        ,mass:332949*earthMass
			        ,restitution : 0.2
			        ,styles: {
			            fillStyle: 'rgb(250,200,0)'
			        }
			    });
			    world.add(sun);
    	    }
		    


		    // Earth
		    if ((world.has(earth) && rescale == true) || (world.has(earth) && earth == object)) {
    	    	world.remove(earth);
    	    	earth = Physics.body('circle', {
			        x: startPoint + (orbitScale * (1.0-minPlanetAU))
			        ,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 6367*sunRadius*scaleFactor
			        ,mass:earthMass
			        ,styles: {
			            fillStyle: 'rgb(80,180,250)'
			        }
			    });
			    world.add(earth);
    	    }


		    // Jupiter
		    if ((world.has(jupiter) && rescale == true) || (world.has(jupiter) && jupiter == object)) {
		    	world.remove(jupiter);
		    	jupiter = Physics.body('circle', {
			        x: startPoint + (orbitScale * (5.354-minPlanetAU))
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 69173*sunRadius*scaleFactor
			        ,mass:317.83*earthMass
			        ,restitution : 0.1
			        ,styles: {
			            fillStyle: 'rgb(238,210,94)'
			        }
			    });
			    world.add(jupiter);
		    }

		    // Saturn
		    if ((world.has(saturn) && rescale == true) || (world.has(saturn) && saturn == object)) {
		    	world.remove(saturn);
		    	saturn = Physics.body('circle', {
			        x: startPoint + (orbitScale * (9.973-minPlanetAU))
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 57316*sunRadius*scaleFactor
			        ,mass:95.1608*earthMass
			        ,restitution: 0.1
			        ,styles: {
			            fillStyle: 'rgb(180,95,48)'
			        }
			    });
			    world.add(saturn);
		    }

		    // Uranus
		    if ((world.has(uranus) && rescale == true) || (world.has(uranus) && uranus == object)) {
		    	world.remove(uranus);
		    	uranus = Physics.body('circle', {
			        x: startPoint + (orbitScale * (20.0-minPlanetAU))
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 25266*sunRadius*scaleFactor
			        ,mass:14.5357*earthMass
			        ,restitution : 0.1
			        ,styles: {
			            fillStyle: 'rgb(32,178,170)'
			        }
			    });
			    world.add(uranus);
		    }

		    // Neptune
		    if ((world.has(neptune) && rescale == true) || (world.has(neptune) && neptune == object)) {
		    	world.remove(neptune);
		    	neptune = Physics.body('circle', {
			        x: startPoint + (orbitScale * 29.6624)
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 24533*sunRadius*scaleFactor
			        ,mass:17.1478*earthMass
			        ,restitution : 0.1
			        ,styles: {
			            fillStyle: 'rgb(20,20,255)'
			        }
			    });
			    world.add(neptune);
		    }

		    // Venus
		    if ((world.has(venus) && rescale == true) || (world.has(venus) && venus == object)) {
		    	world.remove(venus);
		    	venus = Physics.body('circle', {
			        x: startPoint + (orbitScale * (0.7184-minPlanetAU))
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 6052*sunRadius*scaleFactor
			        ,mass:0.8149*earthMass
			        ,styles: {
			            fillStyle: 'rgb(240,120,20)'
			        }
			    });
			    world.add(venus);
		    }

		    // Mars
		    if ((world.has(mars) && rescale == true) || (world.has(mars) && mars == object)) {
		    	world.remove(mars);
		    	mars = Physics.body('circle', {
			        x: startPoint + (orbitScale * (1.48-minPlanetAU))
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 3386*sunRadius*scaleFactor
			        ,mass:0.1074*earthMass
			        ,styles: {
			            fillStyle: 'rgb(200,40,40)'
			        }
			    });
			    world.add(mars);
		    }

		    // Mercury
		    if ((world.has(mercury) && rescale == true) || (world.has(mercury) && mercury == object)) {
    	    	world.remove(mercury);
    	    	mercury = Physics.body('circle', {
			        x: startPoint
	        		,y: window.innerHeight/2
			        ,vx: 0.0
			        ,radius: 2440*sunRadius*scaleFactor
			        ,mass:0.0552*earthMass
			        ,styles: {
			            fillStyle: 'rgb(159,78,11)'
			        }
			    });
			    world.add(mercury);
    	    }
		   	

		}

		function updateObject(object, newScaleFactor, newRadius){
			var maxRadius = newRadius;


			if (world.has(object)) {
        		world.remove(object);
        		maxRadius = 0;
        	}
        	else{
        		world.add(object);
        	}

        	var bodies = world.getBodies();
	        for(var i = 0; i < bodies.length; i++){
	        	var body = bodies[i];
	        	if(body.radius > maxRadius){
	        		maxRadius = body.radius;
	        		if(body == jupiter){
	        			newScaleFactor = jupiterScaleFactor;
	        		}
	        		else if(body == earth){
	        			newScaleFactor = earthScaleFactor;
	        		}
	        		else if(body == mars){
	        			newScaleFactor = marsScaleFactor;
	        		}
	        		else if(body == saturn){
	        			newScaleFactor = saturnScaleFactor;
	        		}
	        		else if(body == venus){
	        			newScaleFactor = venusScaleFactor;
	        		}
	        		else if(body == neptune){
	        			newScaleFactor = neptuneScaleFactor;
	        		}
	        		else if(body == uranus){
	        			newScaleFactor = uranusScaleFactor;
	        		}
	        		else if(body == mercury){
	        			newScaleFactor = mercuryScaleFactor;
	        		}
	        		else if(body == sun){
	        			newScaleFactor = 1.0;
	        		}

	        	}
	        }

        	updateScale(newScaleFactor, object);
        	updateBounds();
		}

		document.getElementById('asteroid').addEventListener('click', function(ele) {
			if (world.has(asteroids[0])) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
				removeAsteroids();
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});
				addAsteroids();
				if (world.has(gravity)) {
					document.getElementById('gravity').click();
				}
        	}
        }, false);

		document.getElementById('gravity').addEventListener('click', function(ele) {
			if (world.has(gravity)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
				world.removeBehavior(gravity);
				// updateScale(scaleFactor);
				// world.pause();
				// world.unpause();
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});
				world.addBehavior(gravity);
				// updateScale(scaleFactor);
				// world.pause();
				// world.unpause();
				if (world.has(asteroids[0])) {
					document.getElementById('asteroid').click();
				}
				
        	}
        }, false);

		document.getElementById('mercury').addEventListener('click', function(ele) {
			$(".intro").fadeOut();
			if (world.has(mercury)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}
			
			updateObject(mercury, mercuryScaleFactor, 2440*sunRadius*scaleFactor);
        }, false);
        document.getElementById('sun').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(sun)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(sun, 1.0, sunRadius*695500);
        }, false);
        document.getElementById('earth').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(earth)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(earth, earthScaleFactor, 6367*sunRadius*scaleFactor);
        }, false);
        document.getElementById('jupiter').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(jupiter)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(jupiter, jupiterScaleFactor, 69173*sunRadius*scaleFactor);
        }, false);
        document.getElementById('uranus').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(uranus)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(uranus, uranusScaleFactor, 25266*sunRadius*scaleFactor);
        }, false);
        document.getElementById('neptune').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(neptune)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(neptune, neptuneScaleFactor, 24533*sunRadius*scaleFactor);
        }, false);
        document.getElementById('saturn').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(saturn)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(saturn, saturnScaleFactor, 57316*sunRadius*scaleFactor);
        }, false);
        document.getElementById('mars').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	$('#prompt').fadeOut();
        	if (world.has(mars)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(mars, marsScaleFactor, 3386*sunRadius*scaleFactor);
        }, false);
        document.getElementById('venus').addEventListener('click', function(ele) {
        	$(".intro").fadeOut();
        	if (world.has(venus)) {
        		ele.target.style.backgroundColor = 'black';
				ele.target.style.color = 'white';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'black');
				    	$("#" + ele.target.id).css("color", 'white');
				});
        	}
        	else{
        		ele.target.style.backgroundColor = 'white';
				ele.target.style.color = 'black';
				$("#" + ele.target.id).hover(function(){
				    	$("#" + ele.target.id).css("background-color", 'rgba(255, 255, 255, 0.8)');
				    	$("#" + ele.target.id).css("color", 'black');
				    }, function(){
				    	$("#" + ele.target.id).css("background-color", 'white');
				    	$("#" + ele.target.id).css("color", 'black');
				});

        	}

			updateObject(venus, venusScaleFactor, 6052*sunRadius*scaleFactor);
        }, false);

		document.getElementById('gravity').click();

		$('#prompt').hide();

		function removeAsteroids(){
			world.remove(asteroids);
			asteroids = [];
		}
		function addAsteroids(){
			for(var i = 0; i < window.innerHeight; i += 10){
				var asteroid = Physics.body('circle', {
			        x: asteroidStartX
			        ,y: i
			        ,vx: 0.0
			        ,radius: 0.75
			        ,mass:0.00003*earthMass
			        ,styles: {
			            fillStyle: 'rgb(159,78,11)'
			        }
			    });
			    world.add(asteroid);
			    asteroids.push(asteroid);
			}
			for(var i = 5; i < window.innerHeight; i += 10){
				var asteroid = Physics.body('circle', {
			        x: asteroidStartX+10
			        ,y: i
			        ,vx: 0.0
			        ,radius: 0.75
			        ,mass:0.00003*earthMass
			        ,styles: {
			            fillStyle: 'rgb(159,78,11)'
			        }
			    });
			    world.add(asteroid);
			    asteroids.push(asteroid);
			}

			for(var i = 0; i < window.innerHeight; i += 10){
				var asteroid = Physics.body('circle', {
			        x: asteroidStartX+20
			        ,y: i
			        ,vx: 0.0
			        ,radius: 0.75
			        ,mass:0.00003*earthMass
			        ,styles: {
			            fillStyle: 'rgb(159,78,11)'
			        }
			    });
			    world.add(asteroid);
			    asteroids.push(asteroid);
			}

			for(var i = 5; i < window.innerHeight; i += 10){
				var asteroid = Physics.body('circle', {
			        x: asteroidStartX+30
			        ,y: i
			        ,vx: 0.0
			        ,radius: 0.75
			        ,mass:0.00003*earthMass
			        ,styles: {
			            fillStyle: 'rgb(159,78,11)'
			        }
			    });
			    world.add(asteroid);
			    asteroids.push(asteroid);
			}
		}

		function hidePrompt(){
			$('#prompt').fadeOut(1000);
		}

		function showPrompt(){

			currentPrompt = (currentPrompt+1)%prompts.length;

			var prompt = prompts[currentPrompt];
			$('#prompt').html(prompt);
			$('#prompt').fadeIn(1000);

			setTimeout(hidePrompt, 10000);
		}



		// setInterval(showPrompt, 30000);


		

	});

	function start(){
		if (!$('#viewport').is(':visible')) {
			$("#intro_about").fadeOut(1000);
			$(".intro").fadeIn(2000);
			$("#buttonWrapper").fadeIn(2000);
			$("#viewport").fadeIn(2000);
			$('#prompt').html("Grab a planet and see what happens.");
			$('#prompt').fadeIn(1000);
		}
	}

	$("#intro_about").hide();
	$("#intro_about").fadeIn(3000);
	$(".intro").hide();
	$("#viewport").hide();
	$("#buttonWrapper").hide();
	setTimeout(start, 10000);

	$(document).on('click', start);


	

	
});


