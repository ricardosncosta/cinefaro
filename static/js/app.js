function parseTime (datetime) {
    date = new Date(datetime);
    // Date
    day = date.getDate();
    year = date.getFullYear();
    month = date.getMonth()+1;
    if (month == 13)
        month = 1;
    if (month < 10)
        month = '0' + month;

    // Time
    hours = date.getHours()
    mins = date.getMinutes()

    return day+'/'+month+'/'+year+' às '+hours+':'+mins;
}
$.ajax({
    url:"https://www.kimonolabs.com/api/6ow96xb4?apikey=e510672bdd47929278ab230f75afce92&kimmodify=1",
    crossDomain: true,
    dataType: "jsonp",
    success: function (response) {
        $('.last_updated_time').text(parseTime(response.lastsuccess));

        movies = response.results.movies;
        for (var i = movies.length - 1; i >= 0; i--) {
            holder = $('.sample').clone();
            holder.removeClass('sample');
            holder.addClass('movie');
            // Image
            holder.find('.image').attr('src', movies[i].image.src);

            holder.find('.title').text(movies[i].title);
            holder.find('.genre').text(movies[i].genre);
            holder.find('.director').text(movies[i].director);
            holder.find('.actors').text(movies[i].actors);
            holder.find('.duration').text(movies[i].duration);
            holder.find('.synopsis').text(movies[i].synopsis);
            holder.find('.room').text(movies[i].room);

            if (movies[i].time != '')
                holder.find('.sessions').text('Sessões: ' + movies[i].time);
            holder.wrap('<div class="row"></div>')
            $('#content').append(holder)
        };
    },
    error: function (xhr, status) {
        //handle errors
    }
});