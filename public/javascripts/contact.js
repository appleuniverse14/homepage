function onSubmit(token) {
    if(document.inquiryform.name.value == "") {
        alert("お名前を入力してください。");
        return false;
    }
    if(document.inquiryform.message.value == "") {
        alert("本文を入力してください。");
        return false;
    }
    document.getElementById("inquiryform").submit();
}
