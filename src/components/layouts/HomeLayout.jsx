export default function HomeLayout({ children, className = "" }) {
  return (
    <section className={`home-layout ${className}`.trim()} data-layout="home">
      <div className="home-layout__grid">
        <div className="home-layout__reading">{children}</div>
      </div>
    </section>
  );
}
