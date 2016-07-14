/*
 *	module dependecies
*/

import $ from 'jquery';

$(document).ready(function(){

	var $tvShowContainer = $('#app-body').find('.tv-shows')
	$tvShowContainer.on('click', 'button.like', function (ev){
		var $this = $(this);
		$this.closest('.tv-show').toggleClass('liked') 
	})

	function renderShow (shows){
		$tvShowContainer.find('.loader').remove();
		shows.forEach(function (show){
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':summary:', show.summary)
				.replace(':img alt:', show.name + "Logo")
			
			$tvShowContainer.append($(article))

			})
	}
	/**
	submit serach form
	*/
	$('#app-body').find('form').submit(function (ev){
		ev.preventDefault();
		var busqueda = $(this)
			.find('input[type="text"]')
			.val();
		$tvShowContainer.find('.tv-show').remove()
		$('<div class="loader">').appendTo('tvShowContainer')
		$.ajax({
			url: 'http://api.tvmaze.com/search/shows',
			data: {q: busqueda},
			success: function (res, textStatus, xhr){
				
				
				var shows = res.map(function (el) {
					return el.show;
				})
				renderShow(shows);
				
			}
		})
	})

	var template = '<article class="tv-show">' +
          '<div class=" left img-container">' +
            '<img src=":img:" alt=":img alt:"' +
          '</div>' +
          '<div class="right info">' +
            '<h1>:name:</h1>' +
            '<p>:summary:</p>' +
            '<button class="like">♥</button'+
          '</div>' +
        '</article>';

/* 
	hacemos un requiest ajax a la api de tvmezon
	lo cual vamos agragando al documento 
	reemplazandolo en la variable template en la primera funcion de este documenton!
*/
	if (!localStorage.shows) {
    $.ajax('http://api.tvmaze.com/shows')
      .then(function (shows) {
        $tvShowContainer.find('.loader').remove();
        localStorage.shows = JSON.stringify(shows);
        renderShow(shows);
      })
  } else {
    renderShow(JSON.parse(localStorage.shows));
  }
  
})