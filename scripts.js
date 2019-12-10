console.log('in script');
document.getElementById('loader').style.visibility = "hidden"
document.querySelector("html").classList.add('js');

var fileInput  = document.getElementById('file');
var button     = document.querySelector( ".input-file-trigger" );
var the_return = document.querySelector(".file-return");

button.addEventListener( "keydown", function( event ) {
    if ( event.keyCode == 13 || event.keyCode == 32 ) {
        fileInput.focus();
    }
});
button.addEventListener( "click", function( event ) {
   fileInput.focus();
   return false;
});
fileInput.addEventListener( "change", function( event ) {
    the_return.innerHTML = this.value;
});

async function upload_pic() {
    const formData = new FormData();
    const fileField = document.getElementById('file');
    document.getElementById('loader').style.visibility = "visible"

    formData.append('file', fileField.files[0]);

    try {
    const response = await fetch('https://dog-classiffier.ml/upload_image/', {
        method: 'POST',
        body: formData
    });
    console.log(response)
    const result = await response.json();
    console.log('Success:', JSON.stringify(result));
    var reader = new FileReader();
    reader.onload = function()
    {
         var output = document.getElementById('output_image');
         output.src = reader.result;
    }
    reader.readAsDataURL(fileField.files[0]);
    var res = result.dog_breed;
    var baseStr64 = res[2];
    document.getElementById('loader').style.visibility = "hidden"
    document.getElementById("dog_image").src =  "data:image/jpg;base64," + baseStr64;
    document.getElementById("detect").innerHTML = "We detected a "+res[0]+" face";
    document.getElementById("breed").innerHTML = "Your pic is similar to " + res[1] + "dog breed";
    } catch (error) {
    console.error('Error:', error);
    }
}

