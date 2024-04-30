document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '175b6bae4e9c5185dcc3c05eb6f49419'; // Replace with your TMDb API key
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const modeButton = document.getElementById('modeButton');
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-btn');
    const movieFrame = document.getElementById('movieFrame');

    let isDarkMode = false;

    function fetchPopularMovies() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching popular movies:', error));
    }

    function fetchMoviesByQuery(query) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching movies by query:', error));
    }

    function displayMovies(movies) {
        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = ''; // Clear previous search results
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;
            img.onclick = function() {
                openMovieModal('https://vidsrc.xyz/embed/movie/' + movie.id);
            };

            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = movie.title;

            movieCard.appendChild(img);
            movieCard.appendChild(title);
            moviesContainer.appendChild(movieCard);
        });
    }

    // Event listener for input changes in the search bar
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchMoviesByQuery(searchTerm);
        } else {
            fetchPopularMovies();
        }
    });

    // Event listener for mode toggle button
    modeButton.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            modeButton.textContent = 'Light Mode'; // Change button text
        } else {
            document.body.classList.remove('dark-mode');
            modeButton.textContent = 'Dark Mode'; // Change button text
        }
    });

    // Function to open movie modal
    function openMovieModal(movieUrl) {
        movieFrame.src = movieUrl;
        lightbox.style.display = 'block';
    }

    // Event listener for close button on lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        // Clear the movie URL to stop the video from playing
        movieFrame.src = '';
    });

    // Fetch popular movies initially
    fetchPopularMovies();
});
