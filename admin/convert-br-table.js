const fs = require("fs");
const { JSDOM } = require("jsdom");
const { MatchesFolder, MatchsCSVHeader } = require("./config");

const Table = process.argv[2];
const BR = require(`./tables/br/${Table}`);
const File = `${MatchesFolder}/br/${Table}.csv`;

const {
  window: { document },
} = new JSDOM(BR);

const rounds = document.querySelectorAll(
  ".swiper-slide .aside-content .list-unstyled"
);

fs.writeFileSync(File, MatchsCSVHeader);

rounds.forEach((round) => {
  const matches = round.querySelectorAll("li");

  matches.forEach((match, i) => {
    const date = match.querySelector(".partida-desc");
    const home = match.querySelector(".time.pull-left .time-sigla").innerHTML;
    const away = match.querySelector(".time.pull-right .time-sigla").innerHTML;
    const score = match.querySelector(".partida-horario span");

    if (score) {
      const span = date.querySelector("span");

      if (span) {
        date.removeChild(span);
      }

      const fDate = formatDate(date.innerHTML);
      const fScore = score.innerHTML.replace(" x ", ";");

      const matchData = `${fDate};${home};${fScore};${away};SERIE_A`;

      fs.appendFileSync(File, `\r${matchData}`);
    }
  });
});

function formatDate(date) {
  return date
    .replace(/\s/g, "")
    .replace("Seg,", "")
    .replace("Ter,", "")
    .replace("Qua,", "")
    .replace("Qui,", "")
    .replace("Sex,", "")
    .replace("Sáb,", "")
    .replace("Dom,", "")
    .replace(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]-Jogo:([1-9][0-9]?|380)/g, "")
    .replace(/2018[0-9]/g, "2018")
    .replace(/2019[0-9]/g, "2019")
    .replace(/2020[0-9]/g, "2020")
    .replace(/2021[0-9]/g, "2021");
}
