const ClientInformation = ({ chosenClient, formatDate, formatCurrency }) => {    

    return (
        <div className="flex flex-wrap items-center justify-start w-full text-lg">

            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border border-dashed border-gray-500 p-3">                
                <h1>ID Number:</h1>
                <h1>{ chosenClient && (chosenClient.id_number) }</h1>
            </div>
            <div className="w-full">&nbsp;</div>

            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-b border-t border-dashed border-gray-500 p-3">
                <h1>First Name:</h1>
                <h1>{ chosenClient && (chosenClient.first_name) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-t border-dashed border-b border-gray-500 p-3">
                <h1>Middle Name:</h1>
                <h1>{ chosenClient && (chosenClient.middle_name) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-t border-dashed border-b border-gray-500 p-3">
                <h1>Last Name:</h1>
                <h1>{ chosenClient && (chosenClient.last_name) }</h1>
            </div>

            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-b border-dashed border-gray-500 p-3">
                <h1>Address:</h1>
                <h1>{ chosenClient && (chosenClient.address) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-dashed border-b border-gray-500 p-3">
                <h1>Contact Number:</h1>
                <h1>{ chosenClient && (chosenClient.mobile) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-dashed border-b border-gray-500 p-3">
                <h1>Extension Name:</h1>
                <h1>{ chosenClient && (chosenClient.extension_name) }</h1>
            </div>

            <div className="w-full">&nbsp;</div>

            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-b border-t border-dashed border-gray-500 p-3">
                <h1>Area:</h1>
                <h1>{ chosenClient && (chosenClient.area) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-t border-dashed border-b border-gray-500 p-3">
                <h1>Block:</h1>
                <h1>{ chosenClient && (chosenClient.block) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-t border-dashed border-b border-gray-500 p-3">
                <h1>Lot:</h1>
                <h1>{ chosenClient && (chosenClient.lot) }</h1>
            </div>

            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-b border-dashed border-gray-500 p-3">
                <h1>Price:</h1>
                <h1>{ chosenClient && (formatCurrency(chosenClient.price, 'PHP')) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-dashed border-b border-gray-500 p-3">
                <h1>Square Meter(s):</h1>
                <h1>{ chosenClient && (chosenClient.measure) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-dashed border-b border-gray-500 p-3">
                <h1>Date of Buying:</h1>
                <h1>{ chosenClient && (formatDate(chosenClient.date_bought, 'MMMM DD, YYYY')) }</h1>
            </div>
        </div>
    );                    
                   
    
}

export default ClientInformation;