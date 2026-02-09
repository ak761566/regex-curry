function testRegexPattern(){
    const re = RegExp($("regex").val())
    var matchResult = re.exec($(".inputText").val())
    if (matchResult === null){
        console.log('Null output')
    }else{
    console.log(re.exec($(".inputText").val()))
    }
}

function saveDivContent(){
    var input_content = document.querySelector("#input_div_content").textContent;
    document.querySelector("#hidden_input").value = input_content
    //alert(document.querySelector("#hidden_input").value)
}


$(".btn.submit").click( function(){
$(".btn.submit").addClass("pressed").fadeIn(100).fadeOut(100).fadeIn(100);
saveDivContent()
testRegexPattern()
})


$(".btn.clear").click( function(){
 $(".regex").val('')
 $(".inputText").html("")
 $(".outputText").val('')
})

$("#input_div_content").keydown(function(e){
    if(e.key == "Enter"){
    $(".server-side").removeClass("matched_item unmatched_item")
    //alert("new div created")
    }

})

/*
document.querySelector("#input_div_content").addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        //e.preventDefault();
        //document.execCommand('insertLineBreak');
        document.execCommand('insertParagraph')
    }
})
*/
/*
document.querySelector("#input_div_content").addEventListener("click", function(e){
    document.execCommand('insertParagraph')
})
*/

console.log('testRegexPattern method is executed..')
testRegexPattern()

console.log(document.querySelector("#input_div_content").innerHTML)

/*
var responseOutput = $(".outputText").val();
newOutput = responseOutput.replace(/^\s+/gm, '\n')
$(".outputText").val(newOutput);
*/

var result = $("#output_sub_div_content").html()
console.log(result)

