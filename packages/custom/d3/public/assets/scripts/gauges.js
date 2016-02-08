'use strict';

	var gauge1 = function(container, configuration) {
		var that = {};
		var config = {
			size						: 200,
			clipWidth					: 200,
			clipHeight					: 110,
			ringInset					: 20,
			ringWidth					: 20,
			
			pointerWidth				: 10,
			pointerTailLength			: 5,
			pointerHeadLengthPercent	: 0.9,
			
			minValue					: 0,
			maxValue					: 4,
			
			minAngle					: -90,
			maxAngle					: 90,
			
			transitionMs				: 750,
			
			majorTicks					: 4,
			labelFormat					: d3.format(',g'),
			labelInset					: 10,
			
			arcColorFn					: d3.interpolateHsl(d3.rgb('#ff0000'), d3.rgb('#ffcccc'))
		};
		var range = undefined;
		var r = undefined;
		var pointerHeadLength = undefined;
		var value = 0;
		
		var svg = undefined;
		var arc = undefined;
		var scale = undefined;
		var ticks = undefined;
		var tickData = undefined;
		var pointer = undefined;
		
		var donut = d3.layout.pie();
		
		function deg2rad(deg) {
			return deg * Math.PI / 180;
		}
		
		function newAngle(d) {
			var ratio = scale(d);
			var newAngle = config.minAngle + (ratio * range);
			return newAngle;
		}
		
		function configure(configuration) {
			var prop = undefined;
			for ( prop in configuration ) {
				config[prop] = configuration[prop];
			}
			
			range = config.maxAngle - config.minAngle;
			r = config.size / 2;
			pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
			
			// a linear scale that maps domain values to a percent from 0..1
			scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
			ticks = scale.ticks(config.majorTicks);
			tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
			
			arc = d3.svg.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
		}
		that.configure = configure;
		
		function centerTranslation() {
			return 'translate('+r +','+ r +')';
		}
		
		function isRendered() {
			return (svg !== undefined);
		}
		that.isRendered = isRendered;
		
		function render(newValue) {
			svg = d3.select(container)
			.append('svg:svg')
			.attr('class', 'gauge1')
			.attr('width', config.clipWidth)
			.attr('height', config.clipHeight);
			
			var centerTx = centerTranslation();
			
			var arcs = svg.append('g')
			.attr('class', 'arc')
			.attr('transform', centerTx);
			
			arcs.selectAll('path')
			.data(tickData)
			.enter().append('path')
			.attr('fill', function(d, i) {
				return config.arcColorFn(d * i);
			})
			.attr('d', arc);
			
			var lineData = [ [config.pointerWidth / 2, 0], 
			[0, -pointerHeadLength],
			[-(config.pointerWidth / 2), 0],
			[0, config.pointerTailLength],
			[config.pointerWidth / 2, 0] ];
			var pointerLine = d3.svg.line().interpolate('monotone');
			var pg = svg.append('g').data([lineData])
			.attr('class', 'pointer')
			.attr('transform', centerTx);
			
			pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
			update(newValue === undefined ? 0 : newValue);
		}
		that.render = render;
		
		function update(newValue, newConfiguration) {
			if ( newConfiguration  !== undefined) {
				configure(newConfiguration);
			}
			var ratio = scale(newValue);
			var newAngle = config.minAngle + (ratio * range);
			pointer.transition()
			.duration(config.transitionMs)
			.ease('elastic')
			.attr('transform', 'rotate(' +newAngle +')');
		}
		that.update = update;
		
		configure(configuration);
		
		return that;
	};


	var gauge2 = function(container, configuration) {
		var that = {};
		var config = {
			size						: 200,
			clipWidth					: 200,
			clipHeight					: 110,
			ringInset					: 20,
			ringWidth					: 20,
			
			pointerWidth				: 10,
			pointerTailLength			: 5,
			pointerHeadLengthPercent	: 0.9,
			
			minValue					: 0,
			maxValue					: 4,
			
			minAngle					: -90,
			maxAngle					: 90,
			
			transitionMs				: 750,
			
			majorTicks					: 4,
			labelFormat					: d3.format(',g'),
			labelInset					: 10,
			
			arcColorFn					: d3.interpolateHsl(d3.rgb('#99ccff'), d3.rgb('#000099'))
		};
		var range = undefined;
		var r = undefined;
		var pointerHeadLength = undefined;
		var value = 0;
		
		var svg = undefined;
		var arc = undefined;
		var scale = undefined;
		var ticks = undefined;
		var tickData = undefined;
		var pointer = undefined;
		
		var donut = d3.layout.pie();
		
		function deg2rad(deg) {
			return deg * Math.PI / 180;
		}
		
		function newAngle(d) {
			var ratio = scale(d);
			var newAngle = config.minAngle + (ratio * range);
			return newAngle;
		}
		
		function configure(configuration) {
			var prop = undefined;
			for ( prop in configuration ) {
				config[prop] = configuration[prop];
			}
			
			range = config.maxAngle - config.minAngle;
			r = config.size / 2;
			pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
			
			// a linear scale that maps domain values to a percent from 0..1
			scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
			ticks = scale.ticks(config.majorTicks);
			tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
			
			arc = d3.svg.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
		}
		that.configure = configure;
		
		function centerTranslation() {
			return 'translate('+r +','+ r +')';
		}
		
		function isRendered() {
			return (svg !== undefined);
		}
		that.isRendered = isRendered;
		
		function render(newValue) {
			svg = d3.select(container)
			.append('svg:svg')
			.attr('class', 'gauge2')
			.attr('width', config.clipWidth)
			.attr('height', config.clipHeight);
			
			var centerTx = centerTranslation();
			
			var arcs = svg.append('g')
			.attr('class', 'arc')
			.attr('transform', centerTx);
			
			arcs.selectAll('path')
			.data(tickData)
			.enter().append('path')
			.attr('fill', function(d, i) {
				return config.arcColorFn(d * i);
			})
			.attr('d', arc);
			
			var lineData = [ [config.pointerWidth / 2, 0], 
			[0, -pointerHeadLength],
			[-(config.pointerWidth / 2), 0],
			[0, config.pointerTailLength],
			[config.pointerWidth / 2, 0] ];
			var pointerLine = d3.svg.line().interpolate('monotone');
			var pg = svg.append('g').data([lineData])
			.attr('class', 'pointer')
			.attr('transform', centerTx);
			
			pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
			update(newValue === undefined ? 0 : newValue);
		}
		that.render = render;
		
		function update(newValue, newConfiguration) {
			if ( newConfiguration  !== undefined) {
				configure(newConfiguration);
			}
			var ratio = scale(newValue);
			var newAngle = config.minAngle + (ratio * range);
			pointer.transition()
			.duration(config.transitionMs)
			.ease('elastic')
			.attr('transform', 'rotate(' +newAngle +')');
		}
		that.update = update;
		
		configure(configuration);
		
		return that;
	};


	var gauge3 = function(container, configuration) {
		var that = {};
		var config = {
			size						: 200,
			clipWidth					: 200,
			clipHeight					: 110,
			ringInset					: 20,
			ringWidth					: 20,
			
			pointerWidth				: 10,
			pointerTailLength			: 5,
			pointerHeadLengthPercent	: 0.9,
			
			minValue					: 0,
			maxValue					: 4,
			
			minAngle					: -90,
			maxAngle					: 90,
			
			transitionMs				: 750,
			
			majorTicks					: 4,
			labelFormat					: d3.format(',g'),
			labelInset					: 10,
			
			arcColorFn					: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
		};
		var range = undefined;
		var r = undefined;
		var pointerHeadLength = undefined;
		var value = 0;
		
		var svg = undefined;
		var arc = undefined;
		var scale = undefined;
		var ticks = undefined;
		var tickData = undefined;
		var pointer = undefined;
		
		var donut = d3.layout.pie();
		
		function deg2rad(deg) {
			return deg * Math.PI / 180;
		}
		
		function newAngle(d) {
			var ratio = scale(d);
			var newAngle = config.minAngle + (ratio * range);
			return newAngle;
		}
		
		function configure(configuration) {
			var prop = undefined;
			for ( prop in configuration ) {
				config[prop] = configuration[prop];
			}
			
			range = config.maxAngle - config.minAngle;
			r = config.size / 2;
			pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
			
			// a linear scale that maps domain values to a percent from 0..1
			scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
			ticks = scale.ticks(config.majorTicks);
			tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
			
			arc = d3.svg.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
		}
		that.configure = configure;
		
		function centerTranslation() {
			return 'translate('+r +','+ r +')';
		}
		
		function isRendered() {
			return (svg !== undefined);
		}
		that.isRendered = isRendered;
		
		function render(newValue) {
			svg = d3.select(container)
			.append('svg:svg')
			.attr('class', 'gauge3')
			.attr('width', config.clipWidth)
			.attr('height', config.clipHeight);
			
			var centerTx = centerTranslation();
			
			var arcs = svg.append('g')
			.attr('class', 'arc')
			.attr('transform', centerTx);
			
			arcs.selectAll('path')
			.data(tickData)
			.enter().append('path')
			.attr('fill', function(d, i) {
				return config.arcColorFn(d * i);
			})
			.attr('d', arc);
			
			var lineData = [ [config.pointerWidth / 2, 0], 
			[0, -pointerHeadLength],
			[-(config.pointerWidth / 2), 0],
			[0, config.pointerTailLength],
			[config.pointerWidth / 2, 0] ];
			var pointerLine = d3.svg.line().interpolate('monotone');
			var pg = svg.append('g').data([lineData])
			.attr('class', 'pointer')
			.attr('transform', centerTx);
			
			pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
			update(newValue === undefined ? 0 : newValue);
		}
		that.render = render;
		
		function update(newValue, newConfiguration) {
			if ( newConfiguration  !== undefined) {
				configure(newConfiguration);
			}
			var ratio = scale(newValue);
			var newAngle = config.minAngle + (ratio * range);
			pointer.transition()
			.duration(config.transitionMs)
			.ease('elastic')
			.attr('transform', 'rotate(' +newAngle +')');
		}
		that.update = update;
		
		configure(configuration);
		
		return that;
	};


	var gauge4 = function(container, configuration) {
		var that = {};
		var config = {
			size						: 200,
			clipWidth					: 200,
			clipHeight					: 110,
			ringInset					: 20,
			ringWidth					: 20,
			
			pointerWidth				: 10,
			pointerTailLength			: 5,
			pointerHeadLengthPercent	: 0.9,
			
			minValue					: 0,
			maxValue					: 4,
			
			minAngle					: -90,
			maxAngle					: 90,
			
			transitionMs				: 750,
			
			majorTicks					: 4,
			labelFormat					: d3.format(',g'),
			labelInset					: 10,
			
			arcColorFn					: d3.interpolateHsl(d3.rgb('#ff9900'), d3.rgb('#ffcc99'))
		};
		var range = undefined;
		var r = undefined;
		var pointerHeadLength = undefined;
		var value = 0;
		
		var svg = undefined;
		var arc = undefined;
		var scale = undefined;
		var ticks = undefined;
		var tickData = undefined;
		var pointer = undefined;
		
		var donut = d3.layout.pie();
		
		function deg2rad(deg) {
			return deg * Math.PI / 180;
		}
		
		function newAngle(d) {
			var ratio = scale(d);
			var newAngle = config.minAngle + (ratio * range);
			return newAngle;
		}
		
		function configure(configuration) {
			var prop = undefined;
			for ( prop in configuration ) {
				config[prop] = configuration[prop];
			}
			
			range = config.maxAngle - config.minAngle;
			r = config.size / 2;
			pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
			
			// a linear scale that maps domain values to a percent from 0..1
			scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
			ticks = scale.ticks(config.majorTicks);
			tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
			
			arc = d3.svg.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
		}
		that.configure = configure;
		
		function centerTranslation() {
			return 'translate('+r +','+ r +')';
		}
		
		function isRendered() {
			return (svg !== undefined);
		}
		that.isRendered = isRendered;
		
		function render(newValue) {
			svg = d3.select(container)
			.append('svg:svg')
			.attr('class', 'gauge4')
			.attr('width', config.clipWidth)
			.attr('height', config.clipHeight);
			
			var centerTx = centerTranslation();
			
			var arcs = svg.append('g')
			.attr('class', 'arc')
			.attr('transform', centerTx);
			
			arcs.selectAll('path')
			.data(tickData)
			.enter().append('path')
			.attr('fill', function(d, i) {
				return config.arcColorFn(d * i);
			})
			.attr('d', arc);
			
			var lineData = [ [config.pointerWidth / 2, 0], 
			[0, -pointerHeadLength],
			[-(config.pointerWidth / 2), 0],
			[0, config.pointerTailLength],
			[config.pointerWidth / 2, 0] ];
			var pointerLine = d3.svg.line().interpolate('monotone');
			var pg = svg.append('g').data([lineData])
			.attr('class', 'pointer')
			.attr('transform', centerTx);
			
			pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
			update(newValue === undefined ? 0 : newValue);
		}
		that.render = render;
		
		function update(newValue, newConfiguration) {
			if ( newConfiguration  !== undefined) {
				configure(newConfiguration);
			}
			var ratio = scale(newValue);
			var newAngle = config.minAngle + (ratio * range);
			pointer.transition()
			.duration(config.transitionMs)
			.ease('elastic')
			.attr('transform', 'rotate(' +newAngle +')');
		}
		that.update = update;
		
		configure(configuration);
		
		return that;
	};


	var gauge5 = function(container, configuration) {
		var that = {};
		var config = {
			size						: 200,
			clipWidth					: 200,
			clipHeight					: 110,
			ringInset					: 20,
			ringWidth					: 20,
			
			pointerWidth				: 10,
			pointerTailLength			: 5,
			pointerHeadLengthPercent	: 0.9,
			
			minValue					: 0,
			maxValue					: 4,
			
			minAngle					: -90,
			maxAngle					: 90,
			
			transitionMs				: 750,
			
			majorTicks					: 4,
			labelFormat					: d3.format(',g'),
			labelInset					: 10,
			
			arcColorFn					: d3.interpolateHsl(d3.rgb('#ffccff'), d3.rgb('#660066'))
		};
		var range = undefined;
		var r = undefined;
		var pointerHeadLength = undefined;
		var value = 0;
		
		var svg = undefined;
		var arc = undefined;
		var scale = undefined;
		var ticks = undefined;
		var tickData = undefined;
		var pointer = undefined;
		
		var donut = d3.layout.pie();
		
		function deg2rad(deg) {
			return deg * Math.PI / 180;
		}
		
		function newAngle(d) {
			var ratio = scale(d);
			var newAngle = config.minAngle + (ratio * range);
			return newAngle;
		}
		
		function configure(configuration) {
			var prop = undefined;
			for ( prop in configuration ) {
				config[prop] = configuration[prop];
			}
			
			range = config.maxAngle - config.minAngle;
			r = config.size / 2;
			pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
			
			// a linear scale that maps domain values to a percent from 0..1
			scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
			ticks = scale.ticks(config.majorTicks);
			tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
			
			arc = d3.svg.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
		}
		that.configure = configure;
		
		function centerTranslation() {
			return 'translate('+r +','+ r +')';
		}
		
		function isRendered() {
			return (svg !== undefined);
		}
		that.isRendered = isRendered;
		
		function render(newValue) {
			svg = d3.select(container)
			.append('svg:svg')
			.attr('class', 'gauge5')
			.attr('width', config.clipWidth)
			.attr('height', config.clipHeight);
			
			var centerTx = centerTranslation();
			
			var arcs = svg.append('g')
			.attr('class', 'arc')
			.attr('transform', centerTx);
			
			arcs.selectAll('path')
			.data(tickData)
			.enter().append('path')
			.attr('fill', function(d, i) {
				return config.arcColorFn(d * i);
			})
			.attr('d', arc);
			
			var lineData = [ [config.pointerWidth / 2, 0], 
			[0, -pointerHeadLength],
			[-(config.pointerWidth / 2), 0],
			[0, config.pointerTailLength],
			[config.pointerWidth / 2, 0] ];
			var pointerLine = d3.svg.line().interpolate('monotone');
			var pg = svg.append('g').data([lineData])
			.attr('class', 'pointer')
			.attr('transform', centerTx);
			
			pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
			update(newValue === undefined ? 0 : newValue);
		}
		that.render = render;
		
		function update(newValue, newConfiguration) {
			if ( newConfiguration  !== undefined) {
				configure(newConfiguration);
			}
			var ratio = scale(newValue);
			var newAngle = config.minAngle + (ratio * range);
			pointer.transition()
			.duration(config.transitionMs)
			.ease('elastic')
			.attr('transform', 'rotate(' +newAngle +')');
		}
		that.update = update;
		
		configure(configuration);
		
		return that;
	};



	// function onDocumentReady(c) {
	// 	var powerGauge1 = gauge1('#power-gauge', {
	// 		size: 150,
	// 		clipWidth: 225,
	// 		clipHeight: 100,
	// 		ringWidth: 30,
	// 		maxValue: 4,
	// 		transitionMs: 3000,
	// 	});
	// 	var powerGauge2 = gauge2('#power-gauge', {
	// 		size: 150,
	// 		clipWidth: 225,
	// 		clipHeight: 100,
	// 		ringWidth: 30,
	// 		maxValue: 4,
	// 		transitionMs: 3000,
	// 	});
	// 	var powerGauge3 = gauge3('#power-gauge', {
	// 		size: 150,
	// 		clipWidth: 225,
	// 		clipHeight: 100,
	// 		ringWidth: 30,
	// 		maxValue: 4,
	// 		transitionMs: 3000,
	// 	});
	// 	var powerGauge4 = gauge4('#power-gauge', {
	// 		size: 150,
	// 		clipWidth: 225,
	// 		clipHeight: 100,
	// 		ringWidth: 30,
	// 		maxValue: 4,
	// 		transitionMs: 3000,
	// 	});
	// 	var powerGauge5 = gauge5('#power-gauge', {
	// 		size: 150,
	// 		clipWidth: 225,
	// 		clipHeight: 100,
	// 		ringWidth: 30,
	// 		maxValue: 4,
	// 		transitionMs: 3000,
	// 	});
		
	// 	function updateReadings(c) {

	// 		// $http.get('/api/surveys/gaugeData/56433548/').success(function(data) {
	// 	 //        console.log(data);
		      
	// 		// // just pump in random data here...
	// 		// powerGauge1.update(data.OSS); //<-------------------------------------gauge values
	// 		// powerGauge2.update(data.OMSS);
	// 		// powerGauge3.update(data.LBSS);
	// 		// powerGauge4.update(data.SESS);
	// 		// powerGauge5.update(data.TRSS);

	// 		powerGauge1.update(c); //<-------------------------------------gauge values
	// 		powerGauge2.update(c);
	// 		powerGauge3.update(c);
	// 		powerGauge4.update(c);
	// 		powerGauge5.update(c);
	// 		// });
	// 	}
						
	// 	powerGauge1.render();
	// 	powerGauge2.render();
	// 	powerGauge3.render();
	// 	powerGauge4.render();
	// 	powerGauge5.render();
		
	// 	// update reading values
	// 	updateReadings(c);
	// }
	
	// if ( !window.isLoaded ) {
	// 	window.addEventListener("load", function() {
	// 		onDocumentReady();
	// 	}, false);
	// 	} else {
	// 	onDocumentReady();
	// }

	//onDocumentReady();
  