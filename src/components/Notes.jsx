const Notes = (jobInfo, setJobInfo) => {
    const handleNotesChange = (event) => {
        setJobInfo((prevState)  => ({
            ...prevState,
            notes: event.target.value
        }));
    }
    
    return (
        <div className="container">
            <section>
                <div>
                    <h3>Notes</h3>
                    <p>Please notate anything special we should know about your request or any questions you may have.</p>
                    <textarea onChange={handleNotesChange} value={jobInfo.notes} />
                </div>
                
            </section>
        </div>
    )

}

export default Notes;