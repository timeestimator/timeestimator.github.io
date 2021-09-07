// Global variables
var sub_task_id = 0;
var surprise_id = 0;

var sub_tasks = [];
var surprises = [];

var samples = [];
var dots = [];
var num_samples = 10000;
var num_dots = 20;
//const binWidth = num_dots ==  20 ? 2 : 5;
var binWidth = 2;
var ticks = 10;

var blank_url = "http://localhost:8888/index.html";
const get_sep = '+';

var live_update = true;
var local_storage = true;
var tangles_subtasks = [];
var tangles_surprises = [];

// to be sure the tangles and regular html objects are linked correctly
var subtasks_order = [];
var surprises_order = [];



function init(){
	// get url
	var whole_url = window.location.href;
	blank_url = whole_url.split("?")[0];
	$('#url-text').val(whole_url);
	
	add_sub_task();
	add_surprise();
	load_arguments();
	attachListeners();
	if (live_update) {
		document.getElementById('vis-button').hidden = true;
	}
}

// Add another sub-task
function add_sub_task(num){
	if (subtasks_order.length < 40) {
		var update_tmp = live_update;
		live_update = false;
		if (sub_task_id > 0){
			var new_task = tmpl("sub_task_template", {id: sub_task_id});
			var where = $('#sub-task-' + num);
			$(new_task).insertAfter(where); 
			tangles_subtasks.splice(whereToAdd(num,subtasks_order),0,new Tangle(document.getElementById("sub-task-"+sub_task_id),model_subtasks));
			subtasks_order.splice(whereToAdd(num,subtasks_order),0,sub_task_id);
		} else {
			$('#sub-tasks').append(tmpl("sub_task_template", {id: sub_task_id}));
			tangles_subtasks.push(new Tangle(document.getElementById("sub-task-"+sub_task_id),model_subtasks));
			subtasks_order.push(sub_task_id);
		}
		sub_task_id++;
		live_update = update_tmp;
		attachListeners();
		fieldsChanged();
	}
}

function remove_sub_task(num){
	if (subtasks_order.length > 1) {
		$('#sub-task-' + num).remove();
		tangles_subtasks.splice(whereToAdd(num,subtasks_order,0),1);
		subtasks_order.splice(whereToAdd(num,subtasks_order,0),1);
		fieldsChanged();
	}
}

// Add another surprise
function add_surprise(num){
	var update_tmp = live_update;
	live_update = false;
	if (surprise_id > 0){
		var new_surprise = tmpl("surprise_template", {id: surprise_id});
		var where = $('#surprise-' + num);
		$(new_surprise).insertAfter(where); 
		tangles_surprises.splice(whereToAdd(num,surprises_order),0,new Tangle(document.getElementById("surprise-"+surprise_id),model_surprises));
		surprises_order.splice(whereToAdd(num,surprises_order),0,surprise_id);
	} else {
		$('#surprises').append(tmpl("surprise_template", {id: surprise_id})); 
		tangles_surprises.push(new Tangle(document.getElementById("surprise-"+surprise_id),model_surprises));
		surprises_order.push(surprise_id);
	}
	surprise_id++;
	live_update = update_tmp;
	attachListeners();
	fieldsChanged();
}

function remove_surprise(num){
	if (surprises_order.length > 1) {
		$('#surprise-' + num).remove();
		tangles_surprises.splice(whereToAdd(num,surprises_order,0),1);
		surprises_order.splice(whereToAdd(num,surprises_order,0),1);
		fieldsChanged();
	}
}

function update_sub_tasks(){
	var ar = $('#sub-tasks').children();
	sub_tasks = [];
	ar.each(function(index, element){
		var new_task = {name : $('.name', element).val(), 
						lower: tangles_subtasks[index].getValue("lower"),
						upper: tangles_subtasks[index].getValue("upper")
					};
		if (new_task.lower != '' && new_task.upper != '')
			sub_tasks.push(new_task);
	});
}

function update_surprises(){
	var ar = $('#surprises').children();
	surprises = [];
	ar.each(function(index, element){
		var new_surprise = {
						name : $('.name', element).val(), 
						lower: tangles_surprises[index].getValue("lower"),
						upper: tangles_surprises[index].getValue("upper"),
						likelihood: tangles_surprises[index].getValue("numerator")/tangles_surprises[index].getValue("denominator"),
						sign: tangles_surprises[index].getValue("sign") < 0 ? '-' : '+'
					};
		if (new_surprise.lower != '' && new_surprise.upper != '' && new_surprise.numerator != '' && new_surprise.denominator != '')
			surprises.push(new_surprise);
	});
}

