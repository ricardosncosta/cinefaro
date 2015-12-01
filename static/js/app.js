var MovieBox = React.createClass({
    loadDataFromServer: function() {
        $.ajax({
            url: this.props.url,
            crossDomain: true,
            dataType: "jsonp",
            success: function (data) {
                this.setState({ data: data.results });
                $('.spinning').remove();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: {'movies': [], 'cinemas': []} };
    },
    componentDidMount: function() {
        this.loadDataFromServer();
    },
    render: function() {
        return (
            <div>
                <MovieList data={this.state.data} />
            </div>
        );
    }
});

var MovieList = React.createClass({
    render: function() {
        var cinemas = this.props.data.cinemas;
        var movies = this.props.data.movies;
        var movieNodes = movies.map(function(movie) {
            // Cinemas / Rooms / Sessions
            for (var i = 0; i < cinemas.length - 1; i++) {
                if (cinemas[i].url == movie.url && cinemas[i].name == 'Forum Algarve') {
                    var times = cinemas[i].sessions.replace(/Comprar Bilhete/g, '');
                    times = times.replace(/\n/g, '');
                    movie.sessions = 'Sessões: ' + times.replace(/\|/g, ', ');
                    movie.room = cinemas[i].room.replace(' ', ': ');
                }
            }

            // Movies
            movie.buy_ticket_url = movie.buy_ticket_url.replace(/cinema.jsp/g, 'sessao.jsp')+'&CinemaId=FA';
            if (movie.image.src == '')
                movie.image = 'static/images/cinema.png';

            return (
                <div className="movie">
                    <Movie title={movie.title}
                           room={movie.room}
                           sessions={movie.sessions}
                           original_title={movie.original_title}
                           duration={movie.duration}
                           genre={movie.genre}
                           director={movie.director}
                           actors={movie.actors}
                           debug={movie.debut}
                           synopsis={movie.synopsis}
                           image={movie.image}
                           buy_ticket_url={movie.buy_ticket_url}
                    />
                    <div className="clearfix"></div>
                </div>
            );
        });
        return (
            <div>
                {movieNodes}
            </div>
        );
    }
});

var Movie = React.createClass({
    render: function() {
        return (
            <div>
                <div className="image-holder pull-left .col-xs-2">
                    <img className="image img-responsive img-rounded" src={this.props.image} />
                </div>
                <div className="data-holder .col-xs-10">
                    <ul>
                        <li className="title">{this.props.title}</li>
                        <li className="room">{this.props.room}</li>
                        <li className="sessions">
                            {this.props.sessions} | <a href={this.props.buy_ticket_url} className="buy">Comprar Bilhetes</a>
                        </li>
                        <li>
                            <ul className="moreinfo">
                                <li className="original_title">{this.props.original_title}</li>
                                <li className="duration">{this.props.duration}</li>
                                <li className="genre">{this.props.genre}</li>
                                <li className="director">{this.props.director}</li>
                                <li className="actors">{this.props.actors}</li>
                                <li className="debut">{this.props.debut}</li>
                                <li className="synopsis">{this.props.synopsis}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
  <MovieBox url="https://www.kimonolabs.com/api/6ow96xb4?&apikey=e510672bdd47929278ab230f75afce92" />,
  document.getElementById('content')
);
