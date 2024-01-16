import CustomMap from "./Leaflet";
import Leaflet from "./Leaflet";

const WidgetAbeeway = ({NandinaAbeeway}) => {
    const foundObject = NandinaAbeeway;
    //const state = foundObject?.unArrageData?.presence[0].value;
    //const [obj, setObj] = useState(foundObject?.allData?.find((item) => item.id.id === NandinaPresence.id));

   const ver =()=>{
    console.log("");
   }

  return (
    <div className="text-black bg-slate-700">
        <CustomMap />
    </div> 
  );
};

export default WidgetAbeeway;