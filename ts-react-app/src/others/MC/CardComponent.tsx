import { useState } from "react";
import "../styles/Card.css"
interface BaseCard {
  title: string;
  content: string;
}

interface ElevatedCardProps extends BaseCard {
  variant: "elevated";
  shadowLevel: number;
}

interface OutlinedCardProps extends BaseCard {
  variant: "outlined";
  borderColor: string;
}

interface FlatCardProps extends BaseCard {
  variant: "flat";
}

type CardProps = ElevatedCardProps | OutlinedCardProps | FlatCardProps;

const CardComponent = (props: CardProps) => {
  const { title, content } = props;

  switch (props.variant) {
    case "elevated":
      return (
        <div
          style={{
            borderRadius: "8px",
            padding: "16px",
            margin: "16px",
            boxShadow: `0px ${props.shadowLevel}px ${props.shadowLevel}px rgba(0,0,0,0.2)`,
          }}
        >
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      );
    case "outlined":
      return (
        <div
          style={{
            borderRadius: "8px",
            padding: "16px",
            margin: "16px",
            border: `2px solid ${props.borderColor}`,
          }}
        >
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      );
    case "flat":
      return (
        <div
          style={{
            borderRadius: "8px",
            margin: "16px",
            padding: "16px",
          }}
        >
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      );

    default:
      return null;
  }
};

const CardDemo = () => {
  const [cardStyle, setCardStyle] = useState<number>(0);
  const handleCardStyle = (type: string) => {
    if (type === "elevated") setCardStyle(0);
    else if (type === "outlined") setCardStyle(1);
    else if (type === "flat") setCardStyle(2);
  };
  const cardData = [
    {
      title: "Elevated card",
      content: "Elevated card Content",
      variant: "elevated",
      shadowLevel: 12,
    },
    {
      title: "Outlined card",
      content: "Outlined card Content",
      variant: "outlined",
      borderColor: "green",
    },
    {
      title: "Flat card",
      content: "Flat card Content",
      variant: "flat",
    },
  ] as const;

  const buttons = [
    {
      id: 0,
      name: "Elevated",
      type: "elevated",
    },
    {
      id: 1,
      name: "Outlined",
      type: "outlined",
    },
    {
      id: 2,
      name: "Flat",
      type: "flat",
    },
  ];
  return (
    <div>
      <div>
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`btn ${button.id === cardStyle ? "active-btn" : null}`}
            onClick={() => handleCardStyle(button.type)}
          >
            {button.name}
          </button>
        ))}
        {/* <button className="btn" onClick={() => handleCardStyle("elevated")}>Elevated</button>
        <button className="btn" onClick={() => handleCardStyle("outlined")}>Outlined</button>
        <button className="btn" onClick={() => handleCardStyle("flat")}>Flat</button> */}
      </div>
      <div>
        <CardComponent {...cardData[cardStyle]} />
      </div>
    </div>
  );
};
export default CardDemo;
