import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <section>
      <h1>404. Page not found</h1>
      <Link to='/' title='/'>Вернуться на главную страницу</Link>
    </section>
  );
}

export default NotFoundScreen;
