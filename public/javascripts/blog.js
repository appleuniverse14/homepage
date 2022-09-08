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
    for (let i = 1; i < children.length-1; i++){
        var margin_default = 0;
        var margin_h1 = 0;
        var margin_h2 = 4;
        var margin_h3 = 8;
        var margin_h4 = 12;
        var margin_h5 = 16;
        var margin_h6 = 20;
        if (children[i].tagName == "H1") {
            children[i].style.marginLeft = String(margin_default + margin_h1) + "%";
        }
        else if (children[i].tagName == "H2") {
            children[i].style.marginLeft = String(margin_default + margin_h2) + "%";
        }
        else if (children[i].tagName == "H3") {
            children[i].style.marginLeft = String(margin_default + margin_h3) + "%";
        }
        else if (children[i].tagName == "H4") {
            children[i].style.marginLeft = String(margin_default + margin_h4) + "%";
        }
        else if (children[i].tagName == "H5") {
            children[i].style.marginLeft = String(margin_default + margin_h5) + "%";
        }
        else if (children[i].tagName == "H6") {
            children[i].style.marginLeft = String(margin_default + margin_h6) + "%";
        }
        else if (children[i].tagName != "undefined" && children[i].tagName != "H1" && children[i].tagName != "H2" && children[i].tagName != "H3" && children[i].tagName != "H4" && children[i].tagName != "H5" && children[i].tagName != "H6") {
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