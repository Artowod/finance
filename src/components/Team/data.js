import ania from './img/Ania.jpg'
import katia from './img/Katia.jpg'
import sasha from './img/Sasha.jpg'
import elena from './img/Elena.jpg'
import sergei from './img/Sergei.jpg'
import yurii from './img/Yurii.jpg'
const teams = [
  {
    id: 1,
    fullName: 'Юрий Билоног',
    position: 'Team Lead',
    photo: `./${yurii}`,
    gitHub: 'https://github.com/iuriibilonog',
  },
  {
    id: 2,
    fullName: 'Сергей Лукавенко',
    position: 'Scrum Macter',
    photo: `./${sergei}`,
    gitHub: 'https://github.com/Artowod',
  },
  {
    id: 3,
    fullName: 'Екатерина Коломиец',
    position: 'Developer',
    photo: `./${katia}`,

    gitHub: 'https://github.com/KaterynaKolomiiets',
  },
  {
    id: 4,
    fullName: 'Аня Андрейкив',
    position: 'Developer',
    photo: `./${ania}`,

    gitHub: 'https://github.com/anjtka333',
  },
  {
    id: 5,
    fullName: 'Александр Кулик',
    position: 'Developer',
    photo: `./${sasha}`,
    gitHub: 'https://github.com/Sashok1605',
  },
  {
    id: 6,
    fullName: 'Елена Молостова',
    position: 'Developer',
    photo: `./${elena}`,
    gitHub: 'https://github.com/E-Molostova',
  },
];

export default teams;
