const ProgressBar = ({questionScreen, setQuestionScreen}) => {
    return ( 
        <div className="flex w-1/2 justify-around items-center">
            <div className="flex flex-col items-center">
                <div 
                    className={`w-10 h-10 ${questionScreen >= 0 ? "bg-teal-600 hover:cursor-pointer hover:bg-teal-800 transition ease-in-out duration-300" : "bg-gray-800"} rounded-full flex justify-center items-center`}
                    onClick={()=>setQuestionScreen(0)}
                >
                    <h4 className="text-white text-center">1</h4>
                </div>
            </div>
            <div className="h-1 w-full bg-gray-500"></div>
            <div className="flex flex-col items-center">
                <div 
                    className={`w-10 h-10 ${questionScreen >= 1 ? "bg-teal-600 hover:cursor-pointer hover:bg-teal-800 transition ease-in-out duration-300" : "bg-gray-800"} rounded-full flex justify-center items-center`}
                    onClick={()=>{
                        if(questionScreen > 1){
                            setQuestionScreen(1)
                        }
                    }}
                >
                    <h4 className="text-white text-center">2</h4>
                </div>
            </div>
            <div className="h-1 w-full bg-gray-500"></div>
            <div className="flex flex-col items-center">
                <div 
                    className={`w-10 h-10 ${questionScreen >= 2 ? "bg-teal-600 hover:cursor-pointer hover:bg-teal-800 transition ease-in-out duration-300" : "bg-gray-800"} rounded-full flex justify-center items-center`}
                    onClick={()=>{
                        if(questionScreen >= 2){
                            setQuestionScreen(2)
                        }
                    }}
                >
                    <h4 className="text-white text-center">3</h4>
                </div>
            </div>
            <div className="h-1 w-full bg-gray-500"></div>
            <div className="flex flex-col items-center">
                <div 
                    className={`w-10 h-10 ${questionScreen >= 3 ? "bg-teal-600 hover:cursor-pointer hover:bg-teal-800 transition ease-in-out duration-300" : "bg-gray-800"} rounded-full flex justify-center items-center`}
                    onClick={()=>{
                        if(questionScreen >= 3){
                            setQuestionScreen(3)
                        }
                    }}
                >
                    <h4 className="text-white text-center">4</h4>
                </div>
            </div>
            <div className="h-1 w-full bg-gray-500"></div>
            <div className="flex flex-col items-center">
                <div 
                    className={`w-10 h-10 ${questionScreen >= 4 ? "bg-teal-600 hover:cursor-pointer hover:bg-teal-800 transition ease-in-out duration-300" : "bg-gray-800"} rounded-full flex justify-center items-center`}
                    onClick={()=>{
                        if(questionScreen >= 4){
                            setQuestionScreen(4)
                        }
                    }}
                >
                    <h4 className="text-white text-center">5</h4>
                </div>
            </div>
        </div> 
    );
}
 
export default ProgressBar;