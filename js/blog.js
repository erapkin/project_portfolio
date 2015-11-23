"use strict";

$(document).ready(function(){
	$("#search").keyup(function() {
		var filter = $(this).val(), count = 0;
		$(".posts .post").each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
				$(".pagination").fadeOut();
			} else {
				$(this).fadeIn();
			}
		});
	});
});

function buttonUp() {
	var inputVal = $('.search').val();
	inputVal = $.trim(inputVal).length;
	if (inputVal !== 0) {
		$('.searchbox-icon').css('display', 'block');
	} else {
		$('.search').val('');
		$('.searchbox-icon').css('display', 'block');
	}
}

(function($){

	$.fn.customPaginate = function(options) {
		console.log('paginate');
		var paginationContainer = this;
		var itemsToPaginate;
		var defaults = {
			itemsPerPage : 5
		};
		var settings = {};
		$.extend(settings, defaults, options);
		var itemsPerPage = settings.itemsPerPage;
		itemsToPaginate = $(settings.itemsToPaginate);
		var numberOfPaginationLinks = Math.ceil((itemsToPaginate.length / itemsPerPage));
		$("<ul class=\"pagination\"></ul>").prependTo(paginationContainer);

		for(var index = 0; index < numberOfPaginationLinks; index++) {
			paginationContainer.find("ul").append("<li>"+"<a href=\"#\">"+ (index+1) +"</a>"+ "</li>");
		}

		itemsToPaginate.filter(":gt(" + (itemsPerPage - 1)  + ")").hide();

		paginationContainer.find("ul li").on('click', function(){
			console.log('click');
			var linkNumber = $(this).text();

			var itemsToHide = itemsToPaginate.filter(":lt(" + ((linkNumber-1) * itemsPerPage)  + ")");
			$.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((linkNumber * itemsPerPage) - 1)  + ")"));
			itemsToHide.hide();

			var itemsToShow = itemsToPaginate.not(itemsToHide);
			itemsToShow.show();
		});

	}

}(jQuery));


function renderPosts(posts) {
	console.log('renderposts');
	var postsDiv = document.getElementById("posts");
	posts.forEach(function (post) {

		var postDiv = document.createElement("div");
		var postDivRow = document.createElement("div");
		var postNameDiv = document.createElement("h2");
		var postAuthorDiv = document.createElement("p");
		var postContentDiv = document.createElement("p");
		var postImg = document.createElement("img");

		var postHr = document.createElement("hr");

		postNameDiv.innerHTML = post.name;
		postAuthorDiv.innerHTML = post.author;
		postContentDiv.innerHTML =  post.content;

		postDiv.setAttribute("class", "post");
		postNameDiv.setAttribute("class", "post-name");
		postAuthorDiv.setAttribute("class", "post-author");


		postDivRow.setAttribute("class", "row");
		postContentDiv.setAttribute("class", "post-content col-sm-8");
		postImg.setAttribute("class", 'col-sm-4');
		postImg.setAttribute("src", post.img);

		postDivRow.appendChild(postImg);
		postDivRow.appendChild(postContentDiv);

		postDiv.appendChild(postNameDiv);
		postDiv.appendChild(postAuthorDiv);
		postDiv.appendChild(postDivRow);
		postDiv.appendChild(postHr);
		postsDiv.appendChild(postDiv);
	});

$(".paginations").customPaginate({
	itemsToPaginate : ".post"
});

}

function getPosts(callback){
	console.log('getPosts');
	var request = new XMLHttpRequest();
	request.open("GET", "data/posts.json", true);
	request.send(null);
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var p = JSON.parse(request.responseText);
			renderPosts(p);
		}
	};
}

getPosts();	
