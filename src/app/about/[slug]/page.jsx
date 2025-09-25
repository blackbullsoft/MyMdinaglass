import AboutClient from "../[slug]/AboutClient";
export async function generateMetadata({ params }) {
  const titleMap = {
    "about-mdina-glass": "A Family Tradition",
    "our-history": "Our History",
    "watch-the-glassmakers": "Watch the Glassmakers",
    "about-mdina-glass": "About Mdina Glass",
  };

  const descriptionMap = {
    "a-family-tradition":
      "Discover the legacy of our family tradition in glassmaking.",
    "our-history":
      "Explore the rich history of our craftsmanship and innovation.",
    "watch-the-glassmakers":
      "Watch our skilled glassmakers in action and learn their techniques.",
    "about-mdina-glass":
      "Discover the legacy of our family tradition in glassmaking",
  };

  return {
    title: titleMap[params.slug] || "About Us",
    description:
      descriptionMap[params.slug] ||
      "Learn more about our company, values, and story.",
  };
}

export default function Page({ params }) {
  return <AboutClient slug={params.slug} />;
}
