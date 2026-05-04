// ================================
// FOOTBALL DATA
// ================================
const API_KEY = 'ce59f31047ba4c9d949ff9aceb4261fd'; // Replace with your actual key
const MAN_UTD_ID = 66;
const PL_ID = 'PL';

// ================================
// FETCH MAN UNITED RECENT RESULTS
// ================================
async function fetchManUtdResults() {
  const container = document.getElementById('man-utd-results');
  if (!container) return;

  container.innerHTML = '<p class="loading">Loading results...</p>';

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/teams/${MAN_UTD_ID}/matches?status=FINISHED&limit=5`,
      { headers: { 'X-Auth-Token': API_KEY } }
    );

    if (!response.ok) throw new Error('Failed to fetch results');

    const data = await response.json();
    const matches = data.matches.reverse();

    container.innerHTML = matches.map(match => {
      const home = match.homeTeam.shortName;
      const away = match.awayTeam.shortName;
      const homeScore = match.score.fullTime.home;
      const awayScore = match.score.fullTime.away;
      const date = new Date(match.utcDate).toLocaleDateString('en-IE', {
        day: 'numeric', month: 'short'
      });

      const isHome = match.homeTeam.id === MAN_UTD_ID;
      const utdScore = isHome ? homeScore : awayScore;
      const oppScore = isHome ? awayScore : homeScore;
      const result = utdScore > oppScore ? 'W' : utdScore < oppScore ? 'L' : 'D';
      const resultClass = result === 'W' ? 'result-w' : result === 'L' ? 'result-l' : 'result-d';

      return `
        <div class="match-row">
          <span class="match-date">${date}</span>
          <span class="match-teams">${home} ${homeScore} – ${awayScore} ${away}</span>
          <span class="match-result ${resultClass}">${result}</span>
        </div>
      `;
    }).join('');

  } catch (error) {
    container.innerHTML = '<p class="error-message">Could not load results right now.</p>';
    console.error('Football API error:', error);
  }
}

// ================================
// FETCH PREMIER LEAGUE TABLE
// ================================
async function fetchPLTable() {
  const container = document.getElementById('pl-table');
  if (!container) return;

  container.innerHTML = '<p class="loading">Loading table...</p>';

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${PL_ID}/standings`,
      { headers: { 'X-Auth-Token': API_KEY } }
    );

    if (!response.ok) throw new Error('Failed to fetch table');

    const data = await response.json();
    const standings = data.standings[0].table;

    container.innerHTML = `
      <table class="pl-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          ${standings.map(row => `
            <tr class="${row.team.id === MAN_UTD_ID ? 'highlight-row' : ''}">
              <td>${row.position}</td>
              <td>${row.team.shortName}</td>
              <td>${row.playedGames}</td>
              <td>${row.won}</td>
              <td>${row.draw}</td>
              <td>${row.lost}</td>
              <td>${row.goalDifference > 0 ? '+' : ''}${row.goalDifference}</td>
              <td><strong>${row.points}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

  } catch (error) {
    container.innerHTML = '<p class="error-message">Could not load table right now.</p>';
    console.error('Football API error:', error);
  }
}

// Run both when page loads
fetchManUtdResults();
fetchPLTable();