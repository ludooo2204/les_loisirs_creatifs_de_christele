import React from "react";
import styles from "./Evenement.module.css";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const Evenements = () => {
	const handleEventClick = (clickInfo) => {
	window.alert(clickInfo.event.title)
	console.log(clickInfo)
	};

	return (
		<div className={styles.evenementContainer}>
			<div className={styles.calendarContainer}>
				<FullCalendar
					locale={"fr"}
					plugins={[dayGridPlugin]}
					events={[
						{ title: "Marché de noël à Beaumont", date: "2021-12-25" },
						{ title: "Marché à Traversais ",date:"2021-12-19" },
						{ title: "Marché à Paris ! Et ouais !Marché à Paris ! Et ouais ! ", date: "2021-12-17" },
					]}
					initialView="dayGridMonth"
					editable={true}
					firstDay={1}
					// eventDisplay={'block'}
					selectable={true}
					// selectMirror={true}
					
					// dayMaxEventRows={6}
					// dayMaxEvents={true}
                    height={"90VH"}
                    // aspectRatio=5

					eventClick={handleEventClick}
				/>
			</div>
		</div>
	);
};

export default Evenements;
