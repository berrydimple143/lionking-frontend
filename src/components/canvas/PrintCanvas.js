
import React from "react";
import SOA from "@/components/printables/SOA";

const PrintCanvas = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
        <SOA 
            allPayments={props.allPayments} 
            sumOfPayments={props.sumOfPayments}
            chosenClient={props.chosenClient} 
            computeBalance={props.computeBalance}
            formatCurrency={props.formatCurrency}
            formatDate={props.formatDate}
        />
    </div>
  );
});

PrintCanvas.displayName = 'LKRealty';

export default PrintCanvas;
