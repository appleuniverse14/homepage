// ページの一番上へ
$(function () {
    $('a[href^="#"]').click(function(){
        var time = 499;
        var href= $(this).attr("href");
        var target = $(href == "#" ? 'html' : href);
        var distance = target.offset().top;
        $("html, body").animate({scrollTop:distance}, time, "swing");
        return false;
    });
});

// 段落ごとにインデントを分ける
window.onload = function () {
    var sentences = document.getElementById('blog-sentence-container');
    var children = sentences.childNodes;
    console.log(children);
    for (let i = 1; i < children.length-1; i++){
        if (children[i].tagName != "undefined" && children[i].tagName != "H1" && children[i].tagName != "H2" && children[i].tagName != "H3" && children[i].tagName != "H4" && children[i].tagName != "H5" && children[i].tagName != "H6") {
            var margin_default = 4;
            var margin_h1 = 0;
            var margin_h2 = 1;
            var margin_h3 = 3;
            var margin_h4 = 4;
            var margin_h5 = 6;
            var margin_h6 = 7;
            for (let j = i; j >= 0; j--){
                if (children[j].tagName == "H1") {
                    children[i].style.marginLeft = String(margin_default + margin_h1) + "%";
                    break;
                }
                if (children[j].tagName == "H2") {
                    children[i].style.marginLeft = String(margin_default + margin_h2) + "%";
                    break;
                }
                if (children[j].tagName == "H3") {
                    children[i].style.marginLeft = String(margin_default + margin_h3) + "%";
                    break;
                }
                if (children[j].tagName == "H4") {
                    children[i].style.marginLeft = String(margin_default + margin_h4) + "%";
                    break;
                }
                if (children[j].tagName == "H5") {
                    children[i].style.marginLeft = String(margin_default + margin_h5) + "%";
                    break;
                }
                if (children[j].tagName == "H6") {
                    children[i].style.marginLeft = String(margin_default + margin_h6) + "%";
                    break;
                }
            }
        }
    }
}