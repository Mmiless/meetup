import "./Time.css";

const Time = () => {

    const times = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];


    return(
        <div className="timeContainer">
                <div id="promptText">What times?</div>
                <label for="start" >Earliest: </label>
                <select id="start">
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 AM
                        </option>
                    ))}
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 PM
                        </option>
                    ))}
                </select>
                <label for="end" >Latest: </label>
                <select id="end">
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 AM
                        </option>
                    ))}
                    {times.map((hour) => (
                        <option key={hour}>
                            {hour}:00 PM
                        </option>
                    ))}
                </select>
                    
            </div>
    );
};

export default Time

