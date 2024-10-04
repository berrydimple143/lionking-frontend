import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import ManagerAgents from './contents/ManagerAgents';

const ManagerTab = ({ selectedManagerId, chosenAgents, setChosenAgents, getManagerAgents, handleDeleteAgent }) => {

    const getInfo = async (id) => {        
        const { agents } = await getManagerAgents(id);          
        setChosenAgents(agents);
    }

    useEffect(() => {
        getInfo(selectedManagerId);
    }, [selectedManagerId]);

    return (
      <div className="mt-3 border-b border-gray-400 shadow-2xl h-full pb-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50 to-red-200">
        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{ backgroundColor: '#fff', color: '#fff' }}
          type="card"
          items={[
              {
                  label: 'Agents',
                  key: '1',
                  children: <ManagerAgents chosenAgents={chosenAgents} handleDeleteAgent={handleDeleteAgent} />                
              }             
          ]}
      />  
    </div>
  );
}

export default ManagerTab;