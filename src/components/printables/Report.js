import { Space } from 'antd';
import React, { useEffect, useRef } from "react";

const Report = ({ agentPayment, dailyExpenses, dailyPayments, selectedDate, formatCurrency, formatDate }) => {    
    const netValue = useRef();

    const getTotal = (pmts, type) => {
        let total = 0;
        if(pmts.length > 0) {
            pmts.map((item) => {
                if(type =="Cash" && item.method == "Cash") {
                    total = parseFloat(total) + parseFloat(item.payment_amount);
                }       
                if(type =="Transfer" && item.method != "Cash") {
                    total = parseFloat(total) + parseFloat(item.payment_amount);
                }       
            });
        }
        return total;
    }

    const getTotalExpenses = (exp) => {
        let total = 0;
        if(exp.length > 0) {
            exp.map((item) => {
                total = parseFloat(total) + parseFloat(item.amount);                       
            });
        }

        return total;
    }

    const getTotalNet = (pmts, exp) => {
        let totalPay = 0;
        let totalExpense = 0;        
        if(pmts.length > 0) {
            pmts.map((item) => {                
                totalPay = parseFloat(totalPay) + parseFloat(item.payment_amount);                
            });
        }
        if(exp.length > 0) {
            exp.map((item) => {
                totalExpense = parseFloat(totalExpense) + parseFloat(item.amount);                       
            });
        }        
        return totalPay - totalExpense;
    }

    useEffect(() => {
        netValue.current.value = formatCurrency(getTotalNet(dailyPayments, dailyExpenses), 'PHP');
    }, []);

    return (
      <div className="flex flex-col p-2 bg-white">
        <div className='flex items-center justify-center'><img className="w-[50%] h-[10%]" src="/images/logo.png" alt="logo" /></div>
        <div className='flex items-center justify-center text-md pt-5 font-bold'>DAILY CASH REPORT</div>
        <div className='flex items-center justify-center text-md pb-5 font-bold uppercase'>{ formatDate(selectedDate, 'MMMM DD, YYYY') }</div>         

        <div className='flex items-center justify-between'>
            <h1 className="text-lg ml-2 text-gray-900 font-bold">CASH RECEIPTS</h1>          
            <h1 className='text-lg text-gray-900 px-2 py-1 font-bold'>AMOUNT</h1>                   
        </div>              
        {dailyPayments && dailyPayments.map((item, index) => 
            <div key={index}>                  
                { item.method == "Cash" && (                   
                    <div className='flex items-center justify-between space-x-3 uppercase text-md'>
                        <Space size="large">
                            <h1 className="ml-2 text-gray-700">AR {`${item.last_name}, ${item.first_name}`}</h1> 
                            <h1 className="text-gray-700">{`monthly - ${item.area} LOT B${item.block} L${item.lot} (RD)`}</h1> 
                        </Space>
                        <h1 className="pr-3 text-gray-700">{ formatCurrency(item.payment_amount, 'PHP') }</h1> 
                    </div>                 
                )}                
            </div>                                
        )}  

        <div className='flex items-center justify-end space-x-3 pb-3'>
            <div className='w-full'>&nbsp;</div>
            <div className='w-full'>&nbsp;</div>
            <div className='w-1/2 border-b border-gray-600'>&nbsp;</div>
        </div>

        <div className='flex items-center justify-end space-x-3 mb-6'>
            <div className='w-full'>&nbsp;</div>
            <div className='w-full'>&nbsp;</div>
            <div className='w-full text-xl font-bold text-end italic pr-3'>TOTAL &nbsp;&nbsp;{formatCurrency(getTotal(dailyPayments, 'Cash'), 'PHP')}</div>
        </div>
        
        <div className='flex items-center justify-between'>
            <h1 className="text-lg ml-2 text-gray-900 font-bold">BANK TRANSFER:</h1>                 
        </div>  
        {dailyPayments && dailyPayments.map((item, index) => 
            <div key={index}>                
                { item.method != "Cash" && (                    
                    <div className='flex items-center justify-between space-x-3 uppercase text-md'>
                        <Space size="large">
                            <h1 className="ml-2 text-gray-700">AR {`${item.last_name}, ${item.first_name}`}</h1> 
                            <h1 className="text-gray-700">{`monthly - ${item.area} LOT B${item.block} L${item.lot} (RD)`}</h1> 
                        </Space>
                        <h1 className="pr-3 text-gray-700">{ formatCurrency(item.payment_amount, 'PHP') }</h1> 
                    </div>                 
                )}
            </div>   
        )}
        <div className='flex items-center justify-end space-x-3 pb-3'>
            <div className='w-full'>&nbsp;</div>
            <div className='w-full'>&nbsp;</div>
            <div className='w-1/2 border-b border-gray-600'>&nbsp;</div>
        </div>
        <div className='flex items-center justify-end space-x-3 mb-6'>
            <div className='w-1/2'>&nbsp;</div>
            <div className='w-1/2'>&nbsp;</div>
            <div className='w-full text-lg font-bold text-end pr-3'>TOTAL BANK TRANSFER &nbsp;&nbsp;{formatCurrency(getTotal(dailyPayments, 'Transfer'), 'PHP')}</div>
        </div>
        <div className='flex items-center justify-between'>
            <h1 className="text-lg ml-2 text-gray-900 font-bold">LESS: CASH DISBURSEMENTS:</h1>                 
        </div>        

        {dailyExpenses && dailyExpenses.map((item, index) => 
            <div key={index}>                               
                <div className='flex items-center justify-between space-x-3 uppercase text-md'>
                    <h1 className="ml-2 text-gray-700">{ item.description }</h1>                     
                    <h1 className="pr-3 text-gray-700">{ formatCurrency(item.amount, 'PHP') }</h1> 
                </div>                     
            </div>                                
        )} 
        <div className='flex items-center justify-end space-x-3 pb-3'>
            <div className='w-full'>&nbsp;</div>
            <div className='w-full'>&nbsp;</div>
            <div className='w-2/3 border-t text-right border-gray-600 text-md uppercase font-bold pr-3'>TOTAL &nbsp;&nbsp;&nbsp;&nbsp;{ formatCurrency(getTotalExpenses(dailyExpenses), 'PHP') }</div>
        </div>
        
        <div className='flex items-center justify-end space-x-3 mb-6 mt-4'>
            <div className='w-1/2'>&nbsp;</div>
            <div className='w-1/2'>&nbsp;</div>
            <div className='w-special text-red-500 font-bold text-xl italic pr-3 flex justify-between'>
                TOTAL NET CASH:                    
                <input type="text" ref={netValue} className='bg-transparent italic outline-none border-none text-xl p-0 m-0 font-bold placeholder-black' placeholder="PHP 0.00" />
           </div>
        </div>

        <div className='flex items-center text-md justify-end space-x-3 mt-5'>
            <div className='w-1/2 pl-5'>Prepared by:</div>
            <div className='w-1/2'>Reviewed by:</div>            
        </div>

        <div className='flex items-center text-md justify-end space-x-3 mb-8 mt-4'>
            <div className='w-1/2 pl-28'>
                <input type="text" className='outline-none border-none text-lg font-bold placeholder-black' placeholder="ROD AGTON" />
            </div>
            <div className='w-1/2 pl-24'>
                <input type="text" className='outline-none border-none text-lg font-bold placeholder-black' placeholder="MARREON A. GALON" />
            </div>            
        </div>
        <div className='flex items-center text-md justify-end space-x-3'>
            <div className='w-1/2 pl-5'>
                <Space size="small">
                    Received by: 
                    <input type="text" className='outline-none border-none text-lg font-bold placeholder-black' placeholder="JOYCE" />
                </Space>                
            </div>   
            <div className='w-1/2'>&nbsp;</div>           
        </div>
        
      </div>
    );
};
export default Report;

