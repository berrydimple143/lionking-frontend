import { Space } from 'antd';
import moment from 'moment';

let currentBalance = 0;

const Collectible = ({ 
        selectedCollectables, 
        selectedArea, 
        computeBalance, 
        computeBalanceNumber,
        totalPayment, 
        formatCurrency, 
        totalCollectibles,
        formatDate }) => {    
 
    return (
      <div className="flex flex-col p-2 bg-white">
        <div className='flex items-center justify-center'><img className="w-[40%] h-[10%]" src="/images/logo.png" alt="logo" /></div>
        <div className='flex items-center justify-center text-lg pt-4 font-bold uppercase'>List of Collectibles</div>
        <div className='flex items-center justify-center text-md pb-2'>As of { moment().format('MMMM DD, YYYY') }</div>
        <div className='flex items-center justify-between'>
          <h1 className="text-md ml-2 text-gray-700 uppercase">
            Area: { selectedArea }
          </h1>     
          <h1 className="text-md ml-2 text-gray-700 uppercase">
            Total Collectibles: { formatCurrency(totalCollectibles(selectedCollectables), 'PHP') }
          </h1>                   
        </div>
            <div className="pt-2">               

                <div className="relative overflow-x-auto">
                    <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='flex space-x-1 border-t border-b border-gray-300'>
                                <th scope="col" className="p-2 w-10">
                                    #
                                </th>
                                <th scope="col" className="p-2 w-full">
                                    Last Name
                                </th>
                                <th scope="col" className="py-2 w-full">
                                    First Name
                                </th>
                                <th scope="col" className="py-2 w-full flex">
                                    Block
                                </th>
                                <th scope="col" className="py-2 w-3/4 flex">
                                    Lot
                                </th>
                                <th scope="col" className="py-2 w-3/4 flex">
                                    Contact #
                                </th>
                                <th scope="col" className="py-2 w-full flex justify-end">
                                    Parcel Price
                                </th>
                                <th scope="col" className="p-2 w-full flex justify-end">
                                    Total Payment
                                </th>
                                <th scope="col" className="p-2 w-full flex justify-end">
                                    Total Balance
                                </th>                                
                            </tr>
                        </thead>
                        <tbody>                                               
                            { selectedCollectables && selectedCollectables.map((collectable, index) =>              
                                <tr key={index} className={` ${ computeBalanceNumber(collectable.contact.price, totalPayment(collectable.payments)) == 0.00 ? 'bg-green-500 text-white': 'bg-white' } border-b dark:bg-gray-800 dark:border-gray-700 border-gray-300 flex space-x-1`}>                                    
                                    <td className="p-2 w-10">
                                        { index + 1 }
                                    </td>
                                    <td className="p-2 w-full">
                                        { collectable.last_name }
                                    </td>
                                    <td className="py-2 w-full">
                                        { collectable.first_name }
                                    </td>
                                    <td className="py-2 w-full">
                                        { collectable.contact.block }
                                    </td>
                                    <td className="py-2 w-3/4">
                                        { collectable.contact.lot }
                                    </td>
                                    <td className="py-2 w-3/4">
                                        { collectable.contact.mobile }
                                    </td>
                                    <td className="py-2 w-full flex justify-end">
                                        { formatCurrency(collectable.contact.price, 'PHP') }                                 
                                    </td>
                                    <td className="py-2 w-full flex justify-end">
                                        { formatCurrency(totalPayment(collectable.payments), 'PHP') }
                                    </td>
                                    <td className="p-2 w-full flex justify-end">
                                        { computeBalance(collectable.contact.price, totalPayment(collectable.payments), 'PHP') }      
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
export default Collectible;

