$(document).ready(function(){
	var l = (navigator.language || navigator.browserLanguage).toLowerCase();
	// var host = "http://45.77.253.162:5002";
	var host = "http://localhost:8000";
	var nav_url = host + "/navigation" + "?l=" + l;
	var success_code = "100200";
	$.ajax({
            url:nav_url,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                  if(data.code == success_code){
                  	navs = data.data;
                  	load_navs(navs);
                  }
                }
        })

	var hot_books_url = host + "/book" + "?l=" + l;
	$.ajax({
            url: hot_books_url,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                  if(data.code == success_code){
                  	books = data.data;
                  	load_alink("#hot_books", books);
                  }
                }
        })

	var classifys_url = host + "/classify" + "?l=" + l;
	$.ajax({
            url: classifys_url,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                  console.log(data);
                  if(data.code == success_code){
                  	classifys = data.data;
                  	load_alink("#classifys", classifys);
                  }
                }
        })

	var recommend_url = host + "/recommend" + "?l=" + l;
	$.ajax({
            url: recommend_url,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                  console.log(data);
                  if(data.code == success_code){
                  	books = data.data;
                  	load_recommend(books);
                  }
                }
        })

})

function load_navs(navs) {
	if(navs == undefined || !(navs instanceof Array)){
		return false;
	}
	str = "";
	for (var i = 0; i < navs.length; i++) {
            if(i == 0) {
            	str += "<li class = 'cur' ><a href='"+ navs[i].detail_url +"' target='_blank'>" + navs[i].name + "</a></li>";
            }else{
            	str += "<li><a href='"+ navs[i].detail_url +"' target='_blank'>" + navs[i].name + "</a></li>";
            }
    }
    $("#navs").append(str);
}

function load_alink(id, data) {
	if(data == undefined || !(data instanceof Array)){
		return false;
	}

	str = "";
	for (var i = 0; i < data.length; i++) {
            str += "<a href='"+ data[i].detail_url +"' target='_blank'>"+ data[i].name +"</a>";
    }
    $(id).append(str);
}

function load_recommend(books) {
	if(books == undefined || !(books instanceof Array)){
		return false;
	}
	str = "";
	for (var i = 0; i < books.length; i++) {
            str += "<li>"
                    + "<a href='" + books[i].detail_url+"' target='_blank' bid='510290'>"+ books[i].personal_title + books[i].name +"</a>"
                    + "<div class='dtl-box'>"
                    + "<dl>"
                    +    "<dt> <a href='"+ books[i].detail_url+"' target='_blank'><img class='f-img' src='./images/s.gif' data-src='"+ books[i].image_url +"' alt='"+ books[i].personal_title + books[i].name +"' __lazypushed='1'></a> </dt>"
                    +    "<dd>"
                    +      "<h3><a href='"+ books[i].name +"' title='"+ books[i].personal_title + books[i].name +"' target='_blank'>"+ books[i].personal_title + books[i].name +"</a></h3>"
                    +      "<span>作者：<a href='' target='_blank'>"+ books[i].author +"</a></span>"
                    +      "<label title='"+ books[i].introduction +"'>"
                    +      "<p> 简介: "+ books[i].introduction +"</p>"
                    +      "</label>"
                    +    "</dd>"
                    +  "</dl>"
                    +  "<p class='btns'> <a href='"+ books[i].detail_url +"' class='btn-pink' target='_blank'>立即阅读</a> <a href='javascript:;' class='btn-gray addto-shelf-btn' data-post='book_id=510290' data-api='http://45.77.253.162/app/shelf/add.html' data-bid='510290'>加入书架</a> </p>"
                    + "</div>"
                + "</li>";
    }
    $("#recommends").append(str);
}