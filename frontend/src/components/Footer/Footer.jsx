import { Link } from "react-router-dom";
import FooterBrand from "./FooterBrand";
import FooterLinksColumn from "./FooterLinksColumn";
import NewsletterSignup from "./NewsletterSignup";
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <FooterBrand />

          <FooterLinksColumn
            title="Quick Links"
            links={[
              { text: "Shop All", href: "/" },
              { text: "New Arrivals", href: "/" },
              { text: "Best Sellers", href: "/" },
              { text: "Sale Items", href: "/" },
            ]}
          />

          <FooterLinksColumn
            title="Customer Service"
            links={[
              { text: "Contact Us", href: "/" },
              { text: "Shipping Info", href: "/" },
              { text: "Returns Policy", href: "/" },
              { text: "FAQ", href: "/" },
            ]}
          />

          <NewsletterSignup />
        </div>

        <div className="footer-bottom">
          <p>© 2026 PawsStore. All rights reserved.</p>

          <div className="footer-socials">
            <Link to="/">
              <img src={facebook} alt="social" />
            </Link>
            <Link to="/">
              <img src={twitter} alt="social" />
            </Link>
            <Link to="/">
              <img src={instagram} alt="social" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;