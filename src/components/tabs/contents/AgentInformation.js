const AgentInformation = ({ chosenAgent, formatDate, formatCurrency }) => {    

    return (
        <div className="flex flex-wrap items-center justify-start w-full text-lg">

            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border border-dashed border-gray-500 p-3">                
                <h1>ID Number:</h1>
                <h1>{ chosenAgent && (chosenAgent.id_number) }</h1>
            </div>
            <div className="w-full">&nbsp;</div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-b border-t border-dashed border-gray-500 p-3">
                <h1>First Name:</h1>
                <h1>{ chosenAgent && (chosenAgent.first_name) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-t border-dashed border-b border-gray-500 p-3">
                <h1>Middle Name:</h1>
                <h1>{ chosenAgent && (chosenAgent.middle_name) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-t border-dashed border-b border-gray-500 p-3">
                <h1>Last Name:</h1>
                <h1>{ chosenAgent && (chosenAgent.last_name) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-b border-dashed border-gray-500 p-3">
                <h1>Address:</h1>
                <h1>{ chosenAgent && (chosenAgent.address) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-dashed border-b border-gray-500 p-3">
                <h1>Contact Number:</h1>
                <h1>{ chosenAgent && (chosenAgent.mobile) }</h1>
            </div>
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-l border-dashed border-b border-gray-500 p-3">
                <h1>Extension Name:</h1>
                <h1>{ chosenAgent && (chosenAgent.extension_name) }</h1>
            </div>           
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-dashed border-b border-r border-gray-500 p-3">
                <h1>Commission:</h1>
                <h1>{ chosenAgent && (formatCurrency(chosenAgent.price, 'PHP')) }</h1>
            </div>    
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-dashed border-b border-r border-gray-500 p-3">
                <h1>Date of Registration:</h1>
                <h1>{ chosenAgent && (formatDate(chosenAgent.date_bought, 'MMMM DD, YYYY')) }</h1>
            </div> 
            <div className="w-full sm:w-1/3 px-5 py-0 flex space-x-2 border-dashed border-b border-gray-500 p-3">
                <h1 className="w-full">&nbsp;</h1>                
            </div> 
        </div>
    );                    
                   
    
}

export default AgentInformation;