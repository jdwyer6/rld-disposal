import homePhoto from '../images/kitchen.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';
import PDP from '../components/PDP';
import installPhoto from '../images/install.jpg';

type pdpProps = {
    jobInfo: any,
    setJobInfo: any,
    setNumOfCartItems: any
}

const PDPInstall = ({jobInfo, setJobInfo, setNumOfCartItems}: pdpProps) => {

    return ( 
        <div className="container">

            <PDP title="Install an Appliance" photo={installPhoto} startingPrice={49} jobInfo={jobInfo} setJobInfo={setJobInfo} service={"install"} showApplianceLocationDropdown={false} startingAppliance={"refrigerator"} startingLocation={""} setNumOfCartItems={setNumOfCartItems}/>
  
        </div>
        
    );
}
 
export default PDPInstall;