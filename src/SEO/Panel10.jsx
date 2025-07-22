

export default function Panel10({ data }) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
          {data?.heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: data?.content }} />
      </div>
    </section>
  );
}
