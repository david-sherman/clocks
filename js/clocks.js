/* CLOCKS */

var timer;
var _base = 10;
var _factor = [0,0,0,0,0]
var _values = [0,0,0,0,0]
var _decimalValues = [0,0,0,0,0]

var base = 10;
var goRandom = false;

var maxFactor =  6;
var numFactors  = 6;
var factor = [0,0,0,0]

var hours = [0,0,0,0]
var minutes = [0,0,0,0]
var seconds = [0,0,0,0]
/*

 2  1,2,4,8,16,32
 3  1,3,9,27
 4  1,4,16
 5  1,5,25
 6, 1,6,36
 7  1,7,49
 8  1,8,64
 9  1,9,81
 10 1,10,100


 */

function getParameter(theParameter) {
  var params = window.location.search.substr(1).split('&');

  for (var i = 0; i < params.length; i++) {
    var p=params[i].split('=');
	if (p[0] == theParameter) {
	  return decodeURIComponent(p[1]);
	}
  }
  return false;
}

function setBase(base)
{
    _base = base;
    $("#clockbutton").attr( "href", "./theclock.html?base=" + _base );
	for ( index =  0; index < maxFactor; index++ )
	{
		_factor[index] = Math.pow( _base, index )
	}
}

function _calcValues( x, target)
{
	v  = x ;

	for ( index = ( maxFactor-1); index > 0; index-- )
	{
		modulo  =  v % _factor[index]
		if ( modulo >= 0 )
		n  = Math.round( ( v / _factor[index] ) - 0.5 )
		target[index] = n
		v = v  - n * _factor[index]
	}
	target[0]  = v;
}
/*******************/

function calcValues( x, target)
{
	v  = x ;

	for ( index = ( maxFactor-1); index > 0; index-- )
	{
		modulo  =  v % factor[index]
		if ( modulo >= 0 )
		n  = Math.round( ( v / factor[index] ) - 0.5 )
		target[index] = n
		v = v  - n * factor[index]
	}
	target[0]  = v;
}


function showBase10( h, m, s, ms )
{
 	$("#base_10_h").html( " " + h );
 	$("#base_10_m").html( " " + m );
 	$("#base_10_s").html( " " + s );
}

function showFactors( factors )
{
    for (x=0; x< maxFactor; x++ )
    {
        id = ".factor_" + x;
        f = factor[x]
        content =  ( f <  59 ) ? "x" + factor[x] : "-"
        $(id).html( content )
    }
}


function showValues( key, values, factor )
{
    total = 0
    equation = ""
    for (x=0; x< numFactors; x++ )
    {
        id = "#value_" + key + "_" + x;
        $(id).html( "&nbsp;&nbsp;" + values[x] )
        $("#" + key + "_" + x ).attr("class", "circle c" + values[x])
        id = "#decimal_" + key + "_" + x;
        v = values[x] * factor[x]
        $(id).html( "" + v )
        total = total + v;
        tic = ( x == numFactors-1  ) ? "" : " + "
        equation = tic  + v + equation;
    }
    equation = equation + " = " + total;
    $("#equation_" + key).html( equation)
}


var update = function()
{
	now = new Date()
	ampm = ' am'
	if ( now.getHours() > 11 ) ampm = ' pm'
    timeComponents =  [ now.getHours(), now.getMinutes(), now.getSeconds() ]
	timeComponents[0] = ( timeComponents[0] > 12 ) ? "0" + (timeComponents[0]-12 ) : timeComponents[0];
	timeComponents[1] = ( timeComponents[1] < 10 ) ? "0" + (timeComponents[1] ) : timeComponents[1];
	timeComponents[2] = ( timeComponents[2] < 10 ) ? "0" + (timeComponents[2] ) : timeComponents[2];
	$('#infoBase').html("Current base is " + _base + ".");
    $('#infoTime').html("Current time is " + timeComponents[0] + ":" + timeComponents[1] + ":" + timeComponents[2] + ampm);
    keys = ['h','m', 's']
    table_names = ["values", "factors", "products"]
    tops = [0,0,6,4,3,3,3,3,2,2,2]
	widths = [0,0,17,25,33,33,33,33,50,50,50]

    // For hours, mintues, seconds ...

    for ( var index in keys)
    {
        key = keys[index]

        // Calculate the components of time in the current base

	    _calcValues( timeComponents[index], _values)
	    answer = 0
	    for (x=0; x< numFactors;x++)
	    {
    	    _decimalValues[x] = _values[x] * _factor[x]
    	    answer = answer + _decimalValues[x]
    	 }

        // Update the circles

        table_id = "#circles_" + key
        $(table_id).empty()
    	for (x=tops[_base]; x > 0; x-- )
    	{
    	    circleClass = 'circle'
    	    tableRow ="<td class='centerednumber'><div class='" + circleClass + " c" + _values[x-1] + "'>&nbsp</div></td>"
    	    $(table_id).append(tableRow)
    	}


        // For the values in the current base, the factors (could be done elsewhere ), and the values in decimal
        // update the display

        $(".centerednumber").css( 'width',widths[_base] + "%")
    	for ( tableNameIndex in table_names )
    	{
    	    table_id = "#" + table_names[tableNameIndex] + "_" + key
    	    sumString = ''
	        $(table_id).empty();
    	    for (x=tops[_base]; x > 0; x-- )
	        {
	        	y = x-1
	        	v = _values[y]
	        	if ( tableNameIndex == 1 ) v = "x" + _factor[x-1]
	        	if ( tableNameIndex == 2 ) v = _decimalValues[x-1]
	    	    tableRow = "<td class='centerednumber'>" + v  + "</td>"
	    	    $(table_id).append( tableRow )
	    	    if ( '' != sumString ) sumString = sumString + ' + '
	    	    sumString = sumString + _decimalValues[x-1]
	    	}
	    	$("#equation_" + key).html( sumString + " =")
	    	$("#base_10_" + key).html( timeComponents[index] )
	    }
        $(".centerednumber").css( 'width',widths[_base] + "%")
    }
}



$(document).ready( function ()
{

    $(".circle_top").click( function()
    {
        nextBase = parseInt( this.textContent );
        if  ( nextBase > 1 ) setBase( nextBase )
    })

    base = getParameter("base")
    console.log("Base is " + base )
    if ( ! base )
        base = Math.floor((Math.random() * 8) + 3   );

    setBase(base )
 	update();
	timer = window.setInterval( update, 1000 );


} );