import React, { useEffect, useState } from "react";
import { Tabs } from 'antd';
import ExpensesHistory from './contents/ExpensesHistory';

const ExpensesTab = ({ 
    selectedExpenseDate,
    getExpensesByDate,
    formatDate,
    handleDeleteExpense,
    setSelectedItemForDelete,
    formatCurrency
    }) => {
      const [selectedExpenses, setSelectedExpenses] = useState([]);
    
      const getInfo = async (dt) => {        
          const { expenses } = await getExpensesByDate(dt);           
          setSelectedExpenses(expenses);
      }

      useEffect(() => {
          getInfo(selectedExpenseDate);
      }, [selectedExpenseDate]);

      return (                
        <div className="mt-3 border-b border-gray-400 shadow-2xl h-full pb-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50 to-red-200">
          <Tabs
          defaultActiveKey="1"
          tabBarStyle={{ backgroundColor: '#fff', color: '#fff' }}
          type="card"
          items={[            
              {
                label: 'List of Expenses',
                key: '1',
                children: <ExpensesHistory 
                    selectedExpenseDate={selectedExpenseDate}
                    selectedExpenses={selectedExpenses}
                    formatCurrency={formatCurrency} 
                    handleDeleteExpense={handleDeleteExpense}
                    setSelectedItemForDelete={setSelectedItemForDelete}
                    formatDate={formatDate} />
              },       
          ]}
        />  
      </div>
    );
  }

export default ExpensesTab;