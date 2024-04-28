import {Response} from 'express'
import { EventService } from "../services/eventService"
import { BookingService } from '../services/bookingService'

class BookingController{
    static async createBooking(req:any, res:Response){
      const {id} = req.user
      const {eventId,numberOfTickets} = req.body
       const event = await EventService.getEvent({id:eventId})

       if(!event){
           return res.status(404).json({message:"Event not found"})
       }

       if(new Date(event.date) <= new Date()){
         return res.status(400).json({
            status:400,
            message:"Event has started or ended"
         })
       }

      const totalPrice = event.ticketPrice * numberOfTickets
      const details = {
        eventId,
        userId:id,
        numberOfTickets,
        totalPrice
   
      }
      const data = await BookingService.create(details)
      
      if(data){
        await EventService.update(
            {id:eventId},
            {ticketAvailability:event.ticketAvailability - numberOfTickets})
      }
      return res.status(200).json({
        status:200,
        message:"Event booking was successfull",
        data
      })
    }

    static async cancelBooking(req:any, res:Response){
       const {id} = req.query
       const booked = await BookingService.getEvent({id})

       if(!booked){
           return res.status(404).json({message:"Event not found"})
       }

       const data = await BookingService.update(id,{
        isCancelled:true
       })

       if(data){
        const event:any = await EventService.getEvent({id:booked.eventId})
        await EventService.update({id:booked.eventId},{
            ticketAvailability: event.ticketAvailability + booked.numberOfTickets
        })
       }
       return res.status(200).json({
        status:200,
        message:"Event booking was cancelled",
        data
      })
    }
}

export default BookingController