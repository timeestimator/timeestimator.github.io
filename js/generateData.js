var jstat = this.jStat();
jStat.setRandom(new Math.seedrandom('time'));
var conf_level = 0.95;
//var conf_level = 1;
var z_score = jStat.normal.inv(0.5 + conf_level/2, 0, 1);

function getMean(low, up){
	/*var mean = Math.exp((Math.log(low) + Math.log(up)) / 2.0);
	console.log("mean = "+mean);*/
	return Math.exp((Math.log(low) + Math.log(up)) / 2.0);
}

function getSD(low, up){
	/*var sd = Math.exp((Math.log(up) - Math.log(low)) / z_score / 2);
	console.log("sd = "+sd);*/
	return Math.exp((Math.log(up) - Math.log(low)) / z_score / 2);
}


function sumup(total, num) {
  return total + num;
}

function get_task_sample() {
	var summed = 0;
	sub_tasks.forEach(function (element) {
		summed += getSample(element.lower, element.upper);
	});
	return summed;
	
}

function get_surprise_sample(){
	var summed = 0;
	surprises.forEach(function(element){
		if (jStat.uniform.sample(0, 1) <= element.likelihood){
			var value = getSample(element.lower, element.upper);
			if (element.sign == '+')
				summed += value;
			else
				summed -= value;
		}

	});
	return summed;
}


function getSample(low, up){
	low = pos(low);
	up = pos(up);
	return jStat.lognormal.sample(Math.log(getMean(low,up)), Math.log(getSD(low,up)));
}

function getDelay(data,longer=true){
	var delay = 0;
	var l = data["likelihood"].length;
	if (!longer) {
		l -= 1;
	}
	for (var i = 0; i < l ; i++) {
		var happens = jStat.uniform.sample(0, 1) <= data["likelihood"][i];
		if (happens){
			delay +=  getSample(pos(data["lower"][i]), pos(data["upper"][i]));
		}
	}
	return delay;
}


function pos(v){
	return Math.max(0.1, v);
}

var new_data = true;

var sb_task = {};
sb_task["col"] = [15,17,19,21,23]
var slow_ev = {};
slow_ev["col_ev"] = [26,28,30,32];	
slow_ev["col_li"] = [44,45,46,47];
var fast_ev = {};
fast_ev["col_ev"] = [35,37,39,41];
fast_ev["col_li"] = [48,49,50,51];

function newSample() {
	if (data_pos == 0) {
		data_pos = 1;
	}
	new_data = false;
	simulateAndVisualize();
}


function simulateAndVisualize() {
	if (is_debug) {
		console.log("simulate and visualize");
	}

	if (is_debug && !full_test) {

		if (new_data) {
			data_pos += 1;
			debug_sim = true;
		}
		
		sb_task["lower"] = [];
		sb_task["upper"] = [];
		for (var i = 0; i < sb_task["col"].length; i++) {
			sb_task["lower"].push(data[data_pos][sb_task["col"][i]]);
			sb_task["upper"].push(data[data_pos][sb_task["col"][i]+1]);
		}
		if (is_debug) {
			console.log(sb_task);
		}

		
		slow_ev["lower"] = [];
		slow_ev["upper"] = [];
		slow_ev["likelihood"] = [];
		for (var i = 0; i < slow_ev["col_ev"].length; i++) {
			slow_ev["lower"].push(data[data_pos][slow_ev["col_ev"][i]]);
			slow_ev["upper"].push(data[data_pos][slow_ev["col_ev"][i]+1]);
			slow_ev["likelihood"].push(data[data_pos][slow_ev["col_li"][i]]);
		}
		if (is_debug) {
			console.log(slow_ev);
		}


		fast_ev["lower"] = [];
		fast_ev["upper"] = [];
		fast_ev["likelihood"] = [];
		for (var i = 0; i < fast_ev["col_ev"].length; i++) {
			fast_ev["lower"].push(data[data_pos][fast_ev["col_ev"][i]]);
			fast_ev["upper"].push(data[data_pos][fast_ev["col_ev"][i]+1]);
			fast_ev["likelihood"].push(data[data_pos][fast_ev["col_li"][i]]);
		}
		if (is_debug) {
			console.log(fast_ev);
		}

		samples = [];
		for (var i = 0; i < num_samples; i++) {
			var num = get_sub_tasks() + getDelay(slow_ev) - getDelay(fast_ev);
			samples.push({id: i, value: num});
		}
		data_pos = data_pos%29;
		new_data = true;

	} else {

		for (var i = 0; i < num_samples; i++) {
			var t1 = get_sub_tasks();
			var t2 = getDelay(slow_events);
			var t3 = getDelay(fast_events,longer=false);
			/*console.log("t1 "+t1);
			console.log("t2 "+t2);
			console.log("t3 "+t3);*/
			//var num = get_sub_tasks() + getDelay(slow_events) - getDelay(fast_events,longer=false);
			var num = t1 + t2 - t3;
			samples.push({id: i, value: Math.max(1, num)}); // we take the min here to get rid of negative duration which can happen when people rate things making them faster as too likely than is realistic
		}
	}

	if (is_debug) {
		console.log(samples);
	}
	dot_plot.draw();

}
