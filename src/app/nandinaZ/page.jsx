import Widget1 from "./widget1/Sensative-01C769";
import AbeewayWidget from "./widget2/AbeewayWidget";
import PresenceWidget from "./widget3/PresenceWidget";

const Component = () => {

  return (
    <div className="text-black">
        <PresenceWidget />
        <Widget1 />
        <AbeewayWidget />
    </div> 
  );
};

export default Component;