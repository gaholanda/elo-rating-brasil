import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container">
      <div className="about">
        <p className="about--text">
          O <strong>Elo Rating Brasil</strong> é baseado no sistema Elo,
          desenvolvido pelo Dr. Arpad Elo. Este sistema é utilizado pela
          Federação Internacional de Xadrez para classificar os seus jogadores.
        </p>

        <p className="about--text">
          Os <i>ratings</i> consideram todas as partidas da{" "}
          <strong>Série A</strong> do Brasileiro, a partir de{" "}
          <strong>2018</strong>. As tabelas disponíveis no site da CBF, foram
          usadas como fonte.
        </p>

        <p className="about--text">
          A pontuação tende a mostar a real força de um time, após um total de
          30 partidas. Abaixo disso, considere o <i>rating</i> de uma equipe
          apenas como um indicativo.
        </p>

        <h3>Como é feito o cálculo?</h3>
        <br />
        <h3>Rn = Ro + K × (W - We)</h3>

        <p className="about--text">
          <strong>Rn</strong>, o novo rating;
        </p>
        <p className="about--text">
          <strong>Ro</strong>, o rating antes da partida;
        </p>
        <p className="about--text">
          <strong>K</strong>, o peso da Série A que é 100.
          <br />
          Esse valor é acrescido pela <strong>metade</strong> se o jogo é
          vencido por 2 gols; em <strong>3/4</strong> se forem 3 gols; e por{" "}
          <strong>3/4 + (N-3)/8</strong> se forem 4 gols, ou mais; onde N é a
          diferença de gols.
        </p>
        <p className="about--text">
          <strong>W</strong>, o resultado da partida (vitória = 1, empate = 0.5,
          derrota = 0);
        </p>
        <p className="about--text">
          <strong>We</strong>, é a expectativa de vitória que é calculada pela
          equação:
          <br />
          <strong>
            We = 1 / (10<sup>(-dr/400)</sup> + 1)
          </strong>
          ;
        </p>
        <p className="about--text">
          <strong>dr</strong>, é a diferença dos ratings dos times, acrescida de
          100 para o time que joga em casa.
        </p>
        <hr />
        <p className="about--develop-by">
          Desenvolvido por <strong>Glauber Holanda</strong>
          <span>
            <a href="https://twitter.com/glauber_holanda" target="_blank">
              <img width={20} src="/images/twitter.png" alt="Twitter" />
            </a>{" "}
            <a
              href="https://github.com/gaholanda/elo-rating-brasil"
              target="_blank"
            >
              <img width={20} src="/images/github.png" alt="TwGithubitter" />
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
