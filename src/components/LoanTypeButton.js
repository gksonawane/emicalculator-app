export const LoanTypeButton = ({ loanType, isSelected, onClick }) => (
    <button onClick={() => onClick(loanType)} className={`loan-type-button ${isSelected ? 'active' : ''}`}>
      {loanType}
    </button>
  );