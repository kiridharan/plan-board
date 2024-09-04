"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import useCalendarStore from "@/store/useCalendarStore";
import { Checkbox, Form, Input, Modal } from "antd";
import EventWithDelete from "./EventCard";
import CustomToolbar from "./CustomToolBar";

// Localizer setup
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent: React.FC = () => {
  const { events, addEvent, updateEvent, removeEvent } = useCalendarStore();
  const [view, setView] = useState<any>("month");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    priority: 4,
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setEventDetails({ ...eventDetails, start, end });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (eventDetails.title) {
      const newEvent = {
        id: Math.random() * 100,
        title: eventDetails.title,
        start: eventDetails.start,
        end: eventDetails.end,
        priority: eventDetails.priority as 2 | 1 | 3 | 4,
      };
      addEvent(newEvent);
      setIsModalVisible(false); // Close the modal after adding the event
      // Clear the event details
      setEventDetails({
        title: "",
        start: new Date(),
        end: new Date(),
        priority: 4,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEventResize = (data: any) => {
    const { start, end } = data;
    const updatedEvent = {
      ...data.event,
      start,
      end,
    };
    updateEvent(updatedEvent);
  };

  const handleEventDrop = (data: any) => {
    const { start, end } = data;
    const updatedEvent = {
      ...data.event,
      start,
      end,
    };
    updateEvent(updatedEvent);
  };

  const handleViewChange = (newView: "month" | "week" | "day") => {
    setView(newView);
  };

  const handleDeleteEvent = (eventToDelete: any) => {
    removeEvent(eventToDelete.id);
  };

  const handleNavigate = (action: any) => {
    const currentDate = moment().toDate();
    const newDate =
      action === "NEXT"
        ? moment(currentDate).add(1, view).toDate()
        : action === "PREV"
        ? moment(currentDate).subtract(1, view).toDate()
        : currentDate;
    // Re-set the view
    setView(view); // Optional: Adjust based on desired behavior
    // Example action
    handleSelectSlot({ start: newDate, end: newDate });
  };

  const handleToday = () => {
    handleSelectSlot({ start: new Date(), end: new Date() });
  };

  const onNavigate = (date: Date) => {
    handleSelectSlot({ start: date, end: date });
  };

  return (
    <div className="h-screen">
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        // more events in single day
        // step={60}
        // startAccessor="start"
        // endAccessor="end"
        defaultView={Views.MONTH}
        style={{ height: "100%", width: "100%" }}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        onSelectSlot={handleSelectSlot}
        selectable
        resizable
        views={["month", "week", "day"]} // Ensure these are correct and match expected values
        onNavigate={
          (e) => {
            onNavigate(e);
          } // Set onNavigate correct
        }
        view={view}
        onView={
          (e) => {
            setView(e as View);
          } // Set onView correctly
        } // Set onView correctly
        components={{
          event: (props) => (
            <EventWithDelete {...props} onDelete={handleDeleteEvent} />
          ),
        }}
      />

      <Modal
        title="Add New Event"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add Event"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Event Title">
            <Input
              value={eventDetails.title}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, title: e.target.value })
              }
              placeholder="Enter event title"
            />
          </Form.Item>

          <Form.Item label="Priority">
            <Checkbox.Group
              // add as 1 as urgency is the highest priority
              // add as 4 as urgency is the lowest priority

              options={[
                { label: "Urgent", value: 1 },
                { label: "High", value: 2 },
                { label: "Medium", value: 3 },
                { label: "Low", value: 4 },
              ]}
              value={[eventDetails.priority]}
              onChange={(value) =>
                setEventDetails({ ...eventDetails, priority: value[0] })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
