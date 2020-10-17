function handleFiles(files, preview) {
    if (typeof files !== "string") {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (i == 0) {
                preview.innerHTML = '';
            }

            let img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            img.style = 'width:100%;';
            preview.appendChild(img);
            let reader = new FileReader();

            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;
                };
            })(img);

            reader.readAsDataURL(file);
        }
    } else {
        if (files.length !== 0) {
            let img = document.createElement("img");
            img.classList.add("obj");
            img.src = files;
            img.style = 'width:100%;';
            preview.appendChild(img);
        }
    }
}

$('#photo2').blur(function (e) {
    $('#preview').html('');
    handleFiles(e.target.value, $('#preview')[0]);
})