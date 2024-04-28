import { NextFunction, Response } from "express";
import { EventService } from "../services/eventService";

export const checkTicketAvailability = async (req:any, res:Response, next:NextFunction) => {

  const { eventId, numberOfTickets } = req.body;

  try {
    const event = await EventService.getEvent({ id: eventId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if there are enough available tickets for the booking
    if (event.ticketAvailability <= 0) {
      return res.status(400).json({ message: 'No available tickets for this event' });
    }
    if (new Date(event.date).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)) {
        return res.status(400).json({
          status: 400,
          message: 'Event has already started or ended',
        });
      }
      
  
      // Check if there are enough available tickets for the booking
      if (event.ticketAvailability < numberOfTickets) {
        return res.status(400).json({
          status: 400,
          message: 'Not enough available tickets for this event',
        });
      }
    // Proceed to the next middleware/route handler if tickets are available
    next();
  } catch (error) {
    console.error('Error checking ticket availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
