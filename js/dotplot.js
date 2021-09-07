var stnd;

var dotplot = (function() {
  
  // this is the max width of the canvas holding the visualization in pixel
  var maxWidth = 700;
  var is_debug = true;
  var sampleSize = 10000;

  //number of bins for histogram
  var nbins = 20;
  var circleRadius = 7; // in pixel

  var allData = []; // this variable will hold the complete data set
  var shortened = [];

  var x;
  var histogram;
  var bins;
  var data;

  function prepBins(xMax, binWidth,data) {

     
    // number of bins depends on the bin width and the max value
    nbins = Math.round(xMax / binWidth); 

    // x defines the x axis in terms of pixels (rangeround) and in terms of data values (domain)
    x = d3.scaleLinear()
            .rangeRound([0, maxWidth])
            .domain([0, xMax]);


    // call histogram to get the data in binned form; 
    //      uses x.domain (defined just above) to determine the max of the x-axis
    //      uses nbins
   bin = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(nbins))
      .value(function(d) { 
        return d;} ); 


    // filtering out empty bins
    bins = bin(data).filter(d => d.length>0);



    // this will hold the shortened bins 
    // we need to keep track of the new maximum number of dots to scale the plot to the right size later 
    var yMax = 0;
    shortened = [];
    var tmp_bins = [];


    let dot_val = data.length/num_dots;

    bins.forEach(function(item,index){
      // compute how many dots we want from this bin (before final check for size)
      var newlength = Math.floor(item.length/dot_val);
      tmp_bins.push([item,item.length - (newlength * dot_val)]);
      // keep track of the max number
      yMax = Math.max(newlength+1,yMax);
      // add we add the values from the shortenend bin to the 'shortened' array
      shortened = shortened.concat(item.slice(0,newlength));
    });



    tmp_bins.sort(function(a,b){
      if (a[1] == b[1]) {return 0;}
      return ((a[1] < b[1]) ? 1 : -1);
    });

    var missing = num_dots - shortened.length;
    for (var i = 0 ; i < missing ; i++) {
      shortened = shortened.concat(tmp_bins[i][0].slice(0,1));
    }

    stnd = shortened;

    if (is_debug) {
      console.log("final size = "+shortened.length);
    }
    

    return yMax;
  }



  return {
    // calling draw will (re)draw everything
    draw : function (){
      // use the generated data (stored in samples)
      let data = samples; 
      var xMax = d3.max(samples);//.map(function(d){ return d.value; }));
      var xMin = d3.min(samples); //.map(function(d){ return d.value; }));


      yMax = prepBins(xMax, binWidth, data);
      xMax = (Math.ceil(d3.max(shortened) / 10) + 1) * 10;


      // compute the new height of the chart
      yMax = 2 * circleRadius * yMax;


      // set up the SVG
      var margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = xMax/binWidth * 2 * circleRadius;// - margin.left - margin.right,
            height = yMax; //Math.max(yMax, 260);//  260 is the minimum chart height

      // if there is already an svg, remove it first
      d3.select("svg").remove();
      const svg = d3.select("#dotplot-container")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                  `translate(${margin.left}, ${margin.top})`);


      // set up a new x axis using the values for the shortened plot
      x.rangeRound([0, width])
       .domain([0, xMax]);

      // this actually generates the svg code for the x-axis
      var xAxis = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(Math.ceil(xMax/ticks)+1));

      // this addd the x-axis label (the unit)
      svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(units_dotplot[unit]);
      
      // now we create bins again from the shortened array
      bins = bin(shortened).filter(d => d.length>0);

      //create a g container for each bin
      let binContainer = svg.selectAll(".gBin")
        .data(bins);


      let binContainerEnter = binContainer.enter()
        .append("g")
          .attr("class", "gBin")
          .attr("transform", d => `translate(${x(d.x0)}, ${height})`)
      var maxHeight = 0;
      //need to populate the bin containers with data
      binContainerEnter.selectAll("circle")
          .data(d => d.map((p, i) => {
            return {idx: i,
                    value: p,
                    radius: circleRadius //(x(d.x1)-x(d.x0))/2 // 
                  }
          }))

          // the code below creates the actual dots
        .enter()
        .append("circle")
          .attr("class", "enter")
          .attr("cx", circleRadius) // setting cs to circleRadius centers the circle within the bin, setting it to 0 centers it on the start value of the bin 
          .attr("cy", function(d) {
              return - d.idx * 2 * d.radius - d.radius; })
            .attr("r", function(d) {
            return (d.length==0) ? 0 : d.radius; });

    }
  }
})();


