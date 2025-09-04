import '../styles/personCard.css';

export default function PersonCard({ person, onClick }) {
  return (
    <div
      className="person-card"
      onClick={() => onClick(person)}
      onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
    >
      <div className="person-content">
        <div className="person-info">
          <span className="person-name">{person.name}</span>
          <span className="person-contact-info">{person.email} {person.phone}</span>
        </div>
      </div>
    </div>
  );
}
