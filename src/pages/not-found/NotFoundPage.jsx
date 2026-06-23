import css from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={css['container']}>
      <h1>404</h1>
      <p>Сторінку не знайдено</p>
    </div>
  );
}

export default NotFoundPage;
