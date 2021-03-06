import { Link } from 'react-router-dom';
import team from './data';
import s from './Team.module.css';

export default function Team() {
  return (
    <div className={s.content}>
      <Link to="/" alt="homepage" className={s.close} />

      {team.map((team, idx) => (
        <figure key={idx} className={s.snip1344}>
          <img src={team.photo} alt="" className={s.background} />
          <img src={team.photo} alt={team.fullName} className={s.profile} />
          <figcaption>
            <h3>
              {team.fullName}
              <span>{team.position}</span>
            </h3>
            <div className={s.icons}>
              <a href={team.gitHub}>
                <i className="ion-social-github-outline"></i>
              </a>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
