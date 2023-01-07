type PrivateProps = {
    serviceVerb: string;
    setQuestionScreen: any
    questionScreen: number
}

const SelectLocation = ({serviceVerb, setQuestionScreen, questionScreen}: PrivateProps) => {
    const makeSelection = () =>{
        setQuestionScreen(questionScreen+=1)
    }
    return ( 
        <>
            <div className="flex flex-col px-24 full-screen-div items-center justify-center">
                <div className="text-center mb-8">
                    <h3 className='mb-5'>Where will we be {serviceVerb} your appliance?</h3>
                    <h4 className='mb-5'>We operate within 35 miles of the St. Louis area.</h4>
                </div>
                <div className='flex flex-wrap w-1/2 justify-start'>
                    <label className="block text-gray-700 text-sm font-bold mb-b" htmlFor="address">Address</label>
                    <input placeholder="Enter your address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-slate-400 focus:shadow-outline" id="address" type="text" />
                    <button className="inline-flex w-36 rounded border border-gray-7000 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-100" aria-expanded="true" aria-haspopup="true">Location</button>
      
                    <div className="flex flex-column">
                        <a>$42 Inside house (needs to be disconnected)</a>
                        <a>$39 Inside house (already disconnected)</a>
                        <a>$29 Garage</a>
                        <a>$29 Driveway or Curb</a>
                        <a>Other</a>
                    </div>

                    <p>from where if selecting delivery or move</p>


                    <button className='my-3'>
                        <p>Skip for now</p>
                    </button>
                </div>
            </div>
        </> 
    );
}
 
export default SelectLocation;