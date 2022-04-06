import CitiesList from '../cities-list/cities-list';

function CitiesComponent(): JSX.Element {
  return (
    <section className="locations container">
      <CitiesList />
    </section>
  );
}

export default CitiesComponent;
