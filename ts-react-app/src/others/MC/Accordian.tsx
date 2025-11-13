import { useState } from "react";

interface AccordianItem {
  question: string;
  answer: string;
}
interface AccordianProps {
  accordianItems: AccordianItem[];
}

const Accordian = ({ accordianItems }: AccordianProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="accordian">
      <p>Accordian Component</p>
      {accordianItems.map((item, index) => (
        <div className="accordian-item">
          <button onClick={() => handleToggle(index)} className="accordian-qn">
            {item.question}
          </button>
          {openIndex === index && (
            <div className="accordian-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};


const AccordianDisplay=()=>{
    const accordianItems=[
        {question:"Sample question one?",answer:"Sample question one answer."},
        {question:"Sample question two?",answer:"Sample question two answer."},
        {question:"Sample question three?",answer:"Sample question three answer."},
    ];

    return(
        <div>
            <Accordian accordianItems={accordianItems}/>
        </div>
    )
}
export default AccordianDisplay;