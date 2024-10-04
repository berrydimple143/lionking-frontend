
import React from "react";
import Collectible from "@/components/printables/Collectible";

const CollectibleCanvas = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
        <Collectible 
            selectedCollectables={props.selectedCollectables} 
            totalCollectibles={props.totalCollectibles} 
            totalPayment={props.totalPayment} 
            selectedArea={props.selectedArea}
            computeBalance={props.computeBalance}
            computeBalanceNumber={props.computeBalanceNumber}
            formatCurrency={props.formatCurrency}
            formatDate={props.formatDate}
        />
    </div>
  );
});

CollectibleCanvas.displayName = 'LKRealty - Collectibles';

export default CollectibleCanvas;
