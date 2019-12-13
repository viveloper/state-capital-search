const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Show results in HTML
const outputHtml = matches => {
  const html = matches.map(match => `
      <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
    `).join('');

  // const html = matches.reduce((html, match) => (
  //   html + `
  //     <div class="card card-body mb-1">
  //       <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
  //       <small>Lat: ${match.lat} / Long: ${match.long}</small>
  //     </div>
  //   `), '');    

  matchList.innerHTML = html;
};

// Search data and filter it
const searchState = async searchText => {
  if (searchText.length > 0) {
    const res = await fetch('../data/state_capitals.json');
    const states = await res.json();

    // Get matches to current text input
    const matches = states.filter(state => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return state.name.match(regex) || state.abbr.match(regex);
    });

    outputHtml(matches);
  }
  else {
    outputHtml([]);
  }
};

search.addEventListener('input', () => searchState(search.value));