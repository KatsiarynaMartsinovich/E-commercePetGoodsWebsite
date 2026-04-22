import send from '../../assets/send.svg';

const NewsletterSignup = () => {
  return (
    <div>
      <h3 className="footer-title">Newsletter</h3>

      <p className="footer-text">
        Subscribe to get special offers and updates.
      </p>

      <div className="newsletter">
        <input type="email" placeholder="Your email" />
        <button>
          <img
            src={send}
            alt="send"
          />
        </button>
      </div>
    </div>
  );
};

export default NewsletterSignup;