import React from "react";
import Report from "@/components/printables/Report";

const ReportCanvas = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
        <Report 
            dailyExpenses={props.dailyExpenses} 
            dailyPayments={props.dailyPayments} 
            agentPayment={props.agentPayment} 
            selectedDate={props.selectedDate}
            formatCurrency={props.formatCurrency}
            formatDate={props.formatDate}
        />
    </div>
  );
});

ReportCanvas.displayName = 'LKRealty - Daily Reports';

export default ReportCanvas;