function visualize(update=true) {
	//window.location.href = 'http://localhost:8888/index.html?query=dumb';

if(update) {
		update_sub_tasks();
		update_surprises();
	}
	var maxVal = 0;
	
	//console.log("considering " + sub_tasks.length + " sub-tasks");
	samples = [];
	for (var i = num_samples - 1; i >= 0; i--) {
		var newSample = Math.max(get_task_sample()+get_surprise_sample(),0);
		samples.push(newSample);
		maxVal = maxVal < newSample ? newSample : maxVal;
	}
	updateBinWidth(maxVal);
	dotplot.draw();
	update_url();
	update_local_storage();
	console.log(window.innerWidth);
}

function load_arguments() {
	var args = new URLSearchParams(location.search);

	// SUB-TASKS
	if (!args.has("st0")) {
		load_local_storage();
		return 0;
	}
	var i = 0;
	while(args.has("st"+i)){
		if (i > 0) {
			add_sub_task(i-1);
		}
		i++;
	}
	var ar = $('#sub-tasks').children();
	sub_tasks = [];
	ar.each(function(index, element){
		var arg = args.get("st"+index).split(" ");
		$('.name', element).val(arg[0]);
		tangles_subtasks[index].setValue("lower",parseInt(arg[1]));
		tangles_subtasks[index].setValue("upper",parseInt(arg[2]));
		var new_task = {name : arg[0], 
						lower: arg[1],
						upper: arg[2]
					};
		if (new_task.lower != '' && new_task.upper != '')
			sub_tasks.push(new_task);
	});

	if (!args.has("sp0")) {
		visualize(false);
		return 0;
	}
	i = 0;
	while(args.has("sp"+i)){
		if (i > 0) {
			add_surprise(i-1);
		}
		i++;
	}
	ar = $('#surprises').children();
	surprises = [];
	ar.each(function(index, element){
		var arg = args.get("sp"+index).split(" ");
		$('.name', element).val(arg[0]);
		tangles_surprises[index].setValue("lower",parseInt(arg[1],10));
		tangles_surprises[index].setValue("upper",parseInt(arg[2],10));
		tangles_surprises[index].setValue("numerator",parseInt(arg[3],10));
		tangles_surprises[index].setValue("denominator",parseInt(arg[4],10));
		tangles_surprises[index].setValue("sign",parseInt(arg[5],10));
		$('.event-type',element)[0].innerHTML = parseInt(arg[5],10) < 0 ? 'faster' : 'slower';
		var new_surprise = {name : arg[0], 
						lower: arg[1],
						upper: arg[2],
						likelihood: parseInt(arg[3],10)/parseInt(arg[4],10),
						sign: parseInt(arg[5],10) > 0 ? '+' : '-'
					};
		if (new_surprise.lower != '' && new_surprise.upper != '')
			surprises.push(new_surprise);
	});
	visualize(false);

}

function load_local_storage() {	
	for(var i = 0 ; i < parseInt(localStorage.getItem("subtasks")) ; i++) {
		if (i > 0) {
			add_sub_task(i-1);
		}
	}
	var ar = $('#sub-tasks').children();
	ar.each(function(index,element){
		$('.name', element).val(localStorage.getItem("st"+i+"_name"));
		tangles_subtasks[index].setValue("lower",parseInt(localStorage.getItem("st"+index+"_lower")));
		tangles_subtasks[index].setValue("upper",parseInt(localStorage.getItem("st"+index+"_upper")));
	});

	for(var i = 0 ; i < parseInt(localStorage.getItem("surprises")) ; i++) {
		if (i > 0) {
			add_surprise(i-1);
		}
	}
	ar = $('#surprises').children();
	ar.each(function(index,element){
		$('.name', element).val(localStorage.getItem("sp"+index+"_name"));
		tangles_surprises[index].setValue("lower",parseInt(localStorage.getItem("sp"+index+"_lower")));
		tangles_surprises[index].setValue("upper",parseInt(localStorage.getItem("sp"+index+"_upper")));
		tangles_surprises[index].setValue("numerator",parseInt(localStorage.getItem("sp"+index+"_numerator")));
		tangles_surprises[index].setValue("denominator",parseInt(localStorage.getItem("sp"+index+"_denominator")));
		tangles_surprises[index].setValue("sign",parseInt(localStorage.getItem("sp"+index+"_sign")));
		$('.event-type',element)[0].innerHTML = parseInt(localStorage.getItem("sp"+index+"_sign")) < 0 ? 'faster' : 'slower';
	});

	visualize();

}

function update_url() {
	var query = "?";
	var ar = $('#sub-tasks').children();
	var i = 0;
	ar.each(function(index, element){
		if (i != 0) {query += "&";}
		query += "st"+i+"="+$('.name', element).val()+"+"+tangles_subtasks[index].getValue("lower")+"+"+tangles_subtasks[index].getValue("upper");
		i++;
	});
	ar = $('#surprises').children();
	i = 0;
	ar.each(function(index, element){
		query += "&sp"+i+"="+$('.name', element).val()+"+"+tangles_surprises[index].getValue("lower")+"+"+tangles_surprises[index].getValue("upper")+"+"+tangles_surprises[index].getValue("numerator")+"+"+tangles_surprises[index].getValue("denominator")+"+"+tangles_surprises[index].getValue("sign");
		i++;
	});
	if (!live_update) {
		query += "&lu=off"
	} if(num_dots != 20) {
		query += "&nd=50"
	}
	//window.location.href = blank_url + query;
	$('#url-text').val(blank_url+query);
	update_local_storage();
}

