import { Space } from 'antd';

let currentBalance = 0;

const SOA = ({ allPayments, sumOfPayments, chosenClient, computeBalance, formatCurrency, formatDate }) => {    
 
    return (
      <div className="flex flex-col p-2 bg-white">
        <div className='flex items-center justify-center'><img className="w-[30%] h-[10%]" src="/images/logo.png" alt="logo" /></div>
        <div className='flex items-center justify-center text-lg py-5 font-bold'>Statement of Account</div>
        <div className='flex items-center justify-between'>
          <h1 className="text-lg ml-2 text-gray-700">
              Customer Name: { chosenClient && (`${chosenClient.last_name}, ${chosenClient.first_name}`) }
          </h1>          
          <h1 className='text-lg text-gray-700 px-2 py-1 bg-white'>Total Balance: { computeBalance(chosenClient.price, sumOfPayments, 'PHP') }</h1>
         
        </div>
            <div className="pt-2">               

                <div className="relative overflow-x-auto">
                    <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='flex justify-end space-x-2 border-t border-b border-gray-300'>
                                <th scope="col" className="p-2 w-full">
                                    Date
                                </th>
                                <th scope="col" className="py-2 w-full">
                                    Area / Reference
                                </th>
                                <th scope="col" className="py-2 w-full flex justify-end">
                                    Selling Price
                                </th>
                                <th scope="col" className="py-2 w-full flex justify-end">
                                    Beg. Balance
                                </th>
                                <th scope="col" className="py-2 w-full flex justify-end">
                                    Payment
                                </th>
                                <th scope="col" className="p-2 w-full flex justify-end">
                                    Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-300 flex justify-end space-x-2">
                                <td className="p-2 w-full flex">
                                    { formatDate(chosenClient.date_bought, 'MMMM DD, YYYY') }
                                </td>
                                <td className="py-2 uppercase w-full">
                                    { chosenClient.area } Raw Lots
                                </td>
                                <td className="py-2 w-full flex justify-end">
                                    { formatCurrency(chosenClient.price, 'PHP') }
                                </td>
                                <td className="py-2 w-full flex justify-end">
                                    { formatCurrency(chosenClient.price, 'PHP') }
                                </td>
                                <td className="py-2 w-full flex justify-end">
                                    { formatCurrency(0.00, 'PHP') }
                                </td>
                                <td className="p-2 w-full flex justify-end">
                                    { formatCurrency(chosenClient.price, 'PHP') }
                                </td>
                            </tr>                            
                            { allPayments && allPayments.map((pmt, index) =>              
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-300 flex justify-end space-x-2">                                    
                                    <td className="p-2 w-full">
                                        { formatDate(pmt.date_paid, 'MMMM DD, YYYY') }
                                    </td>
                                    <td className="py-2 uppercase w-full">
                                        OR/CHECK#-CASH
                                    </td>
                                    <td className="py-2 w-full flex justify-end">
                                        { formatCurrency(0.00, 'PHP') }                                                                         
                                    </td>
                                    <td className="py-2 w-full flex justify-end">
                                        { index == 0 && (
                                            formatCurrency(chosenClient.price, 'PHP')
                                        )}
                                        { index > 0 && (
                                            formatCurrency(currentBalance, 'PHP')
                                        )}
                                    </td>
                                    <td className="py-2 w-full flex justify-end">
                                        { formatCurrency(pmt.amount, 'PHP') }
                                    </td>
                                    <td className="p-2 w-full flex justify-end">
                                        { index == 0 && (
                                            formatCurrency(currentBalance = chosenClient.price - pmt.amount, 'PHP')
                                        )}
                                        { index > 0 && (                                            
                                            formatCurrency(currentBalance -= pmt.amount, 'PHP')
                                        )}                                     
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
      </div>
    );
};
export default SOA;

