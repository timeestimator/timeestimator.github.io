<!DOCTYPE html>
<html>

<head>
    <title>Time Estimator</title>
    <!-- UIkit CSS -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/uikit.min.css" />
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <!-- UIkit JS -->
    <script src="js/uikit.min.js"></script>
    <!-- <script src="js/uikit-icons.min.js"></script> -->
    <script src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="TangleKit/TangleKit.css" type="text/css">

<body>

    <div class="uk-container uk-container-center uk-margin-top uk-margin-bottom center">
    	<h1>Time estimator</h1>
    	<p class="explanation-text">Estimating the duration of a task might be difficult without the appropriate tools. Below you will find a time estimator, designed to help you visualize better the possible durations of a task based on your own beliefs. In order for the predictive visualization to be as precise as possible, you need to decompose your task into smaller components and estimate for each sub-task (e.g., if your whole task is preparing breakfast, then sub-tasks can be brewing coffee, toasting bread and making scrambled eggs), and add surprising events that could occur and either quicken or slow the proceedingare uncertain, you also have to estimate their frequency (i.e., how likely they are to happen). You can play around with the intervals' values and options by <span class="options">clicking</span> or <span id="AdjustableNumber-example">dragging</span> them.
        <div id="sub-task-container" class="uk-margin-bottom"><h4 class="uk-h4">Breaking the task down</h4><ol id="sub-tasks" class="uk-list-decimal"></ol></div>
        <div id="surprises-container" class="uk-margin-bottom"><h4 class="uk-h4">Considering possible events slowing down or speeding up</h4><ol id="surprises" class="uk-list-decimal"></ol></div>

        <div> <h4 class="uk-4k">Options</h4>
        	<div>
				<p>Live updates are <span class="options" id="update-live" onclick="toggleLiveUpdate()">on</span>.
				You are visualizing a <span class="options" id="nb-dots" onclick="toggleNumberDots()">20</span>-dot quantile plot.</p>
        	</div>

        	 <div id="dotplot-container" class="uk-margin-bottom">
            
        </div><button id="vis-button" onclick="visualize();">Visualize</button><br/>

        <div>
        	<span class="sharing-link"><br/>Sharing link: </span>
        	<input type="text" name="url" id="url-text" class="readonly-url" value="" readonly>
        	<button onclick="copy_url();"><input type="image" name="clipboard" src="images/clipboard.png" alt="Copy" height="12"></button>
        	<button onclick="load_url();"><input type="image" name="toparrow" src="images/toparrow.png" alt="Load" height="12"></button>
    	</div>
        </div>

    </div>
</body>
</html>
<script src="js/jquery-ui.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jstat/1.9.4/jstat.min.js" integrity="sha512-MGT8BGoc8L3124PwHEGTC+M8Hu9oIbZOg8ENcd92sQKKidWKOOOZ6bqQemqYAX0yXJUnovOkF4Hx9gc/5lVxPw==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js" integrity="sha512-+Ru50BzEpZjlFzVnjSmJfYFPFfY2hS0Kjlu/IvqaJoux7maF5lJrRVUJWJ2LevPls7rd242GLbWEt+zAo4OVVQ==" crossorigin="anonymous"></script>
<script src="js/Tangle.js"></script>
<script src="TangleKit/mootools.js"></script>
<script src="TangleKit/sprintf.js"></script>
<script src="TangleKit/BVTouchable.js"></script>
<script src="TangleKit/TangleKit.js"></script>
<script src="js/main.js?version=3"></script>
<script src="js/generateData.js"></script>
<script src="js/dotplot.js"></script>
<script type="text/javascript">

/** Simple JavaScript Templating
 *  John Resig - https://johnresig.com/ - MIT Licensed
 *  code taken from https://johnresig.com/blog/javascript-micro-templating 
 ***/
	(function(){
	  var cache = {};
	   
	  this.tmpl = function tmpl(str, data){
	    // Figure out if we're getting a template, or if we need to
	    // load the template - and be sure to cache the result.
	    var fn = !/\W/.test(str) ?
	      cache[str] = cache[str] ||
	        tmpl(document.getElementById(str).innerHTML) :
	       
	      // Generate a reusable function that will serve as a template
	      // generator (and which will be cached).
	      new Function("obj",
	        "var p=[],print=function(){p.push.apply(p,arguments);};" +
	         
	        // Introduce the data as local variables using with(){}
	        "with(obj){p.push('" +
	         
	        // Convert the template into pure JavaScript
	        str
	          .replace(/[\r\t\n]/g, " ")
	          .split("<%").join("\t")
	          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	          .replace(/\t=(.*?)%>/g, "',$1,'")
	          .split("\t").join("');")
	          .split("%>").join("p.push('")
	          .split("\r").join("\\'")
	      + "');}return p.join('');");
	     
	    // Provide some basic currying to the user
	    return data ? fn( data ) : fn;
	  };
	})();

</script>

<!-------------------------------------------------------------
 Below are templates, html snippets, which are used to generate  UI elements for additional tasks. 
 -------------------------------------------------------------->


<script type="text/html" id="surprise_template">
	<li class="uk-list" id="surprise-<%=id%>">
        <div class="uk-display-block">
        	<input type="text" name="surprise-name-<%=id%>" class="surprise name" placeholder="Name (optional)"> 
        	<span class="col-md">from 
        		<span class="TKAdjustableNumber" data-var="lower" data-min="0" data-max="70"></span> 
        		to <span class="TKAdjustableNumber" data-var="upper" data-min="1" data-max="70"></span> 
        	minute(s)</span>
        	<span data-var="event-type" class="options event-type" onclick="changeEventType(<%=id%>);" name="event-type-<%=id%>" id="event-type-<%=id%>">slower</span>
        	<span class="button-span">
	        	<button class="event-button add-button" onclick="add_surprise(<%=id%>);">insert</button>
	        	<button class="event-button remove-button" onclick="remove_surprise(<%=id%>);"><input type="image" name="toparrow" src="images/redcross.png" alt="remove" height="12"></button>
	        </span>
    </div>
        <div class="uk-display-block">
            <div class="row"><span class="col-md"> it happens <span class="TKAdjustableNumber" data-var="numerator" data-min="0" data-max="1000"></span> time(s) out of  <span class="TKAdjustableNumber" data-var="denominator" data-min="1" data-max="1000"></span></span></div>
        </div>
        
	</li>
</script>


<script type="text/html" id="sub_task_template">
    <li class="uk-list" id="sub-task-<%=id%>">
        <div class="uk-display-block"><input type="text" name="sub-task-name-<%=id%>" class="sub-task name" placeholder="Name (optional)"> <span class="col-md">from <span class="TKAdjustableNumber" data-var="lower" data-min="0" data-max="70"></span> to <span class="TKAdjustableNumber" data-var="upper" data-min="1" data-max="70"></span> minute(s)</span> 
        	<span class="button-span">
	        	<button class="event-button add-button" onclick="add_sub_task(<%=id%>);">insert</button>
	        	<button class="event-button remove-button" onclick="remove_sub_task(<%=id%>);"><input type="image" name="toparrow" src="images/redcross.png" alt="remove" height="12"></button>
	        </span>
    </li>

</script>
