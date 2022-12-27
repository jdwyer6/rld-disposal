type CardProps = {
    title: string
    subtitle: string
    image: string
    btnText: string
}

const Card = (props: CardProps) => {
    return ( 
        <div className='bg-white shadow-md rounded-3xl overflow-hidden p-12 max-w-2xl'>
            <h3>{props.title}</h3>
            <p className='mb-6'>{props.subtitle}</p>
            <div className='h-96 overflow-hidden mb-6'>
                <img src={props.image} className='object-none object-bottom'/>
            </div>
            
            <button className='btn-primary w-full'><h5>{props.btnText}</h5></button>
        </div>
    );
}
 
export default Card;