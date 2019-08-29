$(function() {
	$("#tabs").tabs();
});

$(document).ready(function(){

	$("#findColors").submit(function(){
		if (($("#sourceText").val().length) > 25000){
			$("#spinner").fadeIn("fast", function (){findColorsClick($("#sourceText").val());} );
		}
	else{
		findColorsClick($("#sourceText").val());
	}

	return false;
});

$("#findColorsURL").submit(function(){
	$("#spinner").fadeIn("fast");
	var sURL = $("#sourceURL").val();
	if (sURL.length >= 4){
		$.post("../php/proxy.php",{ url: sURL }, function(data){ findColorsClick(data); }, "text");
	} 
	else 
	{
		if ($("#spinner").is(':visible')){
			$("#spinner").fadeOut("slow", function (){alert("Invalid address.");});
		}	else {
		alert("Invalid address.");
		}
	}
return false;
});

});

function findColorsClick(text) {
	// TODO: 	Handle no colors found
	// 				Review and test regexes
	//				Optionalize regexes to use
	//				Clean up layout/design

	//createLoggingPane(true);

	text = escapeHTML(text);

	// Regular Expressions for colors
	// RGB RegEx
	var reRGB = /RGB\s*\(\s*-?[0-9]{1,3}%?\s*,\s*-?[0-9]{1,3}%?\s*,\s*-?[0-9]{1,3}%?\)/ig;

	// RGBA RegEx
	var reRGBA = /RGBA\s*\(\s*[0-9]{1,3}%?\s*,\s*[0-9]{1,3}%?\s*,\s*[0-9]{1,3}%?\s*,\s*[0-9]*\.?[0-9]*\s*\)/ig;

	// RGB hex regex
	var reHex = /#[0-9a-f]{3}([0-9a-f]{3})?\b/ig;

	// HSL RegEx
	var reHSL = /HSL\s*\(\s*-?[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\)/ig;

	// HSLA RegEx
	var reHSLA = /HSLA\s*\(\s*-?[0-9]{1,3}\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]{1,3}%\s*,\s*[0-9]*\.?[0-9]*\s*\)/ig;

	// Named Colors regex
	var reNamed = /\bAliceBlue\b|\bAntiqueWhite\b|\bAqua\b|\bAquamarine\b|\bAzure\b|\bBeige\b|\bBisque\b|\bBlack\b|\bBlanchedAlmond\b|\bBlue\b|\bBlueViolet\b|\bBrown\b|\bBurlyWood\b|\bCadetBlue\b|\bChartreuse\b|\bChocolate\b|\bCoral\b|\bCornflowerBlue\b|\bCornsilk\b|\bCrimson\b|\bCyan\b|\bDarkBlue\b|\bDarkCyan\b|\bDarkGoldenRod\b|\bDarkGray\b|\bDarkGreen\b|\bDarkKhaki\b|\bDarkMagenta\b|\bDarkOliveGreen\b|\bDarkorange\b|\bDarkOrchid\b|\bDarkRed\b|\bDarkSalmon\b|\bDarkSeaGreen\b|\bDarkSlateBlue\b|\bDarkSlateGray\b|\bDarkTurquoise\b|\bDarkViolet\b|\bDeepPink\b|\bDeepSkyBlue\b|\bDimGray\b|\bDodgerBlue\b|\bFireBrick\b|\bFloralWhite\b|\bForestGreen\b|\bFuchsia\b|\bGainsboro\b|\bGhostWhite\b|\bGold\b|\bGoldenRod\b|\bGray\b|\bGreen\b|\bGreenYellow\b|\bHoneyDew\b|\bHotPink\b|\bIndianRed\b|\bIndigo\b|\bIvory\b|\bKhaki\b|\bLavender\b|\bLavenderBlush\b|\bLawnGreen\b|\bLemonChiffon\b|\bLightBlue\b|\bLightCoral\b|\bLightCyan\b|\bLightGoldenRodYellow\b|\bLightGrey\b|\bLightGreen\b|\bLightPink\b|\bLightSalmon\b|\bLightSeaGreen\b|\bLightSkyBlue\b|\bLightSlateGray\b|\bLightSteelBlue\b|\bLightYellow\b|\bLime\b|\bLimeGreen\b|\bLinen\b|\bMagenta\b|\bMaroon\b|\bMediumAquaMarine\b|\bMediumBlue\b|\bMediumOrchid\b|\bMediumPurple\b|\bMediumSeaGreen\b|\bMediumSlateBlue\b|\bMediumSpringGreen\b|\bMediumTurquoise\b|\bMediumVioletRed\b|\bMidnightBlue\b|\bMintCream\b|\bMistyRose\b|\bMoccasin\b|\bNavajoWhite\b|\bNavy\b|\bOldLace\b|\bOlive\b|\bOliveDrab\b|\bOrange\b|\bOrangeRed\b|\bOrchid\b|\bPaleGoldenRod\b|\bPaleGreen\b|\bPaleTurquoise\b|\bPaleVioletRed\b|\bPapayaWhip\b|\bPeachPuff\b|\bPeru\b|\bPink\b|\bPlum\b|\bPowderBlue\b|\bPurple\b|\bRed\b|\bRosyBrown\b|\bRoyalBlue\b|\bSaddleBrown\b|\bSalmon\b|\bSandyBrown\b|\bSeaGreen\b|\bSeaShell\b|\bSienna\b|\bSilver\b|\bSkyBlue\b|\bSlateBlue\b|\bSlateGray\b|\bSnow\b|\bSpringGreen\b|\bSteelBlue\b|\bTan\b|\bTeal\b|\bThistle\b|\bTomato\b|\bTurquoise\b|\bViolet\b|\bWheat\b|\bWhite\b|\bWhiteSmoke\b|\bYellow\b|\bYellowGreen\b/ig;

	var reSelected = new RegExp(reRGB.source + "|" + reRGBA.source + "|" + reHex.source + "|" + reHSL.source + "|" + reHSLA.source + "|" + reNamed.source, "ig")

	// get colors from text
	var foundColors = text.match(reSelected);

	if (!(foundColors)){
		if ($("#spinner").is(':visible')){
			$("#spinner").fadeOut("slow", function (){alert("No color information found!");});
		}
	else {
		alert("No color information found!");
	}

	return false;
}

// remove duplicates
foundColors = foundColors.unique();
foundColors = foundColors.sort();



// Colorize source and build color info list
var outputColorsArray = new Array();

for (var i = 0; i < foundColors.length; i++){
	var myColor = Color.fromString(foundColors[i]);

	var myColorName = "Undefined";
	var colorNameHash = Color.namedColors();

	if (myColor){
		outputColorsArray[i] = new Array();
		outputColorsArray[i][0] = foundColors[i];
		outputColorsArray[i][1] = "Undefined";
		outputColorsArray[i][2] = myColor.toHexString();
		outputColorsArray[i][3] = myColor.toRGBString();
		outputColorsArray[i][4] = myColor.toHSLString();
		outputColorsArray[i][5] = brightColor(outputColorsArray[i][2]);
		outputColorsArray[i][6] = !brightColor(outputColorsArray[i][2]);
	}

	for (var n in colorNameHash)
	{
		if (outputColorsArray[i][2] == colorNameHash[n]){
			outputColorsArray[i][1] = n;
			break;
		}
	}
}


// Colorize source

var sColorChart = "<div id='dynamic'>";
sColorChart = sColorChart + "<div id='colorChartHeading'>Colors extracted:</div>";

var colorPatt = new RegExp();
for (var i = 0; i < outputColorsArray.length; i++)
{
	colorPatt.compile (outputColorsArray[i][0].replace(/\)/, "\\)").replace(/\(/, "\\(") + "(?!xxx~~~xxx)", "gi");
	if (/#[0-9a-f]{3}/i.test(outputColorsArray[i][0]))
	{ // recompile to fix 3 digit hex to not find 6 digit hex by mistake
		colorPatt.compile (outputColorsArray[i][0] + "\\b" + "(?!xxx~~~xxx)", "gi");
	}
	if (/^[A-z]+$/.test(outputColorsArray[i][0]))
	{ // recompile to make sure named colors have word boundaries
		colorPatt.compile ("\\b" + outputColorsArray[i][0] + "\\b" + "(?!xxx~~~xxx)", "gi");
	}
	text = text.replace( colorPatt, "<span class='highlight " + (outputColorsArray[i][5] ? "dark" : "light")  + "' style=background-color:" + outputColorsArray[i][2] + "xxx~~~xxx" + ";>" + outputColorsArray[i][0] + "xxx~~~xxx" + "</span>");

	// make color chart entry
	sColorChart = sColorChart + "<div style='padding: 2px; background:" + outputColorsArray[i][2] + ";'>";
	sColorChart = sColorChart + "<span class='" + (outputColorsArray[i][5] ? "dark" : "light") + "'>" + outputColorsArray[i][2] + "</span></div>";
}
sColorChart = sColorChart + "</div></div>";
colorPatt.compile("xxx~~~xxx", "ig");
text = text.replace( colorPatt, '');
// Display results
$("#colorsFound").html(sColorChart);
document.getElementById('dynamic2').innerHTML = nl2br(text);


if ($("#spinner").is(':visible')){
	$("#spinner").fadeOut("slow");
}

$("#tabs").tabs("select", 2);


}
Array.prototype.unique =
function() {
	var a = [];
	var l = this.length;
	for(var i=0; i<l; i++) {
		for(var j=i+1; j<l; j++) {
			// If this[i] is found later in the array
			if (this[i] === this[j])
			j = ++i;
		}
		a.push(this[i]);
	}
	return a;
};

function callbackFunc(a,b){
	return a[2].localeCompare(b[2]);
}

function nl2br(text){
	text = escape(text);
	if(text.indexOf('%0D%0A') > -1){
		re_nlchar = /%0D%0A/g ;
	}else if(text.indexOf('%0A') > -1){
		re_nlchar = /%0A/g ;
	}else if(text.indexOf('%0D') > -1){
		re_nlchar = /%0D/g ;
	}
	try	{
		return unescape( text.replace(re_nlchar,'<br />'));
	}
	catch (e) {
		return unescape(text);
	}
}

brightColor = function(hexstring) {

	if(hexstring.length==7){hexstring=hexstring.substr(1);}
	var R = parseInt(hexstring.substr(0,2),16);
	var G = parseInt(hexstring.substr(2,2),16);
	var B = parseInt(hexstring.substr(4,2),16);

	return Math.sqrt(R * R * .241 + G * G * .691 + B * B * .068) < 130 ? false : true;
}