function update_local_storage() {
	if (local_storage) {
		localStorage.clear();
		var ar = $('#sub-tasks').children();
		ar.each(function(index,element){
			localStorage.setItem("st"+index+"_name",$('.name', element).val());
			localStorage.setItem("st"+index+"_lower",tangles_subtasks[index].getValue("lower"));
			localStorage.setItem("st"+index+"_upper",tangles_subtasks[index].getValue("upper"));
		});
		ar = $('#surprises').children();
		ar.each(function(index,element){
			localStorage.setItem("sp"+index+"_name",$('.name', element).val());
			localStorage.setItem("sp"+index+"_lower",tangles_surprises[index].getValue("lower"));
			localStorage.setItem("sp"+index+"_upper",tangles_surprises[index].getValue("upper"));
			localStorage.setItem("sp"+index+"_numerator",tangles_surprises[index].getValue("numerator"));
			localStorage.setItem("sp"+index+"_denominator",tangles_surprises[index].getValue("denominator"));
			localStorage.setItem("sp"+index+"_sign",tangles_surprises[index].getValue("sign"));
		});
		localStorage.setItem("subtasks",subtasks_order.length);
		localStorage.setItem("subtasks",surprises_order.length);
	}
}


function copy_url() {
	var url = $('#url-text');
	url.select();
	document.execCommand('copy');
}

function load_url() {
	window.location.href = $('#url-text').val();
}

function fieldsChanged() {
	if (live_update) {
		visualize();
		return true;
	}
	return false;
}

function attachListeners() {
	// attach event listeners to all input fields
	$('input').on('keyup',update_url);
	$('select').on('change',fieldsChanged);
}

var model_surprises = {
	initialize: function() {
		this.lower = 5;
		this.upper = 10;
		this.numerator = 2;
		this.denominator = 5;
		this.sign = 1;

	},
	update: function() {
		if (this.numerator > this.denominator) {
			this.numerator = this.denominator;
			return 0;
		}
		if (this.lower > this.upper) {
			this.lower = this.upper;
			return 0;
		}
		fieldsChanged();
	}
};

var model_subtasks = {
	initialize: function() {
		this.lower = 10;
		this.upper = 15;
	},
	update: function() {
		if (this.lower > this.upper) {
			this.lower = this.upper;
		} else {
			fieldsChanged();
		}
	}
};

function changeEventType(num) {
	var where = whereToAdd(num,surprises_order,0);
	var new_val = tangles_surprises[where].getValue("sign") * (-1);
	tangles_surprises[where].setValue("sign",new_val);
	var ar = $('#surprises').children();
	ar.each(function(index, element){
		if (index == where) {
			$('.event-type',element)[0].innerHTML = new_val < 0 ? "faster" : "slower";
		}
	});
	//tangles_surprises[whereToAdd(num,surprises_order,0)].setValue("sign",new_val);
	fieldsChanged();

}

function whereToAdd(num,tab, add=1) {
	for (var i = tab.length - 1; i >= 0; i--) {
		if (tab[i] == num) {
			return i+add;
		}
	}
	return -1;
}

function toggleLiveUpdate() {
	var update_var = document.getElementById("update-live");
	live_update = !live_update;
	update_var.innerHTML = live_update ? "on" : "off";
	if (!fieldsChanged()) {
		update_url();
		document.getElementById('vis-button').hidden = false;
	} else {
		document.getElementById('vis-button').hidden = true;
	}
}

function toggleNumberDots() {
	var nb_dots_var = document.getElementById("nb-dots");
	num_dots = (num_dots*2.5) % 105;
	nb_dots_var.innerHTML = num_dots;
	fieldsChanged();
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}


function updateBinWidth(maxVal) {
	binWidth = 2;
	ticks = 10;
	var wSize = window.innerWidth;
	var maxDots = Math.round(wSize/200)*10;
	console.log("max dots = "+maxDots);
	console.log("max val = "+maxVal);
	maxVal = Math.ceil(maxVal/10)*10;
	var i = 0;
	while (maxVal/binWidth > maxDots) {
		console.log("bin width = "+binWidth);
		if (binWidth == 2) {binWidth = 5;}
		else if (binWidth == 20) {binWidth = 50;}
		else {
			binWidth *= 2;
		}
		console.log("bin width = "+binWidth);
		i++;

	}
	if (binWidth >= 10) {
		ticks = 25 * Math.exp(i-2);
	}
}







window.onload = init;