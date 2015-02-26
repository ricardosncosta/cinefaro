function parseTime (datetime) {
    date = new Date(datetime);
    // Date
    day   = date.getDate();
    //year  = date.getFullYear();
    month = date.getMonth()+1;


    // Time
    hours   = date.getHours()
    minutes = date.getMinutes()

    // Fix JS Date for months
    if (month == 13)
        month = 1;

    // Adding leading zeroes
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return day+'/'+month+' às '+hours+':'+minutes;
}
$.ajax({
    url:"https://www.kimonolabs.com/api/6ow96xb4?apikey=e510672bdd47929278ab230f75afce92&kimmodify=1",
    crossDomain: true,
    dataType: "jsonp",
    success: function (response) {
        upd_txt = parseTime(response.lastsuccess) + ' (Próx.: '+ parseTime(response.nextrun) +')';
        $('.last_updated_time').text(upd_txt);

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