function formcheck() {
    if(document.inquiryform.name.value == "") {
        alert("お名前を入力してください。");
        return false;
    }
    if(document.inquiryform.message.value == "") {
        alert("本文を入力してください。");
        return false;
    }
}

function onSubmit(token) {
    alert("hoge");
    document.getElementById("inquiryform").submit();
}