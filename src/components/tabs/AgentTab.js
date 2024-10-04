import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import AgentInformation from './contents/AgentInformation';
import AgentPaymentHistory from './contents/AgentPaymentHistory';
import SOA from "./contents/SOA";

const AgentTab = ({ 
    selectedAgent, 
    getAgentInfo, 
    getAgentPayments, 
    handleDeletePayment, 
    formatDate,
    formatCurrency,
    computeBalance,
    printStatement,
    componentRef,
    showCanvas,
    setChosenAgent,
    chosenAgent,
    setSumOfPayments,
    sumOfPayments,
    setAllPayments,
    allPayments,
    setShowPrintModal,
    setSelectedItemForDelete }) => {

    const getInfo = async (id) => {        
        const { agent } = await getAgentInfo(id);
        setChosenAgent(agent);        
    }

    const setAgentPayments = async(id) => {
        const { payments, totalPayments } = await getAgentPayments(id);   
        setSumOfPayments(totalPayments);            
        setAllPayments(payments);     
    }

    useEffect(() => {
        getInfo(selectedAgent);
        setAgentPayments(selectedAgent);
    }, [selectedAgent]);

    return (
      <div className="mt-3 border-b border-gray-400 shadow-2xl h-full pb-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50 to-red-200">
        <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ backgroundColor: '#fff', color: '#fff' }}
        type="card"
        items={[
            {
                label: 'Agent Information',
                key: '1',
                children: <AgentInformation formatDate={formatDate} formatCurrency={formatCurrency} chosenAgent={chosenAgent} />                
            },
            {
              label: 'Payment History',
              key: '2',
              children: <AgentPaymentHistory computeBalance={computeBalance} formatCurrency={formatCurrency} sumOfPayments={sumOfPayments} chosenAgent={chosenAgent} formatDate={formatDate} allPayments={allPayments} handleDeletePayment={handleDeletePayment} setSelectedItemForDelete={setSelectedItemForDelete} />
            },       
        ]}
      />  
    </div>
  );
}

export default AgentTab;