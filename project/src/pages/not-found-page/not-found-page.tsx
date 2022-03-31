import { Link } from 'react-router-dom';

function NotFoundPage() : JSX.Element {
  return (
    <section style={{ marginTop: '40vh', textAlign: 'center' }}>
      <h1>404. Page not found</h1>
      <Link to='/' title='/'>Вернуться на главную страницу</Link>
    </section>
  );
}

export default NotFoundPage;
