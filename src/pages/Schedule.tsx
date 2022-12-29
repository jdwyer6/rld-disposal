const Schedule = () => {
    return ( 
        <>
            <div className="flex flex-col px-24 full-screen-div items-center justify-center">
                <div className="text-center mb-8">
                    <h3 className='mb-5'>What would you like to schedule?</h3>
                    <h4 className='mb-5'>Choose one option (you can add more later).</h4>
                </div>

                    <div className='flex flex-wrap w-1/2 justify-center'>
                        <button className='btn-secondary my-3'>
                            <h5>Pick up</h5>
                            <p>Haul away an old appliance.</p>
                        </button>
                        <button className='btn-secondary my-3'>
                            <h5>Deliver</h5>
                            <p>From retailer or other location.</p>
                        </button>
                        <button className='btn-secondary my-3'>
                            <h5>Install</h5>
                            <p>Installation of any major appliance.</p>
                        </button>
                        <button className='btn-secondary my-3'>
                            <h5>Move</h5>
                            <p>Appliance or furniture within <br/> residence or to new residence.</p>
                        </button>
                        <button className='btn-secondary my-3'>
                            <h5>Other</h5>
                            <p>Submit unlisted or additional requests.</p>
                        </button>
                    </div>

             
                    

            </div>
        </>
     );
}
 
export default Schedule;