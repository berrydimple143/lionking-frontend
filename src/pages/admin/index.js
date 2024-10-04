import * as cookie from 'cookie';
import moment from 'moment';
import AdminLayout from '@/components/layouts/AdminLayout';
import DefaultCard from '@/components/cards/default';
import SalesChart from '@/components/charts/SalesChart';
import { getUsers } from '@/services/user';
import { getClients } from '@/services/client';
import { getAgents } from '@/services/agent';
import { getAreas } from '@/services/area';
import { getMonthlyExpenses, getMonthlyPayments } from '@/services/common';
import { getManagers } from '@/services/manager';
import { getArrayofNumbers } from '@/services/helpers';
import React, { useState, useEffect } from "react";
import { Select } from 'antd';

export async function getServerSideProps({ req }) {
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { users } = await getUsers(cookieData.token);
  const { clients } = await getClients(cookieData.token);
  const { areas } = await getAreas(cookieData.token);
  const { agents } = await getAgents(cookieData.token);
  const { managers } = await getManagers(cookieData.token);      

  return {
    props: { info: cookieData, users, clients, agents, areas, managers },
  }
}

export default function Admin({ info, users, clients, agents, areas, managers })
{
    const [expensesPerMonth, setExpensesPerMonth] = useState([]);
    const [paymentsPerMonth, setPaymentsPerMonth] = useState([]);
    const [years, setYears] = useState([]);
    const [maxExpenses, setMaxExpenses] = useState(0);
    const [initYear, setInitYear] = useState(0);

    const selectYear = async (year) => {
      const { january, february, 
        march, april, may, 
        june, july, august,
       september, october, november, december } = await getMonthlyExpenses(year);

       const { januaryp, februaryp, 
        marchp, aprilp, mayp, 
        junep, julyp, augustp,
       septemberp, octoberp, novemberp, decemberp } = await getMonthlyPayments(year);

       const mx = Math.max(january, february, march, april, may, 
        june, july, august, september, october, november, december,
        januaryp, februaryp, marchp, aprilp, mayp, 
        junep, julyp, augustp, septemberp, octoberp, novemberp, decemberp
        );

        setExpensesPerMonth([january, february, march, april, may, june, july, august, september, october, november, december]);
        setPaymentsPerMonth([januaryp, februaryp, marchp, aprilp, mayp, junep, julyp, augustp, septemberp, octoberp, novemberp, decemberp]);
        setMaxExpenses(mx);
        setInitYear(year);
    }

    useEffect(() => {
      const yr = moment().year();      
      setYears(getArrayofNumbers(yr, 'minus', 100));
      setInitYear(yr);
      selectYear(yr);
    }, []);

    return (
        <AdminLayout title="Lion King Realty Administration Panel" chosenMenu="1">
            <DefaultCard 
              user_count={users.length} 
              client_count={clients.length} 
              agent_count={agents.length} 
              areas_count={areas.length} 
              managers_count={managers.length} 
            />
            <div className='flex flex-col w-full mt-5 p-2 border border-dashed border-gray-400 bg-red-100'>
            <Select
              className="main-input"
              onChange={selectYear}              
              value={initYear}
              style={{ width: '200px' }} 
              placeholder="Select a year here...">
              {" "}
              {years && years.map((item, index) => <Select.Option value={item} key={index}>{item}</Select.Option>)}                 
              </Select>
              <SalesChart 
                width={900}
                height={350}
                expensesPerMonth={expensesPerMonth}
                paymentsPerMonth={paymentsPerMonth}
                maxExpenses={maxExpenses}
                initYear={initYear}
              />
            </div>            
        </AdminLayout>
    );
}
