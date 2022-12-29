import homePhoto from '../images/home_image.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';

const Home = () => {
    return ( 
        <>
            <div className="flex px-24 my-24 full-screen-div items-center justify-between">
                <div className="flex-initial w-6/12">
                    <h1 className='mb-5'>Don't know what to do with your appliances?</h1>
                    <h4 className='mb-5'>Contact RLD Disposal today for quality appliance delivery, installation, removal and more from technicians who care.</h4>
                    <div className='my-5'>
                        <Link to='/schedule'>
                            <button className='btn-primary'><h5>Make an appointment</h5></button>
                        </Link>
                        
                        <button className='btn-secondary'><h5>Learn More</h5></button>
                    </div>
                    
                </div>
                <div className="flex flex-initial w-5/12 content-center justify-center">
                    <img className="object-contain rounded-3xl" src={homePhoto} width="70%"/>
                </div>
            </div>
            <div className='bg-teal-600 p-24 my-24'>
                <div className='py-24'>
                    <h1 className='text-center text-white'>We address all your appliance annoyances.</h1>
                </div>
                <div className='flex justify-between pb-24'>
                    <div className='flex flex-col items-center max-w-sm'>
                        <p><TbHomeOff className='text-white text-8xl'/></p>
                        <h4 className='text-white text-center'>Big box stores deliver but won't install?</h4>
                    </div>
                    <div className='flex flex-col items-center max-w-sm'>
                        <p><TbTrash className='text-white text-8xl'/></p>
                        <h4 className='text-white text-center'>Old appliances gotta go?</h4>
                    </div>
                    <div className='flex flex-col items-center max-w-sm'>
                        <p><TbTruckDelivery className='text-white text-8xl'/></p>
                        <h4 className='text-white text-center'>Bought an appliance but have no one to deliver?</h4>
                    </div>

                </div>
            </div>
            <div className='px-24 my-24 flex items-center flex-col'>
                <h2 className='my-36'>Serving the greater St. Louis area since 1953.</h2>
                <div className='flex flex-wrap justify-around w-full'>
                    <Card 
                        title='Schedule an appointment online'
                        subtitle="Fast, easy and convenient. Pick a time that's right for you and pay online or in-person."
                        image={cardSchedule}
                        btnText='Get started'
                    />
                    <Card 
                        title='Decades of dedication and experience.'
                        subtitle='With over 70 years of satisfied customers, we guarantee you are getting the best service around.'
                        image={cardLearnMore}
                        btnText='Learn more'
                    />
                </div>
            </div>

            
        </> 
    );
}
 
export default Home;