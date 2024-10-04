import React, { useState, useEffect } from 'react';
import { Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PrintCanvas from '@/components/canvas/PrintCanvas';

let currentBalance = 0;

const SOA = ({ setShowPrintModal, showCanvas, componentRef, printStatement, allPayments, sumOfPayments, chosenClient, computeBalance, formatCurrency, formatDate }) => {    
    
    return (
      <div className="flex flex-col shadow-md p-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-red-600 via-red-50 to-red-600">
             
        <div className='flex items-center justify-between'>
          <h1 className="text-lg ml-2 shadow-2 text-white uppercase tracking-widest">
              Customer Name: { chosenClient && (`${chosenClient.last_name}, ${chosenClient.first_name}`) }
          </h1>
          <Space>
            <button onClick={() => setShowPrintModal(true)} className='text-lg border border-gray-300 shadow-md text-gray-900 uppercase px-2 py-1 bg-white rounded-sm'><Space><SearchOutlined /> Print Preview</Space></button>
            <h1 className='text-lg shadow-2 border border-white shadow-sm text-white uppercase px-2 py-1 bg-red-500 rounded-md'>Total Balance: { computeBalance(chosenClient.price, sumOfPayments, 'PHP') }</h1>
          </Space>
        </div>
            <div className="pt-2">               

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='flex justify-end space-x-2'>
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex justify-end space-x-2">
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
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex justify-end space-x-2">                                    
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

