const Card = (props) => {
    return ( 
        <div className='card'>
            <h3>{props.title}</h3>
            <p>{props.subtitle}</p>
            <div className='image-container'>
                <img src={props.image}/>
            </div>
            <button className="text-white m-0">{props.btnText}</button>
        </div>
    );
}
 
export default Card;