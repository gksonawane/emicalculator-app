import React, { useCallback, useEffect } from 'react';
// import Piechart from './Piechart';
import GraphPie from './GraphPie';


const Calculate = ({ loanAmount, interest, tenure , checked }) => {
    const handleOutput = useCallback(() => {

        // if we dont have loanamount
        if(!loanAmount){
            const emiLoan = 0 ;
            const totalInterest = 0 ;
            const totalPaymentValue = 0 ;
            return {
                emiLoan , totalInterest ,totalPaymentValue
            }
        }

        //for checking the value whether its month or year
        let totalMonths ;
        if(checked.name === 'years'  ){
            totalMonths = tenure * 12 ;
        }
        if(checked.name === 'months'){
            totalMonths = tenure ;
        }

        const monthlyInterest = interest / 100 / 12;
        // const totalPayment = tenure * 12;
        const totalPayment = totalMonths;

        const emiLoan = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, totalPayment)) /
            (Math.pow(1 + monthlyInterest, totalPayment) - 1);


        const totalInterest = (emiLoan * totalPayment) - loanAmount;


        const totalPaymentValue = totalPayment * emiLoan;


        return { emiLoan, totalInterest, totalPaymentValue };

    }, [interest, loanAmount, tenure , checked]);

    useEffect(() => {
        handleOutput();
    }, [handleOutput]);

    const { emiLoan, totalInterest, totalPaymentValue } = handleOutput();

    const principal = totalPaymentValue - totalInterest;

    const FormatAmount = (amount) => {
        return Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",

        }).format(amount / 100);
    };


    const formatedEmi = FormatAmount(emiLoan * 100);
    const formatedInterest = FormatAmount(totalInterest * 100);
    const formatedTotalAmount = FormatAmount(totalPaymentValue * 100);

    return (
        <>
            <div className="payable">
                <div className="output-container">
                    <div className="emi">
                        <p className='para'>Loan Emi</p>
                        <h2>{formatedEmi}</h2>
                    </div>
                    <div className="emi">
                        <p className='para'>Total Interest Payable</p>
                        <h2>{formatedInterest}</h2>

                    </div>
                    <div className="emi">
                        <p className='para'>Total Payment</p>
                        <span className='para'>(Principal + Interest)</span>
                        <h2>{formatedTotalAmount}</h2>
                    </div>

                </div>
                <div className="graph">
                 <GraphPie principal={principal} totalInterest={totalInterest}/>
                </div>
                

                {/* <Piechart principal={principal} totalInterest={totalInterest} /> */}
            </div>
            
        </>
    )
}

export default Calculate;






