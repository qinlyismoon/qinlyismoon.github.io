import HomeBento from "../components/landing/HomeBento";
import HomeLayout from "../components/layouts/HomeLayout";

export default function LandingPage() {
  return (
    <HomeLayout className="home-layout--bento">
      <div className="landing-page__hero landing-page__hero--bento">
        <HomeBento />
      </div>
    </HomeLayout>
  );
}
