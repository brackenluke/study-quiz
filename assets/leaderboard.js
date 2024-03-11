// highScore.js
 
// Function that Controls the Leaderboard. Saves name and creates list for Scores.

function printHighscores() {
    let highscores =
        JSON.parse(
            window.localStorage.getItem(
                "highscores"
            )
        ) || [];
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    highscores.forEach(function (
        score
    ) {
        let liTag =
            document.createElement(
                "li"
            );
        liTag.textContent =
            score.name +
            " - " +
            score.score;
        let olEl =
            document.getElementById(
                "leaderboard"
            );
        olEl.appendChild(liTag);
    });
}
 
// Function that will clear the Leaderboard on click.
function clearHighscores() {
    window.localStorage.removeItem(
        "highscores"
    );
    window.location.reload();
}
document.getElementById(
    "reset"
).onclick = clearHighscores;
 
printHighscores();