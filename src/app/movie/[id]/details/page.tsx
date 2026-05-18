const MovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  console.log(id);

  return (
    <main className="pt-19.5 md:pt-20 lg:pt-21.5 bg-linear-to-b from-black/20 via-black/60 to-black/90">
      <section className="section-gap pb-8 md:pb-16">
        <div className="container"></div>
      </section>
    </main>
  );
};

export default MovieDetailsPage;
