const FooterLinksColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>

      <ul className="footer-links">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinksColumn;