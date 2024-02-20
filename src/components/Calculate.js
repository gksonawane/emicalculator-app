import React, { useCallback, useEffect } from 'react';
// import Piechart from './Piechart';
import GraphPie from './GraphPie';


const Calculate = ({ loanAmount, interest, tenure }) => {
    const handleOutput = useCallback(() => {

        if(!loanAmount){
            const emiLoan = 0 ;
            const totalInterest =0 ;
            const totalPaymentValue = 0 ;
            return {
                emiLoan , totalInterest ,totalPaymentValue
            }
        }
        const monthlyInterest = interest / 100 / 12;
        const totalPayment = tenure * 12;

        const emiLoan = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, totalPayment)) /
            (Math.pow(1 + monthlyInterest, totalPayment) - 1);


        const totalInterest = (emiLoan * totalPayment) - loanAmount;


        const totalPaymentValue = totalPayment * emiLoan;


        return { emiLoan, totalInterest, totalPaymentValue };

    }, [interest, loanAmount, tenure]);

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
                        <p>Loan Emi</p>
                        <h2>{formatedEmi}</h2>
                    </div>
                    <div className="emi">
                        <p>Total Interest Payable</p>
                        <h2>{formatedInterest}</h2>

                    </div>
                    <div className="emi">
                        <p>Total Payment</p>
                        <span>(Principal + Interest)</span>
                        <h2>{formatedTotalAmount}</h2>
                    </div>

                </div>
                <GraphPie principal={principal} totalInterest={totalInterest}/>

                {/* <Piechart principal={principal} totalInterest={totalInterest} /> */}
            </div>
            
        </>
    )
}

export default Calculate;






