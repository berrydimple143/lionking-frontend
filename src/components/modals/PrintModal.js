import React, { useState } from "react";
import { Space } from 'antd';
import PrintCanvas from "../canvas/PrintCanvas";
import { PrinterOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default function PrintModal({
    children,
    showPrintModal,
    printStatement,
    componentRef,
    allPayments,
    sumOfPayments,
    chosenClient,
    computeBalance,
    formatCurrency,
    formatDate,
    closePrint,
    mtitle
}) {
  return (
    <>
      {showPrintModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[90%] h-screen my-1 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-none relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-1 uppercase text-lg">
                  &nbsp;
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">                
                  <PrintCanvas 
                    ref={componentRef} 
                    allPayments={allPayments} 
                    sumOfPayments={sumOfPayments}
                    chosenClient={chosenClient} 
                    computeBalance={computeBalance}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                 />                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <Space>
                  <button
                    onClick={printStatement}
                    className="bg-green-500 text-white font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Space><PrinterOutlined /> Print</Space> 
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closePrint}
                  >
                    <Space><CloseCircleOutlined />Close</Space>
                  </button>
                  </Space>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
