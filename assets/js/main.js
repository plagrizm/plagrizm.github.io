var new_text
$('#plgrsm-btn').on('click',(btn)=>{
var old_text = $('.textarea_1').val()
new_text = old_text.replace(/a/g, 'а').replace(/p/g, 'р').replace(/l/g, 'ӏ').replace(/e/g, 'е')
$('.textarea_2').val(new_text);
$('#copy-icon  path').removeAttr('hidden')
})


$('.textarea_1').on('input',()=>{
    var char_count = $('.textarea_1').val().length;
    $('#char_count').text(char_count)
})

$('#copy-icon').on('click', (btn) => {
    if(new_text){
        copyToClipboard(new_text)
    }
})

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}