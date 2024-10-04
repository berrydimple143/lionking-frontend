import React, { useEffect, useState } from "react";
import { Tabs } from 'antd';
import CollectableInformation from './contents/CollectableInformation';

const AreaTab = ({ 
    selectedAreaId,
    getCollectablesByArea,
    formatDate,
    formatCurrency,
    totalPayment,
    setShowPrintModal,
    setSelectedCollectables,
    totalCollectibles,
    selectedCollectables,
    setSelectedArea,
    selectedArea,    
    computeBalance
    }) => {  
    
      const getInfo = async (id) => {        
          const { clients, area } = await getCollectablesByArea(id);
          setSelectedCollectables(clients);
          setSelectedArea(area);
      }

      useEffect(() => {
          getInfo(selectedAreaId);
      }, [selectedAreaId]);

      return (                
        <div className="mt-3 border-b border-gray-400 shadow-2xl h-full pb-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50 to-red-200">
          <Tabs
          defaultActiveKey="1"
          tabBarStyle={{ backgroundColor: '#fff', color: '#fff' }}
          type="card"
          items={[            
              {
                label: 'Collectables',
                key: '1',
                children: <CollectableInformation 
                    selectedArea={selectedArea}
                    selectedCollectables={selectedCollectables}    
                    totalCollectibles={totalCollectibles}                
                    formatCurrency={formatCurrency}
                    totalPayment={totalPayment}
                    computeBalance={computeBalance}
                    setShowPrintModal={setShowPrintModal}
                    formatDate={formatDate} />
              },       
          ]}
        />  
      </div>
    );
  }

export default AreaTab;