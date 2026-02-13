function testRegexPattern(){
    const regex_string = document.querySelector(".regex").textContent;
    const input_strings = document.querySelector(".inputText").textContent;
    const re = RegExp(regex_string)
    var matchResult = re.exec(input_strings)
    if (matchResult === null){
        console.log('Null output')
    }else{
    console.log(re.exec($(".inputText").val()))
    }
}

function saveDivContent(){
    var input_content = document.querySelector("#input_div_content").textContent;
    const regex = document.querySelector("#div_regex-input").textContent;
    document.querySelector("#hidden_input").value = input_content
    document.querySelector("#hidden_regex_input").value = regex;

    //alert(document.querySelector("#hidden_input").value)
}


$(".btn.submit").click( function(){
$(".btn.submit").addClass("pressed").fadeIn(100).fadeOut(100).fadeIn(100);
//console.log("input_content 1: " + document.querySelector("#input_div_content").textContent)
saveDivContent()
//console.log("input_content 2: " + document.querySelector("#input_div_content").textContent)
testRegexPattern()
})


$(".btn.clear").click(function(){
    //alert($("#hidden_regex_input").val())
    //$(".regex").val('')
    $("#div_regex-input").html('')
    $(".inputText").html("")
    $(".outputText").val('')
})


document.querySelector("#input_div_content").addEventListener("paste", function(e){
    e.preventDefault()
    const pastedData = (e.clipboardData).getData("text");
    const selection = window.getSelection();
    //console.log(pastedData)
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    pElem = document.createElement('p')
    textNode = document.createTextNode(pastedData)
    pElem.appendChild(textNode)
    selection.getRangeAt(0).insertNode(pElem)
    //selection.getRangeAt(0).insertNode(document.createTextNode(pastedData))
    selection.collapseToEnd()
    //selection.getRangeAt(0).insertNode(document.createElement('br'))

})


$("#input_div_content").keydown(function(e){
  if(e.key == "Enter"){
   if ($(".server-side").length){
        $(".server-side").removeClass("matched_item unmatched_item")
    }else{

        document.execCommand('insertLineBreak');
        //document.execCommand('insertParagraph')
    }


    }
})


