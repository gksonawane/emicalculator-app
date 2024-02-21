import React, { useState } from 'react'
import Calculate from './Calculate'
import { LoanTypeButton } from './LoanTypeButton'


const Emicalculate = () => {

    const [loanAmount, setLoanAmount] = useState(150000)
    const [interest, setInterest] = useState(9)
    const [tenure, setTenure] = useState(2)
    const [selectedLoanType, setSelectedLoanType] = useState('Home Loan');
    const [checked , setChecked] = useState({
        name : 'years',
        maxRange : 30,
        value: true
    });
    
    // converting string into floating number
    const formatedLoanAmount = parseFloat(loanAmount);
    const formatedInterest = parseFloat(interest);

    
    // setting up loan type
    const handleLoanTypeClick = (loanType) => {
        setSelectedLoanType(loanType);
    };

    // handeling radio buttons
    const handleRadioBtn = (tenureType) => () => {
        if(tenureType === 'years'){
            setChecked({
                name: tenureType,
                maxRange : 30 ,
                value: true
            });

        }
        if(tenureType === 'months'){
            setChecked({
                name: tenureType,
                maxRange : 240 ,
                value: true
            });
        }
        
      };
        

    
    return (
        <div className='container'>
            <div className="btns">
                <LoanTypeButton
                    loanType="Home Loan"
                    isSelected={selectedLoanType === 'Home Loan'}
                    onClick={() => handleLoanTypeClick('Home Loan')}
                />
                <LoanTypeButton
                    loanType="Personal Loan"
                    isSelected={selectedLoanType === 'Personal Loan'}
                    onClick={() => handleLoanTypeClick('Personal Loan')}
                />
                <LoanTypeButton
                    loanType="Car Loan"
                    isSelected={selectedLoanType === 'Car Loan'}
                    onClick={() => handleLoanTypeClick('Car Loan')}
                />

            </div>
            <div className="content">

                <div className="range-col">
                    <label htmlFor="amount" className='input-label'>{selectedLoanType} amount</label>
                    <input type="number" className='input-amount' onChange={(e) => { setLoanAmount(e.target.value) }}
                        value={loanAmount}
                    />
                </div>
                <div className="range1">
                    <input type="range" min={200000} max={6000000} step={50000} value={loanAmount} onChange={(e) => { setLoanAmount(e.target.value) }} />
                </div>

                <div className="range-col">
                    <label htmlFor="rate" className='input-label'>Interest Rate</label>
                    <input type="number" className='input-amount' onChange={(e) => { setInterest(e.target.value) }} value={interest} />
                </div>
                <div className="range1">
                    <input type="range" min={5} max={20} value={interest} onChange={(e) => { setInterest(e.target.value) }} />
                </div>
                <div className="range-col2">
                    <label htmlFor="tenure"  className='input-label'>Loan Tenure</label>
                    <input type="number" className='input-tenure' onChange={(e) => { setTenure(e.target.value) }} value={tenure} />
                    <div className="radio-btn-container" >
                        <input type="radio" name='btn' id='year' onClick={handleRadioBtn('years')} defaultChecked={checked.name}
                        className={`radio-button ${checked.value ? 'active':''}`}/>
                        <label htmlFor="year">Years</label>
                        <input type="radio" name='btn' id='month' onClick={handleRadioBtn('months')}
                        className={`radio-button ${checked.value ? 'active':''}`}/>
                        <label htmlFor="month">Months</label>
                    </div>
                </div>
                <div className="range1">
                    <input type="range" min={2} max={checked.maxRange} step={2} value={tenure} onChange={(e) => { setTenure(e.target.value) }} />
                </div>
                <Calculate loanAmount={formatedLoanAmount} interest={formatedInterest} tenure={tenure} checked={checked}/>

            </div>
        </div>
    )
}

export default Emicalculate
