import dynamic from 'next/dynamic';


const CustomMap = dynamic(() => import('./Leaflet'), { ssr: false });

const WidgetAdvantgrid = ({ NandinaAdvantGrid }) => {
  const foundObject = NandinaAdvantGrid;


  return (
    <div className="w-full">
      <h1>Advantgrid</h1>
       <CustomMap param1={NandinaAdvantGrid.unArrageData.LrrLAT[0].value} param2={NandinaAdvantGrid.unArrageData.LrrLON[0].value}/> 
    </div>
  );
};

export default WidgetAdvantgrid;
