import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import ClientInformation from './contents/ClientInformation';
import PaymentHistory from './contents/PaymentHistory';
import SOA from "./contents/SOA";

const onChange = (key) => {
  console.log(key);
};

const MainTab = ({ 
    selectedClient, 
    getClientInfo, 
    getClientPayments, 
    handleDeletePayment, 
    formatDate,
    formatCurrency,
    computeBalance,
    printStatement,
    componentRef,
    showCanvas,
    setChosenClient,
    chosenClient,
    setSumOfPayments,
    sumOfPayments,
    setAllPayments,
    allPayments,
    setShowPrintModal,
    page,
    setSelectedItemForDelete }) => {

    const getInfo = async (id) => {        
        const { client } = await getClientInfo(id);          
        setChosenClient(client);        
    }

    const setClientPayments = async(id) => {
        const { payments, totalPayments } = await getClientPayments(id);   
        setSumOfPayments(totalPayments);            
        setAllPayments(payments);     
    }

    useEffect(() => {
        getInfo(selectedClient);
        setClientPayments(selectedClient);
    }, [selectedClient]);

    return (
      <div className="mt-3 border-b border-gray-400 shadow-2xl h-full pb-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50 to-red-200">
        <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ backgroundColor: '#fff', color: '#fff' }}
        // onChange={onChange}
        type="card"
        items={[
            {
                label: 'Client Information',
                key: '1',
                children: <ClientInformation formatCurrency={formatCurrency} formatDate={formatDate} chosenClient={chosenClient} />                
            },
            {
              label: 'Payment History',
              key: '2',
              children: <PaymentHistory page={page} computeBalance={computeBalance} formatCurrency={formatCurrency} sumOfPayments={sumOfPayments} chosenClient={chosenClient} formatDate={formatDate} allPayments={allPayments} handleDeletePayment={handleDeletePayment} setSelectedItemForDelete={setSelectedItemForDelete} />
            },
            {
              label: 'Statement of Account',
              key: '3',
              children: <SOA setShowPrintModal={setShowPrintModal} showCanvas={showCanvas} componentRef={componentRef} printStatement={printStatement} allPayments={allPayments} computeBalance={computeBalance} formatCurrency={formatCurrency} sumOfPayments={sumOfPayments} chosenClient={chosenClient} formatDate={formatDate} />
            },        
        ]}
      />  
    </div>
  );
}

export default MainTab;