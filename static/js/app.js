function parseTime (datetime) {
    date = new Date(datetime);
    // Date
    day   = date.getDate();
    //year  = date.getFullYear();
    month = date.getMonth()+1;

    // Time
    hours   = date.getHours();
    minutes = date.getMinutes();

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
    url:"https://www.kimonolabs.com/api/6ow96xb4?apikey=e510672bdd47929278ab230f75afce92",
    crossDomain: true,
    dataType: "jsonp",
    success: function (response) {
        upd_txt = parseTime(response.lastsuccess) + ' (Próx.: '+ parseTime(response.nextrun) +')';
        $('.last_updated_time').text(upd_txt);

        movies = response.results.movies;
        if (response.results.movies.length > 0) {
            html = '';
            defaultImage = 'static/images/cinema.png';

            for (var i = movies.length - 1; i >= 0; i--) {
                holder = $('.sample').clone();
                holder.removeClass('sample');
                holder.addClass('movie');

                // Image
                if (movies[i].image.src !== undefined) {
                    holder.find('.image').attr('src', movies[i].image.src);
                } else {
                    holder.find('.image').attr('src', defaultImage);
                }

                // Data
                holder.find('.title').text(movies[i].title);
                holder.find('.genre').text(movies[i].genre);
                holder.find('.director').text(movies[i].director);
                holder.find('.actors').text(movies[i].actors);
                holder.find('.duration').text(movies[i].duration);
                holder.find('.debut').text(movies[i].debut);
                holder.find('.original_title').text(movies[i].original_title);
                holder.find('.synopsis').text(movies[i].synopsis);

                cinemas = response.results.cinemas;
                for (var c = 0; c < cinemas.length - 1; c++) {
                    if (cinemas[c].url == movies[i].url && cinemas[c].name == 'Forum Algarve') {
                        buyUrl = movies[i].buy_ticket_url+'&CinemaId=FA';
                        buyUrl = buyUrl.replace(/cinema.jsp/g, 'sessao.jsp');
                        holder.find('.sessions a.buy').attr('href', buyUrl);

                        times = cinemas[c].sessions.text.replace(/Comprar Bilhete/g, '');
                        times = times.replace(/\n/g, '');
                        times = times.replace(/\|/g, ', ');
                        holder.find('.sessions span.times').text('Sessões: ' + times);
                        holder.find('.room').text(cinemas[c].room.replace(' ', ': '));
                    }
                }

                //holder.find('.sessions').text('Sessões: ' + movies[i].time);

                html += '<div class="movie row">'+holder.html()+'</div>';
            }

            $('#content').append(html);
        }
    },
    error: function (xhr, status) {
        //handle errors
    }
});

$('#content').on('click', '.movie', function(e) {
    console.log($(this));
    $(this).find('.moreinfo').toggle();
    //e.preventDefault();
});
