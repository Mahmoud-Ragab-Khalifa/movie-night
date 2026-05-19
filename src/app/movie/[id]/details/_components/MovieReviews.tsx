const MovieReviews = ({ movieTitle }: { movieTitle: string }) => {
  return (
    <div className="mt-8 md:mt-16 relative">
      <h4 className="text-xl md:text-2xl font-semibold mb-8">
        {movieTitle} Reviews
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>Review 1</div>
        <div>Review 2</div>
        <div>Review 3</div>
        <div>Review 4</div>
      </div>
    </div>
  );
};

export default MovieReviews;
